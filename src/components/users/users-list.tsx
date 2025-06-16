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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { AddUserDialog } from "@/src/app/admin/users/add-user-dialog";
import { UserEditModal } from "@/src/app/admin/users/edit-user-dialog";

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
  createdAt: string;
  totalTasks: number;
  totalProjects: number;
  weekOff: string[];
};

export function UsersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [selectedUser, setselectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUsers(data.users);
      console.log("Fetched users:", data.users);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (UserId: string) => {
    setShowEditUserDialog(true);
    const user = users.find((u) => u.id === UserId);
    if (!user) {
      console.error("User not found:", UserId);
      return;
    }
    setselectedUser(user);
  };
  console.log(selectedUser);
  const filteredUsers = users.filter((user: User) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
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
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add User
              </Button>
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
                <TableHead>Holiday</TableHead>
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
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isAdmin ? "default" : "outline"}>
                      {user.isAdmin ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.joiningDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.weekOff?.join(", ")}</TableCell>
                  <TableCell>{user.totalTasks}</TableCell>
                  <TableCell>{user.totalProjects}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleEditUser(user.id)}
                      variant="ghost"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddUserDialog
        open={open}
        onOpenChange={setOpen}
        refetchUsers={fetchUsers}
      />

      {selectedUser && (
        <UserEditModal
          open={showEditUserDialog}
          setOpen={(open) => {
            setShowEditUserDialog(open);
            if (!open) setselectedUser(null); 
          }}
          user={selectedUser}
          onUpdate={fetchUsers}
        />
      )}
    </>
  );
}
