"use client";
import { useTasks } from "@/hooks/tasks/use-tasks";
import { useCompleteTask } from "@/hooks/tasks/use-complete-task";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

export default function DashboardPage() {
  const { data: tasks, isLoading } = useTasks();
  const { mutate: completeTask } = useCompleteTask();

  if (isLoading) return <div>Carregando quests...</div>;

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>
          <FieldLabel>
            <Field orientation="horizontal">
              <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
              <FieldContent>
                <FieldTitle>{task.title}</FieldTitle>
              </FieldContent>
            </Field>
          </FieldLabel>
          <button onClick={() => completeTask(task.id)}>Concluir</button>
        </li>
      ))}
    </ul>
  );
}
