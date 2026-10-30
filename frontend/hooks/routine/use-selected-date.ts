import { addDays, format, parse } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FORMAT = "yyyy-MM-dd";

export function useSelectedDate() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const dateKey = params.get("date") ?? format(new Date(), FORMAT);
  const date = parse(dateKey, FORMAT, new Date());

  const setDateKey = (key: string) => router.replace(`${pathname}?date=${key}`);

  return {
    date,
    dateKey,
    goTo: (d: Date) => setDateKey(format(d, FORMAT)),
    next: () => setDateKey(format(addDays(date, 1), FORMAT)),
    prev: () => setDateKey(format(addDays(date, -1), FORMAT)),
    today: () => setDateKey(format(new Date(), FORMAT)),
  };
}
