import { api } from "@/lib/api";
import { DateRange } from "@/lib/date-range";

export type TimeBlock = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  leadMinutes?: number; // not implemented yet
};

export type ListTimeBlocksParams = DateRange;

export type CreateTimeBlockInput = Omit<TimeBlock, "id">;
export type UpdateTimeBlockInput = {
  id: string;
  data: Omit<TimeBlock, "id">;
};

type TimeBlockDto = Omit<TimeBlock, "startTime" | "endTime"> & {
  startTime: string;
  endTime: string;
};

const toTimeBlock = (dto: TimeBlockDto): TimeBlock => ({
  ...dto,
  startTime: new Date(dto.startTime),
  endTime: new Date(dto.endTime),
});

export const timeBlockService = {
  list: (data: ListTimeBlocksParams) =>
    api
      .get<TimeBlockDto[]>("/time-blocks", { params: data })
      .then((r) => r.data.map(toTimeBlock)),
  create: (data: CreateTimeBlockInput): Promise<TimeBlock> =>
    api
      .post<TimeBlockDto>("/time-blocks", data)
      .then((r) => toTimeBlock(r.data)),
  update: (data: UpdateTimeBlockInput): Promise<TimeBlock> =>
    api
      .put<TimeBlockDto>(`/time-blocks/${data.id}`, {
        ...data.data,
        leadMinutes: 10,
      })
      .then((r) => toTimeBlock(r.data)),
};
