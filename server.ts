import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "products.json");
const PUBLIC_DIR = path.join(__dirname, "public");

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  // =========================
  // MongoDB CONNECTION (NEW)
  // =========================
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Error:", err));

  // Serve static files
  app.use(express.static(PUBLIC_DIR));

  // =========================
  // EXISTING FILE-BASED API (UNCHANGED)
  // =========================
  app.get("/api/products", async (req, res) => {
    const products = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const products = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    const product = products.find((p: any) => p._id === req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  });

  app.post("/api/products", async (req, res) => {
    const products = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    const newProduct = { ...req.body, _id: `product-${Date.now()}` };
    products.push(newProduct);
    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  });

  app.put("/api/products/:id", async (req, res) => {
    const products = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    const index = products.findIndex((p: any) => p._id === req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
      res.json(products[index]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    const products = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    const filtered = products.filter((p: any) => p._id !== req.params.id);
    await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));
    res.status(204).send();
  });

  // =========================
  // VITE SETUP (UNCHANGED)
  // =========================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true as any },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
