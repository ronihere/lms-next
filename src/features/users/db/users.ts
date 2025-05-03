import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/drizzle/schema";

export async function insertuserData(data: typeof userTable.$inferInsert) {
    try {
        const [new_user] = await db.insert(userTable).values(data).returning().onConflictDoUpdate({
            target: userTable.clerkUserId,
            set: data,
        });

        if (!new_user) {
            throw new Error("Failed to insert user data");
        }
        return new_user;
    } catch (error) {
        console.error("Error inserting user data:", error);
        throw error;
    }
}

export async function updateUserData(clerkUserId: string, data: Partial<typeof userTable.$inferInsert>) {
    try {
        const [updated_user] = await db.update(userTable).set(data).where(eq(userTable.clerkUserId, clerkUserId)).returning();
        if (!updated_user) {
            throw new Error("Failed to update user data");
        }
        return updated_user;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error
    }
}

export async function deleteUserData(clerkUserId: string) {
    try {
        const [deleted_user] = await db.update(userTable).set({
            deletedAt: new Date(),
            clerkUserId: 'deleted_' + clerkUserId,
            imageUrl: null,
        }).where(eq(userTable.clerkUserId, clerkUserId)).returning();
        if (!deleted_user) {
            throw new Error("Failed to delete user data");
        }
        return deleted_user;
    } catch (error) {
        console.error("Error deleting user data:", error);
        throw error
    }
}