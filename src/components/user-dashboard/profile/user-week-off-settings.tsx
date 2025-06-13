"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"

interface UserWeekOffSettingsProps {
  user: {
    weekOff: string[]
  }
}

export function UserWeekOffSettings({ user }: UserWeekOffSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Week Off Preferences</CardTitle>
        <CardDescription>Your preferred days off</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {user.weekOff.length > 0 ? (
            user.weekOff.map((day) => (
              <Badge key={day} variant="secondary" className="px-3 py-1 text-sm">
                {day}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No week off days set</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
