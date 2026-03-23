import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, Cpu, Eye, LineChart, Landmark, MapPin, PlaneTakeoff, Sprout } from "lucide-react";
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

export default function Home() {
  const { data: latestStats } = useNurseryStats();
  const { data: mediaItems = [] } = useGalleryMedia();
  const { data: siteCopy } = useSiteCopy();
  const copy = siteCopy?.home ?? defaultSiteCopy.home;
  const [heroImageHidden, setHeroImageHidden] = useState(false);
  const governanceIcons = [ShieldCheck, Cpu, Eye];

  const nurseryPreview = mediaItems.find((item) => item.category === "nursery")?.mediaUrl;
  const plantationPreview = mediaItems.find((item) => item.category === "plantation")?.mediaUrl;
  const operationsPreview = "/gallery/operations-technology-dashboard.png";
  const inventoryDateLabel = new Date(latestStats?.inventoryDate ?? defaultInventoryValues.inventoryDate).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <AnimatedPage>
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

        <div className="relative z-10 grid items-center gap-6 p-5 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:gap-8 lg:p-12">
          <div>
            <div className="mb-5 text-center sm:text-left">
              <span className="inline-flex rounded-full border border-[#C8A070]/45 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C8A070]">
                {copy.heroBadge}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:block">
              <h1 className="max-w-5xl flex-1 font-outfit text-[2.15rem] font-medium leading-[1.04] text-[#C8A070] [text-shadow:0_2px_10px_rgba(9,39,34,0.35)] sm:text-5xl lg:text-[3.75rem]">
                {copy.heroTitlePrefix} <span className="sm:whitespace-nowrap">{copy.heroTitleHighlight}</span>
              </h1>
              <div className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-[1.5rem] bg-white/8 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:hidden">
                <OptimizedImage
                  src={logoImage}
                  alt="Golden Forests logo"
                  priority
                  sizes="88px"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-[#C8A070] sm:mt-5 sm:text-lg">
              {copy.heroDescription}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full rounded-xl bg-accent px-7 text-accent-foreground hover:bg-accent/90 sm:w-auto">
                <Link href="/plantation">{copy.primaryCtaLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-xl border-[#C8A070]/45 bg-white/8 px-7 text-[#C8A070] hover:bg-white/14 hover:text-[#C8A070] sm:w-auto">
                <Link href="/nursery">{copy.secondaryCtaLabel}</Link>
              </Button>
            </div>
          </div>

          <div className="hidden justify-center sm:flex lg:justify-end">
            <div className="flex h-44 w-44 items-center justify-center rounded-[2rem] bg-white/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:h-64 sm:w-64 sm:p-5 lg:h-80 lg:w-80">
              <OptimizedImage
                src={logoImage}
                alt="Golden Forests logo"
                priority
                sizes="(min-width: 1024px) 320px, 256px"
                className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.32)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.statsLabels.map((label, index) => (
        <Card key={label} className="border border-border/80 bg-background shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium">{label}</CardDescription>
            <CardTitle className="text-2xl font-semibold text-foreground">{copy.statsValues[index] ?? ""}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{copy.statsDescriptions[index] ?? ""}</p>
          </CardContent>
        </Card>
        ))}
      </section>

      <section className="mt-10 section-surface p-4 sm:p-5">
        <div className="mb-5">
          <h2 className="flex items-center gap-2 font-outfit text-2xl font-semibold text-[#17392E] sm:text-[1.7rem]">
            <LineChart className="h-4 w-4 text-accent" /> {copy.liveMetricsTitle}
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.24fr)_minmax(300px,0.76fr)]">
          <div className="space-y-4">
            <div className="rounded-[1.65rem] border border-[#D8B88A] bg-[linear-gradient(135deg,#F0D2A3_0%,#DEB075_100%)] p-3.5 shadow-[0_14px_32px_rgba(162,111,49,0.12)] sm:p-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#6D451B]">{copy.currentStockLabel}</p>
                  </div>
                </div>

                <div className="mx-auto grid w-full max-w-5xl gap-3 md:grid-cols-2">
                <div className="flex min-h-[8rem] flex-col justify-center rounded-[1.25rem] border border-[#F8E7CC] bg-[rgba(255,248,239,0.34)] p-3.5 backdrop-blur-sm sm:min-h-[8.75rem]">
                    <p className="text-sm font-medium text-[#9B6B35]">{copy.stockLabels[0] ?? ""}</p>
                    <p className="mt-2.5 font-outfit text-[2.3rem] font-semibold leading-none text-[#6B4320] sm:text-[2.7rem]">
                      {(latestStats?.agarwoodSeedlings ?? defaultInventoryValues.agarwoodSeedlings).toLocaleString()}
                    </p>
                </div>

                <div className="flex min-h-[8rem] flex-col justify-center rounded-[1.25rem] border border-[#F8E7CC] bg-[rgba(255,248,239,0.34)] p-3.5 backdrop-blur-sm sm:min-h-[8.75rem]">
                    <p className="text-sm font-medium text-[#9B6B35]">{copy.stockLabels[1] ?? ""}</p>
                    <p className="mt-2.5 font-outfit text-[2.3rem] font-semibold leading-none text-[#6B4320] sm:text-[2.7rem]">
                      {(latestStats?.mangoSeedlings ?? defaultInventoryValues.mangoSeedlings).toLocaleString()}
                    </p>
                </div>
              </div>
            </div>
          </div>

            <div className="rounded-[1.5rem] border border-[#D8B88A] bg-[linear-gradient(135deg,#F0D1A1_0%,#DCA96E_100%)] p-3.5 shadow-[0_12px_28px_rgba(162,111,49,0.11)]">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#6D451B]">
                {copy.saleHeaderPrefix} {inventoryDateLabel}
              </p>
              <div className="mx-auto mt-3 grid w-full max-w-6xl gap-3 sm:grid-cols-3">
                {saleInventory.map((item, index) => (
                  <div key={item.field} className="flex min-h-[8.5rem] flex-col justify-center rounded-[1.1rem] border border-[#F8E7CC] bg-[rgba(255,248,239,0.34)] p-3.5 backdrop-blur-sm sm:min-h-[9rem]">
                    <p className="font-outfit text-[2rem] font-semibold text-[#6B4320] sm:text-[2.35rem]">
                      {Number(latestStats?.[item.field] ?? defaultInventoryValues[item.field]).toLocaleString()}
                    </p>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-[#7A5936]">{copy.saleCardLabels[index] ?? item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Card className="border border-[#E0C199] bg-[#F3DEC0] shadow-sm">
              <CardHeader className="pb-1">
                <CardDescription className="font-medium text-[#9B6B35]">{copy.summaryCardLabels[0] ?? ""}</CardDescription>
                <CardTitle className="font-outfit text-[1.7rem] font-semibold text-[#7B5224]">{copy.deploymentMilestoneValue}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[#8D6336]">{copy.summaryCardDescriptions[0] ?? ""}</p>
              </CardContent>
            </Card>

            <Card className="border border-[#E0C199] bg-[#F3DEC0] shadow-sm">
              <CardHeader className="pb-1">
                <CardDescription className="font-medium text-[#9B6B35]">{copy.summaryCardLabels[1] ?? ""}</CardDescription>
                <CardTitle className="font-outfit text-[1.7rem] font-semibold text-[#7B5224]">
                  {(latestStats?.panayPlanted ?? defaultInventoryValues.panayPlanted).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[#8D6336]">{copy.summaryCardDescriptions[1] ?? ""}</p>
              </CardContent>
            </Card>

            <Card className="border border-[#E0C199] bg-[#FBEDD8] shadow-sm">
              <CardHeader className="pb-1">
                <CardDescription className="font-medium text-[#9B6B35]">{copy.summaryCardLabels[2] ?? ""}</CardDescription>
                <CardTitle className="font-outfit text-[1.7rem] font-semibold text-[#7B5224]">{inventoryDateLabel}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[#8D6336]">{copy.summaryCardDescriptions[2] ?? ""}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-4 flex justify-stretch sm:justify-end">
          <Button asChild className="h-fit w-full rounded-xl bg-[#17392E] px-5 py-5 text-sm font-semibold text-[#F7E8D2] hover:bg-[#0F2E28] sm:w-auto">
            <Link href="/nursery">{copy.nurseryCtaLabel} <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{copy.snapshotTitle}</h2>
            <p className="mt-2 text-muted-foreground">{copy.snapshotDescription}</p>
          </div>
          <Button asChild variant="outline" className="w-fit border-border/80 bg-background/70">
            <Link href="/photo-gallery">{copy.galleryCtaLabel} <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Link href="/nursery" className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm hover-elevate">
            <div className="aspect-video overflow-hidden bg-muted">
              <OptimizedImage
                src={nurseryPreview || "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=900&h=600&fit=crop"}
                alt="Nursery operations"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground">{copy.snapshotCardTitles[0] ?? ""}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{copy.snapshotCardDescriptions[0] ?? ""}</p>
            </div>
          </Link>

          <Link href="/plantation" className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm hover-elevate">
            <div className="aspect-video overflow-hidden bg-muted">
              <OptimizedImage
                src={plantationPreview || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop"}
                alt="Plantation operations"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground">{copy.snapshotCardTitles[1] ?? ""}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{copy.snapshotCardDescriptions[1] ?? ""}</p>
            </div>
          </Link>

          <Link href="/technology" className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm hover-elevate">
            <div className="aspect-video overflow-hidden bg-muted">
              <OptimizedImage
                src={operationsPreview || "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&h=600&fit=crop"}
                alt="Field technology"
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground">{copy.snapshotCardTitles[2] ?? ""}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{copy.snapshotCardDescriptions[2] ?? ""}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {copy.governanceTitles.map((title, index) => {
          const Icon = governanceIcons[index] ?? ShieldCheck;
          return (
          <div key={title} className="section-surface p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#17392E]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#3A3327]">{copy.governanceDescriptions[index] ?? ""}</p>
          </div>
        )})}
      </section>

      <section className="mt-10 rounded-2xl border border-border/70 bg-gradient-to-r from-secondary/8 via-card to-accent/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-foreground">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/35 bg-accent/12 text-accent">
                <PlaneTakeoff className="h-5 w-5" />
              </span>
              {copy.visitsTitle}
            </h2>
            <p className="mt-2 text-white">
              {copy.visitsDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm text-foreground sm:text-right">
            <p className="inline-flex items-center gap-2 sm:justify-end"><MapPin className="h-4 w-4 text-accent" /> {copy.visitsBullets[0] ?? ""}</p>
            <p className="inline-flex items-center gap-2 sm:justify-end"><Landmark className="h-4 w-4 text-accent" /> {copy.visitsBullets[1] ?? ""}</p>
            <p className="inline-flex items-center gap-2 sm:justify-end"><Sprout className="h-4 w-4 text-accent" /> {copy.visitsBullets[2] ?? ""}</p>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
