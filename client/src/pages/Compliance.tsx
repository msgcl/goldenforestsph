import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FileCheck2, Scale, ScrollText } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { createPageTypography } from "@/lib/siteTypography";

export default function Compliance() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.compliance;
  const font = createPageTypography(resolvedSiteCopy, "compliance");
  const complianceIcons = [ScrollText, Scale, FileCheck2, ShieldCheck];

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="compliance"
        siteCopy={resolvedSiteCopy}
      />

      <div className="bg-accent/10 border-2 border-accent/25 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className={font("heroTitle", "text-3xl font-bold font-outfit mb-4 text-accent")}>{copy.heroTitle}</h2>
          <p className={font("heroDescription", "text-lg text-foreground/85 leading-relaxed max-w-3xl mb-6")}>
            {copy.heroDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.highlightItems.map((item) => (
              <div key={item} className="bg-background rounded-lg p-4 border border-accent/25">
                <p className={font("highlightItems", "font-bold text-accent text-sm")}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {copy.complianceTitles.map((title, i) => {
          const Icon = complianceIcons[i] ?? ShieldCheck;
          const description = copy.complianceDescriptions[i] ?? "";
          return (
          <Card key={title} className="hover-elevate shadow-sm border-border/60">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-muted p-3 rounded-xl">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className={font("complianceTitles", "text-xl font-bold font-outfit mb-2")}>{title}</h3>
                  <p className={font("complianceDescriptions", "text-muted-foreground text-sm leading-relaxed")}>{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>

      <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-md">
        <h3 className={font("mandatesTitle", "text-2xl font-bold font-outfit mb-6")}>{copy.mandatesTitle}</h3>
        
        <div className="space-y-8">
          {copy.mandateTitles.map((title, index) => {
            const borderClass = index === 0 ? "border-accent" : index === 1 ? "border-primary" : "border-foreground/20";
            return (
              <div key={title} className={`border-l-4 ${borderClass} pl-6`}>
                <h4 className={font("mandateTitles", "font-bold text-lg mb-2")}>{title}</h4>
                <p className={font("mandateDescriptions", "text-muted-foreground text-sm leading-relaxed max-w-3xl")}>
                  {copy.mandateDescriptions[index] ?? ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedPage>
  );
}
