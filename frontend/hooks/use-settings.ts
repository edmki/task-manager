import { useContext } from "react";
import { SettingsContext } from "@/contexts/settings";

export function useSettings() {
  return useContext(SettingsContext);
}
