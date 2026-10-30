import { timeBlockService } from "@/services/time-block.service";
import { useQuery } from "@tanstack/react-query";

export function useTimeBlocks(dateKey: string) {
  return useQuery({
    queryKey: ["time-blocks", dateKey],
    queryFn: () => timeBlockService.list(dateKey),
  });
}
