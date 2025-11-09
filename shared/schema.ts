import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull().unique(),
  starPoints: real("star_points").notNull().default(0),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  description: text("description").notNull(),
  logoUrl: text("logo_url"),
  totalSupply: text("total_supply").notNull(),
  decimals: integer("decimals").notNull().default(7),
  airdropPercent: integer("airdrop_percent").notNull(),
  creatorPercent: integer("creator_percent").notNull(),
  liquidityPercent: integer("liquidity_percent").notNull(),
  minimumLiquidity: text("minimum_liquidity").notNull(),
  hasVesting: boolean("has_vesting").notNull().default(false),
  vestingPeriodDays: integer("vesting_period_days"),
  participationPeriodDays: integer("participation_period_days").notNull(),
  twitterUrl: text("twitter_url"),
  telegramUrl: text("telegram_url"),
  websiteUrl: text("website_url"),
  contractAddress: text("contract_address"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  endsAt: timestamp("ends_at").notNull(),
});

export const participations = pgTable("participations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  projectId: varchar("project_id").notNull(),
  starPointsUsed: real("star_points_used").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ 
  id: true, 
  createdAt: true, 
  endsAt: true,
  contractAddress: true,
  status: true 
});
export const insertParticipationSchema = createInsertSchema(participations).omit({ id: true, createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertParticipation = z.infer<typeof insertParticipationSchema>;
export type Participation = typeof participations.$inferSelect;
