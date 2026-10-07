"use client";
import { useMemo, useState } from "react";
import { TaskBlock } from "./components/task-block";
import { DragDropProvider } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";
import { TimeInterval } from "./components/time-interval";

const taskBlocksData = [
  {
    id: "task-1",
    title: "Tarefa 1",
    startTime: new Date("2026-10-03T06:00:00"),
    endTime: new Date("2026-10-03T07:00:00"),
  },
  {
    id: "task-2",
    title: "Tarefa 2",
    startTime: new Date("2026-10-03T08:00:00"),
    endTime: new Date("2026-10-03T09:30:00"),
  },
];

export default function RoutinePage() {
  const [taskBlocks, setTaskBlocks] = useState(taskBlocksData);
  const { dayStartTime, dayEndTime, timeIntervalMinutes } = useSettings();

  const totalIntervals =
    (dayEndTime.getHours() - dayStartTime.getHours()) *
      (60 / timeIntervalMinutes) -
    1;

  const intervalsData = useMemo(() => {
    return Array.from({ length: totalIntervals }).map((_, index) => {
      const intervalStart = new Date(dayStartTime);
      intervalStart.setMinutes(
        dayStartTime.getMinutes() + index * timeIntervalMinutes,
      );
      const intervalEnd = new Date(intervalStart);
      intervalEnd.setMinutes(intervalStart.getMinutes() + timeIntervalMinutes);

      return {
        id: `time-interval-${index}`,
        startTime: intervalStart,
        endTime: intervalEnd,
      };
    });
  }, [dayStartTime, timeIntervalMinutes, totalIntervals]);

  const handleDragEnd = (sourceId: string, targetId: string) => {
    const sourceTaskIndex = taskBlocks.findIndex(
      (task) => task.id === sourceId,
    );
    const intervalIndex = intervalsData.findIndex(
      (interval) => interval.id === targetId,
    );

    if (sourceTaskIndex === -1 || intervalIndex === -1) return;

    const newTaskBlocks = [...taskBlocks];
    const taskToMove = newTaskBlocks[sourceTaskIndex];
    const taskDuration =
      taskToMove.endTime.getTime() - taskToMove.startTime.getTime();

    const newStartTime = new Date(intervalsData[intervalIndex].startTime);
    const newEndTime = new Date(newStartTime.getTime() + taskDuration);

    taskToMove.startTime = newStartTime;
    taskToMove.endTime = newEndTime;

    setTaskBlocks(newTaskBlocks);
  };

  return (
    <div className="max-w-3xl w-full">
      <h1>Rotina</h1>
      <div className="flex gap-4 mt-8">
        <div className="flex flex-col text-zinc-400 text-sm -top-2 relative">
          {Array.from({
            length: dayEndTime.getHours() - dayStartTime.getHours(),
          }).map((_, index) => (
            <div key={index} className="h-12">
              {`${String(dayStartTime.getHours() + index).padStart(2, "0")}:00`}
            </div>
          ))}
        </div>
        <div className="flex-1 relative">
          <DragDropProvider
            onDragEnd={({ operation }) => {
              if (!operation?.source) return;

              handleDragEnd(
                operation.source.id.toString(),
                operation.target?.id.toString() || "",
              );
            }}
          >
            <div className="flex flex-col">
              {intervalsData.map((interval) => (
                <TimeInterval
                  key={interval.id}
                  id={interval.id}
                  className="h-6 border-t border-zinc-700"
                />
              ))}
            </div>
            {taskBlocks.map((task) => (
              <TaskBlock
                key={task.id}
                id={task.id}
                title={task.title}
                startTime={task.startTime}
                endTime={task.endTime}
              />
            ))}
          </DragDropProvider>
        </div>
      </div>
    </div>
  );
}
