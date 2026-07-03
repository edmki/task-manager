import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "@/services/tasks.service";

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksService.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
