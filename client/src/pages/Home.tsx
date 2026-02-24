import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { useNurseryStats, useOperationalUpdates } from "@/hooks/use-nursery-stats";
import { useOperationalUpdates as useOps } from "@/hooks/use-operational-updates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight, Leaf, Shield, LineChart, ShieldCheck, Cpu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useNurseryStats();
  const { data: updates, isLoading: updatesLoading } = useOps();

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-12 shadow-xl shadow-black/10 border border-border/50 bg-card">
        <div className="absolute inset-0 z-0">
          {/* landing page hero scenic forest landscape */}
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=1080&fit=crop" 
            alt="Zambales Plantation" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 dark:from-background dark:via-background/90 dark:to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-8 py-16 md:py-24 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 border border-primary/20">
            Plantation Management Authority – Philippines
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-outfit tracking-tighter leading-[1.1]">
            Crassna Agroforestry <br/>
            <span className="text-primary">Development Inc.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Leading the professional standard for Aquilaria crassna and Sweet Elena Mango plantation management in Zambales, Philippines through AI precision farming and transparent operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/20 px-8">
              <Link href="/plantation">View Plantation Timeline</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl bg-background/50 backdrop-blur-md">
              <Link href="/nursery">Nursery Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Real-time Stats Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-outfit flex items-center gap-2">
              <LineChart className="w-6 h-6 text-primary" /> 
              Live Nursery Metrics
            </h2>
            <Link href="/nursery" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              Full Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover-elevate border-primary/10 bg-primary/5">
              <CardHeader className="pb-2">
                <CardDescription className="font-semibold text-primary">Agarwood Seedlings</CardDescription>
                <CardTitle className="text-4xl font-outfit">
                  {statsLoading ? <Skeleton className="h-10 w-24" /> : (stats?.agarwoodSeedlings?.toLocaleString() || "45,000")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Currently in propagation</p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate border-accent/10 bg-accent/5">
              <CardHeader className="pb-2">
                <CardDescription className="font-semibold text-accent">Mango Seedlings</CardDescription>
                <CardTitle className="text-4xl font-outfit">
                  {statsLoading ? <Skeleton className="h-10 w-24" /> : (stats?.mangoSeedlings?.toLocaleString() || "12,500")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Sweet Elena Dwarf Carabao</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover-elevate shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Average Height</CardDescription>
                <CardTitle className="text-2xl">{statsLoading ? <Skeleton className="h-8 w-16" /> : (stats?.averageHeight || "42 cm")}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="hover-elevate shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Mortality Rate</CardDescription>
                <CardTitle className="text-2xl text-green-600">{statsLoading ? <Skeleton className="h-8 w-16" /> : (stats?.mortalityRate || "1.2%")}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="hover-elevate shadow-sm bg-secondary border-none">
              <CardHeader className="pb-2">
                <CardDescription>Out-Planting Target</CardDescription>
                <CardTitle className="text-2xl text-foreground">Jul 2026</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Operational Updates Log */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-outfit">Latest Updates</h2>
          </div>
          
          <Card className="h-[400px] flex flex-col shadow-md border-border/60 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-0">
              {updatesLoading ? (
                <div className="p-6 space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ))}
                </div>
              ) : updates && updates.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {updates.slice(0, 4).map((update) => (
                    <div key={update.id} className="p-5 hover:bg-muted/50 transition-colors">
                      <span className="text-xs font-semibold text-primary mb-1 block">
                        {format(new Date(update.date), "MMM dd, yyyy")} • {update.category}
                      </span>
                      <h4 className="font-semibold text-foreground mb-1">{update.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{update.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <Leaf className="w-12 h-12 mb-3 opacity-20" />
                  <p>No recent updates posted.</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border/50 bg-muted/20">
              <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                View Log <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover-elevate">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2">Regulatory Compliance</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Full adherence to DENR and CITES frameworks ensuring legally verifiable export pathways and audited governance.</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover-elevate">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2">AI Precision Farming</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Integrated drone monitoring, IoT soil sensors, and intelligent irrigation for predictable, optimized yield management.</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover-elevate">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2">Verified Transparency</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Every biological asset is GPS-tagged and tracked, creating measurable transparency for structured institutional oversight.</p>
        </div>
      </div>
    </AnimatedPage>
  );
}
