"use client";

import { useDraggable } from "@dnd-kit/react";
import { differenceInMinutes, format, startOfDay } from "date-fns";
import { useSettings } from "@/hooks/use-settings";
import { PIXELS_PER_MINUTE, TIME_INTERVAL_MINUTES } from "@/constants/settings";

type TimeBlockCardProps = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
};

export function TimeBlockCard({
  id,
  title,
  startTime,
  endTime,
}: TimeBlockCardProps) {
  const { ref } = useDraggable({ id });
  const { dayStartMinutes } = useSettings();

  const minutesFromMidnight = differenceInMinutes(
    startTime,
    startOfDay(startTime),
  );
  const durationMinutes = differenceInMinutes(endTime, startTime);

  const top = (minutesFromMidnight - dayStartMinutes) * PIXELS_PER_MINUTE;
  const height = durationMinutes * PIXELS_PER_MINUTE;

  const isCompact = durationMinutes < TIME_INTERVAL_MINUTES * 2;

  const startLabel = format(startTime, "HH:mm");
  const endLabel = format(endTime, "HH:mm");

  return (
    <div
      ref={ref}
      className="bg-zinc-800 rounded-md py-1 px-2 absolute w-full cursor-grab text-sm flex flex-col flex-wrap gap-0.5 content-start"
      style={{ top, height }}
    >
      <span>{title}</span>
      {isCompact ? (
        <span className="text-zinc-400 ml-1">{startLabel}</span>
      ) : (
        <div className="text-xs text-zinc-400">
          {startLabel} - {endLabel}
        </div>
      )}
    </div>
  );
}
