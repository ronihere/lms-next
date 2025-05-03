import { CourseTable } from "@/features/courses/components/Coursetable";
import SectionHeader from "@/owncomponents/SectionHeader";

export default async function CoursesPage() {
    return (
        <>
            <SectionHeader headerName="Courses" redirectTo="/admin/courses/new" buttonTitle="Create New Course" >
                <CourseTable />
            </SectionHeader>
        </>
    )
}