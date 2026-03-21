import { useQuery } from "@tanstack/react-query";
import { api, type GalleryMediaResponse } from "@shared/routes";

export function useGalleryMedia() {
  return useQuery({
    queryKey: [api.galleryMedia.list.path],
    queryFn: async () => {
      const res = await fetch(api.galleryMedia.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch gallery media");
      const data = await res.json();
      return api.galleryMedia.list.responses[200].parse(data) as GalleryMediaResponse[];
    },
  });
}
