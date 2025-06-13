"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Search, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import Link from "next/link"
import { AddTaskDialog } from "@/src/components/user-dashboard/tasks/add-task-dialog"

interface ProjectTasksProps {
  projectId: string
}

export function ProjectTasks({ projectId }: ProjectTasksProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false)

  // In a real app, this data would come from your database
  const tasks = [
    {
      id: "task-1",
      name: "Update user documentation",
      description: "Review and update all user documentation for the new release",
      assignedTo: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: true,
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
      assignedTo: {
        id: "user-2",
        name: "Sarah Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: false,
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
      assignedTo: {
        id: "user-3",
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: false,
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
      assignedTo: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: true,
      },
      startDate: "2023-03-25",
      dueDate: "2023-04-20",
      completionDate: "2023-04-18",
      status: "COMPLETED",
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

  const filteredTasks = tasks.filter(
    (task) =>
      (task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "ALL" || task.status === statusFilter),
  )

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Project Tasks</CardTitle>
              <CardDescription>All tasks for this project</CardDescription>
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
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
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
                <TableHead>Assigned To</TableHead>
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
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} alt={task.assignedTo.name} />
                        <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignedTo.name}</span>
                      {task.assignedTo.isCurrentUser && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
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
      <AddTaskDialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog} projectId={projectId} />
    </>
  )
}
