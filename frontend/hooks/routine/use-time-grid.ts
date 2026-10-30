import { useMemo } from "react";
import { useSettings } from "../use-settings";
import { TIME_INTERVAL_MINUTES } from "@/constants/settings";
import { addMinutes, parse } from "date-fns";

export type TimeIntervalData = {
  id: string;
  startTime: Date;
  endTime: Date;
};

export function useTimeGrid(dateKey: string): TimeIntervalData[] {
  const { dayStartMinutes, dayEndMinutes } = useSettings();

  const date = useMemo(
    () => parse(dateKey, "yyyy-MM-dd", new Date()),
    [dateKey],
  );

  return useMemo(() => {
    const total = Math.floor(
      (dayEndMinutes - dayStartMinutes) / TIME_INTERVAL_MINUTES,
    );

    return Array.from({ length: total }, (_, i) => {
      const startTime = addMinutes(
        date,
        dayStartMinutes + i * TIME_INTERVAL_MINUTES,
      );
      return {
        id: `time-interval-${i}`,
        startTime,
        endTime: addMinutes(startTime, TIME_INTERVAL_MINUTES),
      };
    });
  }, [date, dayStartMinutes, dayEndMinutes]);
}
