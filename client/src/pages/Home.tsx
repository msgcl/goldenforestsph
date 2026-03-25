import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Cpu, Eye, MapPin, PlaneTakeoff, Sprout } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGalleryMedia } from "@/hooks/use-gallery-media";
import { useState } from "react";
import { useNurseryStats } from "@/hooks/use-nursery-stats";
import { defaultInventoryValues, saleInventory } from "@/lib/publicInventory";
import logoImage from "@assets/logo.png";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

export default function Home() {
  const { data: latestStats } = useNurseryStats();
  const { data: mediaItems = [] } = useGalleryMedia();
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.home;
  const font = createPageTypography(resolvedSiteCopy, "home");
  const [heroImageHidden, setHeroImageHidden] = useState(false);
  const governanceIcons = [ShieldCheck, Cpu, Eye];

  const nurseryPreview = mediaItems.find((item) => item.category === "nursery")?.thumbnailUrl || mediaItems.find((item) => item.category === "nursery")?.mediaUrl;
  const plantationPreview = mediaItems.find((item) => item.category === "plantation")?.thumbnailUrl || mediaItems.find((item) => item.category === "plantation")?.mediaUrl;
  const operationsPreview = "https://res.cloudinary.com/dz49fckfu/image/upload/v1774352675/golden-forests/home-operations-dashboard.png";
  const inventoryDateLabel = new Date(latestStats?.inventoryDate ?? defaultInventoryValues.inventoryDate).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <AnimatedPage className="pt-6 md:pt-8">
      <section className="relative overflow-hidden rounded-3xl border border-accent/30 bg-[#17392E] text-primary-foreground shadow-xl shadow-black/10">
        {!heroImageHidden ? (
          <OptimizedImage
            src="https://www.goldenforests.ai/wp-content/uploads/2024/01/close-up-of-mangoes-on-branch.jpg"
            alt=""
            aria-hidden="true"
            priority
            sizes="100vw"
            onError={() => setHeroImageHidden(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E28]/96 via-[#17392E]/94 to-[#2B6A55]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,160,112,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(9,39,34,0.08))]" />

        <div className="relative z-10 grid items-center gap-6 p-5 sm:p-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] xl:gap-8 lg:p-12">
          <div>
            <div className="mb-5 text-center sm:text-left">
              <span className={font("heroBadge", "inline-flex rounded-full border border-[#C8A070]/45 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C8A070]")}>
                {copy.heroBadge}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:block">
              <h1 className={font("heroTitlePrefix", "max-w-5xl flex-1 text-[clamp(2.15rem,6vw,6rem)] font-medium leading-[1.04] text-[#C8A070] [text-shadow:0_2px_10px_rgba(9,39,34,0.35)]")}>
                {copy.heroTitlePrefix}{" "}
                <span className={font("heroTitleHighlight", "sm:whitespace-nowrap")}>{copy.heroTitleHighlight}</span>
              </h1>
              <div className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-[1.5rem] bg-white/8 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:hidden">
                <OptimizedImage src={logoImage} alt="Golden Forests logo" priority sizes="88px" className="h-full w-full object-contain" />
              </div>
            </div>
            <p className={font("heroDescription", "mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-[#C8A070] sm:mt-5 sm:text-lg")}>
              {copy.heroDescription}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full rounded-xl bg-accent px-7 text-accent-foreground hover:bg-accent/90 sm:w-auto">
                <Link href="/plantation" className={font("primaryCtaLabel")}>{copy.primaryCtaLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-xl border-[#C8A070]/45 bg-white/8 px-7 text-[#C8A070] hover:bg-white/14 hover:text-[#C8A070] sm:w-auto">
                <Link href="/nursery" className={font("secondaryCtaLabel")}>{copy.secondaryCtaLabel}</Link>
              </Button>
            </div>
          </div>

          <div className="hidden justify-center sm:flex lg:justify-end">
            <div className="flex h-44 w-44 items-center justify-center rounded-[2rem] bg-white/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:h-64 sm:w-64 sm:p-5 lg:h-80 lg:w-80">
              <OptimizedImage src={logoImage} alt="Golden Forests logo" priority sizes="(min-width: 1024px) 320px, 256px" className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.32)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.statsLabels.map((label, index) => (
          <Card key={label} className="border border-border/80 bg-background shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className={font("statsLabels", "font-medium")}>{label}</CardDescription>
              <CardTitle className={font("statsValues", "text-2xl font-semibold text-foreground")}>{copy.statsValues[index] ?? ""}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={font("statsDescriptions", "text-sm text-muted-foreground")}>{copy.statsDescriptions[index] ?? ""}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={font("snapshotTitle", "text-xs font-semibold uppercase tracking-[0.14em] text-accent")}>{copy.snapshotTitle}</p>
            <p className={font("snapshotDescription", "mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground")}>{copy.snapshotDescription}</p>
          </div>
          <Button asChild variant="ghost" className="justify-start text-primary sm:justify-center">
            <Link href="/photo-gallery" className="inline-flex items-center gap-2">{copy.galleryCtaLabel} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { image: nurseryPreview, title: copy.snapshotCardTitles[0], description: copy.snapshotCardDescriptions[0], icon: Sprout },
            { image: plantationPreview, title: copy.snapshotCardTitles[1], description: copy.snapshotCardDescriptions[1], icon: MapPin },
            { image: operationsPreview, title: copy.snapshotCardTitles[2], description: copy.snapshotCardDescriptions[2], icon: PlaneTakeoff },
          ].map((card) => (
            <Card key={card.title} className="overflow-hidden border-border/80 bg-background shadow-sm">
              <div className="aspect-[4/3] bg-muted">{card.image ? <OptimizedImage src={card.image} alt={card.title} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" /> : null}</div>
              <CardHeader>
                <CardDescription className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent"><card.icon className="h-4 w-4" /> Snapshot</CardDescription>
                <CardTitle className={font("snapshotCardTitles", "text-lg")}>{card.title}</CardTitle>
                <CardDescription className={font("snapshotCardDescriptions", "text-sm leading-relaxed text-muted-foreground")}>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[1.15fr,0.85fr]">
        <Card className="border-border/80 bg-card/80 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Operational Governance</CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-relaxed text-muted-foreground">Professional structures for compliance, field execution, and client visibility across mango and agarwood operations.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {copy.governanceTitles.map((title, index) => {
              const Icon = governanceIcons[index] ?? ShieldCheck;
              return (
                <div key={title} className="rounded-2xl border border-border/60 bg-background/90 p-4 shadow-sm">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary"><Icon className="h-5 w-5" /></div>
                  <h3 className={font("governanceTitles", "mt-4 text-lg font-semibold text-foreground")}>{title}</h3>
                  <p className={font("governanceDescriptions", "mt-2 text-sm leading-relaxed text-muted-foreground")}>{copy.governanceDescriptions[index] ?? ""}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-[#17392E] text-primary-foreground shadow-sm">
          <CardHeader>
            <CardDescription className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C8A070]">{copy.saleHeaderPrefix} • {inventoryDateLabel}</CardDescription>
            <CardTitle className="text-2xl text-[#FBFCF7]">{copy.liveMetricsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {saleInventory.map((item, index) => (
              <div key={item.field} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-[#C8A070]">{copy.saleCardLabels[index] ?? item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-[#FBFCF7]">{Number(latestStats?.[item.field] ?? defaultInventoryValues[item.field]).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{copy.visitsTitle}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{copy.visitsDescription}</p>
          </div>
          <Button asChild variant="ghost" className="justify-start text-primary sm:justify-center">
            <Link href="/plantation-visit" className="inline-flex items-center gap-2">Visit overview <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.visitsBullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground">{bullet}</div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
