import { useQuery } from "@tanstack/react-query";
import { api, type SiteCopyResponse } from "@shared/routes";

export function useSiteCopy() {
  return useQuery({
    queryKey: [api.siteCopy.get.path],
    queryFn: async () => {
      const res = await fetch(api.siteCopy.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch site copy");
      const data = await res.json();
      return api.siteCopy.get.responses[200].parse(data) as SiteCopyResponse;
    },
  });
}
