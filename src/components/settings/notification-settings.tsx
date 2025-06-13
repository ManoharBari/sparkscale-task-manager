"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="task-assigned">Task assignments</Label>
            <div className="text-sm text-muted-foreground">Receive notifications when tasks are assigned to you</div>
          </div>
          <Switch id="task-assigned" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="task-updated">Task updates</Label>
            <div className="text-sm text-muted-foreground">Receive notifications when your tasks are updated</div>
          </div>
          <Switch id="task-updated" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="project-deadline">Project deadlines</Label>
            <div className="text-sm text-muted-foreground">Receive notifications about upcoming project deadlines</div>
          </div>
          <Switch id="project-deadline" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="weekly-summary">Weekly summary</Label>
            <div className="text-sm text-muted-foreground">Receive a weekly summary of your tasks and projects</div>
          </div>
          <Switch id="weekly-summary" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="system-updates">System updates</Label>
            <div className="text-sm text-muted-foreground">
              Receive notifications about system updates and maintenance
            </div>
          </div>
          <Switch id="system-updates" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
