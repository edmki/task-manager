"use client";
import { useMemo, useState } from "react";
import { Preset } from "./components/preset";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";
import { TimeInterval } from "./components/time-interval";
import { PresetsSidebar } from "./components/presets-sidebar";
import { TimeBlock } from "./components/time-block";
import { DraggableType } from "./enums/draggable-type";

const timeBlocksData = [
  {
    id: "time-block-1",
    title: "Almoço",
    startTime: new Date("2026-10-03T12:00:00"),
    endTime: new Date("2026-10-03T13:00:00"),
  },
  {
    id: "time-block-2",
    title: "Trabalho focado",
    startTime: new Date("2026-10-03T14:00:00"),
    endTime: new Date("2026-10-03T16:30:00"),
  },
];

const presetsData = [
  {
    id: "preset-1",
    title: "Pausa",
    duration: 30,
  },
  {
    id: "preset-2",
    title: "Trabalho focado",
    duration: 90,
  },
];

export default function RoutinePage() {
  const [timeBlocks, setTimeBlocks] = useState(timeBlocksData);
  const [presets, setPresets] = useState(presetsData);
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

  const handleTimeBlockDragEnd = (sourceId: string, targetId: string) => {
    const intervalIndex = intervalsData.findIndex(
      (interval) => interval.id === targetId,
    );

    if (intervalIndex === -1) return;

    setTimeBlocks((prevTimeBlocks) => {
      const timeBlockIndex = prevTimeBlocks.findIndex(
        (timeBlock) => timeBlock.id === sourceId,
      );
      if (timeBlockIndex === -1) return prevTimeBlocks;

      const timeBlockToUpdate = prevTimeBlocks[timeBlockIndex];
      const timeBlockDuration =
        timeBlockToUpdate.endTime.getTime() -
        timeBlockToUpdate.startTime.getTime();
      const newStartTime = new Date(intervalsData[intervalIndex].startTime);
      const newEndTime = new Date(newStartTime.getTime() + timeBlockDuration);

      const hasOverlap = prevTimeBlocks.some((timeBlock) => {
        if (timeBlock.id === sourceId) return false;

        return (
          newStartTime < timeBlock.endTime && newEndTime > timeBlock.startTime
        );
      });

      if (hasOverlap) {
        return prevTimeBlocks;
      }

      const updatedTimeBlock = {
        id: timeBlockToUpdate.id,
        title: timeBlockToUpdate.title,
        startTime: newStartTime,
        endTime: newEndTime,
      };

      const updatedTimeBlocks = [...prevTimeBlocks];
      updatedTimeBlocks[timeBlockIndex] = updatedTimeBlock;

      return updatedTimeBlocks;
    });
  };

  const handlePresetDragEnd = (sourceId: string, targetId: string) => {
    const sourcePresetIndex = presets.findIndex(
      (preset) => preset.id === sourceId,
    );
    const intervalIndex = intervalsData.findIndex(
      (interval) => interval.id === targetId,
    );

    if (sourcePresetIndex === -1 || intervalIndex === -1) return;

    const presetToMove = presets[sourcePresetIndex];

    const newStartTime = new Date(intervalsData[intervalIndex].startTime);
    const newEndTime = new Date(
      newStartTime.getTime() + presetToMove.duration * 60 * 1000,
    );

    const hasOverlap = timeBlocks.some((timeBlock) => {
      if (timeBlock.id === sourceId) return false;

      return (
        newStartTime < timeBlock.endTime && newEndTime > timeBlock.startTime
      );
    });

    if (hasOverlap) return;

    // Create a new timeBlock based on the preset
    const newTimeBlock = {
      id: `time-block-${Date.now()}`,
      title: presetToMove.title,
      startTime: newStartTime,
      endTime: newEndTime,
    };

    setTimeBlocks((prevTimeBlocks) => [...prevTimeBlocks, newTimeBlock]);
  };

  return (
    <DragDropProvider
      onDragEnd={({ operation }) => {
        if (!operation?.source) return;

        if (operation.source.data?.type === DraggableType.preset) {
          handlePresetDragEnd(
            operation.source.id.toString(),
            operation.target?.id.toString() || "",
          );
          return;
        }

        handleTimeBlockDragEnd(
          operation.source.id.toString(),
          operation.target?.id.toString() || "",
        );
      }}
    >
      <DragOverlay
        dropAnimation={null}
        disabled={(source) => source?.data?.type !== DraggableType.preset}
      >
        {(source) => {
          if (!source || source.data?.type !== DraggableType.preset) {
            return null;
          }

          const preset = presets.find(
            (timeBlock) => timeBlock.id === source.id,
          );

          if (!preset) return null;

          return (
            <Preset
              id={preset.id}
              title={preset.title}
              duration={preset.duration}
            />
          );
        }}
      </DragOverlay>
      <div className="max-w-3xl w-full">
        <PresetsSidebar>
          {presets.map((preset) => (
            <Preset
              key={preset.id}
              id={preset.id}
              title={preset.title}
              duration={preset.duration}
            />
          ))}
        </PresetsSidebar>
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
              {intervalsData.map((interval, index) => (
                <TimeInterval
                  key={interval.id}
                  id={interval.id}
                  className={`h-6 border-t ${index % 2 === 0 ? "border-zinc-800" : "border-zinc-900"}`}
                />
              ))}
            </div>
            {timeBlocks.map((timeBlock) => (
              <TimeBlock
                key={timeBlock.id}
                id={timeBlock.id}
                title={timeBlock.title}
                startTime={timeBlock.startTime}
                endTime={timeBlock.endTime}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}
