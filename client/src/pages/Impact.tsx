import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { TreePine, Users, Sprout, Heart } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

export default function Impact() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.impact;
  const font = createPageTypography(resolvedSiteCopy, "impact");

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="impact"
        siteCopy={resolvedSiteCopy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="hover-elevate overflow-hidden border-border/60">
          <div className="h-48 bg-muted relative flex items-center justify-center">
            {/* abstract green forest */}
            <OptimizedImage
              src="https://res.cloudinary.com/dz49fckfu/image/upload/v1774352599/golden-forests/impact-reforestation.jpg"
              alt="Reforestation" 
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            <TreePine className="relative z-10 w-16 h-16 text-foreground drop-shadow-lg" />
          </div>
          <CardContent className="p-8">
            <h3 className={font("cardTitles", "text-2xl font-bold font-outfit mb-3")}>{copy.cardTitles[0] ?? ""}</h3>
            <p className={font("cardDescriptions", "text-muted-foreground leading-relaxed text-sm")}>
              {copy.cardDescriptions[0] ?? ""}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate overflow-hidden border-border/60">
          <div className="h-48 bg-muted relative flex items-center justify-center">
             <OptimizedImage
              src="https://res.cloudinary.com/dz49fckfu/image/upload/v1774352603/golden-forests/impact-local-employment.png"
              alt="Community" 
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-accent/20 mix-blend-multiply"></div>
            <Users className="relative z-10 w-16 h-16 text-foreground drop-shadow-lg" />
          </div>
          <CardContent className="p-8">
            <h3 className={font("cardTitles", "text-2xl font-bold font-outfit mb-3")}>{copy.cardTitles[1] ?? ""}</h3>
            <p className={font("cardDescriptions", "text-muted-foreground leading-relaxed text-sm")}>
              {copy.cardDescriptions[1] ?? ""}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shrink-0 shadow-lg border border-accent/20">
          <Heart className="w-10 h-10 text-accent" />
        </div>
        <div>
          <h3 className={font("standardsTitle", "text-2xl font-bold font-outfit mb-2 text-foreground")}>{copy.standardsTitle}</h3>
          <p className={font("standardsDescription", "text-muted-foreground leading-relaxed")}>
            {copy.standardsDescription}
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
}

