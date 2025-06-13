"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "react-hot-toast";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
  refetchTasks: () => void;
  selectedTask: {
    id: string;
    name: string;
    description: string;
    dueDate: Date;
    status: string;
    projectId: string;
    assignedToId: string;
  };
}

export function EditTaskDialog({
  open,
  onOpenChange,
  projectId,
  refetchTasks,
  selectedTask,
}: EditTaskDialogProps) {
  const [taskName, setTaskName] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(projectId || "");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("NEW");
  const [assignedToId, setAssignedToId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [users, result] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/project"),
        ]);
        setUsers(users.data);
        setProjects(result.data);
      } catch (err) {
        console.error("Failed to fetch users/projects:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      // Set form fields based on selected task
      setTaskName(selectedTask?.name || "");
      setTaskDescription(selectedTask?.description || "");
      setStatus(selectedTask?.status || "NEW");
      setAssignedToId(selectedTask?.assignedToId || "");
      setDueDate(
        selectedTask?.dueDate
          ? new Date(selectedTask.dueDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      );
      setSelectedProject(selectedTask?.projectId);
    }
  }, [selectedTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`/api/task/edit/${selectedTask?.id}`, {
        name: taskName,
        description: taskDescription,
        dueDate,
        status,
        projectId: projects.find((project) => project.id === selectedProject)
          ?.id,
        assignedToId: assignedToId || users[0]?.id,
      });

      toast.success(res.data.message || "Task edited successfully");
      refetchTasks();
      // Reset form
      setTaskName("");
      setTaskDescription("");
      setStatus("NEW");
      setAssignedToId("");
      setDueDate("");
      setSelectedProject(projectId || "");
      setLoading(true);
      onOpenChange(false);
    } catch (err: any) {
      refetchTasks();
      setTaskName("");
      setTaskDescription("");
      setStatus("NEW");
      setAssignedToId("");
      setDueDate("");
      setSelectedProject(projectId || "");
      onOpenChange(false);
      toast.error("Failed to edit task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Edit a task for yourself or your team members.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-name">Task Name</Label>
              <Input
                id="task-name"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={selectedProject}
                onValueChange={setSelectedProject}
                disabled={!!selectedTask?.projectId}
              >
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assigned-to">Assign To</Label>
              <Select value={assignedToId} onValueChange={setAssignedToId}>
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">NEW</SelectItem>
                  <SelectItem value="ONGOING">ONGOING</SelectItem>
                  <SelectItem value="ON_TRACK">ON_TRACK</SelectItem>
                  <SelectItem value="DELAYED">DELAYED</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
