import { presetsService } from "@/services/presets.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useUpdatePreset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: presetsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presets"] });
    },
  });
}
