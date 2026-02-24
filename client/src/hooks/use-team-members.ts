import { useQuery } from "@tanstack/react-query";
import { api, type TeamMemberResponse } from "@shared/routes";

export function useTeamMembers() {
  return useQuery({
    queryKey: [api.teamMembers.list.path],
    queryFn: async () => {
      const res = await fetch(api.teamMembers.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch team members");
      const data = await res.json();
      return api.teamMembers.list.responses[200].parse(data) as TeamMemberResponse[];
    },
  });
}
