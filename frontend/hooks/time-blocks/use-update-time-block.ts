import { timeBlockService } from "@/services/time-block.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useUpdateTimeBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: timeBlockService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
    },
  });
}
