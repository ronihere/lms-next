import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { courseSectiontable } from "./courseSection";
import { relations } from "drizzle-orm";
import { userLessonCompleteTable } from "./userLessonComplete";

export const lessonTable = pgTable("lessons", {
    id,
    createdAt,
    updatedAt,
    name: text().notNull(),
    description: text().notNull(),
    courseSectionId: uuid().notNull().references(() => courseSectiontable.id, { onDelete: 'cascade' }),
})
export const lessonTableRelastionships = relations(lessonTable, ({ one, many }) => ({
    courseSection: one(courseSectiontable, {
        fields: [lessonTable.courseSectionId],
        references: [courseSectiontable.id]
    }),
    lessonCompleted: many(userLessonCompleteTable)
}))