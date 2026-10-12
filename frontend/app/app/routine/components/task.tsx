"use client";

import { useDraggable } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";

type TaskProps = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
};

export function Task({ id, title, startTime, endTime }: TaskProps) {
  const { ref } = useDraggable({
    id,
  });
  const { dayStartTime, pxPerMinute } = useSettings();

  const top =
    ((startTime.getTime() - dayStartTime.getTime()) / (1000 * 60)) *
    pxPerMinute;
  const height =
    ((endTime.getTime() - startTime.getTime()) / (1000 * 60)) * pxPerMinute;

  return (
    <div
      ref={ref}
      className="bg-zinc-800 rounded-md p-2 absolute w-full cursor-grab"
      style={{ top, height }}
    >
      <span>{title}</span>
    </div>
  );
}
