import { timeBlockService } from "@/services/time-block.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";

export function useCreateTimeBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: timeBlockService.create,
    onSuccess: (block) => {
      queryClient.invalidateQueries({
        queryKey: ["time-blocks", format(block.startTime, "yyyy-MM-dd")],
      });
    },
  });
}
