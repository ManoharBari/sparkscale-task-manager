"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { toast } from "@/src/components/ui/use-toast"

interface TaskStatusUpdateProps {
  task: {
    id: string
    name: string
    status: string
  }
}

export function TaskStatusUpdate({ task }: TaskStatusUpdateProps) {
  const [status, setStatus] = useState(task.status)
  const [statusNote, setStatusNote] = useState("")

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

  const handleUpdateStatus = () => {
    // In a real app, you would send this to your API
    console.log("Updating status:", { taskId: task.id, status, statusNote })

    // Show success toast
    toast({
      title: "Status updated",
      description: `Task status has been updated to ${status}`,
    })

    // Clear the note
    setStatusNote("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Status</CardTitle>
        <CardDescription>Change the current status of this task</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Status</span>
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="ON_TRACK">On Track</SelectItem>
              <SelectItem value="DELAYED">Delayed</SelectItem>
              <SelectItem value="ON_HOLD">On Hold</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="status-note" className="text-sm font-medium">
            Status Note (Optional)
          </label>
          <Textarea
            id="status-note"
            placeholder="Add a note about this status change..."
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdateStatus} disabled={status === task.status} className="w-full">
          Update Status
        </Button>
      </CardFooter>
    </Card>
  )
}
