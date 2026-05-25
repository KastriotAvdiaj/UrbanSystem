import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routes/routeTree.gen'
import './index.css'
import { NotFound } from './components/common/ErrorBoundary/NotFound'
import { RootErrorBoundary } from './components/common/ErrorBoundary/RootErrorBoundary'

const queryClient = new QueryClient()
const router = createRouter({ routeTree, context: {auth: undefined},
   defaultNotFoundComponent: NotFound,
  defaultErrorComponent: RootErrorBoundary, 
  })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)