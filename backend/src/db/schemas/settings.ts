import { index, integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const setting = sqliteTable('setting', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  salary: numeric({ mode: 'number' }).notNull().default(0),
  workingTime: numeric('working_time', { mode: 'number' }).notNull().default(0),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
}, table => [
  index('working_time_idx').on(table.workingTime),
  index('salary_idx').on(table.salary),
])
