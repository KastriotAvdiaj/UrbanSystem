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
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavLinks } from "./useNavLinks";
import { MobileMenu } from "./MobileMenu";

// ---------------------------------------------------------------------------
// Stub — replace with your real auth context
// ---------------------------------------------------------------------------
function useAuth() {
  return { isLoggedIn: false, user: null };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Header() {
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { PUBLIC_NAV, DASHBOARD_NAV } = useNavLinks();

  const navLinks = isLoggedIn ? DASHBOARD_NAV : PUBLIC_NAV;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-6">

        {/* Wordmark */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src="/Emblema.png" alt="Emblema" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-sm tracking-tight text-foreground hidden sm:block">
            {t("brand.title_prefix")}
            <span className="text-accent">{t("brand.title_highlight")}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <Button
            variant="outline"
            onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'sq' : 'en')}
            className="px-2 py-1.5 text-xs font-semibold border-none uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            {i18n.resolvedLanguage === 'en' ? 'SQ' : 'EN'}
          </Button>

          <ModeToggle />

          {isLoggedIn ? (
            /* Authenticated actions */
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/dashboard"
                className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-sm transition-colors"
              >
                {t("buttons.dashboard")}
              </a>
              {/* User avatar placeholder */}
              <Button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold border border-primary/20 cursor-pointer">
                U
              </Button>
            </div>
          ) : (
            /* Guest actions */
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/login"
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("buttons.signIn")}
              </a>
              <a
                href="/register"
                className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-sm transition-colors"
              >
                {t("buttons.getStarted")}
              </a>
            </div>
          )}

          {/* Mobile hamburger */}
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-sm hover:bg-muted transition-colors cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </div>
      </div>

      <MobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navLinks={navLinks}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}
