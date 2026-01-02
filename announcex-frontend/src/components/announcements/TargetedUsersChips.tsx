import { X } from "lucide-react";
import { UserAvatar } from "@/components/admin/admin-users/UserAvatar";

export function TargetedUsersChips({
  users,
  onRemove,
}: {
  users: any[];
  onRemove: (users: any[]) => void;
}) {
  if (users.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {users.map((u) => (
        <div
          key={u.id}
          className="flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-100 border text-sm"
        >
          <UserAvatar name={u.name} />
          <span>{u.name}</span>
          <button
            onClick={() =>
              onRemove(users.filter((x) => x.id !== u.id))
            }
          >
            <X className="h-3 w-3 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
