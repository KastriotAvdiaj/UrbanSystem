/**
 * Footer
 *
 * Site-wide footer. Renders on every page via AppShell.
 *
 * Structure:
 *   - Brand column: wordmark, short description, social links (placeholder)
 *   - Services column: links to service/feature pages
 *   - Company column: about, legal, contact
 *   - Resources column: docs, open data, API (future)
 *
 * Bottom bar:
 *   - Copyright notice
 *   - Privacy Policy / Terms links
 *
 * All hrefs are placeholders — replace with TanStack Router <Link to="..." />.
 */

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const FOOTER_LINKS = [
    {
      heading: t("footer.services"),
      links: [
        { label: t("nav.map"),        href: "/map" },
        { label: t("nav.infrastructure"), href: "/services/infrastructure" },
        { label: t("nav.transport"),  href: "/services/transport" },
        { label: t("nav.waste"),      href: "/services/waste" },
        { label: t("nav.utilities"),  href: "/services/utilities" },
      ],
    },
    {
      heading: t("footer.company"),
      links: [
        { label: t("nav.about"),      href: "/about" },
        { label: t("nav.contact"),    href: "/contact" },
        { label: t("nav.careers"),    href: "/careers" },
        { label: t("nav.press"),      href: "/press" },
      ],
    },
    {
      heading: t("footer.resources"),
      links: [
        { label: t("nav.docs"),       href: "/docs" },
        { label: t("nav.open_data"),  href: "/data" },
        { label: t("nav.api"),        href: "/api" },
        { label: t("nav.status"),     href: "/status" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 w-fit">
              <img src="/Emblema.png" alt="Emblema" className="w-5 h-5 object-contain" />
              <span className="font-semibold text-sm text-foreground">
                {t("brand.title_prefix")}<span className="text-primary">{t("brand.title_highlight")}</span>
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              {t("brand.subtitle")}
            </p>
            {/* Social placeholders */}
            <div className="flex items-center gap-2">
              {["X", "Li", "Gh"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-7 h-7 rounded-sm border border-border flex items-center justify-center text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground tracking-wide uppercase">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {t("brand.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy_policy")}
            </a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms_of_use")}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}