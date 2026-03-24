import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Route, MapPin, Compass, Hotel, Palmtree, Waves } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage, OptimizedVideo } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

export default function Ecotourism() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.ecotourism;
  const font = createPageTypography(resolvedSiteCopy, "ecotourism");
  const featuredDestinations = copy.featuredDestinationNames.map((name, index) => ({
    name,
    details: copy.featuredDestinationDetails[index] ?? "",
    image: copy.featuredDestinationImages[index] ?? "",
  }));

  return (
    <AnimatedPage>
      <PageHeader
        badge={copy.header.badge}
        title={copy.header.title}
        description={copy.header.description}
        pageKey="ecotourism"
        siteCopy={resolvedSiteCopy}
      />

      <Card className="border-border/60 shadow-md mb-8">
        <CardContent className="p-6 md:p-8 space-y-4">
          {copy.introParagraphs.map((paragraph) => (
            <p key={paragraph} className={font("introParagraphs", "text-muted-foreground leading-relaxed")}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <section className="mb-8 overflow-hidden rounded-[2rem] border border-[#C8A070]/25 bg-[linear-gradient(135deg,#17392E_0%,#0F2E28_100%)] p-5 shadow-[0_16px_36px_rgba(9,39,34,0.18)] sm:p-6 lg:p-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="max-w-xl">
            <p className={font("featuredVideoEyebrow", "text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A070]")}>
              {copy.featuredVideoEyebrow}
            </p>
            <h2 className={font("featuredVideoTitle", "mt-3 text-[1.9rem] font-semibold leading-tight text-[#F6E7D1] sm:text-[2.3rem]")}>
              {copy.featuredVideoTitle}
            </h2>
            <p className={font("featuredVideoDescription", "mt-3 text-sm leading-relaxed text-[#E7D2B2] sm:text-base")}>
              {copy.featuredVideoDescription}
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_14px_32px_rgba(0,0,0,0.24)]">
            <div className="aspect-video">
              <OptimizedVideo
                src="https://res.cloudinary.com/dz49fckfu/video/upload/v1774345557/golden-forests/plantation-visit-cinematic-journey.mp4"
                className="h-full w-full object-cover"
                controls
                autoPlay
                playsInline
                preload="auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className={font("guideTitle", "text-2xl font-outfit text-accent flex items-center gap-2")}>
              <MapPin className="w-6 h-6 text-primary" />
              {copy.guideTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={font("guideItems", "space-y-2 text-muted-foreground")}>
              {copy.guideItems.map((item, index) => {
                const Icon = [Waves, Hotel, Plane, Compass][index] ?? Compass;
                return <li key={item} className="flex items-center gap-2"><Icon className="w-4 h-4 text-primary" /> {item}</li>;
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className={font("flightsTitle", "text-2xl font-outfit text-accent flex items-center gap-2")}>
              <Plane className="w-6 h-6 text-primary" />
              {copy.flightsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={font("flightItems", "space-y-2 text-muted-foreground")}>
              {copy.flightItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className={font("routeTitle", "text-2xl font-outfit text-accent flex items-center gap-2")}>
              <Route className="w-6 h-6 text-primary" />
              {copy.routeTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className={font("routeSteps", "space-y-2 text-muted-foreground list-decimal pl-5")}>
              {copy.routeSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className={font("contextTitle", "text-2xl font-outfit text-accent flex items-center gap-2")}>
              <Palmtree className="w-6 h-6 text-primary" />
              {copy.contextTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={font("contextItems", "space-y-2 text-muted-foreground")}>
              {copy.contextItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-3">
        <h2 className={font("galleryTitle", "text-3xl font-outfit text-accent")}>{copy.galleryTitle}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {featuredDestinations.map((destination, index) => (
          <Card key={destination.name} className="border-border/60 overflow-hidden hover-elevate">
            <OptimizedImage
              src={destination.image}
              alt={destination.name}
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="w-full h-52 object-cover"
            />
            <CardContent className="p-4">
              <h3 className={font("featuredDestinationNames", "font-semibold text-foreground")}>{destination.name}</h3>
              <p className={font("featuredDestinationDetails", "text-sm text-muted-foreground mt-1")}>{destination.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedPage>
  );
}
