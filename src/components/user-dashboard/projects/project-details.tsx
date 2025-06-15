"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { CalendarIcon, Users, Clock } from "lucide-react";

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    startDate: string;
    dueDate: string;
    status: string;
    owner: { id: string; email: string };
  };
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-purple-100 text-purple-800";
      case "ON_TRACK":
        return "bg-green-100 text-green-800";
      case "DELAYED":
        return "bg-amber-100 text-amber-800";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const today = new Date();
  const dueDate = new Date(project.dueDate);
  const daysRemaining = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project.name}</CardTitle>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Timeline</div>
              <div className="text-xs text-muted-foreground">
                {new Date(project.startDate).toLocaleDateString()} -{" "}
                {new Date(project.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Team Members</div>
              <div className="text-xs text-muted-foreground">
                {project.owner.email}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Time Remaining</div>
              <div
                className={`text-xs ${
                  daysRemaining < 0
                    ? "text-red-500 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {daysRemaining < 0
                  ? `${Math.abs(daysRemaining)} days overdue`
                  : daysRemaining === 0
                  ? "Due today"
                  : `${daysRemaining} days remaining`}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
