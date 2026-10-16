"use client";

import { useDraggable } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";
import { useMemo } from "react";

type TimeBlockProps = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
};

export function TimeBlock({ id, title, startTime, endTime }: TimeBlockProps) {
  const { ref } = useDraggable({
    id,
  });
  const { dayStartTime, timeIntervalMinutes, pxPerMinute } = useSettings();

  const top =
    ((startTime.getTime() - dayStartTime.getTime()) / (1000 * 60)) *
    pxPerMinute;
  const height =
    ((endTime.getTime() - startTime.getTime()) / (1000 * 60)) * pxPerMinute;

  const oneInterval: boolean = useMemo(
    () =>
      endTime.getTime() - startTime.getTime() <
      1000 * 60 * timeIntervalMinutes * 2,
    [endTime, startTime, timeIntervalMinutes],
  );

  const startTimeString = useMemo(() => {
    return startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [startTime]);

  const endTimeString = useMemo(() => {
    return endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [endTime]);

  return (
    <div
      ref={ref}
      className="bg-zinc-800 rounded-md py-1 px-2 absolute w-full cursor-grab text-sm flex flex-col flex-wrap gap-0.5 content-start"
      style={{ top, height }}
    >
      <span>{title}</span>
      {oneInterval ? (
        <span className="text-zinc-400 ml-1">{startTimeString}</span>
      ) : (
        <div className="text-xs text-zinc-400">
          {startTimeString} - {endTimeString}
        </div>
      )}
    </div>
  );
}
