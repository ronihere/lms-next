import { UserRole } from "@/drizzle/schema"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function canAccessAdmin(role: UserRole | undefined) {
  return role === "admin";
}
export function formatPlural(
  count: number,
  { singular, plural }: { singular: string; plural: string }
) {
  return `${count} ${count === 1 ? singular : plural}`
}