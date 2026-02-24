import { 
  Home, 
  Building2, 
  Sprout, 
  TreePine, 
  Handshake, 
  MapPin, 
  ShieldCheck, 
  Cpu, 
  HeartHandshake, 
  Users 
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard Overview", url: "/", icon: Home },
  { title: "About CADI", url: "/about", icon: Building2 },
  { title: "Nursery Operations", url: "/nursery", icon: Sprout },
  { title: "Plantation Operations", url: "/plantation", icon: TreePine },
  { title: "Client Services", url: "/services", icon: Handshake },
  { title: "Zambales Location", url: "/location", icon: MapPin },
  { title: "Compliance & Regs", url: "/compliance", icon: ShieldCheck },
  { title: "AI Technology", url: "/technology", icon: Cpu },
  { title: "Community Impact", url: "/impact", icon: HeartHandshake },
  { title: "Management Team", url: "/management", icon: Users },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar variant="inset" className="border-r border-border/50 bg-sidebar">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <TreePine className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg font-outfit leading-tight text-foreground">CADI</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Plantation Authority</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground tracking-wider mb-2 uppercase">
            Operations Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className="hover-elevate my-0.5 transition-all"
                  >
                    <Link href={item.url} className="flex items-center gap-3 py-2 px-3 rounded-md">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
