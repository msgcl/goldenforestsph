import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target } from "lucide-react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";

export default function About() {
  const { data: siteCopy } = useSiteCopy();
  const copy = siteCopy?.about ?? defaultSiteCopy.about;

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-border/50 shadow-md overflow-hidden">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-8">
            <Building2 className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-2xl font-bold font-outfit mb-4">{copy.overviewTitle}</h3>
            {copy.overviewParagraphs.map((paragraph, index) => (
              <p key={paragraph} className={`text-muted-foreground leading-relaxed ${index < copy.overviewParagraphs.length - 1 ? "mb-4" : ""}`}>
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-md overflow-hidden">
          <div className="h-2 bg-accent"></div>
          <CardContent className="p-8">
            <Target className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-2xl font-bold font-outfit mb-4">{copy.mandateTitle}</h3>
            <ul className="space-y-4 text-muted-foreground">
              {copy.mandateItems.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  );
}
