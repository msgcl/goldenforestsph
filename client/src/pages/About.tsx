import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Globe2, Network, Target, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="Corporate Profile"
        title="About CADI" 
        description="Crassna Agroforestry Development Incorporated (CADI) is the designated operational authority managing institutional-grade agroforestry assets within the Philippines."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-border/50 shadow-md overflow-hidden">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-8">
            <Building2 className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-2xl font-bold font-outfit mb-4">Corporate Overview</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Registered as a Philippine corporation with its head office located in the Bonifacio Global City (BGC) financial district, CADI operates as the central management hub for large-scale timber and fruit plantation operations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As a core operational entity within the broader Golden Forests Group ecosystem, CADI guarantees that ground-level agricultural execution aligns precisely with international institutional standards.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-md overflow-hidden">
          <div className="h-2 bg-accent"></div>
          <CardContent className="p-8">
            <Target className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-2xl font-bold font-outfit mb-4">Operating Mandate</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                <p><strong className="text-foreground font-semibold">Lifecycle Management:</strong> Complete end-to-end administration of biological assets from nursery propagation through to commercial harvest.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                <p><strong className="text-foreground font-semibold">Regulatory Compliance:</strong> Secure navigation of DENR, CITES, and export frameworks.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                <p><strong className="text-foreground font-semibold">Technological Implementation:</strong> Deployment of AI and precision agriculture methodologies.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold font-outfit mb-8 flex items-center gap-3">
          <Network className="text-primary" /> Governance Structure
        </h2>
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Globe2 className="w-64 h-64" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            
            {/* Holding Level */}
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl text-center shadow-sm">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Corporate Holding</h4>
              <p className="text-xl font-bold text-foreground font-outfit">ADGM Holding</p>
              <p className="text-sm text-muted-foreground mt-1">Abu Dhabi</p>
            </div>
            
            <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground shrink-0" />
            <div className="md:hidden w-1 h-8 bg-muted-foreground/30 my-2"></div>
            
            {/* Sales Level */}
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl text-center shadow-sm">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Global Distribution</h4>
              <p className="text-xl font-bold text-foreground font-outfit">Dubai Sales Office</p>
              <p className="text-sm text-muted-foreground mt-1">UAE</p>
            </div>

            <ArrowRight className="hidden md:block w-8 h-8 text-primary shrink-0" />
            <div className="md:hidden w-1 h-8 bg-primary/50 my-2"></div>

            {/* Operations Level */}
            <div className="flex-1 w-full bg-primary/10 border-2 border-primary p-6 rounded-xl text-center shadow-md relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full animate-pulse"></div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Plantation Execution</h4>
              <p className="text-xl font-bold text-primary-foreground dark:text-primary font-outfit">CADI Operations</p>
              <p className="text-sm font-medium text-primary/80 mt-1">Philippines</p>
            </div>

          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
