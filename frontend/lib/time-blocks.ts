import { TimeBlock } from "@/services/time-block.service";

export function hasOverlap(
  blocks: TimeBlock[],
  start: Date,
  end: Date,
  ignoreId?: string,
) {
  return blocks.some(
    (b) => b.id !== ignoreId && start < b.endTime && end > b.startTime,
  );
}
