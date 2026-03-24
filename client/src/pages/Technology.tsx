import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Cpu, Wifi, Activity, CloudFog, Satellite, ShieldCheck } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { createPageTypography } from "@/lib/siteTypography";

export default function Technology() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.technology;
  const font = createPageTypography(resolvedSiteCopy, "technology");
  const stackIcons = [Satellite, Activity, Wifi, CloudFog];

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="technology"
        siteCopy={resolvedSiteCopy}
      />

      <div className="relative rounded-3xl overflow-hidden border border-[#2B6A55] bg-[#17392E] p-8 md:p-12 mb-16 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-64 h-64 text-accent" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h2 className={font("stackTitle", "text-3xl font-bold text-accent font-outfit mb-6")}>{copy.stackTitle}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
            {copy.stackTitles.map((title, index) => {
              const Icon = stackIcons[index] ?? Cpu;
              return (
                <div key={title} className="flex gap-4">
                  <Icon className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <h4 className={font("stackTitles", "text-slate-100 font-bold mb-1")}>{title}</h4>
                    <p className={font("stackDescriptions", "text-slate-300 text-sm leading-relaxed")}>{copy.stackDescriptions[index] ?? ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <h3 className={font("benefitsTitle", "text-2xl font-bold font-outfit mb-6")}>{copy.benefitsTitle}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {copy.benefits.map((benefit) => (
          <div key={benefit} className="flex items-start gap-3 bg-card p-5 rounded-2xl border border-border/50 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className={font("benefits", "text-sm text-foreground font-medium")}>{benefit}</p>
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
}
