"use client";

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

interface ProjectMembersProps {
  project: {
    id: string;
    owner: {
      id: string;
      email: string;
    };
  };
}

export function ProjectMembers({ project }: ProjectMembersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>People working on this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div key={project.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{project.owner.email.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <span className="font-medium">{project.owner.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
