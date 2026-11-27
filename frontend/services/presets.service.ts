import { api } from "@/lib/api";

export type Preset = {
  id: string;
  title: string;
  durationMinutes: number;
  leadMinutes?: number; // not implemented yet
};

export type CreatePresetInput = Omit<Preset, "id">;
export type UpdatePresetInput = {
  id: string;
  data: Omit<Preset, "id">;
};

export const presetsService = {
  list: () => api.get<Preset[]>("/time-block-presets").then((r) => r.data),
  create: (data: CreatePresetInput): Promise<Preset> =>
    api.post<Preset>("/time-block-presets", data).then((r) => r.data),
  update: (data: UpdatePresetInput): Promise<Preset> =>
    api
      .put<Preset>(`/time-block-presets/${data.id}`, {
        ...data.data,
        leadMinutes: 10,
      })
      .then((r) => r.data),
};
