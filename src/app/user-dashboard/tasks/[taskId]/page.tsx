"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header";
import { DashboardShell } from "@/src/components/dashboard-shell";
import { TaskDetails } from "@/src/components/user-dashboard/tasks/task-details";
import { TaskRemarks } from "@/src/components/user-dashboard/tasks/task-remarks";
import { TaskStatusUpdate } from "@/src/components/user-dashboard/tasks/task-status-update";

export default function TaskPage() {
  const { taskId } = useParams() as { taskId: string };
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/task/${taskId}`);
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading || !task) {
    return <div className="p-4">Loading task...</div>;
  }

  return (
    <DashboardShell>
      <UserDashboardHeader
        heading={task.name}
        text={`Task in ${task.project?.name || "Unknown Project"}`}
      />
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
  );
}
