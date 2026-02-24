import { useQuery } from "@tanstack/react-query";
import { api, type NurseryStatsResponse } from "@shared/routes";

export function useNurseryStats() {
  return useQuery({
    queryKey: [api.nurseryStats.latest.path],
    queryFn: async () => {
      const res = await fetch(api.nurseryStats.latest.path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch nursery stats");
      const data = await res.json();
      return api.nurseryStats.latest.responses[200].parse(data) as NurseryStatsResponse;
    },
  });
}
