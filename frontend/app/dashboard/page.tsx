'use client'
import { useTasks } from '@/hooks/tasks/use-tasks'
import { useCompleteTask } from '@/hooks/tasks/use-complete-task'

export default function DashboardPage() {
  const { data: tasks, isLoading } = useTasks()
  const { mutate: completeTask } = useCompleteTask()

  if (isLoading) return <div>Carregando quests...</div>

  return (
    <ul>
      {tasks?.map(task => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => completeTask(task.id)}>Concluir</button>
        </li>
      ))}
    </ul>
  )
}