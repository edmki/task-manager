import { timeBlockService } from "@/services/time-block.service";
import { useQuery } from "@tanstack/react-query";

export function useTimeBlocks() {
  return useQuery({
    queryKey: ["time-blocks"],
    queryFn: timeBlockService.list,
  });
}
