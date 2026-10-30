import { addDays, parse } from "date-fns";

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

function updateTimeBlock(
  id: string,
  data: Partial<Omit<TimeBlock, "id">>,
): Promise<TimeBlock> {
  const index = timeBlockMock.findIndex((tb) => tb.id === id);
  if (index !== -1) {
    timeBlockMock[index] = {
      ...timeBlockMock[index],
      ...data,
    };
    return delay(timeBlockMock[index]);
  } else {
    return Promise.reject(new Error("Time block not found"));
  }
}

export const timeBlockService = {
  list: (dateKey: string) => {
    const start = parse(dateKey, "yyyy-MM-dd", new Date());
    const end = addDays(start, 1);
    return Promise.resolve(
      timeBlockMock.filter((b) => b.startTime >= start && b.startTime < end),
    );
  },
  create: createTimeBlock,
  update: updateTimeBlock,
};
