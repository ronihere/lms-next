'use server'

import { addNewCourseSchema } from "../schema/addCourse.schema"
import { getUserDetails } from "@/services/clerk"
import { canCreateCourse } from "../permissions"
import { db } from "@/drizzle/db"
import { CourseTable } from "@/drizzle/schema"

export async function addNewCourseAction(unsafe_data: any) {
    const { success, data } = addNewCourseSchema.safeParse(unsafe_data)

    if (!success || !canCreateCourse(await getUserDetails())) {
        return {
            error: true,
            message: "There was an error creting a course"
        }
    }

    const [new_course] = await db.insert(CourseTable).values(data).returning()

    return {
        error: false,
        message: "Course created successfully",
        data: new_course
    }
}