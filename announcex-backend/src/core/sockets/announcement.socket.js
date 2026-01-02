
export function registerAnnouncementSocket(io, socket) {
  const { userId, role } = socket.user;

  socket.join("all");

  socket.join(`user:${userId}`);

  console.log(
    `🔌 User connected to socket: ${userId} (${role})`
  );

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${userId}`);
  });
}
