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
import axios from "axios";

type User = {
  id: string;
  email: string;
  joiningDate: string;
};

export function RecentlyJoinedUsers() {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/user/recently-joined-users");

        setRecentUsers(data);
      } catch (error) {
        console.error("Failed to fetch recent users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Joined</CardTitle>
        <CardDescription>New users this month</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{user.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Joined {new Date(user.joiningDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
