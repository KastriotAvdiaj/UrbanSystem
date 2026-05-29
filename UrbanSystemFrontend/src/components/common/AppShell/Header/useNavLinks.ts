import { useTranslation } from "react-i18next";

export function useNavLinks() {
  const { t } = useTranslation();

  const PUBLIC_NAV = [
    { label: t("nav.home"),     href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.map"),      href: "/map" },
    { label: t("nav.about"),    href: "/about" },
    { label: t("nav.contact"),  href: "/contact" },
  ];

  const DASHBOARD_NAV = [
    { label: t("nav.overview"), href: "/dashboard" },
    { label: t("nav.reports"),  href: "/dashboard/reports" },
    { label: t("nav.settings"), href: "/dashboard/settings" },
  ];

  return { PUBLIC_NAV, DASHBOARD_NAV };
}