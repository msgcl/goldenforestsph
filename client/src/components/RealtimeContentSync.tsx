import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";

type RealtimeEventPayload = {
  queryKeys?: string[];
};

export function RealtimeContentSync() {
  useEffect(() => {
    const eventSource = new EventSource("/api/realtime/events");

    const handleContentUpdated = async (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data) as RealtimeEventPayload;
        const queryKeys = payload.queryKeys ?? [];

        if (queryKeys.length === 0) return;

        await Promise.all(
          queryKeys.map((queryKey) =>
            queryClient.invalidateQueries({
              queryKey: [queryKey],
            }),
          ),
        );
      } catch (error) {
        console.error("Failed to process realtime content update", error);
      }
    };

    eventSource.addEventListener("content-updated", handleContentUpdated);

    return () => {
      eventSource.removeEventListener("content-updated", handleContentUpdated);
      eventSource.close();
    };
  }, []);

  return null;
}
