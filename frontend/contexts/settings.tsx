import { createContext, useCallback, useMemo, useState } from "react";

export type SettingsContextType = {
  dayStartTime: Date;
  dayEndTime: Date;
  timeIntervalMinutes: number;
  pxPerMinute: number;
  updateSettings?: (settings: SettingsContextType) => void;
};

const defaultSettings: SettingsContextType = {
  dayStartTime: new Date(new Date().setHours(8, 0, 0, 0)),
  dayEndTime: new Date(new Date().setHours(23, 0, 0, 0)),
  timeIntervalMinutes: 30,
  pxPerMinute: 48 / 60,
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
