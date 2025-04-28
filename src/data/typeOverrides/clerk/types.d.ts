import { UserRole } from "@/drizzle/schema";

declare global {
    interface UserPublicMetadata {
        role?: UserRole;
        dbId?: string;
    }
    interface CustomJwtSessionClaims {
        dbId?: string
        role?: UserRole
    }
}