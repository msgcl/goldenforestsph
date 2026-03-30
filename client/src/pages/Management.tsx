import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTeamMembers } from "@/hooks/use-team-members";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { OptimizedImage } from "@/components/ui/optimized-media";
import { createPageTypography } from "@/lib/siteTypography";

export default function Management() {
  const { data: members, isLoading } = useTeamMembers();
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.management;
  const font = createPageTypography(resolvedSiteCopy, "management");
  type TeamMember = NonNullable<typeof members>[number];
  const toFormalSummary = (text: string | undefined) => {
    const cleaned = (text || "").replace(/\s+/g, " ").trim();
    if (!cleaned) return copy.fallbackDetailText;
    return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
  };

  // Group members by category
  const groupedMembers = members?.reduce((acc, member) => {
    if (!acc[member.category]) acc[member.category] = [];
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  const renderTeamCategory = (categoryName: string, title: string) => {
    const categoryMembers: TeamMember[] = groupedMembers?.[categoryName] || [];
    
    if (!isLoading && categoryMembers.length === 0) return null;

    return (
      <div className="mb-16">
        <h2 className={font("categoryTitles", "text-2xl font-bold mb-6 pb-2 border-b border-border/50")}>{title}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex h-full flex-col items-center p-5 text-center">
                  <Skeleton className="h-36 w-36 rounded-full" />
                  <div className="mt-5 w-full space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            categoryMembers.map((member) => (
              <Dialog key={member.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 cursor-pointer">
                    <CardContent className="flex flex-col items-center p-5 text-center sm:p-6">
                      <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-accent/35 bg-muted sm:h-40 sm:w-40">
                      <OptimizedImage
                        src={
                          member.imageUrl ||
                          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop"
                        }
                        alt={member.name}
                        sizes="160px"
                        className="h-full w-full object-cover bg-muted transition-transform duration-500 hover:scale-105"
                      />
                      </div>
                      <h3 className="mt-4 font-bold text-lg font-outfit text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium text-sm mt-1">{member.title}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[min(calc(100vw-3rem),48rem)]">
                  <DialogHeader>
                    <div className="mx-auto mb-3 h-40 w-40 overflow-hidden rounded-lg border border-accent/35 bg-muted sm:h-48 sm:w-48 md:h-52 md:w-52">
                      <OptimizedImage
                        src={
                          member.imageUrl ||
                          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop"
                        }
                        alt={member.name}
                        sizes="256px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <DialogTitle className="font-outfit text-2xl leading-tight [text-wrap:balance]">{member.name}</DialogTitle>
                    <DialogDescription className="text-primary font-medium leading-snug [text-wrap:balance]">{member.title}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 overflow-x-hidden pt-2">
                    <div className="flex gap-2 items-start">
                      <Briefcase className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className={font("fallbackDetailText", "text-sm text-muted-foreground leading-relaxed")}>
                        {toFormalSummary(member.experience)}
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className={font("fallbackDetailText", "text-sm text-muted-foreground leading-relaxed")}>
                        {toFormalSummary(member.expertise)}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <AnimatedPage>
      <PageHeader 
        badge={copy.header.badge}
        title={copy.header.title} 
        description={copy.header.description}
        pageKey="management"
        siteCopy={resolvedSiteCopy}
      />

      <p className={font("helperText", "mb-8 text-sm text-muted-foreground/80")}>
        {copy.helperText}
      </p>

      {renderTeamCategory("Executive Management", copy.categoryTitles[0] ?? "Executive Management")}
      {renderTeamCategory("Board of Directors", copy.categoryTitles[1] ?? "Board of Directors")}
      {renderTeamCategory("Senior Management", copy.categoryTitles[2] ?? "Senior Management")}
      
    </AnimatedPage>
  );
}

