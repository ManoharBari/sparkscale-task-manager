"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"

export function ProjectTimeline() {
  // In a real app, this data would come from your database
  const projects = [
    {
      id: "project-1",
      name: "Website Redesign",
      startDate: new Date("2023-03-01"),
      dueDate: new Date("2023-06-30"),
      status: "ONGOING",
      color: "#3b82f6",
    },
    {
      id: "project-2",
      name: "Mobile App Development",
      startDate: new Date("2023-02-15"),
      dueDate: new Date("2023-07-15"),
      status: "ON_TRACK",
      color: "#22c55e",
    },
    {
      id: "project-3",
      name: "Database Migration",
      startDate: new Date("2023-04-01"),
      dueDate: new Date("2023-05-15"),
      status: "DELAYED",
      color: "#f59e0b",
    },
    {
      id: "project-4",
      name: "CRM Implementation",
      startDate: new Date("2023-01-10"),
      dueDate: new Date("2023-04-30"),
      status: "COMPLETED",
      color: "#a3a3a3",
    },
    {
      id: "project-5",
      name: "Security Audit",
      startDate: new Date("2023-04-15"),
      dueDate: new Date("2023-05-30"),
      status: "ON_HOLD",
      color: "#6b7280",
    },
  ]

  // Sort projects by start date
  const sortedProjects = [...projects].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  // Calculate timeline parameters
  const earliestDate = new Date(Math.min(...projects.map((p) => p.startDate.getTime())))
  const latestDate = new Date(Math.max(...projects.map((p) => p.dueDate.getTime())))
  const timelineStart = new Date(earliestDate)
  timelineStart.setMonth(timelineStart.getMonth() - 1)
  const timelineEnd = new Date(latestDate)
  timelineEnd.setMonth(timelineEnd.getMonth() + 1)
  const timelineDuration = timelineEnd.getTime() - timelineStart.getTime()

  // Generate month labels for the timeline
  const months = []
  const currentDate = new Date(timelineStart)
  while (currentDate <= timelineEnd) {
    months.push(new Date(currentDate))
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  // Calculate today's position on the timeline
  const today = new Date()
  const todayOffset = ((today.getTime() - timelineStart.getTime()) / timelineDuration) * 100

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
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>Visual timeline of all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Month labels */}
          <div className="flex border-b mb-4">
            {months.map((month, index) => (
              <div key={index} className="flex-1 text-xs text-center pb-2">
                {month.toLocaleDateString(undefined, { month: "short", year: "2-digit" })}
              </div>
            ))}
          </div>

          {/* Today's date line */}
          <div className="absolute top-6 bottom-0 w-[2px] bg-red-500 z-10" style={{ left: `${todayOffset}%` }}>
            <div className="absolute -top-6 -translate-x-1/2 text-xs font-medium text-red-500 whitespace-nowrap">
              Today
            </div>
          </div>

          {/* Project bars */}
          <div className="space-y-6">
            {sortedProjects.map((project) => {
              const startOffset = ((project.startDate.getTime() - timelineStart.getTime()) / timelineDuration) * 100
              const duration = ((project.dueDate.getTime() - project.startDate.getTime()) / timelineDuration) * 100

              return (
                <div key={project.id} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{project.name}</span>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                  <div className="h-6 bg-gray-100 rounded-md">
                    <div
                      className="h-6 rounded-md flex items-center justify-center text-xs text-white font-medium"
                      style={{
                        width: `${duration}%`,
                        marginLeft: `${startOffset}%`,
                        backgroundColor: project.color,
                      }}
                    >
                      {new Date(project.startDate).toLocaleDateString().split("/").slice(0, 2).join("/")} -
                      {new Date(project.dueDate).toLocaleDateString().split("/").slice(0, 2).join("/")}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
