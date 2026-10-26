export type TimeBlock = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
};

export type CreateTimeBlockInput = Omit<TimeBlock, "id">;

const timeBlockMock: TimeBlock[] = [
  {
    id: "time-block-1",
    title: "Almoço",
    startTime: new Date(new Date().setHours(12, 0, 0, 0)),
    endTime: new Date(new Date().setHours(13, 0, 0, 0)),
  },
  {
    id: "time-block-2",
    title: "Trabalho focado",
    startTime: new Date(new Date().setHours(14, 0, 0, 0)),
    endTime: new Date(new Date().setHours(16, 30, 0, 0)),
  },
];

const delay = <T>(value: T, ms = 300) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

function createTimeBlock(data: CreateTimeBlockInput): Promise<TimeBlock> {
  const newTimeBlock: TimeBlock = {
    id: crypto.randomUUID(),
    ...data,
  };
  timeBlockMock.push(newTimeBlock);
  return delay(newTimeBlock);
}

function updateTimeBlock(data: TimeBlock): Promise<TimeBlock> {
  const index = timeBlockMock.findIndex((tb) => tb.id === data.id);
  if (index !== -1) {
    timeBlockMock[index] = {
      ...timeBlockMock[index],
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
    };
    return delay(timeBlockMock[index]);
  } else {
    return Promise.reject(new Error("Time block not found"));
  }
}

export const timeBlockService = {
  list: () => delay([...timeBlockMock]),
  create: createTimeBlock,
  update: updateTimeBlock,
};
