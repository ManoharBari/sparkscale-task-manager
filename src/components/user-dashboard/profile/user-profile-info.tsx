"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Label } from "@/src/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { format } from "date-fns"

interface UserProfileInfoProps {
  user: {
    id: string
    email: string
    isAdmin: boolean
    createdAt: string
    joiningDate: string
    resignationDate: string | null
  }
}

export function UserProfileInfo({ user }: UserProfileInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl">{user.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-medium">{user.email.split("@")[0]}</h3>
            <p className="text-sm text-muted-foreground">{user.isAdmin ? "Administrator" : "User"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="rounded-md border px-3 py-2">{user.email}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Account Created</Label>
              <div className="rounded-md border px-3 py-2 text-sm">{format(new Date(user.createdAt), "PPP")}</div>
            </div>
            <div className="space-y-2">
              <Label>Joining Date</Label>
              <div className="rounded-md border px-3 py-2 text-sm">{format(new Date(user.joiningDate), "PPP")}</div>
            </div>
          </div>

          {user.resignationDate && (
            <div className="space-y-2">
              <Label>Resignation Date</Label>
              <div className="rounded-md border px-3 py-2 text-sm">{format(new Date(user.resignationDate), "PPP")}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
