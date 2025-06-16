"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { MultiSelect } from "@/src/components/ui/multi-select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { toast } from "react-hot-toast";
import { Switch } from "@/src/components/ui/switch";
import axios from "axios";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetchUsers: () => void;
}

const weekDays = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

export function AddUserDialog({
  open,
  onOpenChange,
  refetchUsers,
}: AddUserDialogProps) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [joinDate, setJoinDate] = useState("");
  const [weekOff, setWeekOff] = useState<string[]>(["Sunday", "Monday"]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/user/add", {
        email,
        password,
        isAdmin,
        joinDate: new Date(joinDate),
        weekOff,
      });

      toast.success("User created successfully");
      refetchUsers();
      onOpenChange(false);

      // Reset form
      setPassword("");
      setEmail("");
      setIsAdmin(false);
      setJoinDate("");
      setWeekOff([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter user details below to create a new user.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Paasword</Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="isAdmin">Admin Access</Label>
              <Switch
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
                id="isAdmin"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weekOff">Week Off Days</Label>
              <MultiSelect
                options={weekDays}
                onValueChange={setWeekOff}
                defaultValue={weekOff}
                placeholder="Select Week Off"
                variant="inverted"
                animation={2}
                maxCount={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
