import { api } from "@/lib/api";

export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post<{ accessToken: string }>("/auth/login", data).then((r) => r.data),

  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data).then((r) => r.data),
};
