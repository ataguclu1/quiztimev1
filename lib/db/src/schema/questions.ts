import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { quizzesTable } from "./quizzes";

export const questionsTable = pgTable("questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzesTable.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  options: jsonb("options").notNull().$type<string[]>(),
  correctIndex: integer("correct_index").notNull(),
  timeLimit: integer("time_limit").notNull().default(20),
  orderIndex: integer("order_index").notNull().default(0),
});

export const insertQuestionSchema = createInsertSchema(questionsTable).omit({ id: true }).extend({
  options: z.array(z.string()),
});
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questionsTable.$inferSelect;
