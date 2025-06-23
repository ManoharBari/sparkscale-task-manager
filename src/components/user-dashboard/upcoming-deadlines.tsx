"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { formatDistanceToNow, isPast } from "date-fns";
import Link from "next/link";

type Task = {
  id: string;
  name: string;
  dueDate: string;
  project: {
    id: string;
    name: string;
  };
};

export function UpcomingDeadlines() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeadlines() {
      try {
        const res = await fetch("/api/users/upcoming-deadlines");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch deadlines", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDeadlines();
  }, []);

  const sortedTasks = tasks.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Tasks due soon or overdue</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task) => {
              const due = new Date(task.dueDate);
              const isOverdue = isPast(due);
              const dueIn = formatDistanceToNow(due, { addSuffix: true });

              return (
                <div
                  key={task.id}
                  className="flex flex-col space-y-1 border-b pb-3 last:border-0"
                >
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/user-dashboard/tasks/${task.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {task.name}
                    </Link>
                    {isOverdue ? (
                      <Badge variant="destructive">Overdue</Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800"
                      >
                        Due Soon
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span>{task.project?.name}</span>
                    <span className="mx-1">•</span>
                    <span
                      className={isOverdue ? "text-red-500 font-medium" : ""}
                    >
                      {dueIn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
