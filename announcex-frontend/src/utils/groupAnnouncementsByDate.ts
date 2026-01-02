export function groupAnnouncementsByDate(announcements: any[]) {
  return announcements.reduce((acc: Record<string, any[]>, curr) => {
    const date = new Date(curr.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (!acc[date]) acc[date] = [];
    acc[date].push(curr);

    return acc;
  }, {});
}
