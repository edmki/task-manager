import { format, isValid, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TIME_INTERVAL_MINUTES } from "@/constants/settings";
import { useSelectedDate } from "@/hooks/routine/use-selected-date";
import { useTimeBlockDialog } from "@/hooks/routine/use-time-block-dialog";
import { TimeBlock } from "@/services/time-block.service";

const TIME_FORMAT = "HH:mm";

type TimeBlockDialogProps = {
  onCreate: (data: Omit<TimeBlock, "id">) => void;
  onEdit: (data: TimeBlock) => void;
};

export function TimeBlockDialog({ onCreate, onEdit }: TimeBlockDialogProps) {
  const dialogHandle = useTimeBlockDialog();
  const { date: selectedDate } = useSelectedDate();

  const handleEdit = (data: TimeBlock) => {
    onEdit(data);
    dialogHandle?.close();
  };

  const handleCreate = (data: Omit<TimeBlock, "id">) => {
    onCreate(data);
    dialogHandle?.close();
  };

  const validateTimeRange = (form: HTMLFormElement) => {
    const start = form.elements.namedItem("startTime") as HTMLInputElement;
    const end = form.elements.namedItem("endTime") as HTMLInputElement;

    const isInvalid = start.value && end.value && end.value <= start.value;

    end.setCustomValidity(
      isInvalid ? "O horário final deve ser depois do inicial" : "",
    );
  };

  return (
    <Dialog handle={dialogHandle}>
      {({ payload }) => {
        const isEditMode = !!payload;

        return (
          <DialogContent
            className="max-w-md"
            render={(props) => (
              <form
                onChange={(e) => validateTimeRange(e.currentTarget)}
                onSubmit={(e) => {
                  e.preventDefault();

                  const formData = new FormData(e.currentTarget);
                  const title = formData.get("title") as string;
                  const baseDate = payload?.startTime ?? selectedDate;

                  const startTime = parse(
                    formData.get("startTime") as string,
                    TIME_FORMAT,
                    baseDate,
                  );
                  const endTime = parse(
                    formData.get("endTime") as string,
                    TIME_FORMAT,
                    baseDate,
                  );

                  if (!isValid(startTime) || !isValid(endTime)) return;

                  if (payload) {
                    handleEdit({ ...payload, title, startTime, endTime });
                  } else {
                    handleCreate({ title, startTime, endTime });
                  }
                }}
                {...props}
              />
            )}
          >
            <DialogHeader>
              <DialogTitle>Time Block</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                key={`title-${payload?.id ?? "new"}`}
                defaultValue={payload?.title}
                name="title"
                placeholder="Time Block Title"
                required
              />
              <Input
                key={`start-${payload?.id ?? "new"}`}
                type="time"
                name="startTime"
                aria-label="Start time"
                step={TIME_INTERVAL_MINUTES * 60}
                defaultValue={
                  payload ? format(payload.startTime, TIME_FORMAT) : undefined
                }
                required
              />
              <Input
                key={`end-${payload?.id ?? "new"}`}
                type="time"
                name="endTime"
                aria-label="End time"
                step={TIME_INTERVAL_MINUTES * 60}
                defaultValue={
                  payload ? format(payload.endTime, TIME_FORMAT) : undefined
                }
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit">{isEditMode ? "Save" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        );
      }}
    </Dialog>
  );
}
