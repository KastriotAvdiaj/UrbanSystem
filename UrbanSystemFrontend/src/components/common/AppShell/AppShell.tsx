/**
 * AppShell
 *
 * The root layout wrapper. Renders Header + Footer around all public pages.
 * Placed as the component on the root route in `__root.tsx`.
 *
 * For dashboard routes that need a different layout (sidebar, no footer),
 * create a separate DashboardLayout component and use it on the /dashboard
 * parent route instead of relying on AppShell.
 *
 * Usage in __root.tsx:
 *   import { AppShell } from "@/components/common/AppShell/AppShell";
 *
 *   export const Route = createRootRoute({
 *     component: AppShell,
 *     ...
 *   });
 */
 
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/common/AppShell/Header/Header";
import { Footer } from "./Footer/Footer";
export function AppShell() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-dvh flex flex-col bg-background text-foreground w-full">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <TanStackRouterDevtools />
    </ThemeProvider>
  );
}
 