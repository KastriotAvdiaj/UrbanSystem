/**
 * UnauthorizedError
 *
 * Rendered when the user is not authenticated (HTTP 401 equivalent).
 * The user needs to log in to access the requested resource.
 *
 * Two ways this gets triggered:
 *   1. A route loader throws `unauthorized()` from TanStack Router:
 *        import { unauthorized } from "@tanstack/react-router";
 *        throw unauthorized();
 *
 *   2. An API call returns 401 and you re-throw it as an unauthorized error.
 *
 * Registered as `unauthorizedComponent` on the root route in `__root.tsx`:
 *   export const Route = createRootRoute({
 *     unauthorizedComponent: UnauthorizedError,
 *   });
 *
 * Can also be placed on individual protected routes:
 *   export const Route = createFileRoute("/dashboard")({
 *     unauthorizedComponent: UnauthorizedError,
 *   });
 */

import { Link } from "@tanstack/react-router";

export function UnauthorizedError() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center">

        <p className="text-8xl font-bold tracking-tighter text-border select-none">
          401
        </p>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            You're not signed in
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            You need to be signed in to access this page. Please log in and
            try again.
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <Link
            to="/"
            className="py-2 px-4 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/"
            className="py-2 px-4 text-sm font-medium rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-colors"
          >
            Go to home
          </Link>
        </div>

      </div>
    </div>
  );
}