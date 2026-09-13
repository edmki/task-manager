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
import { useState } from "react";

export default function DashboardPage() {
  const { data: tasks, isLoading } = useTasks();
  const { mutate: completeTask } = useCompleteTask();
  const { mutate: createTask } = useCreateTask();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  if (isLoading) return <div>Carregando tarefas...</div>;

  return (
    <div>
      <div>
        {tasks?.map((task) => (
          <Item key={task.id}>
            <Field orientation="horizontal">
              <Checkbox
                id="toggle-checkbox-2"
                name="toggle-checkbox-2"
                // onClick={() => completeTask(task.id)}
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
