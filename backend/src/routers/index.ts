import { protectedProcedure, publicProcedure } from "../lib/orpc";
import type { RouterClient } from "@orpc/server";
import { purchaseRouter } from "./purchase";

export const appRouter = {
    healthCheck: publicProcedure.handler(() => {
        return "OK";
    }),
    privateData: protectedProcedure.handler(({ context }) => {
        return {
            message: "This is private",
            user: context.session?.user,
        };
    }),
    purchase: purchaseRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
