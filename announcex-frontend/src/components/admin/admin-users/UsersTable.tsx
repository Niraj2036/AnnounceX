"use client";

import { useState } from "react";
import {
  useAdminUsers,
  useDeleteUser,
} from "@/hooks/useAdminUsers";
import { UserRole } from "@/types/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pencil, Trash } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { UserAvatar } from "./UserAvatar";
import { UserFormDialog } from "./UserFormDialog";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  role: "ADMIN" | "USER"; 
};

const SORT_MAP = {
  NEWEST: "NEWEST",
  OLDEST: "OLDEST",
  A_Z: "A_Z",
  Z_A: "Z_A",
} as const;

export function UsersTable({ role }: Props) {
  const { user: currentUser } = useAuth();

  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<keyof typeof SORT_MAP>("NEWEST");

  const { data, isLoading, isFetching } = useAdminUsers({
    pageNo,
    pageSize: 10,
    search,
    role: role.toLowerCase() as UserRole,
    sort: SORT_MAP[sort],
  });

  const deleteMutation = useDeleteUser();

  const users = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNo(1);
            }}
            className="w-64"
          />

          <Select value={sort} onValueChange={(v) => setSort(v as any)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEWEST">Newest</SelectItem>
              <SelectItem value="OLDEST">Oldest</SelectItem>
              <SelectItem value="A_Z">A → Z</SelectItem>
              <SelectItem value="Z_A">Z → A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <UserFormDialog mode="create" role={role} />
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(isLoading || isFetching) &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading &&
              users.map((u: any) => {
                const isSelf = u._id === currentUser?.id;

                return (
                  <TableRow key={u._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          name={u.name}
                          photoUrl={u.photoUrl}
                        />
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>

                    <TableCell>{u.email}</TableCell>
                    <TableCell className="capitalize">{u.role}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <UserFormDialog
                        mode="edit"
                        user={u}
                        disabled={isSelf}
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={isSelf}
                        onClick={() => deleteMutation.mutate(u._id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

            {!isLoading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-sm text-zinc-500">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between text-sm">
          <span>
            Page {pagination.pageNo} of {pagination.totalPages}
          </span>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasPrevPage}
              onClick={() => setPageNo((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.hasNextPage}
              onClick={() => setPageNo((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
