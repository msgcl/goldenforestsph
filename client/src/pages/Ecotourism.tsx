import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Route, MapPin, Compass, Hotel, Palmtree, Waves } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

export default function PlantationVisit() {
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
      <PageHeader badge={copy.header.badge} title={copy.header.title} description={copy.header.description} pageKey="ecotourism" siteCopy={resolvedSiteCopy} />

      <Card className="border-border/60 shadow-md mb-8">
        <CardContent className="p-6 md:p-8 space-y-4">
          {copy.introParagraphs.map((paragraph) => (
            <p key={paragraph} className={font("introParagraphs", "text-muted-foreground leading-relaxed")}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

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
        {featuredDestinations.map((destination) => (
          <Card key={destination.name} className="border-border/60 overflow-hidden hover-elevate">
            <OptimizedImage src={destination.image} alt={destination.name} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="w-full h-52 object-cover" />
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
