"use client";
import { useCallback, useMemo, useState } from "react";
import { TaskBlock } from "./components/task-block";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";
import { TimeInterval } from "./components/time-interval";
import { TaskBlocksSidebar } from "./components/task-blocks-sidebar";
import { Task } from "./components/task";

const tasksData = [
  {
    id: "task-1",
    title: "Almoço",
    startTime: new Date("2026-10-03T12:00:00"),
    endTime: new Date("2026-10-03T13:00:00"),
  },
  {
    id: "task-2",
    title: "Trabalho focado",
    startTime: new Date("2026-10-03T14:00:00"),
    endTime: new Date("2026-10-03T16:30:00"),
  },
];

const taskBlocksData = [
  {
    id: "task-block-1",
    title: "Pausa",
    duration: 30,
  },
  {
    id: "task-block-2",
    title: "Trabalho focado",
    duration: 90,
  },
];

export default function RoutinePage() {
  const [tasks, setTasks] = useState(tasksData);
  const [taskBlocks, setTaskBlocks] = useState(taskBlocksData);
  const { dayStartTime, dayEndTime, timeIntervalMinutes } = useSettings();

  const totalIntervals = useMemo(
    () =>
      Math.max(
        0,
        Math.floor(
          (dayEndTime.getTime() - dayStartTime.getTime()) /
            (1000 * 60 * timeIntervalMinutes),
        ),
      ),
    [dayEndTime, dayStartTime, timeIntervalMinutes],
  );

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

  const handleTaskDragEnd = (sourceId: string, targetId: string) => {
    const intervalIndex = intervalsData.findIndex(
      (interval) => interval.id === targetId,
    );

    if (intervalIndex === -1) return;

    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === sourceId);
      if (taskIndex === -1) return prevTasks;

      const taskToUpdate = prevTasks[taskIndex];
      const taskDuration =
        taskToUpdate.endTime.getTime() - taskToUpdate.startTime.getTime();
      const newStartTime = new Date(intervalsData[intervalIndex].startTime);
      const newEndTime = new Date(newStartTime.getTime() + taskDuration);

      const hasOverlap = prevTasks.some((task) => {
        if (task.id === sourceId) return false;

        return newStartTime < task.endTime && newEndTime > task.startTime;
      });

      if (hasOverlap) {
        return prevTasks;
      }

      const updatedTask = {
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        startTime: newStartTime,
        endTime: newEndTime,
      };

      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = updatedTask;

      return updatedTasks;
    });
  };

  const handleTaskBlockDragEnd = (sourceId: string, targetId: string) => {
    const sourceTaskBlockIndex = taskBlocks.findIndex(
      (task) => task.id === sourceId,
    );
    const intervalIndex = intervalsData.findIndex(
      (interval) => interval.id === targetId,
    );

    if (sourceTaskBlockIndex === -1 || intervalIndex === -1) return;

    const taskBlockToMove = taskBlocks[sourceTaskBlockIndex];

    const newStartTime = new Date(intervalsData[intervalIndex].startTime);
    const newEndTime = new Date(
      newStartTime.getTime() + taskBlockToMove.duration * 60 * 1000,
    );

    const hasOverlap = tasks.some((task) => {
      if (task.id === sourceId) return false;

      return newStartTime < task.endTime && newEndTime > task.startTime;
    });

    if (hasOverlap) return;

    // Create a new task based on the task block
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskBlockToMove.title,
      startTime: newStartTime,
      endTime: newEndTime,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <DragDropProvider
      onDragEnd={({ operation }) => {
        if (!operation?.source) return;

        if (operation.source.data?.type === "task-block") {
          handleTaskBlockDragEnd(
            operation.source.id.toString(),
            operation.target?.id.toString() || "",
          );
          return;
        }

        handleTaskDragEnd(
          operation.source.id.toString(),
          operation.target?.id.toString() || "",
        );
      }}
    >
      <DragOverlay
        dropAnimation={null}
        disabled={(source) => source?.data?.type !== "task-block"}
      >
        {(source) => {
          if (!source || source.data?.type !== "task-block") {
            return null;
          }

          const taskBlock = taskBlocks.find((task) => task.id === source.id);

          if (!taskBlock) return null;

          return (
            <TaskBlock
              id={taskBlock.id}
              title={taskBlock.title}
              duration={taskBlock.duration}
            />
          );
        }}
      </DragOverlay>
      <div className="max-w-3xl w-full">
        <TaskBlocksSidebar droppableId="task-blocks-sidebar">
          {taskBlocks.map((task) => (
            <TaskBlock
              key={task.id}
              id={task.id}
              title={task.title}
              duration={task.duration}
            />
          ))}
        </TaskBlocksSidebar>
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
            <div className="flex flex-col">
              {intervalsData.map((interval) => (
                <TimeInterval
                  key={interval.id}
                  id={interval.id}
                  className="h-6 border-t border-zinc-700"
                />
              ))}
            </div>
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                startTime={task.startTime}
                endTime={task.endTime}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}
