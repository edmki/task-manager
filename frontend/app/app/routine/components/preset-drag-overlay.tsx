import { DragOverlay } from "@dnd-kit/react";
import { DraggableType } from "../enums/draggable-type";
import { Preset } from "@/services/presets.service";
import { PresetCard } from "./preset-card";

export type PresetDialogProps = {
  presets: Preset[];
};

export function PresetDragOverlay({ presets }: PresetDialogProps) {
  return (
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
          <PresetCard
            id={preset.id}
            title={preset.title}
            duration={preset.durationMinutes}
          />
        );
      }}
    </DragOverlay>
  );
}
