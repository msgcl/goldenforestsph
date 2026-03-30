import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotFound from "@/pages/not-found";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RealtimeContentSync } from "@/components/RealtimeContentSync";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Nursery from "@/pages/Nursery";
import Plantation from "@/pages/Plantation";
import ClientServices from "@/pages/ClientServices";
import Compliance from "@/pages/Compliance";
import Technology from "@/pages/Technology";
import Impact from "@/pages/Impact";
import Management from "@/pages/Management";
import PhotoGallery from "@/pages/PhotoGallery";
import Contact from "@/pages/Contact";
import AgarwoodLifeCycle from "@/pages/AgarwoodLifeCycle";
import MangoProgram from "@/pages/MangoProgram";
import PlantationVisit from "@/pages/PlantationVisit";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import logoImage from "@assets/logo.png";
import { OptimizedImage } from "@/components/ui/optimized-media";

function Router() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/nursery" component={Nursery} />
      <Route path="/plantation" component={Plantation} />
      <Route path="/services" component={ClientServices} />
      <Route path="/location" component={PlantationVisit} />
      <Route path="/compliance" component={Compliance} />
      <Route path="/technology" component={Technology} />
      <Route path="/impact" component={Impact} />
      <Route path="/management" component={Management} />
      <Route path="/agarwood-life-cycle" component={AgarwoodLifeCycle} />
      <Route path="/mango-program" component={MangoProgram} />
      <Route path="/plantation-visit" component={PlantationVisit} />
      <Route path="/ecotourism" component={PlantationVisit} />
      <Route path="/contact" component={Contact} />
      <Route path="/photo-gallery" component={PhotoGallery} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");
  const sidebarStyle = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <RealtimeContentSync />
      <TooltipProvider>
        {isAdminRoute ? (
          <main className="min-h-dvh bg-background">
            <Router />
          </main>
        ) : (
          <SidebarProvider defaultOpen={true} style={sidebarStyle}>
            <div className="relative flex h-dvh min-h-dvh w-full overflow-x-hidden bg-background">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,160,112,0.08),transparent_38%)]" />
              <AppSidebar />
              <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/92 px-4 py-3 backdrop-blur-xl sm:px-6">
                  <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <SidebarTrigger
                        data-testid="button-sidebar-toggle"
                        className="h-10 w-10 rounded-full border border-accent/25 bg-card text-[#17392E] shadow-sm dark:text-foreground"
                      />
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="flex h-10 w-10 items-center justify-center">
                          <OptimizedImage src={logoImage} alt="Golden Forests logo" priority sizes="26px" className="h-6.5 w-6.5 object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent [text-wrap:balance] sm:text-[0.68rem]">Plantation Management Portal</p>
                          <p className="text-xs font-medium text-[#17392E] dark:text-foreground [text-wrap:balance] sm:text-sm">Crassna Agroforestry Development Inc.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden items-center rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent sm:flex">
                        Powered by Golden Forests
                      </div>
                    </div>
                  </div>
                </header>
                <main id="app-scroll-container" className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
                  <ScrollToTop />
                  <Router />
                  <AppFooter />
                </main>
              </div>
            </div>
          </SidebarProvider>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
