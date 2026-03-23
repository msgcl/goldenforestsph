import { useQuery } from "@tanstack/react-query";
import { api, type GalleryMediaResponse } from "@shared/routes";

export function useGalleryMedia() {
  return useQuery({
    queryKey: [api.galleryMedia.list.path],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    queryFn: async () => {
      const res = await fetch(api.galleryMedia.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch gallery media");
      const data = await res.json();
      return api.galleryMedia.list.responses[200].parse(data) as GalleryMediaResponse[];
    },
  });
}
