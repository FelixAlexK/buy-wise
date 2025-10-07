import { index, integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const stat = sqliteTable('stat', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  moneySaved: numeric('money_saved', { mode: 'number' }).notNull().default(0),
  workTimeSaved: numeric('work_time_saved', { mode: 'number' }).notNull().default(0),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date()),

  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
}, table => [
  index('work_time_saved_idx').on(table.workTimeSaved),
  index('money_saved_idx').on(table.moneySaved),
])
