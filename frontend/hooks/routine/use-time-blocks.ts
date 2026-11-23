import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DateRange } from "@/lib/date-range";
import { timeBlockService } from "@/services/time-block.service";

export function useTimeBlocks(range: DateRange) {
  return useQuery({
    queryKey: ["time-blocks", range.from, range.to],
    queryFn: () => timeBlockService.list(range),
    placeholderData: keepPreviousData,
  });
}
