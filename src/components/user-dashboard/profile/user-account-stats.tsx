"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CheckSquare, FolderKanban, Calendar, Clock } from "lucide-react"
import { format, differenceInDays, differenceInMonths, differenceInYears } from "date-fns"

interface UserAccountStatsProps {
  user: {
    createdAt: string
    joiningDate: string
    tasksCount: number
    projectsOwnedCount: number
  }
}

export function UserAccountStats({ user }: UserAccountStatsProps) {
  const joiningDate = new Date(user.joiningDate)
  const today = new Date()

  // Calculate tenure
  const years = differenceInYears(today, joiningDate)
  const months = differenceInMonths(today, joiningDate) % 12
  const days = differenceInDays(today, joiningDate) % 30

  let tenureText = ""
  if (years > 0) {
    tenureText += `${years} year${years > 1 ? "s" : ""} `
  }
  if (months > 0 || years > 0) {
    tenureText += `${months} month${months > 1 ? "s" : ""} `
  }
  tenureText += `${days} day${days > 1 ? "s" : ""}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Statistics</CardTitle>
        <CardDescription>Overview of your account activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <CheckSquare className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{user.tasksCount}</div>
            <p className="text-sm text-muted-foreground">Tasks Assigned</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <FolderKanban className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{user.projectsOwnedCount}</div>
            <p className="text-sm text-muted-foreground">Projects Owned</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium">Joining Date</div>
              <div className="text-sm text-muted-foreground">{format(joiningDate, "PPP")}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <Clock className="h-6 w-6 text-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium">Tenure</div>
              <div className="text-sm text-muted-foreground">{tenureText}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
