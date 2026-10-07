import { createContext, useCallback, useMemo, useState } from "react";

export type SettingsContextType = {
  dayStartTime: Date;
  dayEndTime: Date;
  timeIntervalMinutes: number;
  pxPerMinute: number;
  updateSettings?: (settings: SettingsContextType) => void;
};

const defaultSettings: SettingsContextType = {
  dayStartTime: new Date("2026-10-03T06:00:00"),
  dayEndTime: new Date("2026-10-03T23:00:00"),
  timeIntervalMinutes: 30,
  pxPerMinute: 48 / 60, // 48px per hour, so 0.8px per minute
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
