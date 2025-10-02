import { sqliteTable, text, integer, numeric, index } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const stat = sqliteTable("stat", {
    id: text("id").primaryKey(),
    moneySaved: numeric("money_saved", { mode: "number" }).notNull().default(0),
    workTimeSaved: numeric("work_time_saved", { mode: "number" }).notNull().default(0),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date())
        .notNull(),
}, (table) => [
    index("work_time_saved_idx").on(table.workTimeSaved),
    index("money_saved_idx").on(table.moneySaved)]);