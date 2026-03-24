import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, FileSpreadsheet, MapPin, PlaneTakeoff, ShieldCheck, Calendar } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { createPageTypography } from "@/lib/siteTypography";

export default function ClientServices() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.clientServices;
  const font = createPageTypography(resolvedSiteCopy, "clientServices");

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="clientServices"
        siteCopy={resolvedSiteCopy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="border-border/60 shadow-md hover-elevate">
          <CardContent className="p-8">
            <Fingerprint className="w-12 h-12 text-primary mb-6" />
            <h3 className={font("serviceTitles", "text-2xl font-bold font-outfit mb-3")}>{copy.serviceTitles[0] ?? ""}</h3>
            <p className={font("serviceDescriptions", "text-muted-foreground mb-6 leading-relaxed")}>
              {copy.serviceDescriptions[0] ?? ""}
            </p>
            <ul className={font("serviceBullets", "space-y-3 text-sm text-muted-foreground")}>
              {(copy.serviceBullets[0] ?? []).map((item) => (
                <li key={item} className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-md hover-elevate">
          <CardContent className="p-8">
            <FileSpreadsheet className="w-12 h-12 text-primary mb-6" />
            <h3 className={font("serviceTitles", "text-2xl font-bold font-outfit mb-3")}>{copy.serviceTitles[1] ?? ""}</h3>
            <p className={font("serviceDescriptions", "text-muted-foreground mb-6 leading-relaxed")}>
              {copy.serviceDescriptions[1] ?? ""}
            </p>
            <ul className={font("serviceBullets", "space-y-3 text-sm text-muted-foreground")}>
              {(copy.serviceBullets[1] ?? []).map((item) => (
                <li key={item} className="flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-primary" /> {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-3xl overflow-hidden border border-border/60 shadow-lg flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-[#17392E] p-8 flex flex-col justify-center relative">
          <PlaneTakeoff className="w-16 h-16 text-accent mb-6" />
          <h3 className={font("visitationTitle", "text-3xl font-bold font-outfit text-accent mb-4")}>{copy.visitationTitle}</h3>
          <p className={font("visitationDescription", "text-sm text-muted-foreground leading-relaxed z-10 relative")}>
            {copy.visitationDescription}
          </p>
        </div>
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h4 className={font("logisticsTitle", "font-bold text-foreground")}>{copy.logisticsTitle}</h4>
              </div>
              <p className={font("logisticsDescription", "text-sm text-muted-foreground leading-relaxed")}>
                {copy.logisticsDescription}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className={font("itineraryTitle", "font-bold text-foreground")}>{copy.itineraryTitle}</h4>
              </div>
              <p className={font("itineraryDescription", "text-sm text-muted-foreground leading-relaxed")}>
                {copy.itineraryDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
