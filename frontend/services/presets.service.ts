import { api } from "@/lib/api";

export type Preset = {
  id: string;
  title: string;
  durationMinutes: number;
};

export const presetsService = {
  list: () => api.get<Preset[]>("/time-block-presets").then((r) => r.data),
  create: (data: Omit<Preset, "id">): Promise<Preset> =>
    api.post<Preset>("/time-block-presets", data).then((r) => r.data),
  update: (data: Preset): Promise<Preset> =>
    api.put<Preset>(`/time-block-presets/${data.id}`, data).then((r) => r.data),
};
