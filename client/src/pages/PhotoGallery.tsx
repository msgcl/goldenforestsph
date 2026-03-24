import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage, OptimizedVideo } from "@/components/ui/optimized-media";
import { cn } from "@/lib/utils";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Camera,
  Building2,
  Trees,
  Users,
  PlayCircle,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";
import { Link } from "wouter";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGalleryMedia } from "@/hooks/use-gallery-media";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { createPageTypography } from "@/lib/siteTypography";

type GalleryCategory = "nursery" | "plantation" | "facilities" | "team";

const categoryMeta: Record<
  GalleryCategory,
  {
    label: string;
    subtitle: string;
    icon: typeof Camera;
    accent: string;
  }
> = {
  nursery: {
    label: "Nursery",
    subtitle: "Propagation, conditioning, and seedling health tracking",
    icon: Camera,
    accent: "from-primary/20 via-primary/5 to-transparent",
  },
  plantation: {
    label: "Plantation",
    subtitle: "Field deployment, land preparation, and growing blocks",
    icon: Trees,
    accent: "from-accent/20 via-accent/5 to-transparent",
  },
  facilities: {
    label: "Facilities",
    subtitle: "Operational assets, infrastructure, and support environments",
    icon: Building2,
    accent: "from-secondary/20 via-secondary/5 to-transparent",
  },
  team: {
    label: "Team",
    subtitle: "Management, field staff, and personnel documentation",
    icon: Users,
    accent: "from-[#EADCC4] via-[#F3E9D6] to-[#E3D1B2]",
  },
};

