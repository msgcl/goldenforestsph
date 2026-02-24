import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Cpu, Wifi, Activity, CloudFog, Satellite, ShieldCheck } from "lucide-react";

export default function Technology() {
  return (
    <AnimatedPage>
      <PageHeader 
        badge="AI Precision Farming"
        title="Agroforestry Intelligence" 
        description="We are an agricultural technology operator, not just a farm. Data replaces guesswork, resulting in reduced mortality and predictable yields."
      />

      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-12 mb-16 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-64 h-64 text-primary" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-bold text-white font-outfit mb-6">The Technology Stack</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
            <div className="flex gap-4">
              <Satellite className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Agricultural Drones</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Multispectral imaging drones conduct weekly flyovers. NDVI (Normalized Difference Vegetation Index) data instantly identifies pest outbreaks or nutrient deficiencies before visible to the human eye.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Activity className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">IoT Soil Sensors</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Grid-deployed subterranean probes measuring moisture, pH, and NPK levels in real-time, feeding data directly to the central dashboard.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Wifi className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Smart Irrigation</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Valves open automatically based on algorithmic triggers from soil sensors, saving water and preventing devastating root rot.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <CloudFog className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Inoculation Formulas</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Proprietary, scientifically-balanced inducer formulas that guarantee 100% infection rate in Aquilaria, forcing maximum agarwood resin production.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold font-outfit mb-6">Operational Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "Drastic reduction in sapling mortality rates.",
          "Optimized water and fertilizer expenditure.",
          "Early-warning pest detection preventing mass crop loss.",
          "Highly accurate yield predictability for financial modeling.",
          "Verifiable audit trails for external stakeholders.",
          "Reduced reliance on unskilled manual labor."
        ].map((benefit, i) => (
          <div key={i} className="flex items-start gap-3 bg-card p-5 rounded-2xl border border-border/50 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground font-medium">{benefit}</p>
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
}
