import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProjectSchema } from "@shared/schema";
import { z } from "zod";

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'STAR';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function generateUniqueReferralCode(): Promise<string> {
  let code = generateReferralCode();
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const existing = await storage.getUserByReferralCode(code);
    if (!existing) {
      return code;
    }
    code = generateReferralCode();
    attempts++;
  }
  
  throw new Error("Failed to generate unique referral code");
}

function calculateReferralReward(starPoints: number): number {
  return starPoints * 0.1;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/connect", async (req, res) => {
    try {
      const connectSchema = z.object({
        walletAddress: z.string().min(1),
        referralCode: z.string().optional(),
      });
      
      const { walletAddress, referralCode } = connectSchema.parse(req.body);
      
      let user = await storage.getUserByWallet(walletAddress);
      
      if (!user) {
        const newReferralCode = await generateUniqueReferralCode();
        
        let referredBy: string | undefined = undefined;
        if (referralCode) {
          const referrer = await storage.getUserByReferralCode(referralCode);
          if (referrer) {
            referredBy = referralCode;
          }
        }
        
        const insertData = insertUserSchema.parse({
          walletAddress,
          referralCode: newReferralCode,
          starPoints: 0,
          referredBy: referredBy || null,
        });
        
        user = await storage.createUser(insertData);
      }
      
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
      }
    }
  });
  
  app.get("/api/users/me", async (req, res) => {
    try {
      const walletAddress = req.query.walletAddress as string;
      
      if (!walletAddress) {
        res.status(400).json({ error: "walletAddress query parameter is required" });
        return;
      }
      
      const user = await storage.getUserByWallet(walletAddress);
      
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });
  
  app.get("/api/users/:id/referrals", async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await storage.getUser(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      const referrals = await storage.getReferralsByUser(id);
      res.json(referrals);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  app.post("/api/points/mint", async (req, res) => {
    try {
      // BLOCKCHAIN INTEGRATION: This endpoint now receives txHash from on-chain transaction
      // TODO: Verify transaction on Stellar network using txHash before updating database
      // TODO: Query actual STAR points balance from TokenLaunch contract using getStarPointsBalance()
      const mintSchema = z.object({
        walletAddress: z.string().min(1, "Wallet address is required"),
        xlmAmount: z.number()
          .positive("XLM amount must be positive")
          .max(10000, "XLM amount cannot exceed 10,000"),
        txHash: z.string().optional(), // Transaction hash from Stellar network
      });
      
      const { walletAddress, xlmAmount, txHash } = mintSchema.parse(req.body);
      
      const user = await storage.getUserByWallet(walletAddress);
      if (!user) {
        res.status(404).json({ error: "User not found. Please connect your wallet first." });
        return;
      }
      
      const starPoints = xlmAmount * 10;
      const newBalance = user.starPoints + starPoints;
      
      const updatedUser = await storage.updateUserPoints(user.id, newBalance);
      
      let referrerReward = 0;
      let updatedReferrer = null;
      
      if (user.referredBy) {
        const referrer = await storage.getUserByReferralCode(user.referredBy);
        if (referrer) {
          referrerReward = calculateReferralReward(starPoints);
          const referrerNewBalance = referrer.starPoints + referrerReward;
          updatedReferrer = await storage.updateUserPoints(referrer.id, referrerNewBalance);
        }
      }
      
      res.json({
        user: updatedUser,
        transaction: {
          xlmAmount,
          starPointsMinted: starPoints,
          referrerReward,
          referrerWallet: updatedReferrer?.walletAddress || null,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
      }
    }
  });

  app.post("/api/projects/create", async (req, res) => {
    try {
      // BLOCKCHAIN INTEGRATION: This endpoint now receives txHash from on-chain transaction
      // TODO: Verify transaction on Stellar network using txHash before creating project
      // TODO: Query project data from TokenLaunch contract using getProjectFromChain()
      // TODO: Store on-chain project ID returned from create_project contract call
      const createProjectSchema = insertProjectSchema.extend({
        name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must not exceed 50 characters"),
        symbol: z.string().min(2, "Symbol must be at least 2 characters").max(10, "Symbol must not exceed 10 characters").toUpperCase(),
        description: z.string().min(10, "Description must be at least 10 characters"),
        totalSupply: z.string().refine((val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0;
        }, "Total supply must be a positive number"),
        minimumLiquidity: z.string().refine((val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num >= 500;
        }, "Minimum liquidity must be at least 500"),
        participationPeriodDays: z.number().min(3, "Participation period must be at least 3 days").max(15, "Participation period must not exceed 15 days"),
        walletAddress: z.string().min(1, "Wallet address is required"),
        txHash: z.string().optional(), // Transaction hash from Stellar network
      }).refine((data) => {
        const total = data.airdropPercent + data.creatorPercent + data.liquidityPercent;
        return total === 100;
      }, {
        message: "Airdrop, creator, and liquidity percentages must sum to 100%",
      }).refine((data) => {
        if (data.hasVesting && !data.vestingPeriodDays) {
          return false;
        }
        return true;
      }, {
        message: "Vesting period must be set when vesting is enabled",
      });
      
      const validatedData = createProjectSchema.parse(req.body);
      const { walletAddress, txHash, ...projectData } = validatedData;
      
      const user = await storage.getUserByWallet(walletAddress);
      if (!user) {
        res.status(404).json({ error: "User not found. Please connect your wallet first." });
        return;
      }
      
      const project = await storage.createProject({
        ...projectData,
        creatorId: user.id,
      });
      
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
      }
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getActiveProjects();
      const sortedProjects = projects.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      res.json(sortedProjects);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  app.post("/api/projects/:projectId/participate", async (req, res) => {
    try {
      // BLOCKCHAIN INTEGRATION: This endpoint now receives txHash from on-chain transaction
      // TODO: Verify transaction on Stellar network using txHash before updating database
      // TODO: Query participation data from TokenLaunch contract using getParticipation()
      // TODO: Verify STAR points were actually burned/transferred on-chain
      const { projectId } = req.params;
      const participateSchema = z.object({
        walletAddress: z.string().min(1, "Wallet address is required"),
        starPoints: z.number().positive("STAR points must be positive"),
        txHash: z.string().optional(), // Transaction hash from Stellar network
      });
      
      const { walletAddress, starPoints, txHash } = participateSchema.parse(req.body);
      
      const project = await storage.getProject(projectId);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      
      if (project.status !== "active" || new Date(project.endsAt) <= new Date()) {
        res.status(400).json({ error: "Project is not active or has ended" });
        return;
      }
      
      const user = await storage.getUserByWallet(walletAddress);
      if (!user) {
        res.status(404).json({ error: "User not found. Please connect your wallet first." });
        return;
      }
      
      if (user.starPoints < starPoints) {
        res.status(400).json({ error: "Insufficient STAR points balance" });
        return;
      }
      
      const creator = await storage.getUser(project.creatorId);
      if (!creator) {
        res.status(404).json({ error: "Project creator not found" });
        return;
      }
      
      if (user.id === project.creatorId) {
        res.status(400).json({ error: "You cannot participate in your own project" });
        return;
      }
      
      const burned = starPoints * 0.5;
      const toCreator = starPoints * 0.5;
      
      const newUserBalance = user.starPoints - starPoints;
      await storage.updateUserPoints(user.id, newUserBalance);
      
      const newCreatorBalance = creator.starPoints + toCreator;
      await storage.updateUserPoints(creator.id, newCreatorBalance);
      
      const participation = await storage.createParticipation({
        userId: user.id,
        projectId: projectId,
        starPointsUsed: starPoints,
      });
      
      res.json({
        participation,
        burned,
        toCreator,
        newBalance: newUserBalance,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
      }
    }
  });

  app.get("/api/projects/:projectId/participations", async (req, res) => {
    try {
      const { projectId } = req.params;
      
      const project = await storage.getProject(projectId);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      
      const participations = await storage.getParticipationsByProject(projectId);
      res.json(participations);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  app.get("/api/stats/global", async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const activeProjects = await storage.getActiveProjects();
      
      const totalUsers = allUsers.length;
      const dailyActiveUsers = Math.floor(totalUsers / 4);
      const totalPointsMinted = allUsers.reduce((sum, user) => sum + user.starPoints, 0);
      
      res.json({
        totalUsers,
        dailyActiveUsers,
        activeProjects: activeProjects.length,
        totalPointsMinted,
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  app.get("/api/users/:userId/projects", async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = await storage.getUser(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      const projects = await storage.getProjectsByCreator(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  app.get("/api/users/:userId/participations", async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = await storage.getUser(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      const participations = await storage.getParticipationsByUser(userId);
      
      const participationsWithProjects = await Promise.all(
        participations.map(async (participation) => {
          const project = await storage.getProject(participation.projectId);
          return {
            participation,
            project,
          };
        })
      );
      
      res.json(participationsWithProjects);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
