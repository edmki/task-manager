"use client";
import { useTasks } from "@/hooks/tasks/use-tasks";
import { useCompleteTask } from "@/hooks/tasks/use-complete-task";
import { Field, FieldContent, FieldTitle } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@/components/ui/item";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useCreateTask } from "@/hooks/tasks/use-create-task";
import { useMemo, useState } from "react";

export default function DashboardPage() {
  const { data: tasks, isLoading } = useTasks();
  const { mutate: completeTask } = useCompleteTask();
  const { mutate: createTask } = useCreateTask();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const inProgressTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter((task) => !task.completed);
  }, [tasks]);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div>
        {inProgressTasks.map((task) => (
          <Item key={task.id}>
            <Field orientation="horizontal">
              <Checkbox
                id="toggle-checkbox-2"
                name="toggle-checkbox-2"
                className="mr-1"
                onClick={() => completeTask(task.id)}
              />
              <FieldContent>
                <FieldTitle>{task.title}</FieldTitle>
              </FieldContent>
            </Field>
          </Item>
        ))}
      </div>
      <Item>
        <ButtonGroup>
          <Input
            id="input-button-group"
            placeholder="Título da tarefa"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (newTaskTitle.trim()) {
                createTask({ title: newTaskTitle });
                setNewTaskTitle("");
              }
            }}
          >
            <Plus />
          </Button>
        </ButtonGroup>
      </Item>
    </div>
  );
}
