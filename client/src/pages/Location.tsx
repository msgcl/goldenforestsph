import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Plane, Route, Globe2 } from "lucide-react";
import { useMemo, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-media";

type GuideLocation = {
  id: string;
  name: string;
  group: "Zambales" | "Island Destination" | "Transit";
  lat: number;
  lng: number;
  summary: string;
  route: string;
  image: string;
  sourceUrl: string;
};

const FALLBACK_LOCATION_IMAGE =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop";

const locations: GuideLocation[] = [
  {
    id: "san-antonio",
    name: "San Antonio Beaches (Pundaquit, Anawangin, Nagsasa, Capones)",
    group: "Zambales",
    lat: 14.947,
    lng: 120.08,
    summary: "Primary Zambales beach cluster highlighted in the guide as a first stop from Manila.",
    route: "Manila -> San Antonio by bus/car",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Anawangin_Cove_at_Sunrise.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Anawangin_Cove_at_Sunrise.jpg",
  },
  {
    id: "botolan",
    name: "Sundowners Resort, Botolan",
    group: "Zambales",
    lat: 15.289,
    lng: 120.025,
    summary: "Northern Zambales resort destination included in the suggested overland route.",
    route: "San Antonio -> Botolan (northbound by road)",
    image: "https://lirp.cdn-website.com/b434b26a/dms3rep/multi/opt/pool-unnamed-4-71fc810d-1920w.jpeg",
    sourceUrl: "https://www.sundowners.ph/Zambales-About-Us",
  },
  {
    id: "clark",
    name: "Clark International Airport (CRK), Pampanga",
    group: "Transit",
    lat: 15.186,
    lng: 120.56,
    summary: "Main aviation hub in the guide; approximately 2 hours by car from Zambales route points.",
    route: "Botolan -> Clark International Airport",
    image: "https://upload.wikimedia.org/wikipedia/en/9/92/Clark_International_Airport_%28Mabalacat%2C_Pampanga%3B_04-22-2024%29.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Clark_International_Airport",
  },
  {
    id: "cebu",
    name: "Cebu (Mactan-Cebu International Airport, CEB)",
    group: "Island Destination",
    lat: 10.3157,
    lng: 123.8854,
    summary: "Direct flight destination from Clark; known for beaches and historic urban centers.",
    route: "Clark -> Cebu",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Osme%C3%B1a_Peak%2C_Cebu%2C_Philippines.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Cebu",
  },
  {
    id: "coron",
    name: "Coron / Busuanga (USU)",
    group: "Island Destination",
    lat: 12.0,
    lng: 120.2,
    summary: "Direct Clark route to the Coron gateway for lagoons and diving areas.",
    route: "Clark -> Busuanga (Coron)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Coron_skyline_Tapyas_%28Coron%2C_Palwan%3B_03-16-2024%29.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Coron,_Palawan",
  },
  {
    id: "boracay",
    name: "Boracay via Caticlan (MPH)",
    group: "Island Destination",
    lat: 11.9674,
    lng: 121.9248,
    summary: "Clark flight route to Caticlan followed by short boat transfer to Boracay.",
    route: "Clark -> Caticlan -> Boracay",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Boracay_White_Beach.png",
    sourceUrl: "https://en.wikipedia.org/wiki/Boracay",
  },
  {
    id: "bohol",
    name: "Bohol (Bohol-Panglao International Airport, TAG)",
    group: "Island Destination",
    lat: 9.578,
    lng: 123.745,
    summary: "Direct Clark route for access to Bohol's beaches and inland natural attractions.",
    route: "Clark -> Bohol-Panglao",
    image: "https://res.cloudinary.com/dz49fckfu/image/upload/v1774352808/golden-forests/ecotourism-bohol.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Bohol",
  },
  {
    id: "elnido",
    name: "El Nido, Palawan (ENI)",
    group: "Island Destination",
    lat: 11.202,
    lng: 119.417,
    summary: "Direct access route to Palawan's limestone cliffs, lagoons, and island-hopping zones.",
    route: "Clark -> El Nido",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/El_Nido_Bay_December_2018.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/El_Nido,_Palawan",
  },
  {
    id: "surigao",
    name: "Surigao (SUG) / Siargao Gateway",
    group: "Island Destination",
    lat: 9.789,
    lng: 125.495,
    summary: "Clark-linked route to Surigao for onward access to Siargao and Sohoton areas.",
    route: "Clark -> Surigao",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Cloud_9_Boardwalk%2C_Siargao.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cloud_9_Boardwalk,_Siargao.jpg",
  },
  {
    id: "manila",
    name: "Metro Manila (Suggested starting point)",
    group: "Transit",
    lat: 14.5995,
    lng: 120.9842,
    summary: "Guide-recommended starting region before heading north to Zambales.",
    route: "Start -> Manila -> San Antonio",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Cityscape_of_Manila%2C_2025_%2801%29.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Manila",
  },
];

export default function Location() {
  const [activeLocationId, setActiveLocationId] = useState("san-antonio");
  const active = useMemo(
    () => locations.find((location) => location.id === activeLocationId) ?? locations[0],
    [activeLocationId]
  );

  const focusMapSrc = useMemo(() => {
    const coordinateQuery = encodeURIComponent(`loc:${active.lat},${active.lng}`);
    return `https://maps.google.com/maps?hl=en&q=${coordinateQuery}&t=h&z=10&ie=UTF8&output=embed`;
  }, [active.lat, active.lng]);

  return (
    <AnimatedPage>
      <PageHeader
        badge="Strategic Geography"
        title="Zambales & Key Island Destinations"
        description="Based on Appendix E: A Visual Guide for Exploring Zambales and Key Island Destinations in the Philippines. Select a location to update the map and view route context."
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card p-4">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
              Google Hybrid Satellite
            </p>
            <label htmlFor="location-focus" className="text-sm text-muted-foreground block mb-2">
              Focus Location (Philippines only)
            </label>
            <select
              id="location-focus"
              value={activeLocationId}
              onChange={(e) => setActiveLocationId(e.target.value)}
              className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border/60 bg-card">
            <div className="px-4 pt-4">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">Selected Location Focus</p>
            </div>
            <iframe
              title={`Map - ${active.name}`}
              src={focusMapSrc}
              className="w-full h-[320px]"
              loading="lazy"
            />
          </div>
        </div>

        <Card className="shadow-sm border-border/60 overflow-hidden">
          <OptimizedImage
            src={active.image}
            alt={active.name}
            priority
            sizes="(min-width: 1280px) 33vw, 100vw"
            className="w-full h-48 object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_LOCATION_IMAGE) {
                e.currentTarget.src = FALLBACK_LOCATION_IMAGE;
              }
            }}
          />
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{active.group}</p>
            <h3 className="text-xl font-outfit text-accent mb-2">{active.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{active.summary}</p>
            <p className="text-sm text-foreground">
              <span className="font-semibold text-primary">Route:</span> {active.route}
            </p>
            <a
              className="inline-flex mt-4 text-sm text-primary hover:underline"
              href={`https://www.google.com/maps?q=${active.lat},${active.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
            <a
              className="inline-flex mt-2 text-xs text-muted-foreground hover:text-foreground hover:underline"
              href={active.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: "0.75rem" }}
            >
              Image source
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-3xl p-8 md:p-10 mb-10">
        <h2 className="text-3xl font-bold font-outfit text-accent mb-6">Coverage From the Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Zambales Highlights
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Beaches in San Antonio: Pundaquit, Anawangin, Nagsasa, Capones</li>
              <li>• Sundowners Resort in Botolan</li>
              <li>• Clark International Airport (CRK) as the key flight connector</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              Clark Flight Destinations
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Cebu (CEB)</li>
              <li>• Coron/Busuanga (USU)</li>
              <li>• Boracay/Caticlan (MPH)</li>
              <li>• Bohol-Panglao (TAG)</li>
              <li>• El Nido (ENI)</li>
              <li>• Surigao (SUG)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <Card className="shadow-sm border-border/60">
          <CardContent className="p-6">
            <h3 className="text-2xl font-outfit text-accent mb-4 flex items-center gap-2">
              <Route className="w-6 h-6 text-primary" />
              Suggested Route from Manila
            </h3>
            <ol className="space-y-3 text-muted-foreground list-decimal pl-5">
              <li>Travel north from Metro Manila to San Antonio, Zambales.</li>
              <li>Visit San Antonio beaches: Pundaquit, Anawangin, Nagsasa, and Capones.</li>
              <li>Continue north to Botolan for Sundowners Zambales.</li>
              <li>Travel east to Clark International Airport (about 2 hours by car).</li>
              <li>Fly onward to your selected island destination from Clark.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-6">
            <h3 className="text-2xl font-outfit text-accent mb-4 flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-primary" />
              Travel Context
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• The guide positions Zambales as a combined agro-operations and ecotourism gateway.</li>
              <li>• CRK is presented as the practical connector to major Philippine leisure islands.</li>
              <li>• Route design supports multi-stop travel planning: Zambales coast + island flights.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  );
}
