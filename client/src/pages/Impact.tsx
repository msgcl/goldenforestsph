import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { TreePine, Users, Sprout, Heart } from "lucide-react";

export default function Impact() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="Community & Environment"
        title="Positive Impact" 
        description="Commercial success is inherently tied to environmental stewardship and the uplifting of our host communities in Zambales."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="hover-elevate overflow-hidden border-border/60">
          <div className="h-48 bg-muted relative flex items-center justify-center">
            {/* abstract green forest */}
            <img 
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop" 
              alt="Reforestation" 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            <TreePine className="relative z-10 w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold font-outfit mb-3">1:1 Reforestation Programme</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              For every commercial tree planted, CADI commits to planting one native tree species (such as Narra, Molave, or Agoho) in designated degraded watershed areas surrounding the plantation. This actively restores local biodiversity while executing our commercial mandate.
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate overflow-hidden border-border/60">
          <div className="h-48 bg-muted relative flex items-center justify-center">
             {/* abstract community/farming */}
             <img 
              src="https://images.unsplash.com/photo-1595804369076-218206584284?w=800&fit=crop" 
              alt="Community" 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-accent/20 mix-blend-multiply"></div>
            <Users className="relative z-10 w-16 h-16 text-white drop-shadow-lg" />
          </div>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold font-outfit mb-3">Local Employment & Training</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We exclusively hire from the local Zambales barangays. More importantly, we provide upskilling—transitioning traditional manual laborers into technicians capable of operating smart irrigation systems and reading sensor data.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shrink-0 shadow-lg border border-accent/20">
          <Heart className="w-10 h-10 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-outfit mb-2 text-foreground">Cassava Intercropping Donation</h3>
          <p className="text-muted-foreground leading-relaxed">
            During the critical first two years of sapling establishment, cassava is utilized as a cover crop. Rather than monetizing this secondary harvest, 100% of the cassava yield is harvested and donated directly to local community food banks and cooperative feeding programs.
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
}
