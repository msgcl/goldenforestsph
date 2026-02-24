import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Layers, LeafyGreen, Tractor, Box, ScanLine } from "lucide-react";

export default function Plantation() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="Field Execution"
        title="Plantation Operations" 
        description="The scientific implementation of intercropped timber and fruit assets across our secure Zambales site."
      />

      {/* Out-Planting Target Hero */}
      <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-5">
          <Calendar className="w-64 h-64" />
        </div>
        <div className="flex-1 relative z-10">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Key Milestone</h2>
          <h3 className="text-4xl md:text-5xl font-outfit font-bold text-foreground mb-4">Target: July 2026</h3>
          <p className="text-lg text-muted-foreground max-w-xl">
            Commencement of massive out-planting operations coinciding with the optimal monsoon season window to ensure maximum survival and root establishment rates.
          </p>
        </div>
        <div className="bg-background shadow-xl rounded-2xl p-6 border border-border/50 text-center min-w-[200px] z-10">
          <div className="text-5xl font-black text-primary font-outfit mb-1">16</div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Months Away</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
            <Layers className="text-primary w-8 h-8" /> Land Preparation
          </h3>
          <div className="space-y-6">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-muted p-2 rounded-lg shrink-0">
                    <Tractor className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Soil Protocol</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Deep ripping and mechanical leveling. Construction of complex contour drainage and terracing to prevent soil erosion during heavy rains while capturing optimal surface moisture.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-muted p-2 rounded-lg shrink-0">
                    <Box className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Spacing Geometry</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><strong className="text-foreground">Agarwood (Timber):</strong> 3m x 2m grid configuration, yielding approximately 1,667 trees per hectare.</li>
                      <li><strong className="text-foreground">Mango (Fruit):</strong> 6m x 4m spacing, yielding 416 trees per hectare interspersed among the timber.</li>
                    </ul>
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
                    <h4 className="font-bold text-lg text-accent-foreground mb-2">Cassava Intercropping</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      During years 1-2, Cassava is planted between saplings to provide vital shade, fix nitrogen, and suppress weed growth. 100% of this harvest is donated to the local community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold font-outfit mb-6 flex items-center gap-3">
            <ScanLine className="text-primary w-8 h-8" /> Lifecycle Management
          </h3>
          <div className="relative border-l-2 border-border ml-4 space-y-8 pb-4">
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary -left-[9px] top-1"></div>
              <h4 className="font-bold text-lg font-outfit text-foreground">Years 0-2: Establishment</h4>
              <p className="text-sm text-muted-foreground mt-2">Intense weed control, regular NPK fertilization, and canopy shaping. Focus is entirely on rapid vegetative growth and root anchoring.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary/60 -left-[9px] top-1"></div>
              <h4 className="font-bold text-lg font-outfit text-foreground">Years 3-7: Monitoring & Fruit Yield</h4>
              <p className="text-sm text-muted-foreground mt-2">Dwarf Mango trees enter commercial fruiting (managed via chemical flower induction for year-round yield). Timber requires lower maintenance but continuous drone surveillance.</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-accent -left-[9px] top-1"></div>
              <h4 className="font-bold text-lg font-outfit text-foreground">Years 8-10: Inoculation & Harvest</h4>
              <p className="text-sm text-muted-foreground mt-2">Proprietary chemical inoculation of Aquilaria trees to trigger immune response (resin formation). Followed by highly secure, CITES-documented harvest and export logistics.</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
