import { 
  Home, 
  Building2, 
  Sprout, 
  TreePine, 
  Handshake, 
  ShieldCheck, 
  Cpu, 
  HeartHandshake, 
  Users,
  ImageIcon,
  PhoneCall,
  LeafyGreen,
  Apple,
  Palmtree
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { OptimizedImage } from "@/components/ui/optimized-media";
import logoImage from "@assets/logo.png";

const navigationGroups = [
  {
    label: "Overview",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "About", url: "/about", icon: Building2 },
      { title: "Management", url: "/management", icon: Users },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Nursery Operations", url: "/nursery", icon: Sprout },
      { title: "Plantation Operations", url: "/plantation", icon: TreePine },
      { title: "Compliance & Regs", url: "/compliance", icon: ShieldCheck },
      { title: "AI Technology", url: "/technology", icon: Cpu },
    ],
  },
  {
    label: "Programs",
    items: [
      { title: "Agarwood Programme", url: "/agarwood-life-cycle", icon: LeafyGreen },
      { title: "Mango Programme", url: "/mango-program", icon: Apple },
      { title: "Plantation Visit", url: "/plantation-visit", icon: Palmtree },
      { title: "Community Impact", url: "/impact", icon: HeartHandshake },
    ],
  },
  {
    label: "Client & Media",
    items: [
      { title: "Client Services", url: "/services", icon: Handshake },
      { title: "Contact Us", url: "/contact", icon: PhoneCall },
      { title: "Photo Gallery", url: "/photo-gallery", icon: ImageIcon },
    ],
  },
  {
    label: "Sales & Marketing",
    items: [
      { title: "Visit Portal", url: "https://www.goldenforests.ai/", icon: Handshake, external: true },
    ],
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  const isItemActive = (url: string, external?: boolean) =>
    external ? false : url === "/" ? location === "/" : location.startsWith(url);

  return (
    <Sidebar variant="inset" className="bg-transparent">
      <SidebarHeader className="border-b border-white/8 p-4">
        <div className="flex items-center justify-center rounded-[1.5rem] border border-[#C8A070]/18 bg-white/5 px-3 py-5 shadow-inner shadow-black/10">
          <Link href="/" className="inline-flex flex-col items-center justify-center gap-0.5">
            <OptimizedImage
              src={logoImage}
              alt="Golden Forests Agroforestry Intelligence"
              priority
              sizes="56px"
              className="h-14 w-auto max-w-full object-contain drop-shadow-sm"
            />
            <span className="mt-1.5 font-outfit text-[15px] leading-tight font-semibold tracking-[0.12em] text-[#C8A070] [text-wrap:balance]">
              GOLDEN FORESTS
            </span>
            <span className="mt-1 text-[10px] leading-tight text-[#FBFCF7]/85 [text-wrap:balance]">
              Crassna Agroforestry Development Inc.
            </span>
            <span className="mt-1 text-[8.5px] leading-tight text-[#FBFCF7]/62 uppercase tracking-[0.12em] [text-wrap:balance]">
              Plantation Management
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto py-3">
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1">
            <SidebarGroupLabel className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C8A070]/88">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isItemActive(item.url, "external" in item ? item.external : false)}
                      className="my-0 rounded-xl transition-all data-[active=true]:bg-white/10 data-[active=true]:shadow-sm"
                    >
                      {"external" in item && item.external ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                          onClick={() => {
                            if (isMobile) {
                              setOpenMobile(false);
                            }
                          }}
                        >
                          <item.icon className="h-3.5 w-3.5 text-[#C8A070]" />
                          <span className="text-[13px] font-medium text-[#FBFCF7]/92">{item.title}</span>
                        </a>
                      ) : (
                        <Link
                          href={item.url}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                          onClick={() => {
                            if (isMobile) {
                              setOpenMobile(false);
                            }
                          }}
                        >
                          <item.icon className="h-3.5 w-3.5 text-[#C8A070]" />
                          <span className="text-[13px] font-medium text-[#FBFCF7]/92">{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-white/8 p-3">
        <div className="rounded-[1.2rem] border border-[#C8A070]/22 bg-[#C8A070]/12 p-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#C8A070]">Status</p>
          <p className="mt-1 text-xs font-medium text-[#FBFCF7]/92">Regulatory and operational reporting active</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
