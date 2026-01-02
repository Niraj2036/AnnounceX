import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDatabase } from "./core/db/index.js";
import http from "http";
import { initSocket } from "./core/sockets/index.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initDatabase();
    const server = http.createServer(app);

// 🔥 INIT SOCKET.IO HERE (ONCE)
    initSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server + Socket running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

startServer();
