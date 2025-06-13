"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Search, PlusCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import Link from "next/link"
import { AddTaskDialog } from "@/src/components/user-dashboard/tasks/add-task-dialog"

export function UserTasksList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [projectFilter, setProjectFilter] = useState("ALL")
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false)

  // In a real app, this data would come from your database
  const tasks = [
    {
      id: "task-1",
      name: "Update user documentation",
      description: "Review and update all user documentation for the new release",
      project: {
        id: "project-1",
        name: "Website Redesign",
      },
      startDate: "2023-04-15",
      dueDate: "2023-05-10",
      completionDate: null,
      status: "ONGOING",
    },
    {
      id: "task-2",
      name: "Fix login page bug",
      description: "Address the authentication issue on the login page",
      project: {
        id: "project-2",
        name: "Mobile App Development",
      },
      startDate: "2023-04-10",
      dueDate: "2023-05-05",
      completionDate: null,
      status: "DELAYED",
    },
    {
      id: "task-3",
      name: "Create API documentation",
      description: "Document all API endpoints for the developer portal",
      project: {
        id: "project-3",
        name: "Database Migration",
      },
      startDate: "2023-04-20",
      dueDate: "2023-05-15",
      completionDate: null,
      status: "ON_TRACK",
    },
    {
      id: "task-4",
      name: "Design new dashboard",
      description: "Create wireframes and mockups for the analytics dashboard",
      project: {
        id: "project-4",
        name: "CRM Implementation",
      },
      startDate: "2023-03-25",
      dueDate: "2023-04-20",
      completionDate: "2023-04-18",
      status: "COMPLETED",
    },
    {
      id: "task-5",
      name: "Security vulnerability assessment",
      description: "Perform security audit and identify vulnerabilities",
      project: {
        id: "project-3",
        name: "Database Migration",
      },
      startDate: "2023-04-15",
      dueDate: "2023-05-10",
      completionDate: null,
      status: "ON_HOLD",
    },
  ]

  // Get unique projects for filter
  const projects = Array.from(new Set(tasks.map((task) => task.project.id))).map((id) => {
    const task = tasks.find((task) => task.project.id === id)
    return {
      id,
      name: task?.project.name || "",
    }
  })

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

  const filteredTasks = tasks.filter(
    (task) =>
      (task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.project.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "ALL" || task.status === statusFilter) &&
      (projectFilter === "ALL" || task.project.id === projectFilter),
  )

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>All your assigned tasks</CardDescription>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tasks..."
                  className="pl-8 w-full md:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Statuses</SelectItem>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="ONGOING">Ongoing</SelectItem>
                    <SelectItem value="ON_TRACK">On Track</SelectItem>
                    <SelectItem value="DELAYED">Delayed</SelectItem>
                    <SelectItem value="ON_HOLD">On Hold</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Projects</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowAddTaskDialog(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{task.name}</div>
                      <div className="text-xs text-muted-foreground">{task.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/user-dashboard/projects/${task.project.id}`} className="text-sm hover:underline">
                      {task.project.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`text-sm ${new Date(task.dueDate) < new Date() && task.status !== "COMPLETED" ? "text-red-500 font-medium" : ""}`}
                    >
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/user-dashboard/tasks/${task.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddTaskDialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog} />
    </>
  )
}
