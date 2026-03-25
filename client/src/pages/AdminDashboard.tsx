import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Camera,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FileText,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Mail,
  Save,
  Users,
} from "lucide-react";
import { useTeamMembers } from "@/hooks/use-team-members";
import { useOperationalUpdates } from "@/hooks/use-operational-updates";
import { useNurseryStats } from "@/hooks/use-nursery-stats";
import { useGalleryMedia } from "@/hooks/use-gallery-media";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { defaultSiteCopy, normalizeSiteCopy } from "@shared/siteCopy";
import { WebsiteCopyEditor } from "@/components/admin/WebsiteCopyEditor";

function toDateInputValue(dateValue: Date | string | null | undefined): string {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function inferMediaType(
  explicitType: string | null | undefined,
  file: File | null,
  mediaUrl: string | null | undefined,
): "image" | "video" {
  const normalizedType = String(explicitType ?? "").trim().toLowerCase();
  if (normalizedType === "image" || normalizedType === "video") {
    return normalizedType;
  }

  if (file?.type.startsWith("video/")) return "video";
  if (file?.type.startsWith("image/")) return "image";

  const normalizedUrl = String(mediaUrl ?? "").trim().toLowerCase();
  if (/\.(mp4|mov|webm|ogg|m4v)(\?|$)/.test(normalizedUrl)) return "video";

  return "image";
}

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fileToOptimizedImageDataUrl(
  file: File,
  options: { maxDimension?: number; quality?: number } = {},
): Promise<string> {
  const { maxDimension = 1400, quality = 0.82 } = options;

  if (!file.type.startsWith("image/")) {
    return fileToDataUrl(file);
  }

  const sourceDataUrl = await fileToDataUrl(file);

  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const targetWidth = Math.max(1, Math.round(img.width * scale));
      const targetHeight = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not process image"));
        return;
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = sourceDataUrl;
  });
}

