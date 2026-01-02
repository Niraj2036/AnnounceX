import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

let socket: Socket | null = null;

export const getSocket = () => {
  if (socket && socket.connected) {
    return socket;
  }

  const token = Cookies.get("accessToken");
  if (!token) {
    console.warn("❌ No access token, socket not created");
    return null;
  }

  socket = io("https://announcex-backend.vercel.app", {
    transports: ["websocket"],
    auth: { token },
    autoConnect: true,
    reconnection: true,
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
