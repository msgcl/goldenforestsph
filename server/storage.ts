import { db } from "./db";
import {
  teamMembers,
  operationalUpdates,
  nurseryStats,
  type TeamMemberResponse,
  type OperationalUpdateResponse,
  type NurseryStatsResponse,
  type InsertTeamMember,
  type InsertOperationalUpdate,
  type InsertNurseryStats,
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  getTeamMembers(): Promise<TeamMemberResponse[]>;
  getOperationalUpdates(): Promise<OperationalUpdateResponse[]>;
  getLatestNurseryStats(): Promise<NurseryStatsResponse | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMemberResponse>;
  createOperationalUpdate(update: InsertOperationalUpdate): Promise<OperationalUpdateResponse>;
  createNurseryStats(stats: InsertNurseryStats): Promise<NurseryStatsResponse>;
}

export class DatabaseStorage implements IStorage {
  async getTeamMembers(): Promise<TeamMemberResponse[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.orderIndex);
  }

  async getOperationalUpdates(): Promise<OperationalUpdateResponse[]> {
    return await db.select().from(operationalUpdates).orderBy(desc(operationalUpdates.date)).limit(10);
  }

  async getLatestNurseryStats(): Promise<NurseryStatsResponse | undefined> {
    const results = await db.select().from(nurseryStats).orderBy(desc(nurseryStats.lastUpdated)).limit(1);
    return results[0];
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMemberResponse> {
    const [created] = await db.insert(teamMembers).values(member).returning();
    return created;
  }

  async createOperationalUpdate(update: InsertOperationalUpdate): Promise<OperationalUpdateResponse> {
    const [created] = await db.insert(operationalUpdates).values(update).returning();
    return created;
  }

  async createNurseryStats(stats: InsertNurseryStats): Promise<NurseryStatsResponse> {
    const [created] = await db.insert(nurseryStats).values(stats).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
