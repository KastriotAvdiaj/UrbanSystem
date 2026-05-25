/**
 * Header
 *
 * The main site-wide navigation header. Renders on every page via AppShell.
 *
 * Two navigation contexts:
 *   - Public: links to marketing/informational pages (Home, About, Services, Contact)
 *   - Authenticated: links to the dashboard and user account actions
 *
 * Includes:
 *   - Wordmark / logo linking to "/"
 *   - Primary nav links (public)
 *   - Auth actions: Sign in button (guests) or Dashboard + user menu (authed)
 *   - ModeToggle for light/dark theme switching
 *   - Responsive mobile menu (hamburger → sheet/drawer pattern)
 *
 * Replace the `useAuth` stub with your real auth context once implemented.
 * Replace `href` placeholders with TanStack Router `<Link to="..." />` components.
 */

import { useState } from "react";
import { ModeToggle } from "@/components/common/mode-toggle";

// ---------------------------------------------------------------------------
// Stub — replace with your real auth context
// ---------------------------------------------------------------------------
function useAuth() {
  return { isLoggedIn: false, user: null };
}

// ---------------------------------------------------------------------------
// Nav link definitions — swap href strings for TanStack Router <Link> later
// ---------------------------------------------------------------------------
const PUBLIC_NAV = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Map",      href: "/map" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

const DASHBOARD_NAV = [
  { label: "Overview",  href: "/dashboard" },
  { label: "Reports",   href: "/dashboard/reports" },
  { label: "Settings",  href: "/dashboard/settings" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Header() {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = isLoggedIn ? DASHBOARD_NAV : PUBLIC_NAV;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-6">

        {/* Wordmark */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <KosovoMark />
          <span className="font-semibold text-sm tracking-tight text-foreground hidden sm:block">
            Sistemi Urban i
            <span className="text-accent"> Kosovës</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {isLoggedIn ? (
            /* Authenticated actions */
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/dashboard"
                className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              >
                Dashboard
              </a>
              {/* User avatar placeholder */}
              <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold border border-primary/20 cursor-pointer">
                U
              </button>
            </div>
          ) : (
            /* Guest actions */
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/login"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </a>
              <a
                href="/register"
                className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              >
                Get started
              </a>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-border mt-2 pt-2 flex flex-col gap-1">
            {isLoggedIn ? (
              <a
                href="/dashboard"
                className="px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors text-center"
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  className="px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors text-center"
                >
                  Get started
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Kosovo flag mark — blue shield shape with gold accent
// ---------------------------------------------------------------------------
function KosovoMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2L4 5.5V12c0 4.5 3.5 7.5 8 9.5 4.5-2 8-5 8-9.5V5.5L12 2Z"
        fill="#244AA5"
      />
      <path
        d="M9 11.5l2 2 4-4"
        stroke="#E4C239"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}