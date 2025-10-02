import { index, integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const purchase = sqliteTable('purchase', {
  id: text('id').primaryKey(),
  timeAtWork: numeric('time_at_work', { mode: 'number' }).notNull().default(0),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
}, table => [
  index('time_at_work_idx').on(table.timeAtWork),
])
