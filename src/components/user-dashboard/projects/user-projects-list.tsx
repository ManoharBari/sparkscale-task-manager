"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export function UserProjectsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // In a real app, this data would come from your database
  const projects = [
    {
      id: "project-1",
      name: "Website Redesign",
      type: "EXTERNAL",
      startDate: "2023-03-01",
      dueDate: "2023-06-30",
      status: "ONGOING",
      tasksCount: 15,
      completedTasksCount: 8,
      role: "Developer",
    },
    {
      id: "project-2",
      name: "Mobile App Development",
      type: "EXTERNAL",
      startDate: "2023-02-15",
      dueDate: "2023-07-15",
      status: "ON_TRACK",
      tasksCount: 20,
      completedTasksCount: 12,
      role: "Designer",
    },
    {
      id: "project-3",
      name: "Database Migration",
      type: "INTERNAL",
      startDate: "2023-04-01",
      dueDate: "2023-05-15",
      status: "DELAYED",
      tasksCount: 10,
      completedTasksCount: 3,
      role: "Developer",
    },
    {
      id: "project-4",
      name: "CRM Implementation",
      type: "EXTERNAL",
      startDate: "2023-01-10",
      dueDate: "2023-04-30",
      status: "COMPLETED",
      tasksCount: 18,
      completedTasksCount: 18,
      role: "Tester",
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

  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Projects you are assigned to</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div>{new Date(project.startDate).toLocaleDateString()}</div>
                    <div>to {new Date(project.dueDate).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(project.completedTasksCount / project.tasksCount) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">
                      {Math.round((project.completedTasksCount / project.tasksCount) * 100)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/user-dashboard/projects/${project.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
