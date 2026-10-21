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

export const presetsService = {
  list: () => Promise.resolve(presetMock),
};
