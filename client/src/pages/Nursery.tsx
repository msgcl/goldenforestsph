import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Droplets, Bug, Microscope, ThermometerSun } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const growthData = [
  { month: "Jan", height: 12, target: 15 },
  { month: "Feb", height: 18, target: 20 },
  { month: "Mar", height: 25, target: 26 },
  { month: "Apr", height: 32, target: 32 },
  { month: "May", height: 42, target: 40 },
  { month: "Jun", height: 55, target: 50 },
];

export default function Nursery() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="Propagation Site"
        title="Nursery Operations" 
        description="Our state-of-the-art nursery facility establishes the critical foundation for the plantation, ensuring only premium, disease-resistant saplings graduate to the out-planting phase."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">Stock Propagation</h3>
          
          <Card className="hover-elevate shadow-sm overflow-hidden border-border/60">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-primary/5 p-6 flex flex-col items-center justify-center sm:w-1/3 border-b sm:border-b-0 sm:border-r border-border/50">
                <Sprout className="w-12 h-12 text-primary mb-3" />
                <span className="font-bold text-xl font-outfit text-center">Aquilaria<br/>crassna</span>
              </div>
              <div className="p-6 sm:w-2/3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We utilize DNA-accredited stock exclusively. Rigorous sorting protocols mean that weaker saplings are culled early. A 15% surplus buffer is maintained specifically to immediately replace any mortalities post-planting.
                </p>
              </div>
            </div>
          </Card>

          <Card className="hover-elevate shadow-sm overflow-hidden border-border/60">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-accent/5 p-6 flex flex-col items-center justify-center sm:w-1/3 border-b sm:border-b-0 sm:border-r border-border/50">
                <img src="/favicon.png" alt="Mango icon placeholder" className="w-10 h-10 opacity-20 mb-3 grayscale" />
                <span className="font-bold text-xl font-outfit text-center text-accent">Sweet Elena<br/>Mango</span>
              </div>
              <div className="p-6 sm:w-2/3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dwarf Sweet Elena Carabao Mango trees are propagated using advanced grafting techniques, accelerating the timeline to fruiting while managing canopy spread for the intercropping design.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">Growth Dashboard</h3>
          <Card className="shadow-md border-border/60 h-[calc(100%-3rem)] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Seedling Height Progression (cm)</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="height" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorHeight)" />
                  <Area type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4 text-xs justify-center">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm"></div> Actual Height</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-muted-foreground/30 border border-muted-foreground rounded-sm border-dashed"></div> Target Benchmark</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h3 className="text-2xl font-bold font-outfit text-foreground mb-6 mt-12">Nursery Technology Protocol</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Droplets, title: "Smart Irrigation", desc: "Automated moisture-based watering systems reduce water waste and prevent root rot." },
          { icon: ThermometerSun, title: "Climate Control", desc: "UV-filtered shade netting and ambient temperature regulation for optimized photosynthesis." },
          { icon: Bug, title: "Pest Management", desc: "Organic, preemptive prophylactic treatments to ensure robust disease resistance." },
          { icon: Microscope, title: "Soil Analytics", desc: "Continuous pH and macronutrient monitoring of custom substrate blends." }
        ].map((item, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm hover-elevate">
            <item.icon className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
}
