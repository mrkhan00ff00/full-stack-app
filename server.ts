import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

// ---------------- PATH SETUP ----------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "products.json");
const PUBLIC_DIR = path.join(__dirname, "public");

// ---------------- APP INIT ----------------
const app = express();
app.use(cors());
app.use(express.json());

// ---------------- FIXED PORT (IMPORTANT) ----------------
const PORT: number = Number(process.env.PORT) || 3000;

// ---------------- MONGO URI ----------------
const MONGO_URI = process.env.MONGO_URI;

// ---------------- DB CONNECT ----------------
async function connectDB() {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI missing in .env");
    return;
  }

  try {
    console.log("Connecting to MongoDB Atlas...");

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    console.log("⚠️ Server will still run without DB");
  }
}

connectDB();

// ---------------- STATIC FILES ----------------
app.use(express.static(PUBLIC_DIR));

// ---------------- API ROUTES ----------------

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ message: "Error loading products" });
  }
});

// GET SINGLE PRODUCT
app.get("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const product = products.find((p: any) => p._id === req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// ADD PRODUCT
app.post("/api/products", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const newProduct = {
      ...req.body,
      _id: `product-${Date.now()}`
    };

    products.push(newProduct);

    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));

    res.status(201).json(newProduct);
  } catch {
    res.status(500).json({ message: "Error adding product" });
  }
});

// UPDATE PRODUCT
app.put("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const index = products.findIndex((p: any) => p._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products[index] = { ...products[index], ...req.body };

    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));

    res.json(products[index]);
  } catch {
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const filtered = products.filter((p: any) => p._id !== req.params.id);

    await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));

    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// ---------------- VITE SETUP ----------------
const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
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

// ---------------- START SERVER ----------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});