import { DialogsContext } from "@/contexts/dialogs";
import { useContext } from "react";

export function useDialogs() {
  const ctx = useContext(DialogsContext);
  if (!ctx) {
    throw new Error("useDialogs deve ser usado dentro de <DialogsProvider>");
  }
  return ctx;
}
