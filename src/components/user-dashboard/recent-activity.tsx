"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

type Activity = {
  id: string;
  type: string;
  description: string;
  project: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/task/activity");
        const data = await res.json();
        if (res.ok) setActivities(data.activities);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "TASK_CREATED":
        return <Badge className="bg-green-100 text-green-800">Task</Badge>;
      case "PROJECT_CREATED":
        return <Badge className="bg-blue-100 text-blue-800">Project</Badge>;
      default:
        return <Badge>Activity</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No recent activity found.
            </p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={activity.user.avatar || "/placeholder.svg"}
                    alt={activity.user.name}
                  />
                  <AvatarFallback>
                    {activity.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {activity.description}
                    </p>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{activity.project}</span>
                    <span className="mx-1">•</span>
                    <span>
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
