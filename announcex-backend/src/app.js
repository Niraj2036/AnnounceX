import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./core/middleware/error.handler.js";


const app = express();

app.use(
  cors({
    origin: true,        // allow all origins dynamically
    credentials: true    // cookies allowed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", routes);
app.use(errorHandler);

export default app;
