import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";
import { userCourseAccessTable } from "./userCourseAccess";

export const CourseTable = pgTable("courses", {
    id,
    name: text().notNull(),
    description: text().notNull(),
    createdAt,
    updatedAt
})

export const CourserelationShips = relations(CourseTable, ({ one, many }) => ({
    // Add any relations here if needed
    courseProducts: many(CourseProductTable),
    users: many(userCourseAccessTable)
}))