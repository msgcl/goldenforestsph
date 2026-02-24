import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTeamMembers } from "@/hooks/use-team-members";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

export default function Management() {
  const { data: members, isLoading } = useTeamMembers();

  // Group members by category
  const groupedMembers = members?.reduce((acc, member) => {
    if (!acc[member.category]) acc[member.category] = [];
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, typeof members>);

  const renderTeamCategory = (categoryName: string, title: string) => {
    const categoryMembers = groupedMembers?.[categoryName] || [];
    
    if (!isLoading && categoryMembers.length === 0) return null;

    return (
      <div className="mb-16">
        <h2 className="text-2xl font-bold font-outfit mb-6 pb-2 border-b border-border/50">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            Array(2).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row h-full">
                  <Skeleton className="h-48 sm:h-auto sm:w-1/3 rounded-none" />
                  <div className="p-6 w-full space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            categoryMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover-elevate border-border/60 shadow-sm">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="bg-muted sm:w-1/3 min-h-[200px] relative border-b sm:border-b-0 sm:border-r border-border/50 overflow-hidden">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary text-4xl font-bold font-outfit">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:w-2/3 flex flex-col">
                    <h3 className="font-bold text-xl font-outfit text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-4">{member.title}</p>
                    
                    <div className="space-y-3 mt-auto">
                      <div className="flex gap-2 items-start">
                        <Briefcase className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{member.experience}</p>
                      </div>
                      <div className="flex gap-2 items-start">
                        <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{member.expertise}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <AnimatedPage>
      <PageHeader 
        badge="Leadership"
        title="Management Team" 
        description="Our operations are guided by a multi-disciplinary team combining decades of corporate governance, agricultural science, and large-scale operational logistics."
      />

      {renderTeamCategory("Executive Management", "Executive Management")}
      {renderTeamCategory("Board of Directors", "Board of Directors")}
      {renderTeamCategory("Senior Management", "Senior Management")}
      
    </AnimatedPage>
  );
}
