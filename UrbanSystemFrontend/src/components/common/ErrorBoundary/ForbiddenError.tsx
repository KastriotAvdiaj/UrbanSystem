/**
 * ForbiddenError
 *
 * Rendered when the user is authenticated but lacks permission to access
 * the requested resource (HTTP 403 equivalent).
 *
 * The key distinction from UnauthorizedError:
 *   - 401 (Unauthorized) → user is not logged in → send them to /login
 *   - 403 (Forbidden)    → user is logged in but not allowed → send them back
 *
 * Two ways this gets triggered:
 *   1. A route loader throws `forbidden()` from TanStack Router:
 *        import { forbidden } from "@tanstack/react-router";
 *        throw forbidden();
 *
 *   2. An API call returns 403 and you re-throw it as a forbidden error.
 *
 * Registered as `forbiddenComponent` on the root route in `__root.tsx`:
 *   export const Route = createRootRoute({
 *     forbiddenComponent: ForbiddenError,
 *   });
 *
 * Can also be placed on individual protected routes:
 *   export const Route = createFileRoute("/admin")({
 *     forbiddenComponent: ForbiddenError,
 *   });
 */

import { Link } from "@tanstack/react-router";

export function ForbiddenError() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center">

        <p className="text-8xl font-bold tracking-tighter text-border select-none">
          403
        </p>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Access denied
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            You don't have permission to view this page. Contact your
            administrator if you think this is a mistake.
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={() => history.back()}
            className="py-2 px-4 text-sm font-medium rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Go back
          </button>
          <Link
            to="/"
            className="py-2 px-4 text-sm font-medium rounded-sm border border-border bg-card text-muted-foreground hover:bg-muted transition-colors"
          >
            Go to home
          </Link>
        </div>

      </div>
    </div>
  );
}