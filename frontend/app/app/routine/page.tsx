"use client";
import { ComponentProps, useMemo } from "react";
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
import { hasOverlap } from "@/lib/time-blocks";
import { useTimeGrid } from "@/hooks/routine/use-time-grid";

export default function RoutinePage() {
  const { data: presets } = usePresets();
  const { data: timeBlocks } = useTimeBlocks();

  const intervalsData = useTimeGrid();

  const { mutate: createTimeBlock } = useCreateTimeBlock();
  const { mutate: updateTimeBlock } = useUpdateTimeBlock();
  const { mutate: createPreset } = useCreatePreset();
  const { mutate: updatePreset } = useUpdatePreset();

  const { dayStartTime, dayEndTime } = useSettings();

  const presetDialog = Dialog.createHandle<Preset>();

  const intervalsById = useMemo(
    () => new Map(intervalsData.map((i) => [i.id, i])),
    [intervalsData],
  );

  const moveTimeBlock = (timeBlockId: string, newStartTime: Date) => {
    const timeBlockToMove = timeBlocks?.find(
      (timeBlock) => timeBlock.id === timeBlockId,
    );
    if (!timeBlockToMove) return;

    const newEndTime = new Date(
      newStartTime.getTime() +
        (timeBlockToMove.endTime.getTime() -
          timeBlockToMove.startTime.getTime()),
    );

    if (hasOverlap(timeBlocks || [], newStartTime, newEndTime, timeBlockId)) {
      return;
    }

    updateTimeBlock({
      id: timeBlockToMove.id,
      title: timeBlockToMove.title,
      startTime: newStartTime,
      endTime: newEndTime,
    });
  };

  const placePreset = (presetId: string, startTime: Date) => {
    const preset = presets?.find((p) => p.id === presetId);
    if (!preset) return;

    const endTime = new Date(
      startTime.getTime() + preset.durationMinutes * 60 * 1000,
    );

    if (hasOverlap(timeBlocks || [], startTime, endTime)) return;

    createTimeBlock({
      title: preset.title,
      startTime,
      endTime,
    });
  };

  const handleDragEnd: ComponentProps<typeof DragDropProvider>["onDragEnd"] = ({
    operation,
  }) => {
    const { source, target } = operation;
    if (!source || !target) return; // soltou fora da grade

    const interval = intervalsById.get(target.id.toString());
    if (!interval) return;

    if (source.data?.type === DraggableType.preset) {
      placePreset(source.id.toString(), interval.startTime);
    } else {
      moveTimeBlock(source.id.toString(), interval.startTime);
    }
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
    <DragDropProvider onDragEnd={handleDragEnd}>
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
