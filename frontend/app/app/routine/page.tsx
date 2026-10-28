"use client";

import { ComponentProps, useMemo } from "react";
import { PresetCard } from "./components/preset-card";
import { DragDropProvider } from "@dnd-kit/react";
import { PresetsSidebar } from "./components/presets-sidebar";
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
import { PresetDragOverlay } from "./components/preset-drag-overlay";
import { RoutineGrid } from "./components/routine-grid";

export default function RoutinePage() {
  const { data: presets } = usePresets();
  const { data: timeBlocks } = useTimeBlocks();

  const intervalsData = useTimeGrid();

  const { mutate: createTimeBlock } = useCreateTimeBlock();
  const { mutate: updateTimeBlock } = useUpdateTimeBlock();
  const { mutate: createPreset } = useCreatePreset();
  const { mutate: updatePreset } = useUpdatePreset();

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
      <PresetDragOverlay presets={presets} />
      <div className="flex">
        <RoutineGrid intervals={intervalsData} timeBlocks={timeBlocks} />
        <PresetsSidebar dialogHandle={presetDialog}>
          {presets.map((preset) => (
            <PresetCard
              key={preset.id}
              id={preset.id}
              title={preset.title}
              duration={preset.durationMinutes}
            />
          ))}
        </PresetsSidebar>
      </div>
      <PresetDialog
        dialogHandle={presetDialog}
        onCreate={handleCreatePreset}
        onEdit={handleEditPreset}
      />
    </DragDropProvider>
  );
}
