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

        <div className="relative z-10 p-5 sm:p-10 lg:p-12 xl:pr-[clamp(320px,30vw,420px)]">
          <div className="min-w-0 max-w-[56rem]">
            <div className="mb-5 text-center sm:text-left">
              <span className={font("heroBadge", "inline-flex rounded-full border border-[#C8A070]/45 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C8A070]")}>
                {copy.heroBadge}
              </span>
            </div>
            <div className="sm:block">
              <h1 className={font("heroTitlePrefix", "max-w-[16ch] text-[clamp(2.05rem,4.3vw,4.5rem)] font-medium leading-[1.02] text-[#C8A070] [text-shadow:0_2px_10px_rgba(9,39,34,0.35)] sm:max-w-[16ch] xl:max-w-[13.5ch] xl:text-[clamp(1.95rem,3.7vw,4rem)] 2xl:max-w-[15ch] 2xl:text-[clamp(2.05rem,4vw,4.35rem)]")}>
                <span className="block whitespace-nowrap">Professionally Managed</span>
                <span className="block whitespace-nowrap">Agroforestry Investments</span>
              </h1>
            </div>
            <p className={font("heroDescription", "mt-4 max-w-[44rem] text-[0.98rem] leading-relaxed text-[#C8A070] sm:mt-5 sm:text-lg")}>
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

          <div className="pointer-events-none absolute right-8 top-[3.8rem] hidden xl:block">
            <div className="flex aspect-square w-[clamp(220px,20vw,280px)] items-center justify-center rounded-[1.9rem] bg-white/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <OptimizedImage src={logoImage} alt="Golden Forests logo" priority sizes="(min-width: 1280px) 280px, 20vw" className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.32)]" />
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

      <section className="mt-12 overflow-hidden rounded-[2rem] border border-[#C8A070]/28 bg-[radial-gradient(circle_at_top_right,rgba(200,160,112,0.18),transparent_26%),linear-gradient(135deg,#F6E9D1_0%,#F8EFD9_48%,#F2E2C5_100%)] p-5 shadow-[0_18px_42px_rgba(9,39,34,0.14)] sm:p-6 lg:p-7">
        <div className="mb-5">
          <h2 className={font("liveMetricsTitle", "text-2xl font-semibold text-[#17392E] sm:text-3xl")}>{copy.liveMetricsTitle}</h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.95fr)]">
          <div className="space-y-4">
            <section className="rounded-[1.45rem] border border-[#E7C896] bg-[linear-gradient(180deg,rgba(232,190,120,0.4),rgba(226,174,97,0.5))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]">
              <p className={font("currentStockLabel", "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C5A16]")}>
                {copy.currentStockLabel}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <article className="rounded-[1.2rem] border border-white/45 bg-[rgba(252,239,216,0.72)] p-4 shadow-[0_10px_24px_rgba(168,118,44,0.1)]">
                  <p className={font("stockLabels", "text-sm leading-snug text-[#8B6B3F]")}>{copy.stockLabels[0] ?? ""}</p>
                  <p className="mt-3 font-outfit text-4xl font-semibold leading-none text-[#7C5124] sm:text-5xl">
                    {(latestStats?.agarwoodSeedlings ?? defaultInventoryValues.agarwoodSeedlings).toLocaleString()}
                  </p>
                </article>
                <article className="rounded-[1.2rem] border border-white/45 bg-[rgba(252,239,216,0.72)] p-4 shadow-[0_10px_24px_rgba(168,118,44,0.1)]">
                  <p className={font("stockLabels", "text-sm leading-snug text-[#8B6B3F]")}>{copy.stockLabels[1] ?? ""}</p>
                  <p className="mt-3 font-outfit text-4xl font-semibold leading-none text-[#7C5124] sm:text-5xl">
                    {(latestStats?.mangoSeedlings ?? defaultInventoryValues.mangoSeedlings).toLocaleString()}
                  </p>
                </article>
              </div>
            </section>

            <section className="rounded-[1.45rem] border border-[#E7C896] bg-[linear-gradient(180deg,rgba(232,190,120,0.4),rgba(226,174,97,0.5))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]">
              <p className={font("saleHeaderPrefix", "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C5A16]")}>
                {copy.saleHeaderPrefix} {inventoryDateLabel}
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {saleInventory.map((item, index) => (
                  <article
                    key={item.field}
                    className="rounded-[1.2rem] border border-white/45 bg-[rgba(252,239,216,0.72)] p-4 shadow-[0_10px_24px_rgba(168,118,44,0.1)]"
                  >
                    <p className="font-outfit text-4xl font-semibold leading-none text-[#7C5124] sm:text-[2.5rem]">
                      {Number(latestStats?.[item.field] ?? defaultInventoryValues[item.field]).toLocaleString()}
                    </p>
                    <p className={font("saleCardLabels", "mt-3 text-sm leading-snug text-[#8B6B3F]")}>
                      {copy.saleCardLabels[index] ?? item.label}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            {[
              {
                label: copy.summaryCardLabels[0] ?? "Field Deployment",
                value: copy.deploymentMilestoneValue,
                description: copy.summaryCardDescriptions[0] ?? "",
              },
              {
                label: copy.summaryCardLabels[1] ?? "Panay Planting",
                value: (latestStats?.panayPlanted ?? defaultInventoryValues.panayPlanted).toLocaleString(),
                description: copy.summaryCardDescriptions[1] ?? "",
              },
              {
                label: copy.summaryCardLabels[2] ?? "Inventory Date",
                value: inventoryDateLabel,
                description: copy.summaryCardDescriptions[2] ?? "",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-[1.45rem] border border-[#E3C38F] bg-[rgba(250,237,213,0.84)] p-5 shadow-[0_12px_28px_rgba(168,118,44,0.08)]"
              >
                <p className="text-sm text-[#9A723A]">{item.label}</p>
                <p className="mt-2 font-outfit text-3xl font-semibold text-[#7C5124] sm:text-[2.35rem]">{item.value}</p>
                <p className={font("summaryCardDescriptions", "mt-2 text-sm leading-relaxed text-[#8B6B3F]")}>{item.description}</p>
              </article>
            ))}

            <div className="flex justify-end pt-1">
              <Button asChild size="lg" className="rounded-xl bg-[#17392E] px-7 text-[#FBFCF7] hover:bg-[#0F2E28]">
                <Link href="/nursery" className="inline-flex items-center gap-2">
                  {copy.nurseryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className={font("snapshotTitle", "text-3xl font-semibold tracking-tight text-primary sm:text-4xl")}>{copy.snapshotTitle}</h2>
            <p className={font("snapshotDescription", "mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground")}>{copy.snapshotDescription}</p>
          </div>
          <Button asChild variant="outline" className="justify-start rounded-xl border-border/80 bg-transparent text-primary hover:bg-card sm:justify-center">
            <Link href="/photo-gallery" className="inline-flex items-center gap-2">{copy.galleryCtaLabel} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            { image: nurseryPreview, title: copy.snapshotCardTitles[0], description: copy.snapshotCardDescriptions[0], icon: Sprout, href: "/nursery" },
            { image: plantationPreview, title: copy.snapshotCardTitles[1], description: copy.snapshotCardDescriptions[1], icon: MapPin, href: "/plantation" },
            { image: operationsPreview, title: copy.snapshotCardTitles[2], description: copy.snapshotCardDescriptions[2], icon: PlaneTakeoff, href: "/ai-technology" },
          ].map((card) => (
            <Link key={card.title} href={card.href} className="block h-full">
              <Card className="h-full overflow-hidden rounded-[1.6rem] border border-border/70 bg-card/85 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
                <div className="aspect-[16/10] bg-muted">
                  {card.image ? <OptimizedImage src={card.image} alt={card.title} sizes="(min-width: 1024px) 33vw, 100vw" className="h-full w-full object-cover" /> : null}
                </div>
                <CardHeader className="gap-2">
                  <CardDescription className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    <card.icon className="h-4 w-4" />
                    Snapshot
                  </CardDescription>
                  <CardTitle className={font("snapshotCardTitles", "text-[1.7rem] leading-tight text-primary")}>{card.title}</CardTitle>
                  <CardDescription className={font("snapshotCardDescriptions", "text-base leading-relaxed text-muted-foreground")}>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {copy.governanceTitles.map((title, index) => {
          const Icon = governanceIcons[index] ?? ShieldCheck;
          return (
            <article
              key={title}
              className="rounded-[1.7rem] border border-[#E7D6B8] bg-[linear-gradient(180deg,#F7EEDC_0%,#F2E4C8_100%)] p-5 shadow-[0_14px_30px_rgba(9,39,34,0.08)]"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/40 text-[#C8A070]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className={font("governanceTitles", "mt-4 text-[1.65rem] font-semibold leading-tight text-[#17392E]")}>{title}</h3>
              <p className={font("governanceDescriptions", "mt-3 text-base leading-relaxed text-[#4F5E56]")}>{copy.governanceDescriptions[index] ?? ""}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-[1.6rem] border border-[#2A5646] bg-[linear-gradient(180deg,#12392F_0%,#0F3128_100%)] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.14)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)] lg:items-start">
          <div>
            <h3 className={font("visitsTitle", "inline-flex items-center gap-2 text-[2rem] font-semibold leading-tight text-[#FBFCF7]")}>
              <Sprout className="h-5 w-5 text-[#C8A070]" />
              {copy.visitsTitle}
            </h3>
            <p className={font("visitsDescription", "mt-3 max-w-3xl text-base leading-relaxed text-[#E4D3B6]")}>
              {copy.visitsDescription}
            </p>
          </div>
          <div className="grid gap-2 self-center">
            {copy.visitsBullets.map((bullet, index) => {
              const BulletIcon = [MapPin, PlaneTakeoff, Sprout][index] ?? Sprout;
              return (
                <div key={bullet} className="inline-flex items-center gap-2 text-sm font-medium text-[#FBFCF7]">
                  <BulletIcon className="h-4 w-4 shrink-0 text-[#C8A070]" />
                  <span>{bullet}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
