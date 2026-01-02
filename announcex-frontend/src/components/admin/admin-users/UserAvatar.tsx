import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl?: string | null;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Avatar>
      {photoUrl && <AvatarImage src={photoUrl} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
