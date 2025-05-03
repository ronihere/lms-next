import { getUserDetails } from "@/services/clerk";

export const canCreateCourse = (user: Awaited<ReturnType<typeof getUserDetails>>) => {
    return user.role === "admin";
}