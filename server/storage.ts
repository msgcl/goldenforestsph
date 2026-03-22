import { db } from "./db";
import {
  teamMembers,
  operationalUpdates,
  nurseryStats,
  galleryMedia,
  contactMessages,
  siteCopyContent,
  siteInventorySettings,
  type TeamMemberResponse,
  type OperationalUpdateResponse,
  type NurseryStatsResponse,
  type GalleryMediaResponse,
  type ContactMessageResponse,
  type SiteCopyContentResponse,
  type SiteInventorySettingsResponse,
  type InsertTeamMember,
  type InsertOperationalUpdate,
  type InsertNurseryStats,
  type InsertGalleryMedia,
  type InsertContactMessage,
  type InsertSiteInventorySettings,
} from "@shared/schema";
import { desc, eq } from "drizzle-orm";
import type { SiteCopy } from "@shared/siteCopy";

export interface IStorage {
  getTeamMembers(): Promise<TeamMemberResponse[]>;
  getOperationalUpdates(): Promise<OperationalUpdateResponse[]>;
  getLatestNurseryStats(): Promise<NurseryStatsResponse | undefined>;
  getGalleryMedia(): Promise<GalleryMediaResponse[]>;
  getContactMessages(): Promise<ContactMessageResponse[]>;
  getLatestSiteCopyContent(): Promise<SiteCopyContentResponse | undefined>;
  getLatestSiteInventorySettings(): Promise<SiteInventorySettingsResponse | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMemberResponse>;
  createOperationalUpdate(update: InsertOperationalUpdate): Promise<OperationalUpdateResponse>;
  createNurseryStats(stats: InsertNurseryStats): Promise<NurseryStatsResponse>;
  createGalleryMedia(item: InsertGalleryMedia): Promise<GalleryMediaResponse>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessageResponse>;
  createSiteCopyContent(data: SiteCopy): Promise<SiteCopyContentResponse>;
  createSiteInventorySettings(settings: InsertSiteInventorySettings): Promise<SiteInventorySettingsResponse>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMemberResponse | undefined>;
  updateOperationalUpdate(id: number, update: Partial<InsertOperationalUpdate>): Promise<OperationalUpdateResponse | undefined>;
  updateGalleryMedia(id: number, item: Partial<InsertGalleryMedia>): Promise<GalleryMediaResponse | undefined>;
  deleteContactMessage(id: number): Promise<boolean>;
  deleteAllContactMessages(): Promise<number>;
  deleteTeamMember(id: number): Promise<boolean>;
  deleteOperationalUpdate(id: number): Promise<boolean>;
  deleteGalleryMedia(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getTeamMembers(): Promise<TeamMemberResponse[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.orderIndex);
  }

  async getOperationalUpdates(): Promise<OperationalUpdateResponse[]> {
    return await db.select().from(operationalUpdates).orderBy(desc(operationalUpdates.date));
  }

  async getLatestNurseryStats(): Promise<NurseryStatsResponse | undefined> {
    const results = await db.select().from(nurseryStats).orderBy(desc(nurseryStats.id)).limit(1);
    return results[0];
  }

  async getGalleryMedia(): Promise<GalleryMediaResponse[]> {
    return await db
      .select()
      .from(galleryMedia)
      .orderBy(galleryMedia.category, galleryMedia.sortOrder, desc(galleryMedia.date));
  }

  async getContactMessages(): Promise<ContactMessageResponse[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getLatestSiteCopyContent(): Promise<SiteCopyContentResponse | undefined> {
    const results = await db.select().from(siteCopyContent).orderBy(desc(siteCopyContent.id)).limit(1);
    return results[0];
  }

  async getLatestSiteInventorySettings(): Promise<SiteInventorySettingsResponse | undefined> {
    const results = await db.select().from(siteInventorySettings).orderBy(desc(siteInventorySettings.id)).limit(1);
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

  async createGalleryMedia(item: InsertGalleryMedia): Promise<GalleryMediaResponse> {
    const [created] = await db.insert(galleryMedia).values(item).returning();
    return created;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessageResponse> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async createSiteCopyContent(data: SiteCopy): Promise<SiteCopyContentResponse> {
    const [created] = await db.insert(siteCopyContent).values({ data }).returning();
    return created;
  }

  async createSiteInventorySettings(settings: InsertSiteInventorySettings): Promise<SiteInventorySettingsResponse> {
    const [created] = await db.insert(siteInventorySettings).values(settings).returning();
    return created;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMemberResponse | undefined> {
    const [updated] = await db
      .update(teamMembers)
      .set(member)
      .where(eq(teamMembers.id, id))
      .returning();
    return updated;
  }

  async updateOperationalUpdate(id: number, update: Partial<InsertOperationalUpdate>): Promise<OperationalUpdateResponse | undefined> {
    const [updated] = await db
      .update(operationalUpdates)
      .set(update)
      .where(eq(operationalUpdates.id, id))
      .returning();
    return updated;
  }

  async updateGalleryMedia(id: number, item: Partial<InsertGalleryMedia>): Promise<GalleryMediaResponse | undefined> {
    const [updated] = await db
      .update(galleryMedia)
      .set(item)
      .where(eq(galleryMedia.id, id))
      .returning();
    return updated;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async deleteOperationalUpdate(id: number): Promise<boolean> {
    const result = await db.delete(operationalUpdates).where(eq(operationalUpdates.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async deleteGalleryMedia(id: number): Promise<boolean> {
    const result = await db.delete(galleryMedia).where(eq(galleryMedia.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async deleteAllContactMessages(): Promise<number> {
    const result = await db.delete(contactMessages);
    return result.rowCount ?? 0;
  }
}

export const storage = new DatabaseStorage();
