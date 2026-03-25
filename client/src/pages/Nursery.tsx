import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Sprout, Droplets, Bug, Microscope, ThermometerSun } from "lucide-react";
import { useNurseryStats } from "@/hooks/use-nursery-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { useGalleryMedia } from "@/hooks/use-gallery-media";
import { defaultInventoryValues, saleInventory } from "@/lib/publicInventory";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage, OptimizedVideo } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

export default function Nursery() {
  const { data: stats, isLoading } = useNurseryStats();
  const { data: mediaItems = [] } = useGalleryMedia();
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.nursery;
  const font = createPageTypography(resolvedSiteCopy, "nursery");
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const nurseryGalleryImages = [...mediaItems]
    .filter((item) => item.category === "nursery")
    .sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((item) => ({
      src: item.mediaUrl,
      thumbnail: item.thumbnailUrl || item.mediaUrl,
      label: item.title,
      date: item.date ? `Captured ${new Date(item.date).toLocaleDateString()}` : "",
      mediaType: item.mediaType,
    }));
  const showCarouselControls = nurseryGalleryImages.length > 3;
  const inventoryDateLabel = new Date(stats?.inventoryDate ?? defaultInventoryValues.inventoryDate).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return;

    const videos = Array.from(
      root.querySelectorAll("video[data-autoplay='true']")
    ) as HTMLVideoElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.6] }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!carouselApi || nurseryGalleryImages.length <= 1) return;

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3500);

    return () => window.clearInterval(interval);
  }, [carouselApi, nurseryGalleryImages.length]);

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="nursery"
        siteCopy={resolvedSiteCopy}
      />

      <div className="mb-10 space-y-5">
        <section className="overflow-hidden rounded-[2rem] border border-[#2B5949] bg-[radial-gradient(circle_at_top_left,rgba(200,160,112,0.12),transparent_26%),linear-gradient(135deg,#17392E_0%,#0F2E28_100%)] shadow-[0_22px_48px_rgba(0,0,0,0.2)]">
          <div className="border-b border-white/8 px-5 py-5 sm:px-7">
            <p className={font("overviewEyebrow", "text-xs font-semibold uppercase tracking-[0.22em] text-[#C8A070]")}>{copy.overviewEyebrow}</p>
            <h2 className={font("overviewTitle", "mt-2 text-[1.8rem] font-semibold leading-tight text-[#FBFCF7] sm:text-[2.2rem]")}>
              {copy.overviewTitle}
            </h2>
            <p className={font("overviewDescription", "mt-2 max-w-2xl text-sm leading-relaxed text-[#D9E4DB]")}>
              {copy.overviewDescription}
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
            <article className="rounded-[1.55rem] border border-[#325F50] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-inner">
              <p className={font("stockLabels", "text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A070]")}>
                {copy.stockLabels[0] ?? ""}
              </p>
              <p className="font-outfit mt-4 text-5xl font-semibold leading-none text-[#FBFCF7] sm:text-6xl">
                {(stats?.agarwoodSeedlings ?? defaultInventoryValues.agarwoodSeedlings).toLocaleString()}
              </p>
              <div className="mt-4 h-px w-16 bg-[#C8A070]/45" />
              <p className={font("stockDescriptions", "mt-4 text-sm leading-relaxed text-[#D9E4DB]")}>
                {copy.stockDescriptions[0] ?? ""}
              </p>
            </article>

            <article className="rounded-[1.55rem] border border-[#325F50] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-inner">
              <p className={font("stockLabels", "text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A070]")}>
                {copy.stockLabels[1] ?? ""}
              </p>
              <p className="font-outfit mt-4 text-5xl font-semibold leading-none text-[#FBFCF7] sm:text-6xl">
                {(stats?.mangoSeedlings ?? defaultInventoryValues.mangoSeedlings).toLocaleString()}
              </p>
              <div className="mt-4 h-px w-16 bg-[#C8A070]/45" />
              <p className={font("stockDescriptions", "mt-4 text-sm leading-relaxed text-[#D9E4DB]")}>
                {copy.stockDescriptions[1] ?? ""}
              </p>
            </article>
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.9rem] border border-[#2B5949] bg-[linear-gradient(135deg,#20483C_0%,#17392E_100%)] shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
          <div className="border-b border-white/8 px-6 py-4 sm:px-7">
            <p className={font("saleHeaderPrefix", "text-xs font-semibold uppercase tracking-[0.22em] text-[#C8A070]")}>
              {copy.saleHeaderPrefix} {inventoryDateLabel}
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-3">
            {saleInventory.map((item, index) => (
              <article
                key={item.field}
                className="rounded-[1.35rem] border border-[#315E4F] bg-[rgba(8,33,28,0.22)] p-4"
              >
                <p className={font("saleCardNotes", "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8A070]")}>
                  {copy.saleCardNotes[index] ?? item.note}
                </p>
                <p className="font-outfit mt-3 text-4xl font-semibold leading-none text-[#FBFCF7] sm:text-5xl">
                  {Number(stats?.[item.field] ?? defaultInventoryValues[item.field]).toLocaleString()}
                </p>
                <p className={font("saleCardLabels", "mt-3 text-sm leading-relaxed text-[#D9E4DB]")}>{copy.saleCardLabels[index] ?? item.label}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Seedling Photo Gallery */}
      <div className="mb-16 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className={font("galleryTitle", "mb-2 text-2xl sm:text-3xl font-bold")}>{copy.galleryTitle}</h2>
          </div>
          <Link href="/photo-gallery" className={font("galleryLinkLabel", "text-sm font-medium text-primary hover:underline")}>
            {copy.galleryLinkLabel}
          </Link>
        </div>

        <div ref={galleryRef} className="mx-auto max-w-6xl">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: true }}
            className="w-full px-8 sm:px-10 lg:px-12"
          >
          <CarouselContent>
            {nurseryGalleryImages.map((item, index) => (
              <CarouselItem key={`${item.src}-${index}`} className="basis-[88%] sm:basis-1/2 lg:basis-1/3">
                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg hover-elevate">
                  <div className="aspect-[4/3] bg-muted relative">
                    {item.mediaType === "video" ? (
                      <OptimizedVideo
                        src={item.src}
                        poster={item.thumbnail}
                        muted
                        loop
                        playsInline
                        data-autoplay="true"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <OptimizedImage
                        src={item.src}
                        alt={item.label}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 88vw"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3 bg-card">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    {item.date ? <p className="text-xs text-muted-foreground">{item.date}</p> : null}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {showCarouselControls ? <CarouselPrevious className="left-2" /> : null}
          {showCarouselControls ? <CarouselNext className="right-2" /> : null}
          </Carousel>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h3 className={font("propagationTitle", "text-2xl font-bold text-foreground mb-4")}>{copy.propagationTitle}</h3>
          
          <Card className="hover-elevate shadow-sm overflow-hidden border-border/60">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-primary/5 p-6 flex flex-col items-center justify-center sm:w-1/3 border-b sm:border-b-0 sm:border-r border-border/50">
                <Sprout className="w-12 h-12 text-primary mb-3" />
                <span className="font-bold text-xl font-outfit text-center text-primary">Aquilaria<br/>crassna</span>
              </div>
              <div className="p-6 sm:w-2/3">
                <p className={font("propagationDescriptions", "text-muted-foreground text-sm leading-relaxed")}>
                  {copy.propagationDescriptions[0] ?? ""}
                </p>
              </div>
            </div>
          </Card>

          <Card className="hover-elevate shadow-sm overflow-hidden border-border/60">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-accent/5 p-6 flex flex-col items-center justify-center sm:w-1/3 border-b sm:border-b-0 sm:border-r border-border/50">
                <div className="w-12 h-12 mb-3 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <span className="text-2xl leading-none" role="img" aria-label="Mango">🥭</span>
                </div>
                <span className="font-bold text-xl font-outfit text-center text-accent">Sweet Elena Carabao<br/>Mango</span>
              </div>
              <div className="p-6 sm:w-2/3">
                <p className={font("propagationDescriptions", "text-muted-foreground text-sm leading-relaxed")}>
                  {copy.propagationDescriptions[1] ?? ""}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h3 className={font("dashboardTitle", "text-2xl font-bold text-foreground mb-4")}>{copy.dashboardTitle}</h3>
          <div className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-24 rounded-lg" />
                <Skeleton className="h-24 rounded-lg" />
              </>
            ) : stats ? (
              <>
                <Card className="hover-elevate shadow-sm border-border/60 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <p className={font("growthLabels", "text-xs text-muted-foreground font-medium")}>{copy.growthLabels[0] ?? ""}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">{stats.agarwoodHeightCm}</span>
                        <span className="text-sm text-muted-foreground">cm</span>
                      </div>
                      <p className={font("growthDescriptions", "text-sm text-muted-foreground")}>{copy.growthDescriptions[0] ?? ""}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate shadow-sm border-border/60 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Agarwood Buffer Stock</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">8,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Reserved agarwood seedlings available as replacement and deployment buffer stock.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate shadow-sm border-border/60 bg-gradient-to-br from-accent/5 to-transparent">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <p className={font("growthLabels", "text-xs text-muted-foreground font-medium")}>{copy.growthLabels[1] ?? ""}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-accent">{stats.mangoHeightCm}</span>
                        <span className="text-sm text-muted-foreground">cm</span>
                      </div>
                      <p className={font("growthDescriptions", "text-sm text-muted-foreground")}>{copy.growthDescriptions[1] ?? ""}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-elevate shadow-sm border-border/60 bg-gradient-to-br from-accent/5 to-transparent">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Mango Buffer Stock</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-accent">3,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Reserved mango seedlings available as replacement and deployment buffer stock.</p>
                    </div>
                  </CardContent>
                </Card>

                <p className={font("updatedPrefix", "text-xs text-muted-foreground text-center pt-1")}>
                  {copy.updatedPrefix} {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'N/A'}
                </p>
              </>
            ) : (
                <Card className="shadow-sm border-border/60">
                  <CardContent className="p-6 text-center text-muted-foreground">
                  <span className={font("emptyStateLabel")}>{copy.emptyStateLabel}</span>
                  </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>

      <h3 className={font("technologyTitle", "text-2xl font-bold text-foreground mb-6 mt-12")}>{copy.technologyTitle}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[Droplets, ThermometerSun, Bug, Microscope].map((Icon, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover-elevate">
            <Icon className="w-8 h-8 text-primary mb-4" />
            <h4 className={font("technologyTitles", "font-bold mb-2")}>{copy.technologyTitles[i] ?? ""}</h4>
            <p className={font("technologyDescriptions", "text-sm text-muted-foreground")}>{copy.technologyDescriptions[i] ?? ""}</p>
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
}
