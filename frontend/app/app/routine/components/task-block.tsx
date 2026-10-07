import { useDraggable } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";

type TaskBlockProps = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
};

export function TaskBlock({ id, title, startTime, endTime }: TaskBlockProps) {
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