export default function PhotoGallery() {
  const { data: mediaItems = [] } = useGalleryMedia();
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.photoGallery;
  const font = createPageTypography(resolvedSiteCopy, "photoGallery");
  const [selectedImage, setSelectedImage] = useState<(typeof mediaItems)[number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("nursery");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const collectionControlsRef = useRef<HTMLElement | null>(null);

  const normalized = useMemo(
    () =>
      mediaItems.map((item) => ({
        ...item,
        image: item.mediaUrl,
        thumbnail: item.mediaUrl,
      })),
    [mediaItems],
  );

  const allPhotos = normalized;

  const categoryCounts = useMemo(
    () =>
      Object.keys(categoryMeta).reduce(
        (acc, category) => {
          acc[category as GalleryCategory] = allPhotos.filter((item) => item.category === category).length;
          return acc;
        },
        {} as Record<GalleryCategory, number>,
      ),
    [allPhotos],
  );

  const filteredPhotos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return allPhotos.filter((photo) => {
      const title = photo.title?.toLowerCase() || "";
      const description = photo.description?.toLowerCase() || "";
      const location = photo.location?.toLowerCase() || "";

      return title.includes(q) || description.includes(q) || location.includes(q);
    });
  }, [allPhotos, searchQuery]);

  const categoryPhotos = useMemo(
    () => allPhotos.filter((photo) => photo.category === activeCategory),
    [allPhotos, activeCategory],
  );

  const displayPhotos = searchQuery.trim() ? filteredPhotos : categoryPhotos;
  const activeMeta = categoryMeta[activeCategory];
  const totalVideos = allPhotos.filter((item) => item.mediaType === "video").length;
  const categoryLabels = copy.categoryLabels;
  const categorySubtitles = copy.categorySubtitles;
  const getPreviewSrc = (photo: (typeof allPhotos)[number]) => {
    return photo.image;
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = displayPhotos.findIndex((p) => p.id === selectedImage.id);
    if (currentIndex > 0) setSelectedImage(displayPhotos[currentIndex - 1]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = displayPhotos.findIndex((p) => p.id === selectedImage.id);
    if (currentIndex < displayPhotos.length - 1) setSelectedImage(displayPhotos[currentIndex + 1]);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 700);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToCollections = () => {
    const top = collectionControlsRef.current?.getBoundingClientRect().top ?? 0;
    const offsetTop = window.scrollY + top - 24;

    window.scrollTo({
      top: Math.max(offsetTop, 0),
      behavior: "smooth",
    });
  };

  return (
    <AnimatedPage>
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C8A070]/30 bg-gradient-to-br from-[#17392E] via-[#092722] to-[#17392E] p-5 shadow-xl shadow-black/10 sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,160,112,0.30),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(73,153,114,0.18),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A070] to-transparent opacity-70" />
        <div className="relative z-10">
          <Link href="/">
              <Button variant="ghost" size="sm" className={font("backButtonLabel", "mb-6 rounded-full border border-[#C8A070]/25 bg-white/5 px-4 text-[#C8A070] hover:bg-white/10 hover:text-[#C8A070] sm:mb-8")}>
              ← {copy.backButtonLabel}
            </Button>
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)] lg:items-center">
            <div className="max-w-4xl">
              <span className={font("heroBadge", "inline-flex rounded-full border border-[#C8A070]/55 bg-[#E8D3B3]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A070]")}>
                {copy.heroBadge}
              </span>
              <h1 className={font("heroTitle", "mt-4 max-w-4xl text-[2.3rem] font-semibold leading-[1.02] text-[#C8A070] sm:text-5xl lg:text-[3.8rem]")}>
                {copy.heroTitle}
              </h1>
              <p className={font("heroDescription", "mt-4 max-w-3xl text-sm leading-relaxed text-[#E7D2B2] sm:mt-5 sm:text-lg")}>
                {copy.heroDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#C8A070]/32 bg-[#E8D3B3]/14 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className={font("statLabels", "text-xs uppercase tracking-[0.16em] text-[#C8A070]")}>{copy.statLabels[0] ?? ""}</p>
                <p className="mt-2 font-outfit text-3xl font-semibold leading-none text-[#F5E7D1] sm:text-4xl">{allPhotos.length}</p>
              </div>
              <div className="rounded-2xl border border-[#C8A070]/32 bg-[#E8D3B3]/14 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className={font("statLabels", "text-xs uppercase tracking-[0.16em] text-[#C8A070]")}>{copy.statLabels[1] ?? ""}</p>
                <p className="mt-2 font-outfit text-3xl font-semibold leading-none text-[#F5E7D1] sm:text-4xl">{Object.keys(categoryMeta).length}</p>
              </div>
              <div className="rounded-2xl border border-[#C8A070]/32 bg-[#E8D3B3]/14 p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className={font("statLabels", "text-xs uppercase tracking-[0.16em] text-[#C8A070]")}>{copy.statLabels[2] ?? ""}</p>
                <p className="mt-2 font-outfit text-3xl font-semibold leading-none text-[#F5E7D1] sm:text-4xl">{totalVideos}</p>
              </div>
              <div className="rounded-2xl border border-[#C8A070]/5 bg-[linear-gradient(135deg,rgba(200,160,112,0.28),rgba(200,160,112,0.14))] p-4 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className={font("statLabels", "text-xs uppercase tracking-[0.16em] text-[#F0D7B7]")}>{copy.statLabels[3] ?? ""}</p>
                <p className="mt-2 font-outfit text-[1.55rem] font-semibold leading-none text-[#FBFCF7] sm:text-[1.85rem]">{activeMeta.label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={collectionControlsRef} className="mt-8">
        <Card className="overflow-hidden border-accent/20 bg-[#F1E4CF] text-[#17392E] shadow-sm">
          <CardContent className="p-0">
            <div className="grid gap-0 lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)]">
              <div className="relative overflow-hidden border-b border-accent/20 bg-[radial-gradient(circle_at_top_left,rgba(200,160,112,0.24),transparent_30%),linear-gradient(135deg,#17392E_0%,#21453C_100%)] p-6 text-[#FBFCF7] sm:p-7 lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="rounded-[1.1rem] border border-[#C8A070]/35 bg-white/10 p-3 backdrop-blur-sm">
                      <activeMeta.icon className="h-5 w-5 text-[#C8A070]" />
                    </div>
                    <div>
                      <p className={font("currentCollectionLabel", "text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A070]")}>{copy.currentCollectionLabel}</p>
                      <h2 className={font("currentCollectionValueLabel", "mt-1 text-3xl font-semibold text-[#FBFCF7] sm:text-[2.2rem]")}>{categoryLabels[["nursery","plantation","facilities","team"].indexOf(activeCategory)] ?? activeMeta.label}</h2>
                    </div>
                  </div>

                  <p className={font("categorySubtitles", "mt-5 max-w-md text-sm leading-relaxed text-[#DCE8DE]")}>{categorySubtitles[["nursery","plantation","facilities","team"].indexOf(activeCategory)] ?? activeMeta.subtitle}</p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                      <p className={font("categoryCountLabel", "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C8A070]")}>{copy.categoryCountLabel}</p>
                      <p className="font-outfit mt-2 text-3xl font-semibold text-[#FBFCF7]">{categoryCounts[activeCategory]}</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                      <p className={font("showingLabel", "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C8A070]")}>{copy.showingLabel}</p>
                      <p className={font(searchQuery.trim() ? "filteredResultsLabel" : "currentCollectionValueLabel", "mt-2 text-sm font-semibold text-[#FBFCF7]")}>{searchQuery.trim() ? copy.filteredResultsLabel : copy.currentCollectionValueLabel}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/8 p-3 backdrop-blur-sm">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C8A070]" />
                      <Input
                        placeholder={copy.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 rounded-xl border-white/10 bg-[rgba(255,255,255,0.08)] pl-11 text-[#FBFCF7] placeholder:text-[#D0DBD2]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[linear-gradient(180deg,#F7EBD7_0%,#EFE0C8_100%)] p-6 sm:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className={font("browseCollectionsTitle", "text-xs font-semibold uppercase tracking-[0.18em] text-[#7B5B32]")}>{copy.browseCollectionsTitle}</p>
                    <p className={font("browseCollectionsDescription", "mt-1 text-sm text-[#4A3F2E]")}>{copy.browseCollectionsDescription}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full border border-[#D7C09A] bg-[#FBF4E8] px-3 py-1 text-[#17392E]">
                    <span className={font("collectionsLabelSuffix")}>{Object.keys(categoryMeta).length} {copy.collectionsLabelSuffix}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(Object.entries(categoryMeta) as [GalleryCategory, (typeof categoryMeta)[GalleryCategory]][]).map(([key, meta]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCategory(key)}
                    className={cn(
                      "group rounded-[1.45rem] border p-4 text-left transition-all duration-200",
                      activeCategory === key
                        ? "border-[#17392E]/16 bg-[linear-gradient(135deg,#17392E_0%,#214C40_100%)] text-[#FBFCF7] shadow-md"
                        : "border-[#D8C4A7] bg-[#FBF4E8] hover:border-[#C8A070]/55 hover:bg-[#FFF7EA]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "rounded-[0.95rem] p-2.5",
                            activeCategory === key ? "bg-white/10" : "bg-[#17392E]/8",
                          )}
                        >
                          <meta.icon className={cn("h-4 w-4", activeCategory === key ? "text-[#C8A070]" : "text-[#17392E]")} />
                        </div>
                        <div>
                          <p className={font("categoryLabels", cn("text-xl font-semibold", activeCategory === key ? "text-[#FBFCF7]" : "text-[#17392E]"))}>
                            {categoryLabels[["nursery","plantation","facilities","team"].indexOf(key)] ?? meta.label}
                          </p>
                          <p className={font("categorySubtitles", cn("mt-1 text-xs leading-relaxed", activeCategory === key ? "text-[#E2EADF]" : "text-[#4A3F2E]"))}>
                            {categorySubtitles[["nursery","plantation","facilities","team"].indexOf(key)] ?? meta.subtitle}
                          </p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          activeCategory === key ? "bg-[#C8A070]/16 text-[#C8A070]" : "bg-[#17392E]/8 text-[#17392E]",
                        )}
                      >
                        {categoryCounts[key]}
                      </div>
                    </div>
                  </button>
                ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className={font(searchQuery.trim() ? "searchResultsTitle" : "fullGallerySuffix", "text-2xl font-semibold text-foreground")}>
              {searchQuery.trim() ? copy.searchResultsTitle : `${activeMeta.label} ${copy.fullGallerySuffix}`}
            </h2>
            <p className={font(searchQuery.trim() ? "searchSummaryPrefix" : (displayPhotos.length !== 1 ? "collectionSummaryPlural" : "collectionSummarySingular"), "mt-1 text-sm text-muted-foreground")}>
              {searchQuery.trim()
                ? `${copy.searchSummaryPrefix} ${displayPhotos.length} item${displayPhotos.length !== 1 ? "s" : ""} ${copy.searchSummaryMatchSuffix} "${searchQuery}".`
                : `${displayPhotos.length} ${displayPhotos.length !== 1 ? copy.collectionSummaryPlural : copy.collectionSummarySingular}`}
            </p>
          </div>
          {!searchQuery.trim() ? (
            <div className={font("viewHint", "text-sm text-muted-foreground")}>
              {copy.viewHint}
            </div>
          ) : null}
        </div>

        {displayPhotos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {displayPhotos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedImage(photo)}
                className="group flex w-full flex-col appearance-none overflow-hidden rounded-[1.5rem] border-0 bg-[#F1E4CF] p-0 text-left align-top text-[#17392E] shadow-[0_10px_28px_rgba(23,57,46,0.10)] ring-1 ring-[#D9C4A6]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(23,57,46,0.16)] hover:ring-[#C8A070]/65"
              >
                <div className="relative block w-full aspect-[4/3] overflow-hidden bg-[#E9D7BC] leading-none">
                  {photo.mediaType === "video" ? (
                    <>
                      <OptimizedVideo
                        src={photo.image}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                        <div className="rounded-full border border-white/30 bg-black/40 p-3 text-white backdrop-blur-sm">
                          <PlayCircle className="h-6 w-6" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <OptimizedImage
                      src={getPreviewSrc(photo)}
                      alt={photo.title}
                      sizes={
                        "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full border border-[#E7D4B8]/70 bg-[#F6ECDD] text-[#17392E]">
                      {categoryLabels[["nursery","plantation","facilities","team"].indexOf((photo.category as GalleryCategory) || "nursery")] || photo.category}
                    </Badge>
                  </div>
                </div>

                <div className="border-t border-[#DEC7A7] px-5 py-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-lg font-semibold text-[#17392E]">{photo.title}</h3>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#17392E]/55 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-[#1B1B1B]/70">{photo.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#4A3F2E]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {photo.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(photo.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <Card className="border-accent/20 bg-[#F1E4CF] text-[#17392E]">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-[#17392E]/8 p-4">
                <ImageIcon className="h-8 w-8 text-[#17392E]/55" />
              </div>
              <h3 className={font("noResultsTitle", "mt-5 text-lg font-semibold text-[#17392E]")}>{copy.noResultsTitle}</h3>
              <p className={font("noResultsDescription", "mt-2 max-w-md text-sm leading-relaxed text-[#1B1B1B]/70")}>
                {copy.noResultsDescription}
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border-accent/20 bg-[#F1E4CF] text-[#17392E]">
          {selectedImage ? (
            <>
              <DialogHeader className="pb-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {categoryMeta[(selectedImage.category as GalleryCategory) || "nursery"]?.label || selectedImage.category}
                  </Badge>
                  <span className="text-xs text-[#4A3F2E]">{new Date(selectedImage.date).toLocaleDateString()}</span>
                </div>
                <DialogTitle className="text-xl">{selectedImage.title}</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-[#4A3F2E]">{selectedImage.description}</DialogDescription>
              </DialogHeader>

              <div className="relative w-full overflow-hidden rounded-2xl bg-[#F1E4CF]">
                {selectedImage.mediaType === "video" ? (
                  <OptimizedVideo
                    src={selectedImage.image}
                    controls
                    autoPlay
                    priority
                    preload="metadata"
                    className="max-h-[55vh] w-full object-contain bg-[#F1E4CF]"
                  />
                ) : (
                  <OptimizedImage
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    priority
                    className="max-h-[55vh] w-full object-contain bg-[#F1E4CF]"
                  />
                )}

                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 rounded-full border border-[#C8A070]/45 bg-[#F1E4CF] p-2 text-[#17392E] transition-colors hover:bg-[#E8D8BD]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 rounded-full border border-[#C8A070]/45 bg-[#F1E4CF] p-2 text-[#17392E] transition-colors hover:bg-[#E8D8BD]"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-1 text-sm text-[#4A3F2E]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {selectedImage.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {new Date(selectedImage.date).toLocaleDateString()}
                </span>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {showScrollTop ? (
        <button
          type="button"
          onClick={handleScrollToCollections}
          aria-label="Scroll back to collections"
          className="fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A070]/45 bg-[#17392E] text-[#FBFCF7] shadow-[0_16px_30px_rgba(9,39,34,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#21453C] focus:outline-none focus:ring-2 focus:ring-[#C8A070] focus:ring-offset-2 focus:ring-offset-background sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      ) : null}
    </AnimatedPage>
  );
}
