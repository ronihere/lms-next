import { userTable } from "@/drizzle/schema";
import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient()
export async function syncClerkUserMetadata(user: typeof userTable.$inferInsert) {
    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role,
        }
    })
}