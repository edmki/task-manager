import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTimeBlockDialog } from "@/hooks/routine/use-time-block-dialog";
import { TimeBlock } from "@/services/time-block.service";

type TimeBlockDialogProps = {
  onCreate: (data: Omit<TimeBlock, "id">) => void;
  onEdit: (data: TimeBlock) => void;
};

export function TimeBlockDialog({ onCreate, onEdit }: TimeBlockDialogProps) {
  const dialogHandle = useTimeBlockDialog();

  const handleEdit = (data: TimeBlock) => {
    onEdit(data);
    dialogHandle?.close();
  };

  const handleCreate = (data: Omit<TimeBlock, "id">) => {
    onCreate(data);
    dialogHandle?.close();
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
                onSubmit={(e) => {
                  e.preventDefault();

                  const formData = new FormData(e.currentTarget);
                  const title = formData.get("title") as string;
                  const startTime = new Date(
                    formData.get("startTime") as string,
                  );
                  const endTime = new Date(formData.get("endTime") as string);

                  if (isEditMode && payload) {
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
                defaultValue={payload?.title}
                name="title"
                placeholder="Time Block Title"
              />
              <Input
                type="datetime-local"
                defaultValue={payload?.startTime?.toISOString().slice(0, 16)}
                name="startTime"
                placeholder="Start Time"
              />
              <Input
                type="datetime-local"
                defaultValue={payload?.endTime?.toISOString().slice(0, 16)}
                name="endTime"
                placeholder="End Time"
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
