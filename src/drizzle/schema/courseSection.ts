import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";
import { lessonTable } from "./lesson";

export const courseSectionStatuses = ['private', 'public'] as const
export type CourseSectionStatuses = typeof courseSectionStatuses[number]
export const CourseSectionStatusesEnum = pgEnum('course_section_status', courseSectionStatuses)
export const courseSectiontable = pgTable("course_sections", {
    id,
    createdAt,
    updatedAt,
    courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: 'restrict' }),
    status: CourseSectionStatusesEnum().notNull().default('private'),
    name: text().notNull(),
    description: text().notNull(),
})

export const CourseSectionTableRelationships = relations(courseSectiontable, ({ one, many }) => ({
    course: one(CourseTable, {
        fields: [courseSectiontable.courseId],
        references: [CourseTable.id]
    }),
    lessons: many(lessonTable)
}))