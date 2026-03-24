import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Layers, LeafyGreen, Tractor, ScanLine } from "lucide-react";
import { useGalleryMedia } from "@/hooks/use-gallery-media";
import { defaultInventoryValues } from "@/lib/publicInventory";
import { useNurseryStats } from "@/hooks/use-nursery-stats";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage, OptimizedVideo } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

const agarwoodLifecycle = [
  {
    title: "Years 0-2: Establishment",
    description:
      "Field planting, cassava shade support, irrigation setup, and structured nutrition management focus on strong root anchoring and early canopy development.",
  },
  {
    title: "Years 3-6: Monitoring & Maintenance",
    description:
      "Trees remain under scheduled pruning, weed suppression, and AI-assisted health monitoring while trunk and canopy mass build toward inoculation maturity.",
  },
  {
    title: "Years 7-8: Innoculation",
    description:
      "Aquilaria crassna enters the controlled inoculation phase, using documented technical protocols to induce resin formation in mature trees.",
  },
  {
    title: "Years 9-10: Harvest & Extraction",
    description:
      "Harvest and resin extraction are scheduled across years 9 and 10 under documented compliance workflows and controlled realization planning.",
  },
];

const mangoLifecycle = [
  {
    title: "Year 0: Grafting & Nursery",
    description:
      "Carabao-Elena hybrid mangoes are prepared on dwarf rootstock for high-density planting, with nursery conditioning aligned to the field rollout.",
  },
  {
    title: "Years 1-4: Establishment & Growth",
    description:
      "Young trees receive regular care, irrigation, pruning, induced flowering applications, and pest & disease management to build canopy structure and orchard stability.",
  },
  {
    title: "Years 5-9: Fruiting & Yield Ramp-Up",
    description:
      "First fruiting begins in year 5 at about 30 kg per tree, then ramps up annually through years 6 to 9 as productivity increases toward mature output.",
  },
  {
    title: "Years 10-25: Stable Production, Harvest & Sales",
    description:
      "Trees target about 100 kg per year under stable annual production, with flower induction supporting harvest cycles and output allocated across export and domestic sales.",
  },
];

export default function Plantation() {
  useNurseryStats();
  const { data: mediaItems = [] } = useGalleryMedia();
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.plantation;
  const font = createPageTypography(resolvedSiteCopy, "plantation");
  const plantationGalleryItems = mediaItems.filter((item) => item.category === "plantation");

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="plantation"
        siteCopy={resolvedSiteCopy}
      />

      {/* Land Preparation Photo Gallery */}
      <div className="mb-10 py-4">
        <h2 className={font("galleryTitle", "mb-3 text-[1.9rem] font-bold sm:text-3xl")}>{copy.galleryTitle}</h2>
        <p className={font("galleryDescription", "mb-8 text-base text-muted-foreground sm:text-lg")}>{copy.galleryDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plantationGalleryItems.map((item) => (
            <div key={item.id} className="rounded-2xl overflow-hidden border border-border/50 shadow-lg hover-elevate">
              <div className="aspect-video bg-muted relative">
                {item.mediaType === "video" ? (
                  <OptimizedVideo
                    src={item.mediaUrl}
                    poster={item.thumbnailUrl || undefined}
                    className="w-full h-full object-cover"
                    controls
                    preload="none"
                  />
                ) : (
                  <OptimizedImage
                    src={item.thumbnailUrl || item.mediaUrl}
                    alt={item.title}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4 bg-card">
                <p className="text-sm font-medium text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{new Date(item.date).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* July Out-Planting Timeline */}
      <div className="relative mb-16 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-8 md:p-12">
        <div className="relative z-10">
          <h2 className={font("milestoneTitle", "mb-4 text-[1.9rem] font-bold sm:text-3xl")}>{copy.milestoneTitle}</h2>
          <p className={font("milestoneDescription", "mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg")}>
            {copy.milestoneDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {copy.milestoneLabels.map((label, index) => (
              <div key={label} className="bg-background rounded-xl p-4 border border-border/50">
                <p className={font("milestoneLabels", "text-sm font-bold text-primary mb-1")}>{label}</p>
                <p className={font("milestoneValues", "text-2xl font-bold")}>{copy.milestoneValues[index] ?? ""}</p>
                <p className={font("milestoneNotes", "text-xs text-muted-foreground mt-1")}>{copy.milestoneNotes[index] ?? ""}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className={font("landPreparationTitle", "text-3xl font-bold mb-6 flex items-center gap-3")}>
            <Layers className="text-primary w-8 h-8" /> {copy.landPreparationTitle}
          </h3>
          <div className="space-y-6">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-muted p-2 rounded-lg shrink-0">
                    <Tractor className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className={font("soilProtocolTitle", "font-bold text-lg mb-2")}>{copy.soilProtocolTitle}</h4>
                    <p className={font("soilProtocolDescription", "text-sm text-muted-foreground leading-relaxed")}>
                      {copy.soilProtocolDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate bg-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-accent/20 p-2 rounded-lg shrink-0">
                    <LeafyGreen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className={font("cassavaTitle", "font-bold text-lg text-white mb-2")}>{copy.cassavaTitle}</h4>
                    <p className={font("cassavaDescription", "text-sm text-muted-foreground leading-relaxed")}>
                      {copy.cassavaDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className={font("lifecycleTitle", "text-3xl font-bold mb-6 flex items-center gap-3")}>
            <ScanLine className="text-primary w-8 h-8" /> {copy.lifecycleTitle}
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <LeafyGreen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className={font("agarwoodLabel", "font-bold text-xl text-foreground")}>{copy.agarwoodLabel}</h4>
                    <p className={font("agarwoodSubtitle", "text-sm text-muted-foreground")}>{copy.agarwoodSubtitle}</p>
                  </div>
                </div>
                <div className="relative border-l-2 border-border ml-4 space-y-8 pb-1">
                  {copy.agarwoodLifecycleTitles.map((title, index) => (
                    <div key={title} className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full bg-background -left-[9px] top-1 border-2 ${index === copy.agarwoodLifecycleTitles.length - 1 ? "border-accent" : "border-primary"}`}></div>
                      <h5 className={font("agarwoodLifecycleTitles", "font-bold text-lg text-foreground")}>{title}</h5>
                      <p className={font("agarwoodLifecycleDescriptions", "text-sm text-muted-foreground mt-2")}>{copy.agarwoodLifecycleDescriptions[index] ?? ""}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-accent/15 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className={font("mangoLabel", "font-bold text-xl text-foreground")}>{copy.mangoLabel}</h4>
                    <p className={font("mangoSubtitle", "text-sm text-muted-foreground")}>{copy.mangoSubtitle}</p>
                  </div>
                </div>
                <div className="relative border-l-2 border-border ml-4 space-y-8 pb-1">
                  {copy.mangoLifecycleTitles.map((title, index) => (
                    <div key={title} className="relative pl-8">
                      <div className={`absolute w-4 h-4 rounded-full bg-background -left-[9px] top-1 border-2 ${index === copy.mangoLifecycleTitles.length - 1 ? "border-accent" : "border-primary/60"}`}></div>
                      <h5 className={font("mangoLifecycleTitles", "font-bold text-lg text-foreground")}>{title}</h5>
                      <p className={font("mangoLifecycleDescriptions", "text-sm text-muted-foreground mt-2")}>{copy.mangoLifecycleDescriptions[index] ?? ""}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
