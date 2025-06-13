"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import Link from "next/link"

interface UserProjectsOverviewProps {
  userId: string
}

export function UserProjectsOverview({ userId }: UserProjectsOverviewProps) {
  // In a real app, this data would come from your database
  const ownedProjects = [
    {
      id: "project-1",
      name: "Website Redesign",
      status: "ONGOING",
      tasksCount: 15,
      completedTasksCount: 8,
      dueDate: "2023-06-30",
    },
    {
      id: "project-2",
      name: "Mobile App Development",
      status: "ON_TRACK",
      tasksCount: 20,
      completedTasksCount: 12,
      dueDate: "2023-07-15",
    },
    {
      id: "project-3",
      name: "Database Migration",
      status: "DELAYED",
      tasksCount: 10,
      completedTasksCount: 3,
      dueDate: "2023-05-15",
    },
  ]

  const assignedTasks = [
    {
      id: "task-1",
      name: "Update user documentation",
      project: {
        id: "project-1",
        name: "Website Redesign",
      },
      status: "ONGOING",
      dueDate: "2023-05-10",
    },
    {
      id: "task-2",
      name: "Fix login page bug",
      project: {
        id: "project-2",
        name: "Mobile App Development",
      },
      status: "DELAYED",
      dueDate: "2023-05-05",
    },
    {
      id: "task-3",
      name: "Create API documentation",
      project: {
        id: "project-3",
        name: "Database Migration",
      },
      status: "ON_TRACK",
      dueDate: "2023-05-15",
    },
    {
      id: "task-4",
      name: "Design new dashboard",
      project: {
        id: "project-4",
        name: "CRM Implementation",
      },
      status: "COMPLETED",
      dueDate: "2023-04-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800"
      case "ONGOING":
        return "bg-purple-100 text-purple-800"
      case "ON_TRACK":
        return "bg-green-100 text-green-800"
      case "DELAYED":
        return "bg-amber-100 text-amber-800"
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800"
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Work</CardTitle>
        <CardDescription>Projects you own and tasks assigned to you</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="projects">
          <TabsList className="mb-4">
            <TabsTrigger value="projects">Projects Owned ({ownedProjects.length})</TabsTrigger>
            <TabsTrigger value="tasks">Assigned Tasks ({assignedTasks.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            {ownedProjects.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">You don't own any projects yet.</div>
            ) : (
              ownedProjects.map((project) => (
                <div key={project.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Link
                      href={`/user-dashboard/projects/${project.id}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {project.name}
                    </Link>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tasks:</span>
                      <span>
                        {project.completedTasksCount} of {project.tasksCount} completed
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(project.completedTasksCount / project.tasksCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            {assignedTasks.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">You don't have any assigned tasks.</div>
            ) : (
              assignedTasks.map((task) => (
                <div key={task.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Link href={`/user-dashboard/tasks/${task.id}`} className="font-medium hover:underline">
                      {task.name}
                    </Link>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <Link
                      href={`/user-dashboard/projects/${task.project.id}`}
                      className="text-muted-foreground hover:underline"
                    >
                      {task.project.name}
                    </Link>
                    <span
                      className={`${new Date(task.dueDate) < new Date() && task.status !== "COMPLETED" ? "text-red-500 font-medium" : ""}`}
                    >
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
