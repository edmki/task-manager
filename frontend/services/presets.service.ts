export type Preset = {
  id: string;
  title: string;
  durationMinutes: number;
};

const presetMock: Preset[] = [
  {
    id: "preset-1",
    title: "Almoço",
    durationMinutes: 60,
  },
  {
    id: "preset-2",
    title: "Trabalho focado",
    durationMinutes: 90,
  },
];

const delay = <T>(value: T, ms = 300) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export const presetsService = {
  list: () => delay([...presetMock]),
  create: (data: Omit<Preset, "id">): Promise<Preset> => {
    const newPreset: Preset = {
      id: crypto.randomUUID(),
      ...data,
    };

    presetMock.push(newPreset);

    return delay(newPreset);
  },
  update: (data: Preset): Promise<Preset> => {
    const index = presetMock.findIndex((p) => p.id === data.id);

    if (index === -1) return Promise.reject(new Error("Preset not found"));

    presetMock[index] = { ...presetMock[index], ...data };

    return delay({ ...presetMock[index] });
  },
};
