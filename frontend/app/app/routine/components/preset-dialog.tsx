import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Preset } from "@/services/presets.service";
import { Dialog as BaseDialog } from "@base-ui/react";

type PresetDialogProps = {
  dialogHandle?: BaseDialog.Handle<Preset>;
  onCreate: (data: Omit<Preset, "id">) => void;
  onEdit: (data: Preset) => void;
};

export function PresetDialog({
  dialogHandle,
  onCreate,
  onEdit,
}: PresetDialogProps) {
  const handleEdit = (data: Preset) => {
    onEdit(data);
    dialogHandle?.close();
  };

  const handleCreate = (data: Omit<Preset, "id">) => {
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
                  const durationMinutes = Number(
                    formData.get("durationMinutes") as string,
                  );

                  if (isEditMode && payload) {
                    handleEdit({ ...payload, title, durationMinutes });
                  } else {
                    handleCreate({ title, durationMinutes });
                  }
                }}
                {...props}
              />
            )}
          >
            <DialogHeader>
              <DialogTitle>Preset</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                defaultValue={payload?.title}
                name="title"
                placeholder="Preset Title"
              />
              <Input
                type="number"
                defaultValue={payload?.durationMinutes}
                name="durationMinutes"
                placeholder="Duration (minutes)"
              />
            </div>
            <DialogFooter>
              <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        );
      }}
    </Dialog>
  );
}
