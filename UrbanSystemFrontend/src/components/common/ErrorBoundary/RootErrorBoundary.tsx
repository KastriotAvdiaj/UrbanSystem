/**
 * RootErrorBoundary
 *
 * The top-level error boundary for the entire application.
 * Registered as `errorComponent` on the root route in `__root.tsx`.
 *
 * Catches any unhandled error thrown during rendering or in route loaders
 * that isn't explicitly handled by a child route's own `errorComponent`.
 *
 * - In development: shows the error message + collapsible stack trace.
 * - In production: shows a safe generic message only.
 *
 * Provides two recovery actions:
 *   - "Try to recover" — calls TanStack Router's `reset()` + `invalidate()`
 *   - "Go to home"    — hard navigates to "/"
 *
 * Usage in __root.tsx:
 *   export const Route = createRootRoute({
 *     errorComponent: RootErrorBoundary,
 *   });
 *
 * Can also be reused on child routes for scoped containment:
 *   export const Route = createFileRoute("/dashboard")({
 *     errorComponent: RootErrorBoundary,
 *   });
 */


import { useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { UnauthorizedError } from "./UnauthorizedError";
import { ForbiddenError } from "./ForbiddenError";

export function RootErrorBoundary({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const isDev = import.meta.env.DEV;

  const errorMessage =
    error instanceof Error ? error.message : String(error ?? "Unknown error");
  const errorStack =
    isDev && error instanceof Error ? error.stack : undefined;

  function handleReset() {
    reset();
    router.invalidate();
  }

  const httpError = error as Error & { status?: number };

  if (httpError?.status === 401) return <UnauthorizedError />;
  if (httpError?.status === 403) return <ForbiddenError />;

  return (
    <div className="min-h-dvh flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-10 flex flex-col gap-4">

        <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
          <AlertCircleIcon />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred. You can try to recover below, or
            contact support if this keeps happening.
          </p>
        </div>

        <div className="flex flex-col gap-1 px-3 py-2.5 bg-destructive/5 border border-destructive/20 rounded-lg">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-destructive">
            Error
          </span>
          <span className="text-xs font-mono text-destructive/80 break-all">
            {errorMessage}
          </span>
        </div>

        {isDev && errorStack && (
          <details className="border border-border rounded-lg overflow-hidden">
            <summary className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted cursor-pointer select-none">
              Stack trace{" "}
              <span className="text-muted-foreground/60">(dev only)</span>
            </summary>
            <pre className="m-0 px-3 py-2.5 text-[10px] font-mono text-muted-foreground bg-background overflow-x-auto whitespace-pre-wrap break-all border-t border-border">
              {errorStack}
            </pre>
          </details>
        )}

        <div className="flex gap-2 mt-1">
          <button
            onClick={handleReset}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Try to recover
          </button>
          <button
            onClick={() => router.navigate({ to: "/" })}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Go to home
          </button>
        </div>

      </div>
    </div>
  );
}

function AlertCircleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}