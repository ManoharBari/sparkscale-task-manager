import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { MultiSelect } from "@/src/components/ui/multi-select";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";

interface UserEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: {
    id: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    joiningDate: string;
    weekOff: string[];
  };
  onUpdate: () => void;
}

const weekOptions = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

export function UserEditModal({
  open,
  setOpen,
  user,
  onUpdate,
}: UserEditModalProps) {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [joinDate, setJoinDate] = useState(user.joiningDate);
  const [weekOff, setWeekOff] = useState(user.weekOff);

  useEffect(() => {
    setEmail(user.email);
    setPassword("");
    setIsAdmin(user.isAdmin);
    setJoinDate(user.joiningDate);
    setWeekOff(user.weekOff);
  }, [user]);

  const handleSave = async () => {
    try {
      await axios.patch(`/api/user/edit/${user.id}`, {
        email,
        password: password || undefined,
        isAdmin,
        joiningDate: joinDate ? new Date(joinDate) : undefined,
        weekOff,
      });
      toast.success("User updated successfully!");
      onUpdate();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Modify and save user account details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="New Password (leave blank to keep same)"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAdmin"
              checked={isAdmin}
              onCheckedChange={(val) => setIsAdmin(Boolean(val))}
            />
            <Label htmlFor="isAdmin">Admin</Label>
          </div>
          <Input
            type="date"
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
          />
          <MultiSelect
            defaultValue={weekOff}
            onValueChange={setWeekOff}
            options={weekOptions}
            placeholder="Select week off"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
