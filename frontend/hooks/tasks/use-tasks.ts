import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/services/tasks.service";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.list,
  });
}
