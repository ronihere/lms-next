import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { userTable } from "./user";

export const userCourseAccessTable = pgTable("user_course_accesses", {
    userId: uuid().notNull().references(() => userTable.id, { onDelete: 'cascade' }),
    courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
}, t => [primaryKey({ columns: [t.userId, t.courseId] })]);


export const CourseProductTableRelationsjips = relations(userCourseAccessTable, ({ one }) => ({
    course: one(CourseTable, {
        fields: [userCourseAccessTable.courseId],
        references: [CourseTable.id],
    }),
    user: one(userTable, {
        fields: [userCourseAccessTable.userId],
        references: [userTable.id],
    })
})
)