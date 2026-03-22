import { useQuery } from "@tanstack/react-query";
import { api, type SiteCopyResponse } from "@shared/routes";
import { normalizeSiteCopy } from "@shared/siteCopy";

export function useSiteCopy() {
  return useQuery({
    queryKey: [api.siteCopy.get.path],
    queryFn: async () => {
      const res = await fetch(api.siteCopy.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch site copy");
      const data = await res.json();
      return normalizeSiteCopy(data) as SiteCopyResponse;
    },
  });
}
