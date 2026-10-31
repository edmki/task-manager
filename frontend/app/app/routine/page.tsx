"use client";

import { ComponentProps, useMemo } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Dialog } from "@base-ui/react";
import { PresetCard } from "./components/preset-card";
import { PresetsSidebar } from "./components/presets-sidebar";
import { PresetDialog } from "./components/preset-dialog";
import { PresetDragOverlay } from "./components/preset-drag-overlay";
import { RoutineGrid } from "./components/routine-grid";
import { DraggableType } from "./enums/draggable-type";
import { usePresets } from "@/hooks/routine/use-presets";
import { useCreatePreset } from "@/hooks/routine/use-create-preset";
import { useUpdatePreset } from "@/hooks/routine/use-update-preset";
import { useTimeBlocks } from "@/hooks/routine/use-time-blocks";
import { useCreateTimeBlock } from "@/hooks/routine/use-create-time-block";
import { useUpdateTimeBlock } from "@/hooks/routine/use-update-time-block";
import { useTimeGrid } from "@/hooks/routine/use-time-grid";
import { useSelectedDate } from "@/hooks/routine/use-selected-date";
import { hasOverlap } from "@/lib/time-blocks";
import { Preset } from "@/services/presets.service";
import { minutesToMilliseconds } from "date-fns";

const presetDialog = Dialog.createHandle<Preset>();

export default function RoutinePage() {
  const { dateKey } = useSelectedDate();

  const { data: presets } = usePresets();
  const { data: timeBlocks } = useTimeBlocks(dateKey);
  const intervals = useTimeGrid(dateKey);

  const { mutate: createTimeBlock } = useCreateTimeBlock();
  const { mutate: updateTimeBlock } = useUpdateTimeBlock();
  const { mutate: createPreset } = useCreatePreset();
  const { mutate: updatePreset } = useUpdatePreset();

  const intervalsById = useMemo(
    () => new Map(intervals.map((i) => [i.id, i])),
    [intervals],
  );

  const moveTimeBlock = (timeBlockId: string, newStartTime: Date) => {
    const block = timeBlocks?.find((b) => b.id === timeBlockId);
    if (!block) return;

    const duration = block.endTime.getTime() - block.startTime.getTime();
    const newEndTime = new Date(newStartTime.getTime() + duration);

    if (hasOverlap(timeBlocks ?? [], newStartTime, newEndTime, timeBlockId)) {
      return;
    }

    updateTimeBlock({
      id: block.id,
      data: { startTime: newStartTime, endTime: newEndTime },
    });
  };

  const placePreset = (presetId: string, startTime: Date) => {
    const preset = presets?.find((p) => p.id === presetId);
    if (!preset) return;

    const endTime = new Date(
      startTime.getTime() + minutesToMilliseconds(preset.durationMinutes),
    );

    if (hasOverlap(timeBlocks ?? [], startTime, endTime)) return;

    createTimeBlock({ title: preset.title, startTime, endTime });
  };

  const handleDragEnd: ComponentProps<typeof DragDropProvider>["onDragEnd"] = ({
    operation,
  }) => {
    const { source, target } = operation;
    if (!source || !target) return;

    const interval = intervalsById.get(target.id.toString());
    if (!interval) return;

    if (source.data?.type === DraggableType.preset) {
      placePreset(source.id.toString(), interval.startTime);
    } else {
      moveTimeBlock(source.id.toString(), interval.startTime);
    }
  };

  if (!presets || !timeBlocks) {
    return <div>Carregando...</div>;
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <PresetDragOverlay presets={presets} />
      <div className="flex">
        <RoutineGrid intervals={intervals} timeBlocks={timeBlocks} />
        <PresetsSidebar dialogHandle={presetDialog}>
          {presets.map((preset) => (
            <PresetCard
              key={preset.id}
              id={preset.id}
              title={preset.title}
              duration={preset.durationMinutes}
              dialogHandle={presetDialog}
            />
          ))}
        </PresetsSidebar>
      </div>
      <PresetDialog
        dialogHandle={presetDialog}
        onCreate={createPreset}
        onEdit={updatePreset}
      />
    </DragDropProvider>
  );
}
