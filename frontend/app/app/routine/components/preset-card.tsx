"use client";

import { useDraggable } from "@dnd-kit/react";
import { Feedback } from "@dnd-kit/dom";
import { DraggableType } from "../enums/draggable-type";
import { DialogTrigger } from "@/components/ui/dialog";
import { usePresetDialog } from "@/hooks/routine/use-preset-dialog";

type PresetCardProps = {
  id: string;
  title: string;
  duration: number;
  isOverlay?: boolean;
};

export function PresetCard({
  id,
  title,
  duration,
  isOverlay,
}: PresetCardProps) {
  const dialogHandle = usePresetDialog();

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

  if (isOverlay) {
    return (
      <div className="bg-zinc-800 rounded-md p-2 w-full cursor-grab text-left">
        <span className="block">{title}</span>
        <span className="block text-xs text-zinc-400">{duration} min</span>
      </div>
    );
  }

  return (
    <DialogTrigger
      ref={ref}
      handle={dialogHandle}
      className="bg-zinc-800 rounded-md p-2 w-full cursor-grab text-left"
      payload={{
        id,
        title,
        durationMinutes: duration,
      }}
    >
      <span className="block">{title}</span>
      <span className="block text-xs text-zinc-400">{duration} min</span>
    </DialogTrigger>
  );
}
