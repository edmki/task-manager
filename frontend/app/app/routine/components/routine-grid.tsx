import { cn } from "cn";
import { TimeIntervalData } from "@/hooks/routine/use-time-grid";
import { useSettings } from "@/hooks/use-settings";
import { TimeBlock } from "@/services/time-block.service";
import { TimeBlockCard } from "./time-block-card";
import { TimeInterval } from "./time-interval";
import { PIXELS_PER_MINUTE, TIME_INTERVAL_MINUTES } from "@/constants/settings";
import { getBorderClass } from "@/lib/routine-grid";

export type RoutineGridProps = {
  intervals: TimeIntervalData[];
  timeBlocks: TimeBlock[];
};
export function RoutineGrid({ intervals, timeBlocks }: RoutineGridProps) {
  const { dayStartTime, dayEndTime } = useSettings();

  return (
    <div className="flex-1 w-full px-4 mt-16">
      <h1>Rotina</h1>
      <div className="flex gap-4 mt-8  max-w-3xl">
        <div className="flex flex-col text-zinc-400 text-sm -top-2 relative">
          {Array.from({
            length: dayEndTime.getHours() - dayStartTime.getHours(),
          }).map((_, index) => (
            <div key={index} className="h-12">
              {`${String(dayStartTime.getHours() + index).padStart(2, "0")}:00`}
            </div>
          ))}
          <div className="h-12">
            {`${String(dayEndTime.getHours()).padStart(2, "0")}:00`}
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="flex flex-col border-b border-zinc-800">
            {intervals.map((interval, index) => (
              <TimeInterval
                key={interval.id}
                id={interval.id}
                className={cn("border-t", getBorderClass(interval.startTime))}
                style={{
                  height: `${TIME_INTERVAL_MINUTES * PIXELS_PER_MINUTE}px`,
                }}
              />
            ))}
          </div>
          {timeBlocks.map((timeBlock) => (
            <TimeBlockCard
              key={timeBlock.id}
              id={timeBlock.id}
              title={timeBlock.title}
              startTime={timeBlock.startTime}
              endTime={timeBlock.endTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
