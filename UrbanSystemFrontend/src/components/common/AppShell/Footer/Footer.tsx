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

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: [
      { label: "Urban Map",        href: "/map" },
      { label: "Infrastructure",   href: "/services/infrastructure" },
      { label: "Public Transport", href: "/services/transport" },
      { label: "Waste Management", href: "/services/waste" },
      { label: "Utilities",        href: "/services/utilities" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",   href: "/about" },
      { label: "Contact",    href: "/contact" },
      { label: "Careers",    href: "/careers" },
      { label: "Press",      href: "/press" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Open Data",     href: "/data" },
      { label: "API",           href: "/api" },
      { label: "Status",        href: "/status" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 w-fit">
              <KosovoMark />
              <span className="font-semibold text-sm text-foreground">
                Sistemi Urban<span className="text-primary"> i Kosovës</span>
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              A unified platform for Kosovo's urban infrastructure, services,
              and public data.
            </p>
            {/* Social placeholders */}
            <div className="flex items-center gap-2">
              {["X", "Li", "Gh"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
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
            © {new Date().getFullYear()} Sistemi Urban i Kosovës. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

function KosovoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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