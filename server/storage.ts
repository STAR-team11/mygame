import { type User, type InsertUser, type Project, type InsertProject, type Participation, type InsertParticipation, users, projects, participations } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq, and, gt } from "drizzle-orm";
import ws from "ws";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const db = drizzle({
  connection: process.env.DATABASE_URL,
  ws: ws,
});

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  getUserByReferralCode(referralCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: string, points: number): Promise<User>;
  
  // Project operations
  getProject(id: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getActiveProjects(): Promise<Project[]>;
  getProjectsByCreator(creatorId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Participation operations
  getParticipation(id: string): Promise<Participation | undefined>;
  getParticipationsByUser(userId: string): Promise<Participation[]>;
  getParticipationsByProject(projectId: string): Promise<Participation[]>;
  createParticipation(participation: InsertParticipation): Promise<Participation>;
  
  // Referral operations
  getReferralsByUser(userId: string): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return result[0];
  }

  async getUserByReferralCode(referralCode: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.referralCode, referralCode));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserPoints(userId: string, points: number): Promise<User> {
    const result = await db.update(users)
      .set({ starPoints: points })
      .where(eq(users.id, userId))
      .returning();
    
    if (!result[0]) {
      throw new Error("User not found");
    }
    return result[0];
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getActiveProjects(): Promise<Project[]> {
    const now = new Date();
    return await db.select()
      .from(projects)
      .where(
        and(
          eq(projects.status, "active"),
          gt(projects.endsAt, now)
        )
      );
  }

  async getProjectsByCreator(creatorId: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.creatorId, creatorId));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const createdAt = new Date();
    const endsAt = new Date(
      createdAt.getTime() + insertProject.participationPeriodDays * 24 * 60 * 60 * 1000
    );

    const result = await db.insert(projects).values({
      ...insertProject,
      endsAt,
    }).returning();
    
    return result[0];
  }

  async getParticipation(id: string): Promise<Participation | undefined> {
    const result = await db.select().from(participations).where(eq(participations.id, id));
    return result[0];
  }

  async getParticipationsByUser(userId: string): Promise<Participation[]> {
    return await db.select().from(participations).where(eq(participations.userId, userId));
  }

  async getParticipationsByProject(projectId: string): Promise<Participation[]> {
    return await db.select().from(participations).where(eq(participations.projectId, projectId));
  }

  async createParticipation(insertParticipation: InsertParticipation): Promise<Participation> {
    const result = await db.insert(participations).values(insertParticipation).returning();
    return result[0];
  }

  async getReferralsByUser(userId: string): Promise<User[]> {
    const user = await this.getUser(userId);
    if (!user) {
      return [];
    }
    return await db.select().from(users).where(eq(users.referredBy, user.referralCode));
  }
}

export const storage = new DatabaseStorage();
