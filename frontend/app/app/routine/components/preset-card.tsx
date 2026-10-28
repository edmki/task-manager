"use client";

import { useDraggable } from "@dnd-kit/react";
import { Feedback } from "@dnd-kit/dom";
import { DraggableType } from "../enums/draggable-type";

type PresetCardProps = {
  id: string;
  title: string;
  duration: number;
};

export function PresetCard({ id, title, duration }: PresetCardProps) {
  const { ref } = useDraggable({
    id,
    data: {
      type: DraggableType.preset,
      duration,
    },
    plugins: [
      Feedback.configure({
        feedback: "clone",
      }),
    ],
  });

  return (
    <div ref={ref} className={`bg-zinc-800 rounded-md p-2 w-full cursor-grab`}>
      <span>{title}</span>
      <div className="text-xs text-zinc-400">{duration} min</div>
    </div>
  );
}
