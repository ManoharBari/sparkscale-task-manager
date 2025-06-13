"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"

export function UserProjectsOverview() {
  // In a real app, this data would come from your database
  const projects = [
    {
      id: "project-1",
      name: "Website Redesign",
      status: "ONGOING",
      tasksCompleted: 8,
      totalTasks: 15,
      color: "#3b82f6",
    },
    {
      id: "project-2",
      name: "Mobile App Development",
      status: "ON_TRACK",
      tasksCompleted: 12,
      totalTasks: 20,
      color: "#22c55e",
    },
    {
      id: "project-3",
      name: "Database Migration",
      status: "DELAYED",
      tasksCompleted: 3,
      totalTasks: 10,
      color: "#f59e0b",
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
        <CardTitle>My Projects</CardTitle>
        <CardDescription>Your active projects and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Link href={`/user-dashboard/projects/${project.id}`} className="text-sm font-medium hover:underline">
                  {project.name}
                </Link>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(project.tasksCompleted / project.totalTasks) * 100}%`,
                      backgroundColor: project.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
