import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { getUserSpecificTag } from "@/features/users/db/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const client = await clerkClient()
export function syncClerkUserMetadata(user: typeof userTable.$inferInsert) {
    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role,
        }
    })
}

export async function getUserDetails({ allData = true } = {}) {
    const { redirectToSignIn, sessionClaims, userId } = await auth();
    return {
        clerkUserId: userId,
        dbId: sessionClaims?.dbId,
        role: sessionClaims?.role,
        ...(allData && sessionClaims?.dbId ? { user: await getUserFromDb(sessionClaims.dbId) } : null),
        redirectToSignIn
    }
}


async function getUserFromDb(userId: string) {
    'use cache'
    cacheTag(getUserSpecificTag(userId))
    console.log('LALA CALLED')
    return db.query.userTable.findFirst({
        where: eq(userTable.id, userId),
    })
}