import { presetsService } from "@/services/presets.service";
import { useQuery } from "@tanstack/react-query";

export function usePresets() {
  return useQuery({
    queryKey: ["presets"],
    queryFn: presetsService.list,
  });
}
