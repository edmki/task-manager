import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "@/services/tasks.service";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
