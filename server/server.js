// server/server.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { initDB } from "./db/index.js";
import createCartRouter from "./routes/cart.js";

const PORT = 8000;

// __fileName / __dirname setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, "pglite-db");

async function main() {
  // Initialize DB (throw if it fails so we don't start a broken server)
  const db = await initDB(DB_DIR);

  const app = express() // create express app

  // Middleware
  app.use(cors());         
  app.use(express.json());  

  //mount routers
  app.use("/api/cart", createCartRouter(db))

  // 4) In production serve the built React files from ../dist
  if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../dist")));
      app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dist", "index.html"));
    });
   }  

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// top-level start with error handling
main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
