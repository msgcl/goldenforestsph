import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Plane, Compass, CloudRain, Sun, Trees } from "lucide-react";

export default function Location() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="Strategic Geography"
        title="Zambales Location" 
        description="Our operations are based in Southern Zambales, specifically selected for its perfect convergence of agro-climatic conditions and logistical infrastructure."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Map placeholder */}
          <div className="rounded-3xl overflow-hidden bg-muted border border-border/50 aspect-video relative flex items-center justify-center">
            {/* abstract map background */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&fit=crop" 
              alt="Map view" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="relative z-10 bg-background/90 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl text-center">
              <Map className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold font-outfit text-xl mb-1">Southern Zambales</h3>
              <p className="text-sm text-muted-foreground">Coordinates secured</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <Compass className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-lg mb-2">Logistical Hub</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 1.5 hrs from Clark Int. Airport (CRK)</li>
                  <li>• 4 hrs drive from Metro Manila</li>
                  <li>• Direct heavy-vehicle highway access</li>
                  <li>• Proximity to Subic Bay seaport</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <CloudRain className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-lg mb-2">Agro-Climatic Profile</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2"><Sun className="w-4 h-4"/> Prolonged dry season (Dec-Apr)</li>
                  <li className="flex items-center gap-2"><CloudRain className="w-4 h-4"/> Rainfall: 1500-2500mm annually</li>
                  <li className="flex items-center gap-2"><Trees className="w-4 h-4"/> Well-draining, slightly acidic soil</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-md">
            <Plane className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-2xl font-bold font-outfit mb-4">Ecotourism Integration</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              A key component of our client offering is the ability to merge asset inspection with world-class Philippine tourism. Zambales acts as the perfect gateway.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <h5 className="font-bold text-foreground text-sm mb-1">Local Proximity</h5>
                <p className="text-xs text-muted-foreground">Minutes from the famous pristine beaches of San Antonio and the luxury Sundowners resorts in Botolan.</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <h5 className="font-bold text-foreground text-sm mb-1">Clark Airport Hub</h5>
                <p className="text-xs text-muted-foreground">Just 90 minutes away, offering cheap, direct flights to:</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Boracay', 'Palawan (El Nido)', 'Cebu', 'Bohol', 'Siargao'].map(dest => (
                    <span key={dest} className="text-[10px] uppercase tracking-wider font-bold bg-background border border-border px-2 py-1 rounded-md">{dest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
