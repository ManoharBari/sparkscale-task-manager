"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"

export function ProjectDeadlines() {
  // In a real app, this data would come from your database
  const upcomingDeadlines = [
    {
      id: "project-1",
      name: "Website Redesign",
      dueDate: "2023-06-30",
      status: "ONGOING",
      daysLeft: 15,
    },
    {
      id: "project-3",
      name: "Database Migration",
      dueDate: "2023-05-15",
      status: "DELAYED",
      daysLeft: -10, // Overdue
    },
    {
      id: "project-5",
      name: "Security Audit",
      dueDate: "2023-05-30",
      status: "ON_HOLD",
      daysLeft: 5,
    },
    {
      id: "project-2",
      name: "Mobile App Development",
      dueDate: "2023-07-15",
      status: "ON_TRACK",
      daysLeft: 30,
    },
  ]

  // Sort by days left (ascending)
  const sortedDeadlines = [...upcomingDeadlines].sort((a, b) => a.daysLeft - b.daysLeft)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Projects due soon or overdue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedDeadlines.map((project) => (
            <div key={project.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
              <div className="flex justify-between items-center">
                <span className="font-medium">{project.name}</span>
                {project.daysLeft < 0 ? (
                  <Badge variant="destructive">Overdue</Badge>
                ) : project.daysLeft < 7 ? (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    Due Soon
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Upcoming
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Due: {new Date(project.dueDate).toLocaleDateString()}
                {project.daysLeft < 0
                  ? ` (${Math.abs(project.daysLeft)} days overdue)`
                  : ` (${project.daysLeft} days left)`}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
