import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotFound from "@/pages/not-found";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Nursery from "@/pages/Nursery";
import Plantation from "@/pages/Plantation";
import ClientServices from "@/pages/ClientServices";
import Location from "@/pages/Location";
import Compliance from "@/pages/Compliance";
import Technology from "@/pages/Technology";
import Impact from "@/pages/Impact";
import Management from "@/pages/Management";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/nursery" component={Nursery} />
      <Route path="/plantation" component={Plantation} />
      <Route path="/services" component={ClientServices} />
      <Route path="/location" component={Location} />
      <Route path="/compliance" component={Compliance} />
      <Route path="/technology" component={Technology} />
      <Route path="/impact" component={Impact} />
      <Route path="/management" component={Management} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const sidebarStyle = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={sidebarStyle}>
          <div className="flex h-screen w-full bg-background overflow-hidden">
            <AppSidebar />
            <div className="flex flex-col flex-1 relative overflow-hidden">
              <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b border-border/50">
                <SidebarTrigger data-testid="button-sidebar-toggle" className="hover-elevate bg-card border border-border shadow-sm" />
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 overflow-y-auto pt-16 scroll-smooth">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
