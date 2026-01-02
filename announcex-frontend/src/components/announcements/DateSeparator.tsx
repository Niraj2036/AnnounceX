export function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex justify-center">
      <span className="px-3 py-1 text-xs rounded-full bg-zinc-200 text-zinc-600">
        {date}
      </span>
    </div>
  );
}
