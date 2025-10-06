import { index, integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const purchase = sqliteTable('purchase', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  value: numeric('value', { mode: 'number' }).notNull().default(0),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
}, table => [
  index('value_idx').on(table.value),
])
