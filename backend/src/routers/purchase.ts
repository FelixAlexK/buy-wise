import { eq } from 'drizzle-orm'
import z from 'zod'
import db from '../db'
import { purchase } from '../db/schemas'
import { protectedProcedure, publicProcedure } from '../lib/orpc'
import { InsertpurchaseSchema } from '../validators/zod/purchase.zod'

export const purchaseRouter = {
  getAll: publicProcedure.input(z.object({ userId: z.string() })).handler(async ({ input }) => {
    return await db.query.purchase.findMany({ where: eq(purchase.userId, input.userId), orderBy: (p, { desc }) => [desc(p.createdAt)] })
  }),

  create: protectedProcedure
    .input(InsertpurchaseSchema)
    .handler(async ({ input }) => {
      return await db.insert(purchase).values(input).returning()
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await db.query.purchase.findFirst({
        where: eq(purchase.id, input.id),
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await db.delete(purchase).where(eq(purchase.id, input.id)).returning()
    }),

  deleteByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .handler(async ({ input }) => {
      return await db.delete(purchase).where(eq(purchase.userId, input.userId))
    }),
}
