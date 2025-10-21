import { QueryClientProvider } from '@tanstack/react-query'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './routes.ts'

import { queryClient } from './utils/orpc.ts'
import './index.css'

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() => import('@tanstack/react-query-devtools').then(m => ({ default: m.ReactQueryDevtools })))
  : null

const rootElement = document.getElementById('root')
createRoot(rootElement!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {ReactQueryDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </Suspense>
      )}
    </QueryClientProvider>
  </StrictMode>,
)
