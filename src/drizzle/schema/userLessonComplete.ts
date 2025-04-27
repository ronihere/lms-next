import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { lessonTable } from "./lesson";
import { userTable } from "./user";

export const userLessonCompleteTable = pgTable("userLessonComplete", {
    userId: uuid().notNull(),
    lessonId: uuid().notNull(),
    updatedAt,
    createdAt
}, t => ({
    primaryKey: primaryKey({ columns: [t.userId, t.lessonId] }),
}))

export const userLessonCompleteTableRelationships = relations(userLessonCompleteTable, ({ one }) => ({
    lesson: one(lessonTable, {
        fields: [userLessonCompleteTable.lessonId],
        references: [lessonTable.id],
    }),
    user: one(userTable, {
        fields: [userLessonCompleteTable.userId],
        references: [userTable.id],
    })
})
)