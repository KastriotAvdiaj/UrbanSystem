import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Map, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
        
        {/* Subtle badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          {t("hero.badge")}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight !text-foreground max-w-3xl mb-6 leading-tight">
          {t("brand.title_prefix")} <span className="text-primary">{t("brand.title_highlight")}</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl p-6 leading-relaxed">
          {t("brand.subtitle")} {t("hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Map size={18} />
              {t("nav.map")}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/">
              {t("nav.services")}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
