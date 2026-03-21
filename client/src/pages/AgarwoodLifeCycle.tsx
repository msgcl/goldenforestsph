import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";

export default function AgarwoodLifeCycle() {
  const { data: siteCopy } = useSiteCopy();
  const copy = siteCopy?.agarwoodLifeCycle ?? defaultSiteCopy.agarwoodLifeCycle;

  return (
    <AnimatedPage>
      <PageHeader
        badge={copy.header.badge}
        title={copy.header.title}
        description={copy.header.description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card className="border-border/60 hover-elevate">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent">{copy.overviewTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {copy.overviewPoints.map((point) => (
                <li key={point} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  • {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 hover-elevate">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent">{copy.commercialTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {copy.commercialPoints.map((point) => (
                <li key={point} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  • {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60 hover-elevate">
          <CardHeader>
            <CardTitle className="text-2xl font-outfit text-accent">{copy.insuranceTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              {copy.insuranceDescription}
            </p>
            <div className="grid grid-cols-1 gap-y-2">
              {copy.insurancePoints.map((risk) => (
                <p key={risk} className="text-sm text-muted-foreground">
                  • {risk}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-5">
        {copy.stageTitles.map((title, index) => (
          <Card key={title} className="border-border/60 hover-elevate">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-xl font-outfit text-accent">{title}</CardTitle>
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {copy.stagePeriods[index] ?? ""}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {copy.stageDetails[index] ?? ""}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedPage>
  );
}
