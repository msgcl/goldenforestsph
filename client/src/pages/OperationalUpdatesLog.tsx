import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { useOperationalUpdates } from "@/hooks/use-operational-updates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ArrowLeft, Search, Calendar, Tag, FileText } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { OptimizedImage } from "@/components/ui/optimized-media";

export default function OperationalUpdatesLog() {
  const { data: updates, isLoading } = useOperationalUpdates();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    if (!updates) return [];
    return Array.from(new Set(updates.map(u => u.category))).sort();
  }, [updates]);

  // Filter and search
  const filteredUpdates = useMemo(() => {
    if (!updates) return [];
    
    return updates.filter(update => {
      const matchesSearch = 
        update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || update.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [updates, searchQuery, selectedCategory]);

  return (
    <AnimatedPage>
      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <PageHeader 
          title="Operational Updates Log" 
          description="Complete history of nursery, plantation, and operational milestones"
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search updates by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Updates ({updates?.length || 0})
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({updates?.filter(u => u.category === category).length || 0})
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredUpdates.length} update{filteredUpdates.length !== 1 ? 's' : ''}
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading State
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardHeader>
            </Card>
          ))
        ) : filteredUpdates.length > 0 ? (
          filteredUpdates.map((update) => (
            <Card 
              key={update.id} 
              className="overflow-hidden hover:shadow-md transition-shadow border-border/50"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(update.date), "MMM dd, yyyy")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                        <Tag className="w-3 h-3" />
                        {update.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {update.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {update.description}
                    </p>
                  </div>
                  {update.imageUrl && (
                    <div className="md:w-48 h-40 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <OptimizedImage
                        src={update.imageUrl}
                        alt={update.title}
                        sizes="192px"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          // Empty State
          <Card className="border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No updates found
              </h3>
              <p className="text-muted-foreground text-sm">
                {searchQuery || selectedCategory 
                  ? "Try adjusting your search or filter criteria."
                  : "No operational updates have been posted yet."}
              </p>
              {(searchQuery || selectedCategory) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Summary Stats */}
      {!isLoading && updates && updates.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardDescription>Total Updates</CardDescription>
                <CardTitle className="text-3xl">{updates.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardDescription>Categories</CardDescription>
                <CardTitle className="text-3xl">{categories.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardDescription>Latest Update</CardDescription>
                <CardTitle className="text-base">
                  {updates.length > 0 
                    ? format(new Date(updates[0].date), "MMM dd, yyyy")
                    : "N/A"
                  }
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
}
