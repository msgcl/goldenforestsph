import { useQuery } from "@tanstack/react-query";
import { api, type OperationalUpdateResponse } from "@shared/routes";

export function useOperationalUpdates() {
  return useQuery({
    queryKey: [api.operationalUpdates.list.path],
    queryFn: async () => {
      const res = await fetch(api.operationalUpdates.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch operational updates");
      const data = await res.json();
      return api.operationalUpdates.list.responses[200].parse(data) as OperationalUpdateResponse[];
    },
  });
}
