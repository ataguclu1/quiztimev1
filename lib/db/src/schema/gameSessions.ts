import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { quizzesTable } from "./quizzes";

export const gameSessionsTable = pgTable("game_sessions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzesTable.id),
  pin: text("pin").notNull().unique(),
  status: text("status").notNull().default("waiting"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGameSessionSchema = createInsertSchema(gameSessionsTable).omit({ id: true, createdAt: true });
export type InsertGameSession = z.infer<typeof insertGameSessionSchema>;
export type GameSession = typeof gameSessionsTable.$inferSelect;
