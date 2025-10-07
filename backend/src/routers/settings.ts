import { eq } from 'drizzle-orm'
import z from 'zod'
import db from '../db'
import { setting } from '../db/schemas'
import { protectedProcedure } from '../lib/orpc'
import { InsertsettingSchema, UpdatesettingSchema } from '../validators/zod'

export const settingRouter = {

  create: protectedProcedure
    .input(InsertsettingSchema)
    .handler(async ({ input }) => {
      return await db.insert(setting).values(input).returning()
    }),

  getByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      return await db.query.setting.findFirst({
        where: eq(setting.userId, input.userId),
      })
    }),

  update: protectedProcedure
    .input(UpdatesettingSchema)
    .handler(async ({ input }) => {
      if (input.userId === undefined) {
        throw new Error('userId is required for update')
      }

      return await db.update(setting).set(input).where(eq(setting.userId, input.userId)).returning()
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await db.delete(setting).where(eq(setting.id, input.id))
    }),
}
