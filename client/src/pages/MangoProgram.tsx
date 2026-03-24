import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { createPageTypography } from "@/lib/siteTypography";

export default function MangoProgram() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.mangoProgram;
  const font = createPageTypography(resolvedSiteCopy, "mangoProgram");

  return (
    <AnimatedPage>
      <PageHeader
        badge={copy.header.badge}
        title={copy.header.title}
        description={copy.header.description}
        pageKey="mangoProgram"
        siteCopy={resolvedSiteCopy}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <Card className="border-border/60 hover-elevate">
          <CardHeader>
            <CardTitle className={font("overviewTitle", "text-2xl font-outfit text-accent")}>{copy.overviewTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={font("overviewPoints", "space-y-3")}>
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
            <CardTitle className={font("insuranceTitle", "text-2xl font-outfit text-accent")}>{copy.insuranceTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={font("insuranceDescription", "text-sm md:text-base text-muted-foreground leading-relaxed mb-4")}>
              {copy.insuranceDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {copy.insurancePoints.map((risk) => (
                <p key={risk} className={font("insurancePoints", "text-sm text-muted-foreground")}>
                  • {risk}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 mb-8 hover-elevate">
        <CardHeader>
          <CardTitle className={font("benefitsTitle", "text-2xl font-outfit text-accent")}>{copy.benefitsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className={font("benefitsPoints", "space-y-3")}>
            {copy.benefitsPoints.map((point) => (
              <li key={point} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                • {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border/60 hover-elevate">
        <CardHeader>
          <CardTitle className={font("snapshotTitle", "text-2xl font-outfit text-accent")}>{copy.snapshotTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {copy.snapshotLabels.map((label, index) => (
              <div key={`${label}-${index}`} className="rounded-xl border border-border/60 p-4 bg-card">
                <p className={font("snapshotLabels", "text-muted-foreground")}>{label}</p>
                <p className={font("snapshotValues", "text-foreground font-semibold")}>{copy.snapshotValues[index] ?? ""}</p>
              </div>
            ))}
          </div>
          <p className={font("snapshotFootnote", "text-xs text-muted-foreground")}>
            {copy.snapshotFootnote}
          </p>
        </CardContent>
      </Card>
    </AnimatedPage>
  );
}
