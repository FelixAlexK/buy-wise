import { eq } from 'drizzle-orm'
import z from 'zod'
import db from '../db'
import { purchase, stat } from '../db/schemas'
import { protectedProcedure } from '../lib/orpc'
import { InsertstatSchema, UpdatestatSchema } from '../validators/zod'

export const statRouter = {
  get: protectedProcedure.handler(async () => {
    return await db.select().from(stat)
  }),

  create: protectedProcedure
    .input(InsertstatSchema)
    .handler(async ({ input }) => {
      return await db.insert(stat).values(input).returning()
    }),

  getById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      const firstStat = await db.query.stat.findFirst({
        where: eq(stat.userId, input.userId),
      })

      return firstStat
    }),

  update: protectedProcedure
    .input(
      UpdatestatSchema,
    )
    .handler(async ({ input }) => {
      if (input.userId === undefined) {
        throw new Error('userId is required for update')
      }

      return await db
        .update(stat)
        .set(input)
        .where(eq(stat.userId, input.userId))
        .returning()
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await db.delete(purchase).where(eq(purchase.id, input.id))
    }),

  reset: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      return await db.update(stat).set({ moneySaved: 0, workTimeSaved: 0 }).where(eq(stat.userId, input.userId)).returning()
    }),
}
