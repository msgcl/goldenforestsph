import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, FileSpreadsheet, MapPin, PlaneTakeoff, ShieldCheck } from "lucide-react";

export default function ClientServices() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="Asset Administration"
        title="Client Services" 
        description="We provide institutional-grade tracking, reporting, and physical access for external stakeholders and biological asset owners."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="border-border/60 shadow-md hover-elevate">
          <CardContent className="p-8">
            <Fingerprint className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold font-outfit mb-3">Tree Ownership Administration</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every tree managed by CADI is individually cataloged in our secure database.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Unique serialized ID allocation</li>
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Physical GPS-coordinate tagging</li>
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Digital mapping portal access</li>
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Third-party audit verification</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-md hover-elevate">
          <CardContent className="p-8">
            <FileSpreadsheet className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-bold font-outfit mb-3">Reporting Framework</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We replace agricultural guesswork with corporate financial reporting standards.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Annual operational performance reports</li>
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Drone-survey visual attachments</li>
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Soil & mortality analytics summaries</li>
              <li className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> Updated yield & harvest projections</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-3xl overflow-hidden border border-border/60 shadow-lg flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-slate-900 p-8 flex flex-col justify-center relative">
          <PlaneTakeoff className="w-16 h-16 text-primary/80 mb-6" />
          <h3 className="text-3xl font-bold font-outfit text-white mb-4">Plantation Visit Programme</h3>
          <p className="text-slate-300 leading-relaxed z-10 relative">
            We operate a policy of absolute transparency. Asset owners are invited to inspect operations physically via our structured visitation programme.
          </p>
        </div>
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">Logistics</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The plantation is strategically located just 1.5 hours drive from Clark International Airport (CRK), making international or domestic arrivals highly efficient.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">Itinerary</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A standard 2-day programme includes site safety briefing, nursery tour, plantation grid inspection, AI systems demonstration, and management meetings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
