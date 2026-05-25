import { createRootRoute } from '@tanstack/react-router'
import { AppShell } from '@/components/common/AppShell/AppShell'
import { NotFound } from '@/components/common/ErrorBoundary/NotFound'
import { RootErrorBoundary } from '@/components/common/ErrorBoundary/RootErrorBoundary'

export const Route = createRootRoute({
  component: AppShell,
  errorComponent: RootErrorBoundary,
  notFoundComponent: NotFound,
})