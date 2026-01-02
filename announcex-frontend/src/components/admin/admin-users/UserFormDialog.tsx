"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { useCreateUser, useUpdateUser } from "@/hooks/useAdminUsers";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/types/users";

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  role?: "ADMIN" | "USER"; // required for create
  user?: any; // user object for edit
  disabled?: boolean;
};

export function UserFormDialog({
  mode,
  role,
  user,
  disabled,
}: Props) {
  const { user: currentUser } = useAuth();

  const isEdit = mode === "edit";
  const isSelf = user?._id === currentUser?.id;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: role?.toLowerCase() as UserRole,
  });

  useEffect(() => {
    if (isEdit && user) {
      setForm({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    }
  }, [isEdit, user]);

  const onSubmit = () => {
    if (!form.name || (!isEdit && !form.password)) {
      toast.error("Missing required fields");
      return;
    }

    if (isEdit) {
      updateMutation.mutate(
        {
          id: user._id,
          name: form.name,
          password: form.password || undefined,
          role: form.role,
        },
        {
          onSuccess: () => {
            toast.success("User updated");
            setOpen(false);
          },
          onError: () => toast.error("Update failed"),
        }
      );
    } else {
      createMutation.mutate(
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
        {
          onSuccess: () => {
            toast.success("User created");
            setOpen(false);
          },
          onError: () => toast.error("Create failed"),
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled || isSelf}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add {role === "ADMIN" ? "Admin" : "User"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User" : "Create User"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            placeholder="Email"
            value={form.email}
            disabled={isEdit}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder={
              isEdit ? "New password (optional)" : "Password"
            }
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Select
            value={form.role}
            onValueChange={(v) =>
              setForm({ ...form, role: v as UserRole })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={onSubmit}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEdit ? "Save changes" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