const panelAnim = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");

  const { data: teamMembers = [] } = useTeamMembers();
  const { data: updates = [] } = useOperationalUpdates();
  const { data: latestStats } = useNurseryStats();
  const { data: mediaItems = [] } = useGalleryMedia();
  const { data: siteCopy = defaultSiteCopy } = useSiteCopy();
  const { data: contactMessages = [] } = useQuery({
    queryKey: ["/api/admin/contact-messages"],
    queryFn: async () => {
      const res = await fetch("/api/admin/contact-messages", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch contact messages");
      return await res.json();
    },
  });

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" }).then(async (res) => {
      if (!res.ok) {
        navigate("/admin/login");
        return;
      }
      const data = await res.json();
      setAdminUsername(data.username);
      setAuthChecked(true);
    });
  }, [navigate]);

  const [teamForm, setTeamForm] = useState({
    id: 0,
    name: "",
    title: "",
    category: "Executive Management",
    experience: "",
    expertise: "",
    imageUrl: "",
    orderIndex: 0,
  });
  const [updateForm, setUpdateForm] = useState({
    id: 0,
    title: "",
    description: "",
    category: "Nursery",
    date: "",
    imageUrl: "",
  });
  const [statsForm, setStatsForm] = useState({
    agarwoodSeedlings: latestStats?.agarwoodSeedlings ?? 0,
    mangoSeedlings: latestStats?.mangoSeedlings ?? 0,
    agarwoodHeightCm: latestStats?.agarwoodHeightCm ?? 0,
    mangoHeightCm: latestStats?.mangoHeightCm ?? 0,
    panayPlanted: latestStats?.panayPlanted ?? 0,
    saleAgarwoodSeedlings: latestStats?.saleAgarwoodSeedlings ?? 0,
    saleMangoSeedlings: latestStats?.saleMangoSeedlings ?? 0,
    saleCarabaoMango: latestStats?.saleCarabaoMango ?? 0,
    mortalityRate: latestStats?.mortalityRate ?? "",
    lastUpdated: toDateInputValue(new Date()),
    inventoryDate: toDateInputValue(latestStats?.inventoryDate ?? new Date()),
  });
  const [mediaForm, setMediaForm] = useState({
    id: 0,
    title: "",
    description: "",
    category: "nursery",
    location: "",
    date: "",
    mediaUrl: "",
    thumbnailUrl: "",
    mediaType: "image",
    sortOrder: 0,
  });
  const [siteCopyForm, setSiteCopyForm] = useState(defaultSiteCopy);

  const [selectedTeamUpload, setSelectedTeamUpload] = useState<File | null>(null);
  const [selectedUpdateUpload, setSelectedUpdateUpload] = useState<File | null>(null);
  const [selectedUpload, setSelectedUpload] = useState<File | null>(null);
  const mediaFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!latestStats) return;
    setStatsForm({
      agarwoodSeedlings: latestStats.agarwoodSeedlings,
      mangoSeedlings: latestStats.mangoSeedlings,
      agarwoodHeightCm: latestStats.agarwoodHeightCm,
      mangoHeightCm: latestStats.mangoHeightCm,
      panayPlanted: latestStats.panayPlanted ?? 0,
      saleAgarwoodSeedlings: latestStats.saleAgarwoodSeedlings ?? 0,
      saleMangoSeedlings: latestStats.saleMangoSeedlings ?? 0,
      saleCarabaoMango: latestStats.saleCarabaoMango ?? 0,
      mortalityRate: latestStats.mortalityRate,
      lastUpdated: toDateInputValue(new Date()),
      inventoryDate: toDateInputValue(latestStats.inventoryDate ?? new Date()),
    });
  }, [latestStats]);

  useEffect(() => {
    setSiteCopyForm(siteCopy);
  }, [siteCopy]);

  const teamMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = teamForm.imageUrl;
      if (selectedTeamUpload) {
        const dataUrl = await fileToOptimizedImageDataUrl(selectedTeamUpload);
        const uploadRes = await apiRequest("POST", "/api/admin/uploads", {
          fileName: selectedTeamUpload.name,
          dataUrl,
        });
        const uploadPayload = await uploadRes.json();
        imageUrl = uploadPayload.url;
      }
      const payload = {
        name: String(teamForm.name ?? "").trim(),
        title: String(teamForm.title ?? "").trim(),
        category: String(teamForm.category ?? "").trim(),
        experience: String(teamForm.experience ?? "").trim(),
        expertise: String(teamForm.expertise ?? "").trim(),
        imageUrl: String(imageUrl ?? "").trim() || null,
        orderIndex: Number.isFinite(Number(teamForm.orderIndex)) ? Number(teamForm.orderIndex) : 0,
      };

      if (!payload.name || !payload.title || !payload.category || !payload.experience || !payload.expertise) {
        throw new Error("Name, title, category, experience, and expertise are required.");
      }

      if (teamForm.id) await apiRequest("PATCH", `/api/admin/team-members/${teamForm.id}`, payload);
      else await apiRequest("POST", "/api/admin/team-members", payload);
    },
    onSuccess: async () => {
      setTeamForm({
        id: 0,
        name: "",
        title: "",
        category: "Executive Management",
        experience: "",
        expertise: "",
        imageUrl: "",
        orderIndex: 0,
      });
      setSelectedTeamUpload(null);
      await queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: "Saved", description: "Team member has been updated." });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to save team member";
      toast({ title: "Save failed", description: message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = updateForm.imageUrl;
      if (selectedUpdateUpload) {
        const dataUrl = await fileToDataUrl(selectedUpdateUpload);
        const uploadRes = await apiRequest("POST", "/api/admin/uploads", {
          fileName: selectedUpdateUpload.name,
          dataUrl,
        });
        const uploadPayload = await uploadRes.json();
        imageUrl = uploadPayload.url;
      }
      const payload = {
        title: updateForm.title,
        description: updateForm.description,
        category: updateForm.category,
        date: new Date(updateForm.date),
        imageUrl: imageUrl || null,
      };
      if (updateForm.id) await apiRequest("PATCH", `/api/admin/operational-updates/${updateForm.id}`, payload);
      else await apiRequest("POST", "/api/admin/operational-updates", payload);
    },
    onSuccess: async () => {
      setUpdateForm({
        id: 0,
        title: "",
        description: "",
        category: "Nursery",
        date: "",
        imageUrl: "",
      });
      setSelectedUpdateUpload(null);
      await queryClient.invalidateQueries({ queryKey: ["/api/operational-updates"] });
      toast({ title: "Saved", description: "Operational update saved." });
    },
  });

  const statsMutation = useMutation({
    mutationFn: async () => {
      const autoTimestamp = new Date();
      await apiRequest("POST", "/api/admin/nursery-stats", {
        ...statsForm,
        lastUpdated: autoTimestamp,
        inventoryDate: autoTimestamp,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/nursery-stats/latest"] });
      const refreshedDate = toDateInputValue(new Date());
      setStatsForm((current) => ({
        ...current,
        lastUpdated: refreshedDate,
        inventoryDate: refreshedDate,
      }));
      toast({ title: "Saved", description: "Nursery metrics updated." });
    },
  });

  const mediaMutation = useMutation({
    mutationFn: async () => {
      const file = selectedUpload ?? mediaFileInputRef.current?.files?.[0] ?? null;
      let mediaUrl = String(mediaForm.mediaUrl ?? "").trim();
      if (file) {
        const dataUrl = file.type.startsWith("image/")
          ? await fileToOptimizedImageDataUrl(file)
          : await fileToDataUrl(file);
        const uploadRes = await apiRequest("POST", "/api/admin/uploads", {
          fileName: file.name,
          dataUrl,
        });
        const uploadPayload = await uploadRes.json();
        mediaUrl = uploadPayload.url;
      }

      const title = String(mediaForm.title ?? "").trim();
      const description = String(mediaForm.description ?? "").trim();
      const category = String(mediaForm.category ?? "").trim();
      const location = String(mediaForm.location ?? "").trim();
      const parsedSortOrder = Number(mediaForm.sortOrder);
      const sortOrder = Number.isFinite(parsedSortOrder) ? parsedSortOrder : 0;
      const mediaType = inferMediaType(mediaForm.mediaType, file, mediaUrl);
      const thumbnailUrl = mediaUrl || null;
      const date = mediaForm.date ? new Date(mediaForm.date) : new Date();

      if (!title || !description || !category || !location) {
        throw new Error("Title, description, category, and location are required.");
      }

      if (!mediaUrl) {
        throw new Error("Choose a file or enter a media URL before saving.");
      }

      if (Number.isNaN(date.getTime())) {
        throw new Error("Please enter a valid date.");
      }

      const payload = {
        title,
        description,
        category,
        location,
        date,
        mediaUrl,
        thumbnailUrl,
        mediaType,
        sortOrder,
      };
      if (mediaForm.id) await apiRequest("PATCH", `/api/admin/gallery-media/${mediaForm.id}`, payload);
      else await apiRequest("POST", "/api/admin/gallery-media", payload);
    },
    onSuccess: async () => {
      setMediaForm({
        id: 0,
        title: "",
        description: "",
        category: "nursery",
        location: "",
        date: "",
        mediaUrl: "",
        thumbnailUrl: "",
        mediaType: "image",
        sortOrder: 0,
      });
      setSelectedUpload(null);
      if (mediaFileInputRef.current) mediaFileInputRef.current.value = "";
      await queryClient.invalidateQueries({ queryKey: ["/api/gallery-media"] });
      toast({ title: "Saved", description: "Gallery media saved." });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to save gallery media";
      toast({ title: "Save failed", description: message, variant: "destructive" });
    },
  });

  const siteCopyMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/site-copy", siteCopyForm);
      return normalizeSiteCopy(await response.json());
    },
    onSuccess: async (savedSiteCopy) => {
      setSiteCopyForm(savedSiteCopy);
      queryClient.setQueryData(["/api/site-copy"], savedSiteCopy);
      await queryClient.invalidateQueries({ queryKey: ["/api/site-copy"] });
      toast({ title: "Saved", description: "Website copy updated." });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to save website copy";
      toast({ title: "Save failed", description: message, variant: "destructive" });
    },
  });

  const reorderMediaMutation = useMutation({
    mutationFn: async ({
      category,
      reorderedItems,
    }: {
      category: string;
      reorderedItems: Array<{
        id: number;
        title: string;
        sortOrder: number;
      }>;
    }) => {
      await Promise.all(
        reorderedItems.map((item) =>
          apiRequest("PATCH", `/api/admin/gallery-media/${item.id}`, {
            sortOrder: item.sortOrder,
          }),
        ),
      );

      return category;
    },
    onSuccess: async (category) => {
      await queryClient.invalidateQueries({ queryKey: ["/api/gallery-media"] });
      toast({
        title: "Gallery order updated",
        description: `${category} media order has been updated.`,
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Failed to reorder gallery media";
      toast({ title: "Reorder failed", description: message, variant: "destructive" });
    },
  });

  const doDelete = async (url: string, key: string) => {
    await apiRequest("DELETE", url);
    await queryClient.invalidateQueries({ queryKey: [key] });
    toast({ title: "Deleted", description: "Item removed." });
  };

  const doDeleteContactMessage = async (id: number) => {
    await apiRequest("DELETE", `/api/admin/contact-messages/${id}`);
    queryClient.setQueryData(["/api/admin/contact-messages"], (current: any[] | undefined) =>
      (current ?? []).filter((message) => message.id !== id),
    );
    await queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-messages"] });
    toast({ title: "Deleted", description: "Contact message removed." });
  };

  const clearAllContactMessages = async () => {
    const res = await apiRequest("DELETE", "/api/admin/contact-messages");
    const payload = await res.json();
    queryClient.setQueryData(["/api/admin/contact-messages"], []);
    await queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-messages"] });
    toast({
      title: "Inbox cleared",
      description: `${payload.deletedCount ?? 0} message(s) removed.`,
    });
  };

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    navigate("/admin/login");
  };

  const groupedMedia = useMemo(() => {
    const grouped = mediaItems.reduce((acc: Record<string, typeof mediaItems>, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    Object.values(grouped).forEach((items) => {
      items.sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    });

    return grouped;
  }, [mediaItems]);

  const nurseryCarouselItems = groupedMedia["nursery"] ?? [];

  const moveMediaItem = (category: string, itemId: number, direction: "up" | "down") => {
    const items = groupedMedia[category] ?? [];
    const currentIndex = items.findIndex((item) => item.id === itemId);
    if (currentIndex < 0) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const reordered = [...items];
    const [movedItem] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    const updates = reordered
      .map((item, index) => ({
        id: item.id,
        title: item.title,
        sortOrder: index + 1,
        currentSortOrder: item.sortOrder,
      }))
      .filter((item, index) => item.currentSortOrder !== index + 1)
      .map(({ currentSortOrder: _currentSortOrder, ...item }) => item);

    if (updates.length === 0) return;

    reorderMediaMutation.mutate({
      category,
      reorderedItems: updates,
    });
  };

  const statCards = [
    { label: "Team Profiles", value: teamMembers.length, icon: Users },
    { label: "Updates", value: updates.length, icon: Bell },
    { label: "Gallery Assets", value: mediaItems.length, icon: Camera },
    { label: "Contact Messages", value: contactMessages.length, icon: Mail },
  ];

  if (!authChecked) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8f7] via-background to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.section
          variants={panelAnim}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-r from-[#0f2e2a] to-[#194940] p-6 md:p-8 text-white shadow-xl"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Control Center</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">CADI Admin Console</h1>
              <p className="text-sm text-white/80 mt-1">Signed in as {adminUsername}</p>
            </div>
            <Button variant="secondary" className="w-fit" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.section>

        <motion.section
          variants={panelAnim}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {statCards.map((item) => (
            <Card key={item.label} className="border-border/70 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.section>

        <Tabs defaultValue="metrics" className="space-y-5">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-[28px] border border-border/60 bg-white/70 p-2 shadow-sm backdrop-blur md:grid-cols-6">
            <TabsTrigger value="metrics" className="rounded-2xl border border-transparent bg-transparent px-3 py-3 data-[state=active]:border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Metrics
            </TabsTrigger>
            <TabsTrigger value="updates" className="rounded-2xl border border-transparent bg-transparent px-3 py-3 data-[state=active]:border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarDays className="w-4 h-4 mr-2" /> Updates
            </TabsTrigger>
            <TabsTrigger value="team" className="rounded-2xl border border-transparent bg-transparent px-3 py-3 data-[state=active]:border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" /> Team
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-2xl border border-transparent bg-transparent px-3 py-3 data-[state=active]:border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ImagePlus className="w-4 h-4 mr-2" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-2xl border border-transparent bg-transparent px-3 py-3 data-[state=active]:border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Mail className="w-4 h-4 mr-2" /> Messages
            </TabsTrigger>
            <TabsTrigger value="site-copy" className="rounded-2xl border border-transparent bg-transparent px-3 py-3 data-[state=active]:border-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" /> Website Copy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <motion.div variants={panelAnim} initial="hidden" animate="visible">
              <Card className="border-border/70 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Growth Dashboard Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={(e) => { e.preventDefault(); statsMutation.mutate(); }}>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-agarwood-seedlings">Agarwood Seedlings</Label>
                      <Input id="metrics-agarwood-seedlings" type="number" value={statsForm.agarwoodSeedlings} onChange={(e) => setStatsForm((s) => ({ ...s, agarwoodSeedlings: Number(e.target.value) }))} placeholder="Agarwood Seedlings" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-mango-seedlings">Mango Seedlings</Label>
                      <Input id="metrics-mango-seedlings" type="number" value={statsForm.mangoSeedlings} onChange={(e) => setStatsForm((s) => ({ ...s, mangoSeedlings: Number(e.target.value) }))} placeholder="Mango Seedlings" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-agarwood-height">Agarwood Height (cm)</Label>
                      <Input id="metrics-agarwood-height" type="number" value={statsForm.agarwoodHeightCm} onChange={(e) => setStatsForm((s) => ({ ...s, agarwoodHeightCm: Number(e.target.value) }))} placeholder="Agarwood Height (cm)" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-mango-height">Mango Height (cm)</Label>
                      <Input id="metrics-mango-height" type="number" value={statsForm.mangoHeightCm} onChange={(e) => setStatsForm((s) => ({ ...s, mangoHeightCm: Number(e.target.value) }))} placeholder="Mango Height (cm)" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-panay-planted">Panay Planting</Label>
                      <Input id="metrics-panay-planted" type="number" value={statsForm.panayPlanted} onChange={(e) => setStatsForm((s) => ({ ...s, panayPlanted: Number(e.target.value) }))} placeholder="Panay Planting" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-sale-agarwood">Agarwood Available for Sale</Label>
                      <Input id="metrics-sale-agarwood" type="number" value={statsForm.saleAgarwoodSeedlings} onChange={(e) => setStatsForm((s) => ({ ...s, saleAgarwoodSeedlings: Number(e.target.value) }))} placeholder="Agarwood Available for Sale" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-sale-mango">Mango Available for Sale</Label>
                      <Input id="metrics-sale-mango" type="number" value={statsForm.saleMangoSeedlings} onChange={(e) => setStatsForm((s) => ({ ...s, saleMangoSeedlings: Number(e.target.value) }))} placeholder="Mango Available for Sale" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-sale-carabao">Carabao Mango Available for Sale</Label>
                      <Input id="metrics-sale-carabao" type="number" value={statsForm.saleCarabaoMango} onChange={(e) => setStatsForm((s) => ({ ...s, saleCarabaoMango: Number(e.target.value) }))} placeholder="Carabao Mango Available for Sale" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-mortality-rate">Mortality Rate</Label>
                      <Input id="metrics-mortality-rate" value={statsForm.mortalityRate} onChange={(e) => setStatsForm((s) => ({ ...s, mortalityRate: e.target.value }))} placeholder="Mortality Rate" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-last-updated">Last Updated</Label>
                      <Input id="metrics-last-updated" type="date" value={statsForm.lastUpdated} readOnly disabled />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="metrics-inventory-date">Inventory Date</Label>
                      <Input id="metrics-inventory-date" type="date" value={statsForm.inventoryDate} readOnly disabled />
                      <p className="text-xs text-muted-foreground">Both dates are now set automatically when you save metrics.</p>
                    </div>
                    <div className="md:col-span-3">
                      <Button type="submit" disabled={statsMutation.isPending}><Save className="w-4 h-4 mr-2" />{statsMutation.isPending ? "Saving..." : "Save Metrics"}</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="updates">
            <motion.div variants={panelAnim} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-4">
              <Card className="border-border/70 shadow-sm">
                <CardHeader><CardTitle>Write Update</CardTitle></CardHeader>
                <CardContent>
                  <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(); }}>
                    <div className="space-y-1">
                      <Label htmlFor="update-title">Title</Label>
                      <Input id="update-title" value={updateForm.title} onChange={(e) => setUpdateForm((s) => ({ ...s, title: e.target.value }))} placeholder="Title" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="update-category">Category</Label>
                      <Input id="update-category" value={updateForm.category} onChange={(e) => setUpdateForm((s) => ({ ...s, category: e.target.value }))} placeholder="Category" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="update-date">Date</Label>
                      <Input id="update-date" type="date" value={updateForm.date} onChange={(e) => setUpdateForm((s) => ({ ...s, date: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="update-image-url">Image/Video URL (optional)</Label>
                      <Input id="update-image-url" value={updateForm.imageUrl} onChange={(e) => setUpdateForm((s) => ({ ...s, imageUrl: e.target.value }))} placeholder="Image/Video URL (optional)" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="update-file-upload">Upload Image or Video</Label>
                      <Input id="update-file-upload" type="file" accept="image/*,video/*" onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedUpdateUpload(e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="update-description">Description</Label>
                      <Textarea id="update-description" value={updateForm.description} onChange={(e) => setUpdateForm((s) => ({ ...s, description: e.target.value }))} placeholder="Description" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={updateMutation.isPending}>{updateForm.id ? "Update" : "Create"}</Button>
                      {updateForm.id ? <Button type="button" variant="outline" onClick={() => { setUpdateForm({ id: 0, title: "", description: "", category: "Nursery", date: "", imageUrl: "" }); setSelectedUpdateUpload(null); }}>Cancel</Button> : null}
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Card className="border-border/70 shadow-sm">
                <CardHeader><CardTitle>Latest Updates</CardTitle></CardHeader>
                <CardContent className="space-y-2 max-h-[620px] overflow-auto">
                  {updates.map((item) => (
                    <div key={item.id} className="rounded-lg border border-border/70 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-sm">{item.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary">{item.category}</Badge>
                            <span className="text-xs text-muted-foreground">{toDateInputValue(item.date)}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button type="button" size="sm" variant="outline" onClick={() => setUpdateForm({ id: item.id, title: item.title, description: item.description, category: item.category, date: toDateInputValue(item.date), imageUrl: item.imageUrl ?? "" })}>Edit</Button>
                          <Button type="button" size="sm" variant="destructive" onClick={() => doDelete(`/api/admin/operational-updates/${item.id}`, "/api/operational-updates")}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="team">
            <motion.div variants={panelAnim} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-4">
              <Card className="border-border/70 shadow-sm">
                <CardHeader><CardTitle>Team Profile Editor</CardTitle></CardHeader>
                <CardContent>
                  <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); teamMutation.mutate(); }}>
                    <div className="space-y-1">
                      <Label htmlFor="team-name">Name</Label>
                      <Input id="team-name" value={teamForm.name} onChange={(e) => setTeamForm((s) => ({ ...s, name: e.target.value }))} placeholder="Name" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-title">Title</Label>
                      <Input id="team-title" value={teamForm.title} onChange={(e) => setTeamForm((s) => ({ ...s, title: e.target.value }))} placeholder="Title" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-category">Category</Label>
                      <Input id="team-category" value={teamForm.category} onChange={(e) => setTeamForm((s) => ({ ...s, category: e.target.value }))} placeholder="Category" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-order-index">Display Order</Label>
                      <Input
                        id="team-order-index"
                        type="number"
                        value={teamForm.orderIndex}
                        onChange={(e) =>
                          setTeamForm((s) => ({
                            ...s,
                            orderIndex: Number.isFinite(Number(e.target.value)) ? Number(e.target.value) : 0,
                          }))
                        }
                        placeholder="Display Order"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-image-url">Image URL (optional)</Label>
                      <Input id="team-image-url" value={teamForm.imageUrl} onChange={(e) => setTeamForm((s) => ({ ...s, imageUrl: e.target.value }))} placeholder="Image URL (optional)" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-image-upload">Upload Image</Label>
                      <Input id="team-image-upload" type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedTeamUpload(e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-experience">Experience</Label>
                      <Textarea id="team-experience" value={teamForm.experience} onChange={(e) => setTeamForm((s) => ({ ...s, experience: e.target.value }))} placeholder="Experience" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="team-expertise">Expertise</Label>
                      <Textarea id="team-expertise" value={teamForm.expertise} onChange={(e) => setTeamForm((s) => ({ ...s, expertise: e.target.value }))} placeholder="Expertise" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={teamMutation.isPending}>{teamForm.id ? "Update" : "Create"}</Button>
                      {teamForm.id ? <Button type="button" variant="outline" onClick={() => { setTeamForm({ id: 0, name: "", title: "", category: "Executive Management", experience: "", expertise: "", imageUrl: "", orderIndex: 0 }); setSelectedTeamUpload(null); }}>Cancel</Button> : null}
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Card className="border-border/70 shadow-sm">
                <CardHeader><CardTitle>Team Directory</CardTitle></CardHeader>
                <CardContent className="space-y-2 max-h-[700px] overflow-auto">
                  {teamMembers.map((item) => (
                    <div key={item.id} className="rounded-lg border border-border/70 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.title}</p>
                          <Badge className="mt-2" variant="outline">{item.category}</Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setTeamForm({
                                id: item.id,
                                name: item.name ?? "",
                                title: item.title ?? "",
                                category: item.category ?? "Executive Management",
                                experience: item.experience ?? "",
                                expertise: item.expertise ?? "",
                                imageUrl: item.imageUrl ?? "",
                                orderIndex: Number.isFinite(Number(item.orderIndex)) ? Number(item.orderIndex) : 0,
                              })
                            }
                          >
                            Edit
                          </Button>
                          <Button type="button" size="sm" variant="destructive" onClick={() => doDelete(`/api/admin/team-members/${item.id}`, "/api/team-members")}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="gallery">
            <motion.div variants={panelAnim} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-4">
              <Card className="border-border/70 shadow-sm">
                <CardHeader><CardTitle>Gallery Asset Manager</CardTitle></CardHeader>
                <CardContent>
                  <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); mediaMutation.mutate(); }}>
                    <div className="space-y-1">
                      <Label htmlFor="media-title">Title</Label>
                      <Input id="media-title" value={mediaForm.title} onChange={(e) => setMediaForm((s) => ({ ...s, title: e.target.value }))} placeholder="Title" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-category">Category</Label>
                      <select id="media-category" value={mediaForm.category} onChange={(e) => setMediaForm((s) => ({ ...s, category: e.target.value }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-full">
                        <option value="nursery">Nursery</option>
                        <option value="plantation">Plantation</option>
                        <option value="facilities">Facilities</option>
                        <option value="team">Team</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-location">Location</Label>
                      <Input id="media-location" value={mediaForm.location} onChange={(e) => setMediaForm((s) => ({ ...s, location: e.target.value }))} placeholder="Location" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-date">Date</Label>
                      <Input id="media-date" type="date" value={mediaForm.date} onChange={(e) => setMediaForm((s) => ({ ...s, date: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-type">Media Type (image/video)</Label>
                      <select
                        id="media-type"
                        value={mediaForm.mediaType}
                        onChange={(e) => setMediaForm((s) => ({ ...s, mediaType: e.target.value }))}
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-full"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-sort-order">Sort Order</Label>
                      <Input id="media-sort-order" type="number" value={mediaForm.sortOrder} onChange={(e) => setMediaForm((s) => ({ ...s, sortOrder: Number(e.target.value) }))} placeholder="Sort Order" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-file-upload">Upload File</Label>
                      <Input
                        ref={mediaFileInputRef}
                        id="media-file-upload"
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedUpload(e.target.files?.[0] ?? null)}
                      />
                      <p className="text-xs text-muted-foreground">
                        The exact uploaded media is used as both the media URL and thumbnail source.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="media-description">Description</Label>
                      <Textarea id="media-description" value={mediaForm.description} onChange={(e) => setMediaForm((s) => ({ ...s, description: e.target.value }))} placeholder="Description" />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={mediaMutation.isPending}>{mediaForm.id ? "Update" : "Create"}</Button>
                      {mediaForm.id ? <Button type="button" variant="outline" onClick={() => { setMediaForm({ id: 0, title: "", description: "", category: "nursery", location: "", date: "", mediaUrl: "", thumbnailUrl: "", mediaType: "image", sortOrder: 0 }); setSelectedUpload(null); if (mediaFileInputRef.current) mediaFileInputRef.current.value = ""; }}>Cancel</Button> : null}
                    </div>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card className="border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle>Live Seedling Gallery Order</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Reorder these nursery items to control the moving live seedling carousel on the Nursery Operations page.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {nurseryCarouselItems.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border/70 px-4 py-6 text-sm text-muted-foreground">
                        No nursery gallery media yet. Add a nursery image or video on the left, then reorder it here.
                      </div>
                    ) : (
                      nurseryCarouselItems.map((item) => (
                        <div key={`nursery-carousel-${item.id}`} className="rounded-lg border border-border/70 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.mediaType} | {toDateInputValue(item.date)}
                              </p>
                              <p className="text-xs text-muted-foreground">Carousel position: {item.sortOrder}</p>
                            </div>
                            <div className="flex shrink-0 flex-wrap justify-end gap-1">
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => moveMediaItem("nursery", item.id, "up")}
                                disabled={reorderMediaMutation.isPending || nurseryCarouselItems[0]?.id === item.id}
                                aria-label={`Move ${item.title} up in live seedling gallery`}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => moveMediaItem("nursery", item.id, "down")}
                                disabled={reorderMediaMutation.isPending || nurseryCarouselItems[nurseryCarouselItems.length - 1]?.id === item.id}
                                aria-label={`Move ${item.title} down in live seedling gallery`}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setMediaForm({
                                    id: item.id,
                                    title: item.title,
                                    description: item.description,
                                    category: item.category,
                                    location: item.location,
                                    date: toDateInputValue(item.date),
                                    mediaUrl: item.mediaUrl,
                                    thumbnailUrl: item.thumbnailUrl ?? "",
                                    mediaType: item.mediaType,
                                    sortOrder: item.sortOrder,
                                  });
                                  setSelectedUpload(null);
                                  if (mediaFileInputRef.current) mediaFileInputRef.current.value = "";
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
                <Card className="border-border/70 shadow-sm">
                  <CardHeader><CardTitle>Asset Library</CardTitle></CardHeader>
                  <CardContent className="space-y-4 max-h-[760px] overflow-auto">
                    {Object.entries(groupedMedia).map(([category, items]) => (
                      <div key={category} className="space-y-2">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">{category}</p>
                        {items.map((item) => (
                          <div key={item.id} className="rounded-lg border border-border/70 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold text-sm">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.mediaType} | {toDateInputValue(item.date)}</p>
                                <p className="text-xs text-muted-foreground">Display order: {item.sortOrder}</p>
                              </div>
                              <div className="flex flex-wrap justify-end gap-1">
                                <Button type="button" size="icon" variant="outline" className="h-8 w-8" onClick={() => moveMediaItem(category, item.id, "up")} disabled={reorderMediaMutation.isPending || items[0]?.id === item.id} aria-label={`Move ${item.title} up`}><ChevronUp className="h-4 w-4" /></Button>
                                <Button type="button" size="icon" variant="outline" className="h-8 w-8" onClick={() => moveMediaItem(category, item.id, "down")} disabled={reorderMediaMutation.isPending || items[items.length - 1]?.id === item.id} aria-label={`Move ${item.title} down`}><ChevronDown className="h-4 w-4" /></Button>
                                <Button type="button" size="sm" variant="outline" onClick={() => { setMediaForm({ id: item.id, title: item.title, description: item.description, category: item.category, location: item.location, date: toDateInputValue(item.date), mediaUrl: item.mediaUrl, thumbnailUrl: item.thumbnailUrl ?? "", mediaType: item.mediaType, sortOrder: item.sortOrder }); setSelectedUpload(null); if (mediaFileInputRef.current) mediaFileInputRef.current.value = ""; }}>Edit</Button>
                                <Button type="button" size="sm" variant="destructive" onClick={() => doDelete(`/api/admin/gallery-media/${item.id}`, "/api/gallery-media")}>Delete</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="messages">
            <motion.div variants={panelAnim} initial="hidden" animate="visible">
              <Card className="border-border/70 shadow-sm">
                <CardHeader>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle>Contact Inbox</CardTitle>
                    {contactMessages.length > 0 ? (
                      <Button type="button" variant="destructive" size="sm" onClick={clearAllContactMessages}>
                        Clear All Messages
                      </Button>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {contactMessages.map((msg: any) => (
                    <div key={msg.id} className="rounded-lg border border-border/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{msg.firstName} {msg.lastName}</p>
                          <p className="text-sm text-muted-foreground">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{toDateInputValue(msg.createdAt)}</Badge>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => doDeleteContactMessage(msg.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm whitespace-pre-wrap text-foreground/90">{msg.message}</p>
                    </div>
                  ))}
                  {contactMessages.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                      No messages yet.
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="site-copy">
            <motion.div variants={panelAnim} initial="hidden" animate="visible" className="space-y-4">
              <WebsiteCopyEditor
                value={siteCopyForm}
                isSaving={siteCopyMutation.isPending}
                onSubmit={() => siteCopyMutation.mutate()}
                onChange={setSiteCopyForm}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}





