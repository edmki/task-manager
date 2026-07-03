import { api } from "@/lib/api";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export const tasksService = {
  list: () => api.get<Task[]>("/tasks").then((r) => r.data),

  create: (data: { title: string; description?: string }) =>
    api.post<Task>("/tasks", data).then((r) => r.data),

  update: (id: string, data: { title?: string; description?: string }) =>
    api.put<Task>(`/tasks/${id}`, data).then((r) => r.data),

  complete: (id: string) =>
    api.patch<Task>(`/tasks/${id}/complete`).then((r) => r.data),

  delete: (id: string) => api.delete(`/tasks/${id}`),
};
