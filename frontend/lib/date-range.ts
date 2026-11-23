import { addDays, formatISO, parse, startOfDay } from "date-fns";

export type DateRange = {
  from: string;
  to: string;
};

export function getDayRange(dateKey: string): DateRange {
  const start = startOfDay(parse(dateKey, "yyyy-MM-dd", new Date()));

  return {
    from: formatISO(start),
    to: formatISO(addDays(start, 1)),
  };
}
