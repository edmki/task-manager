import { createContext, useCallback, useMemo, useState } from "react";

export type SettingsContextType = {
  dayStartMinutes: number;
  dayEndMinutes: number;
  updateSettings?: (settings: SettingsContextType) => void;
};

const defaultSettings: SettingsContextType = {
  dayStartMinutes: 8 * 60, // 8:00 AM
  dayEndMinutes: 23 * 60, // 11:00 PM
};

export const SettingsContext =
  createContext<SettingsContextType>(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] =
    useState<SettingsContextType>(defaultSettings);

  const updateSettings = useCallback((newSettings: SettingsContextType) => {
    setSettings(newSettings);
  }, []);

  const contextValue = useMemo(
    () => ({ ...settings, updateSettings }),
    [settings, updateSettings],
  );

  return <SettingsContext value={contextValue}>{children}</SettingsContext>;
}
