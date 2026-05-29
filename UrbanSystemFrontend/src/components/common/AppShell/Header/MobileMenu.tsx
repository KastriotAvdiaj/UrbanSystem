import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  navLinks: { label: string; href: string }[];
  isLoggedIn: boolean;
}

export function MobileMenu({ mobileOpen, setMobileOpen, navLinks, isLoggedIn }: MobileMenuProps) {
  const { t } = useTranslation();

  if (!mobileOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 flex flex-col gap-1">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </a>
      ))}
      <div className="border-t border-border mt-2 pt-2 flex flex-col gap-1">
        {isLoggedIn ? (
          <a
            href="/dashboard"
            className="px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-sm transition-colors text-center"
          >
            {t("buttons.dashboard")}
          </a>
        ) : (
          <>
            <a
              href="/login"
              className="px-3 py-2 text-sm text-muted-foreground border border-border hover:text-foreground hover:bg-muted rounded-sm transition-colors text-center"
            >
              {t("buttons.signIn")}
            </a>
            <a
              href="/register"
              className="px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-sm transition-colors text-center"
            >
              {t("buttons.getStarted")}
            </a>
          </>
        )}
      </div>
    </div>
  );
}