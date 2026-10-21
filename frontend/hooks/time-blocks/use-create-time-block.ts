import { timeBlockService } from "@/services/time-block.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useCreateTimeBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: timeBlockService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
    },
  });
}
