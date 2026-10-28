import { useMemo } from "react";
import { useSettings } from "../use-settings";
import { TIME_INTERVAL_MINUTES } from "@/constants/settings";

export type TimeIntervalData = {
  id: string;
  startTime: Date;
  endTime: Date;
};

export function useTimeGrid(): TimeIntervalData[] {
  const { dayStartTime, dayEndTime } = useSettings();

  return useMemo(() => {
    const stepMs = TIME_INTERVAL_MINUTES * 60_000;
    const total = Math.max(
      0,
      Math.floor((dayEndTime.getTime() - dayStartTime.getTime()) / stepMs),
    );

    return Array.from({ length: total }, (_, i) => {
      const startTime = new Date(dayStartTime.getTime() + i * stepMs);
      return {
        id: `time-interval-${i}`,
        startTime,
        endTime: new Date(startTime.getTime() + stepMs),
      };
    });
  }, [dayStartTime, dayEndTime]);
}
