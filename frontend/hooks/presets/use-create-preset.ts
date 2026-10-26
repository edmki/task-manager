import { presetsService } from "@/services/presets.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useCreatePreset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: presetsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presets"] });
    },
  });
}
