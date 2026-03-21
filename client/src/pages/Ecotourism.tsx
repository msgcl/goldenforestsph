import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Route, MapPin, Compass, Hotel, Palmtree, Waves } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";

const featuredDestinations = [
  {
    name: "San Antonio Beaches, Zambales",
    details: "Pundaquit, Anawangin, Nagsasa, and Capones",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Anawangin_Cove_at_Sunrise.jpg",
  },
  {
    name: "Sundowners Resort, Botolan",
    details: "Signature luxury stop in the Zambales route",
    image: "/gallery/sundowners.jpg",
  },
  {
    name: "Clark International Airport (CRK)",
    details: "Primary flight gateway to island destinations",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/92/Clark_International_Airport_%28Mabalacat%2C_Pampanga%3B_04-22-2024%29.jpg",
  },
  {
    name: "Cebu",
    details: "Historical landmarks and beach destinations",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Osme%C3%B1a_Peak%2C_Cebu%2C_Philippines.jpg",
  },
  {
    name: "Coron",
    details: "Lagoons, limestone cliffs, and diving routes",
    image: "/gallery/coron.jpg",
  },
  {
    name: "Boracay",
    details: "White Beach, clear waters, and sunset shoreline",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Boracay_White_Beach.png",
  },
  {
    name: "Bohol",
    details: "Chocolate Hills, Panglao, and eco-attractions",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Chocolate_Hills_Bohol_Philippines.jpg",
  },
  {
    name: "El Nido",
    details: "Palawan gateway for island-hopping lagoons",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/El_Nido_Bay_December_2018.jpg",
  },
  {
    name: "Surigao / Siargao Gateway",
    details: "Cloud 9 surf routes and Sohoton access",
    image: "/gallery/cloud9.webp",
  },
];

export default function Ecotourism() {
  const { data: siteCopy } = useSiteCopy();
  const copy = siteCopy?.ecotourism ?? defaultSiteCopy.ecotourism;

  return (
    <AnimatedPage>
      <PageHeader
        badge={copy.header.badge}
        title={copy.header.title}
        description={copy.header.description}
      />

      <Card className="border-border/60 shadow-md mb-8">
        <CardContent className="p-6 md:p-8 space-y-4">
          {copy.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed">{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              {copy.guideTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              {copy.guideItems.map((item, index) => {
                const Icon = [Waves, Hotel, Plane, Compass][index] ?? Compass;
                return <li key={item} className="flex items-center gap-2"><Icon className="w-4 h-4 text-primary" /> {item}</li>;
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent flex items-center gap-2">
              <Plane className="w-6 h-6 text-primary" />
              {copy.flightsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              {copy.flightItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent flex items-center gap-2">
              <Route className="w-6 h-6 text-primary" />
              {copy.routeTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-muted-foreground list-decimal pl-5">
              {copy.routeSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent flex items-center gap-2">
              <Palmtree className="w-6 h-6 text-primary" />
              {copy.contextTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              {copy.contextItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-3">
        <h2 className="text-3xl font-outfit text-accent">{copy.galleryTitle}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {featuredDestinations.map((destination) => (
          <Card key={destination.name} className="border-border/60 overflow-hidden hover-elevate">
            <img src={destination.image} alt={destination.name} className="w-full h-52 object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">{destination.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{destination.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedPage>
  );
}
