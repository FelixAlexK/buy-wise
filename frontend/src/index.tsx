import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { Toaster } from 'sonner'
import { router } from './routes.ts'

import { queryClient } from './utils/orpc'
import './index.css'

const rootElement = document.getElementById('root')
createRoot(rootElement!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster toastOptions={{ style: { marginLeft: '8rem' } }} position="top-center" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  </StrictMode>,
)
