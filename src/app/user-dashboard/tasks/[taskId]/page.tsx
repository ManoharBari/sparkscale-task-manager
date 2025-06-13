import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { TaskDetails } from "@/src/components/user-dashboard/tasks/task-details"
import { TaskRemarks } from "@/src/components/user-dashboard/tasks/task-remarks"
import { TaskStatusUpdate } from "@/src/components/user-dashboard/tasks/task-status-update"

interface TaskPageProps {
  params: {
    taskId: string
  }
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { taskId } = params

  // In a real app, you would fetch the task data
  // const task = await getTask(taskId)
  // if (!task) notFound()

  // Mock task data
  const task = {
    id: taskId,
    name: "Update user documentation",
    description: "Review and update all user documentation for the new release",
    project: {
      id: "project-1",
      name: "Website Redesign",
    },
    assignedTo: {
      id: "user-1",
      name: "John Doe",
    },
    startDate: "2023-04-15",
    dueDate: "2023-05-10",
    status: "ONGOING",
  }

  return (
    <DashboardShell>
      <UserDashboardHeader heading={task.name} text={`Task in ${task.project.name}`} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <TaskDetails task={task} />
        </div>
        <div>
          <TaskStatusUpdate task={task} />
        </div>
      </div>
      <div className="grid gap-4">
        <TaskRemarks taskId={taskId} />
      </div>
    </DashboardShell>
  )
}
