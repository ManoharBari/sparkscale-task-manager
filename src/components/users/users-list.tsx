"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Search } from "lucide-react"

export function UsersList() {
  const [searchTerm, setSearchTerm] = useState("")

  // In a real app, this data would come from your database
  const users = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      isAdmin: true,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-01-15",
      tasksCount: 12,
      projectsCount: 3,
    },
    {
      id: "user-2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      isAdmin: false,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-02-20",
      tasksCount: 8,
      projectsCount: 1,
    },
    {
      id: "user-3",
      name: "Mike Johnson",
      email: "mike@example.com",
      isAdmin: false,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-03-10",
      tasksCount: 15,
      projectsCount: 0,
    },
    {
      id: "user-4",
      name: "Emily Chen",
      email: "emily@example.com",
      isAdmin: true,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-01-05",
      tasksCount: 20,
      projectsCount: 5,
    },
    {
      id: "user-5",
      name: "David Wilson",
      email: "david@example.com",
      isAdmin: false,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2023-04-12",
      tasksCount: 6,
      projectsCount: 2,
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your system users</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>Add User</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isAdmin ? "default" : "outline"}>{user.isAdmin ? "Admin" : "User"}</Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{user.tasksCount}</TableCell>
                <TableCell>{user.projectsCount}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
