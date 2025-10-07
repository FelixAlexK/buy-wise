import type { RouterClient } from '@orpc/server'
import { protectedProcedure, publicProcedure } from '../lib/orpc'
import { purchaseRouter } from './purchase'
import { settingRouter } from './settings'
import { statRouter } from './stat'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    }
  }),
  purchase: purchaseRouter,
  stat: statRouter,
  setting: settingRouter,
}
export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
