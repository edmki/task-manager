import { TimeBlock, timeBlockService } from "@/services/time-block.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type UpdateTimeBlockVariables = {
  id: string;
  data: Partial<Omit<TimeBlock, "id">>;
};

export function useUpdateTimeBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTimeBlockVariables) =>
      timeBlockService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
    },
  });
}
