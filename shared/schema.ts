import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  experience: text("experience").notNull(),
  expertise: text("expertise").notNull(),
  imageUrl: text("image_url"),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const operationalUpdates = pgTable("operational_updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const nurseryStats = pgTable("nursery_stats", {
  id: serial("id").primaryKey(),
  agarwoodSeedlings: integer("agarwood_seedlings").notNull(),
  mangoSeedlings: integer("mango_seedlings").notNull(),
  averageHeight: text("average_height").notNull(),
  mortalityRate: text("mortality_rate").notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ 
  id: true, 
  createdAt: true 
});

export const insertOperationalUpdateSchema = createInsertSchema(operationalUpdates).omit({ 
  id: true, 
  createdAt: true 
});

export const insertNurseryStatsSchema = createInsertSchema(nurseryStats).omit({ 
  id: true, 
  createdAt: true 
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMemberResponse = TeamMember;

export type OperationalUpdate = typeof operationalUpdates.$inferSelect;
export type InsertOperationalUpdate = z.infer<typeof insertOperationalUpdateSchema>;
export type OperationalUpdateResponse = OperationalUpdate;

export type NurseryStats = typeof nurseryStats.$inferSelect;
export type InsertNurseryStats = z.infer<typeof insertNurseryStatsSchema>;
export type NurseryStatsResponse = NurseryStats;
