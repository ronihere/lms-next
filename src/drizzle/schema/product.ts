import { pgTable, text, integer, pgEnum } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { CourseProductTable } from "./courseProduct";


export const ProductStatuses = ['private', 'public'] as const
export type ProductStatus = typeof ProductStatuses[number]

export const ProductStatusEnum = pgEnum('product_status', ProductStatuses)
export const ProductTable = pgTable("products", {
    id,
    createdAt,
    updatedAt,
    name: text().notNull(),
    imageUrl: text().notNull(),
    description: text().notNull(),
    priceinDollars: integer().notNull(),
    status: ProductStatusEnum().notNull().default('private'),
})

export const ProductTablerelationShips = relations(ProductTable, ({ one, many }) => ({
    // Add any relations here if needed
    courseProducts: many(CourseProductTable)
}))