"use client";
import { useMemo } from "react";
import { Preset as PresetItem } from "./components/preset";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useSettings } from "@/hooks/use-settings";
import { TimeInterval } from "./components/time-interval";
import { PresetsSidebar } from "./components/presets-sidebar";
import { TimeBlock } from "./components/time-block";
import { DraggableType } from "./enums/draggable-type";
import { usePresets } from "@/hooks/routine/use-presets";
import { useTimeBlocks } from "@/hooks/routine/use-time-blocks";
import { useCreateTimeBlock } from "@/hooks/routine/use-create-time-block";
import { useUpdateTimeBlock } from "@/hooks/routine/use-update-time-block";
import { PresetDialog } from "./components/preset-dialog";
import { useCreatePreset } from "@/hooks/routine/use-create-preset";
import { Dialog } from "@base-ui/react";
import { Preset } from "@/services/presets.service";
import { useUpdatePreset } from "@/hooks/routine/use-update-preset";
import { TIME_INTERVAL_MINUTES } from "@/constants/settings";
import { hasOverlap } from "@/lib/time-blocks";

export default function RoutinePage() {
  const { data: presets } = usePresets();
  const { data: timeBlocks } = useTimeBlocks();

  const { mutate: createTimeBlock } = useCreateTimeBlock();
  const { mutate: updateTimeBlock } = useUpdateTimeBlock();
  const { mutate: createPreset } = useCreatePreset();
  const { mutate: updatePreset } = useUpdatePreset();

  const { dayStartTime, dayEndTime } = useSettings();

  const presetDialog = Dialog.createHandle<Preset>();

  const totalIntervals = useMemo(
    () =>
      Math.max(
        0,
        Math.floor(
          (dayEndTime.getTime() - dayStartTime.getTime()) /
            (1000 * 60 * TIME_INTERVAL_MINUTES),
        ),
      ),
    [dayEndTime, dayStartTime],
  );

  const intervalsData = useMemo(() => {
    return Array.from({ length: totalIntervals }).map((_, index) => {
      const intervalStart = new Date(dayStartTime);
      intervalStart.setMinutes(
        dayStartTime.getMinutes() + index * TIME_INTERVAL_MINUTES,
      );
      const intervalEnd = new Date(intervalStart);
      intervalEnd.setMinutes(
        intervalStart.getMinutes() + TIME_INTERVAL_MINUTES,
      );

      return {
        id: `time-interval-${index}`,
        startTime: intervalStart,
        endTime: intervalEnd,
      };
    });
  }, [dayStartTime, totalIntervals]);

  const handleTimeBlockDragEnd = (sourceId: string, targetId: string) => {
    const intervalIndex = intervalsData.findIndex(
      (interval) => interval.id === targetId,
    );

    if (intervalIndex === -1) return;

    const timeBlockToUpdate = timeBlocks?.find(
      (timeBlock) => timeBlock.id === sourceId,
    );
    if (!timeBlockToUpdate) return;

    const timeBlockDuration =
      timeBlockToUpdate.endTime.getTime() -
      timeBlockToUpdate.startTime.getTime();
    const newStartTime = new Date(intervalsData[intervalIndex].startTime);
    const newEndTime = new Date(newStartTime.getTime() + timeBlockDuration);

    if (hasOverlap(timeBlocks ?? [], newStartTime, newEndTime, sourceId)) {
      return;
    }

    updateTimeBlock({
      id: timeBlockToUpdate.id,
      title: timeBlockToUpdate.title,
      startTime: newStartTime,
      endTime: newEndTime,
    });
  };

  const handlePresetDragEnd = (sourceId: string, targetId: string) => {
    if (!presets || !timeBlocks) return;

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
      newStartTime.getTime() + presetToMove.durationMinutes * 60 * 1000,
    );

    if (hasOverlap(timeBlocks || [], newStartTime, newEndTime)) return;

    createTimeBlock({
      title: presetToMove.title,
      startTime: newStartTime,
      endTime: newEndTime,
    });
  };

  const handleCreatePreset = (preset: Omit<Preset, "id">) => {
    createPreset(preset);
  };

  const handleEditPreset = (preset: Preset) => {
    updatePreset(preset);
  };

  if (!presets || !timeBlocks) {
    return <div>Loading...</div>;
  }

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

          const preset = presets.find((preset) => preset.id === source.id);

          if (!preset) return null;

          return (
            <PresetItem
              id={preset.id}
              title={preset.title}
              duration={preset.durationMinutes}
            />
          );
        }}
      </DragOverlay>
      <div className="max-w-3xl w-full">
        <PresetsSidebar dialogHandle={presetDialog}>
          {presets.map((preset) => (
            <PresetItem
              key={preset.id}
              id={preset.id}
              title={preset.title}
              duration={preset.durationMinutes}
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
            <div className="h-12">
              {`${String(dayEndTime.getHours()).padStart(2, "0")}:00`}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="flex flex-col border-b border-zinc-800">
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
      <PresetDialog
        dialogHandle={presetDialog}
        onCreate={handleCreatePreset}
        onEdit={handleEditPreset}
      />
    </DragDropProvider>
  );
}
