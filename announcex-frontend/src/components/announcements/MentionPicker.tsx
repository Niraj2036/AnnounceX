"use client";

import { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { UserAvatar } from "@/components/admin/admin-users/UserAvatar";

export function MentionPicker({
  onSelect,
}: {
  onSelect: (user: any) => void;
}) {
  const [pageNo, setPageNo] = useState(1);

  const { data } = useAdminUsers({
    pageNo,
    pageSize: 5,
  });

  const users = data?.data ?? [];

  return (
    <div className="absolute bottom-full mb-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
      {users.map((u: any) => (
        <div
          key={u._id}
          className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 cursor-pointer"
          onClick={() =>
            onSelect({
              id: u._id,
              name: u.name,
              email: u.email,
            })
          }
        >
          <UserAvatar name={u.name} photoUrl={u.photoUrl} />
          <div>
            <div className="text-sm font-medium">{u.name}</div>
            <div className="text-xs text-zinc-500">{u.email}</div>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <div className="p-3 text-sm text-zinc-500">
          No users found
        </div>
      )}
    </div>
  );
}
