import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatPlural } from "@/lib/utils"
import ActionButton from "@/owncomponents/ActionButton"
import { Trash2Icon } from "lucide-react"
import Link from "next/link"
// import { deleteCourse } from "../actions/courses"

export function CourseTable({
    courses = [{
        id: "1",
        name: "Course 1",
        sectionsCount: 2,
        lessonsCount: 10,
        studentsCount: 20,
    },
    {
        id: "2",
        name: "Course 2",
        sectionsCount: 3,
        lessonsCount: 15,
        studentsCount: 30,
    },
    {
        id: "3",
        name: "Course 3",
        sectionsCount: 4,
        lessonsCount: 20,
        studentsCount: 40,
    },
    ],
}: {
    courses?: {
        id: string
        name: string
        sectionsCount: number
        lessonsCount: number
        studentsCount: number
    }[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        {formatPlural(courses?.length || 0, {
                            singular: "course",
                            plural: "courses",
                        })}
                    </TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses?.map(course => (
                    <TableRow key={course.id}>
                        <TableCell>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold">{course.name}</div>
                                <div className="text-muted-foreground">
                                    {formatPlural(course.sectionsCount, {
                                        singular: "section",
                                        plural: "sections",
                                    })}{" "}
                                    •{" "}
                                    {formatPlural(course.lessonsCount, {
                                        singular: "lesson",
                                        plural: "lessons",
                                    })}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{course.studentsCount}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Button asChild>
                                    <Link href={`/admin/courses/${course.id}/edit`}>Edit</Link>
                                </Button>
                                {/* <ActionButton
                                    variant="destructive"
                                    // requireAreYouSure
                                    action={ }
                                >
                                    <Trash2Icon />
                                    <span className="sr-only">Delete</span>
                                </ActionButton> */}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}