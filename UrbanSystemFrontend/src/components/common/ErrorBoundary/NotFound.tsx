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
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center">

        <p className="text-8xl font-bold tracking-tighter text-ring select-none">
          404
        </p>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold !text-foreground tracking-tight">
            {t("errors.notFound.title")}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {t("errors.notFound.description")}
          </p>
        </div>

        <div className="flex gap-2 p-6">
          <Link
            to="/"
            className="py-2 px-4 text-sm font-medium rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("buttons.goHome")}
          </Link>
          <button
            onClick={() => history.back()}
            className="py-2 px-4 text-sm font-medium rounded-sm border border-accent bg-card text-accent hover:bg-muted transition-colors cursor-pointer"
          >
            {t("buttons.goBack")}
          </button>
        </div>

      </div>
    </div>
  );
}