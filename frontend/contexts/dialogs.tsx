import { Preset } from "@/services/presets.service";
import { TimeBlock } from "@/services/time-block.service";
import { Dialog } from "@base-ui/react";
import { createContext, useState } from "react";

type DialogsContextValue = {
  presetDialog: Dialog.Handle<Preset>;
  timeBlockDialog: Dialog.Handle<TimeBlock>;
};

export const DialogsContext = createContext<DialogsContextValue | null>(null);

export function DialogsProvider({ children }: { children: React.ReactNode }) {
  const [dialogs] = useState<DialogsContextValue>(() => ({
    presetDialog: Dialog.createHandle<Preset>(),
    timeBlockDialog: Dialog.createHandle<TimeBlock>(),
  }));

  return <DialogsContext value={dialogs}>{children}</DialogsContext>;
}
