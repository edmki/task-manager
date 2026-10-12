"use client";

import { useDraggable } from "@dnd-kit/react";
import { Feedback } from "@dnd-kit/dom";

type TaskBlockProps = {
  id: string;
  title: string;
  duration: number;
};

export function TaskBlock({ id, title, duration }: TaskBlockProps) {
  const { ref } = useDraggable({
    id,
    data: {
      type: "task-block",
      duration,
    },
    plugins: [
      Feedback.configure({
        feedback: "clone",
      }),
    ],
  });

  return (
    <div
      ref={ref}
      className={`bg-zinc-800 rounded-md p-2 w-full cursor-grab h-12`}
    >
      <span>{title}</span>
    </div>
  );
}
