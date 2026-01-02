import { Server } from "socket.io";
import { verifyLoginToken} from "../security/jwt.js";
import { AuthError } from "../../modules/auth/auth.errors.js";
import { registerAnnouncementSocket } from "./announcement.socket.js";

let io;


export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];

      if (!token) {
        throw new AuthError("Socket authentication failed", 401);
      }

      const decoded = verifyLoginToken(token);

      socket.user = decoded; 
      next();
    } catch (err) {
      next(new Error("Unauthorized socket connection"));
    }
  });

  io.on("connection", (socket) => {
    registerAnnouncementSocket(io, socket);
  });

  console.log("✅ Socket.IO initialized");

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
