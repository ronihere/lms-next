import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { userCourseAccessTable } from "./userCourseAccess";
import { userLessonCompleteTable } from "./userLessonComplete";
export const userRoles = ['admin', 'user', 'guest'] as const;
export type UserRole = typeof userRoles[number];
export const UserRoleEnum = pgEnum('user_role', userRoles);
export const userTable = pgTable("users", {
    id,
    createdAt,
    updatedAt,
    email: text().notNull(),
    deletedAt: timestamp({ withTimezone: true }),
    name: text().notNull(),
    clerkUserId: text().notNull().unique(),
    imageUrl: text(),
    role: UserRoleEnum().notNull().default('user'),
});

export const userTableRelations = relations(userTable, ({ one, many }) => ({
    // Add any relations here if needed
    courses: many(userCourseAccessTable),
    lessonCompleted: many(userLessonCompleteTable)
}))