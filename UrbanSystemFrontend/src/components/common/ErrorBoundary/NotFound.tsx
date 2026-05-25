/**
 * NotFound
 *
 * Rendered when a route cannot be matched or when `notFound()` is thrown
 * explicitly from a loader or component.
 * Registered as `notFoundComponent` on the root route in `__root.tsx`.
 *
 * Covers two scenarios:
 *   1. The user navigates to a URL that doesn't match any defined route.
 *   2. A loader calls `throw notFound()` because a resource doesn't exist
 *      (e.g. /users/999 where user 999 is not in the database).
 *
 * Provides two recovery actions:
 *   - "Go to home" — navigates to "/" via TanStack Router's <Link>
 *   - "Go back"    — calls history.back()
 *
 * Usage in __root.tsx:
 *   export const Route = createRootRoute({
 *     notFoundComponent: NotFound,
 *   });
 */

import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center">

        <p className="text-8xl font-bold tracking-tighter text-border select-none">
          404
        </p>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            The page you're looking for doesn't exist or may have been moved.
            Check the URL or head back home.
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <Link
            to="/"
            className="py-2 px-4 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go to home
          </Link>
          <button
            onClick={() => history.back()}
            className="py-2 px-4 text-sm font-medium rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Go back
          </button>
        </div>

      </div>
    </div>
  );
}