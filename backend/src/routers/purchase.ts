import { eq } from "drizzle-orm";
import z from "zod";
import db from "../db";
import { publicProcedure, protectedProcedure } from "../lib/orpc";
import { InsertpurchaseSchema } from "../validators/zod/purchase.zod";
import { purchase } from "../db/schemas";

export const purchaseRouter = {
    getAll: publicProcedure.handler(async () => {
        return await db.select().from(purchase);
    }),

    create: protectedProcedure
        .input(InsertpurchaseSchema)
        .handler(async ({ input }) => {

            return await db.insert(purchase).values(input).returning();
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.number() }))
        .handler(async ({ input }) => {
            return await db.query.purchase.findFirst({
                where: eq(purchase.id, input.id),
            });
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .handler(async ({ input }) => {
            return await db.delete(purchase).where(eq(purchase.id, input.id));
        }),
};
