/**
 * ErrorMessage
 *
 * A lightweight inline error component for scoped, non-fatal errors.
 * Used inside pages and components — NOT as a route-level errorComponent.
 *
 * Intended for:
 *   - Query/data fetching failures  (e.g. isError from TanStack Query)
 *   - Form submission errors
 *   - Permission or validation feedback within a section
 *   - Any error that should not replace the full page
 *
 * Props:
 *   - error     — a thrown Error object or any stringifiable value
 *   - message   — overrides the displayed message (ignores error.message)
 *   - onRetry   — if provided, renders a "Try again" button
 *   - size      — "default" for the full card, "sm" for a compact one-liner
 *
 * In development: shows a collapsible stack trace when `error` is an Error.
 * In production:  stack trace is never rendered.
 *
 * Usage:
 *   if (isError) return <ErrorMessage error={error} onRetry={refetch} />;
 *   <ErrorMessage message="You don't have permission." />;
 *   <ErrorMessage message="Failed to load." size="sm" onRetry={reload} />;
 */

interface ErrorMessageProps {
  /** A thrown Error object, or anything stringifiable. */
  error?: unknown;
  /** Override the displayed message. Falls back to error.message. */
  message?: string;
  /** Optional retry callback — renders a "Try again" button when provided. */
  onRetry?: () => void;
  /** "sm" renders a compact inline version. Default is the full card. */
  size?: "default" | "sm";
}

export function ErrorMessage({
  error,
  message,
  onRetry,
  size = "default",
}: ErrorMessageProps) {
  const isDev = import.meta.env.DEV;

  const resolvedMessage =
    message ??
    (error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unexpected error occurred.");

  const stack =
    isDev && error instanceof Error ? error.stack : undefined;

  if (size === "sm") {
    return (
      <div role="alert" className="inline-flex items-center gap-1.5 text-sm text-destructive">
        <TriangleAlertIcon size={13} />
        <span>{resolvedMessage}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-1 text-xs font-medium px-1.5 py-0.5 rounded border border-destructive/30 hover:bg-destructive/5 transition-colors cursor-pointer"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div role="alert" className="rounded-sm border border-destructive/20 bg-destructive/5 overflow-hidden">
      <div className="flex gap-3 items-start px-4 py-3">
        <TriangleAlertIcon size={15} className="shrink-0 mt-0.5 text-destructive" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-destructive">
            Something went wrong
          </p>
          <p className="text-xs text-destructive/80 leading-relaxed">
            {resolvedMessage}
          </p>
        </div>
      </div>

      {isDev && stack && (
        <details className="border-t border-destructive/15 overflow-hidden">
          <summary className="px-4 py-1.5 text-xs font-medium text-destructive/70 bg-destructive/5 cursor-pointer select-none">
            Stack trace
          </summary>
          <pre className="m-0 px-4 py-2.5 text-[10px] font-mono text-destructive/60 bg-background overflow-x-auto whitespace-pre-wrap break-all">
            {stack}
          </pre>
        </details>
      )}

      {onRetry && (
        <div className="border-t border-destructive/15 px-4 py-2 bg-destructive/5">
          <button
            onClick={onRetry}
            className="text-xs font-medium px-2.5 py-1 rounded-sm border border-destructive/25 bg-card text-destructive hover:bg-destructive/5 transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function TriangleAlertIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}