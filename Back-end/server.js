"use strict";

/* FreshBasket backend: standard Node.js only, no package installation required. */
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");
const productModel = require("./models/productModel");

const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_DIR = path.resolve(__dirname, "../Front-end");
const DATA_DIR = path.join(__dirname, "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Red Apples",
    category: "Fruits",
    weight: "1 kg",
    price: 149,
    originalPrice: 190,
    discount: 22,
    rating: 4.6,
    reviews: 245,
    emoji: "🍎",
    color: "red",
    image: "/images/apple.png",
    description: "Fresh, juicy apples sourced directly from farms."
  },
  {
    id: 2,
    name: "Fresh Bananas",
    category: "Fruits",
    weight: "1 dozen",
    price: 59,
    originalPrice: 70,
    discount: 16,
    rating: 4.5,
    reviews: 189,
    emoji: "🍌",
    color: "yellow",
    image: "/images/banana.png",
    description: "Naturally ripened bananas rich in potassium."
  },
  {
    id: 3,
    name: "Fresh Oranges",
    category: "Fruits",
    weight: "1 kg",
    price: 99,
    originalPrice: 130,
    discount: 24,
    rating: 4.4,
    reviews: 167,
    emoji: "🍊",
    color: "orange",
    image: "/images/orange.png",
    description: "Sweet and juicy oranges packed with Vitamin C."
  },
  {
    id: 4,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    weight: "1 kg",
    price: 49,
    originalPrice: 65,
    discount: 25,
    rating: 4.3,
    reviews: 320,
    emoji: "🍅",
    color: "red",
    image: "/images/tomato.png",
    description: "Fresh, high-quality product selected for your everyday needs."
  },
  {
    id: 5,
    name: "Fresh Potatoes",
    category: "Vegetables",
    weight: "2 kg",
    price: 69,
    originalPrice: 90,
    discount: 23,
    rating: 4.5,
    reviews: 270,
    emoji: "🥔",
    color: "brown",
    image: "/images/potato.png",
    description: "Premium quality potatoes ideal for all recipes."
  },
  {
    id: 6,
    name: "Fresh Carrots",
    category: "Vegetables",
    weight: "500 g",
    price: 39,
    originalPrice: 50,
    discount: 22,
    rating: 4.4,
    reviews: 145,
    emoji: "🥕",
    color: "orange",
    image: "/images/carrot.png",
    description: "Fresh carrots rich in vitamins and nutrients."
  },
  {
    id: 7,
    name: "Full Cream Milk",
    category: "Dairy",
    weight: "1 litre",
    price: 62,
    originalPrice: 68,
    discount: 9,
    rating: 4.7,
    reviews: 410,
    emoji: "🥛",
    color: "white",
    image: "/images/milk.png",
    description: "Pure full cream milk delivered fresh daily."
  },
  {
    id: 8,
    name: "Salted Butter",
    category: "Dairy",
    weight: "500 g",
    price: 245,
    originalPrice: 290,
    discount: 15,
    rating: 4.6,
    reviews: 178,
    emoji: "🧈",
    color: "yellow",
    image: "/images/butter.png",
    description: "Creamy salted butter perfect for cooking and baking."
  },
  {
    id: 9,
    name: "Cheddar Cheese",
    category: "Dairy",
    weight: "200 g",
    price: 125,
    originalPrice: 150,
    discount: 17,
    rating: 4.5,
    reviews: 121,
    emoji: "🧀",
    color: "yellow",
    image: "/images/cheese.png",
    description: "Rich and delicious cheddar cheese."
  },
  {
    id: 10,
    name: "Basmati Rice",
    category: "Staples",
    weight: "5 kg",
    price: 449,
    originalPrice: 520,
    discount: 14,
    rating: 4.7,
    reviews: 540,
    emoji: "🍚",
    color: "white",
    image: "/images/rice.png",
    description: "Premium long-grain basmati rice."
  },
  {
    id: 11,
    name: "Whole Wheat Atta",
    category: "Staples",
    weight: "5 kg",
    price: 299,
    originalPrice: 350,
    discount: 15,
    rating: 4.6,
    reviews: 430,
    emoji: "🌾",
    color: "brown",
    image: "/images/atta.png",
    description: "100% whole wheat flour for soft rotis."
  },
  {
    id: 12,
    name: "Toor Dal",
    category: "Staples",
    weight: "1 kg",
    price: 149,
    originalPrice: 180,
    discount: 17,
    rating: 4.4,
    reviews: 260,
    emoji: "🫘",
    color: "yellow",
    image: "/images/toordal.png",
    description: "Unpolished, high-protein toor dal."
  },
  {
    id: 13,
    name: "Chocolate Cookies",
    category: "Snacks",
    weight: "300 g",
    price: 99,
    originalPrice: 125,
    discount: 21,
    rating: 4.6,
    reviews: 210,
    emoji: "🍪",
    color: "brown",
    image: "/images/cookies.png",
    description: "Crunchy chocolate chip cookies."
  },
  {
    id: 14,
    name: "Potato Chips",
    category: "Snacks",
    weight: "150 g",
    price: 45,
    originalPrice: 55,
    discount: 18,
    rating: 4.3,
    reviews: 330,
    emoji: "🍟",
    color: "yellow",
    image: "/images/chips.png",
    description: "Crispy salted potato chips."
  },
  {
    id: 15,
    name: "Mixed Fruit Juice",
    category: "Beverages",
    weight: "1 litre",
    price: 110,
    originalPrice: 135,
    discount: 19,
    rating: 4.4,
    reviews: 165,
    emoji: "🧃",
    color: "orange",
    image: "/images/juice.png",
    description: "Refreshingly sweet real fruit blend."
  },
  {
    id: 16,
    name: "Green Tea",
    category: "Beverages",
    weight: "25 bags",
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4.5,
    reviews: 140,
    emoji: "🍵",
    color: "green",
    image: "/images/greentea.png",
    description: "Antioxidant-rich green tea bags."
  },
  {
    id: 17,
    name: "Dishwash Liquid",
    category: "Household",
    weight: "500 ml",
    price: 99,
    originalPrice: 120,
    discount: 18,
    rating: 4.4,
    reviews: 125,
    emoji: "🧴",
    color: "green",
    image: "/images/dishwash.png",
    description: "Tough on grease, gentle on hands."
  },
  {
    id: 18,
    name: "Laundry Detergent",
    category: "Household",
    weight: "2 kg",
    price: 249,
    originalPrice: 310,
    discount: 20,
    rating: 4.6,
    reviews: 350,
    emoji: "🧺",
    color: "blue",
    image: "/images/detergent.png",
    description: "Advanced stain removal for bright clothes."
  },
  {
    id: 19,
    name: "Shampoo",
    category: "Personal Care",
    weight: "650 ml",
    price: 299,
    originalPrice: 375,
    discount: 20,
    rating: 4.5,
    reviews: 220,
    emoji: "🧴",
    color: "pink",
    image: "/images/shampoo.png",
    description: "Nourishing shampoo for soft, strong hair."
  },
  {
    id: 20,
    name: "Bath Soap",
    category: "Personal Care",
    weight: "4 × 100 g",
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4.4,
    reviews: 190,
    emoji: "🧼",
    color: "blue",
    image: "/images/soap.png",
    description: "Moisturizing bathing bar value pack."
  }
];

function initialStore() { return { users: [], orders: [] }; }
function readStore() {
  try { return JSON.parse(fs.readFileSync(STORE_FILE, "utf8")); }
  catch { return initialStore(); }
}
function writeStore(store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}
function json(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}
function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  return { salt, hash: crypto.scryptSync(password, salt, 64).toString("hex") };
}
function safeEqual(left, right) {
  const a = Buffer.from(left); const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function makeToken() { return crypto.randomBytes(24).toString("hex"); }
function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => { body += chunk; if (body.length > 1_000_000) req.destroy(); });
    req.on("end", () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error("Invalid JSON body")); } });
    req.on("error", reject);
  });
}
function validateOrder(payload) {
  const address = payload.address || {};
  for (const field of ["name", "phone", "line1", "city", "pincode"]) {
    if (!String(address[field] || "").trim()) throw new Error(`Delivery ${field} is required.`);
  }
  if (!/^[0-9]{6}$/.test(String(address.pincode).trim())) throw new Error("Enter a valid 6-digit pincode.");
  if (!Array.isArray(payload.items) || !payload.items.length) throw new Error("Your cart is empty.");
  const items = payload.items.map(({ id, quantity }) => {
    const product = PRODUCTS.find(product => product.id === Number(id));
    const count = Number(quantity);
    if (!product || !Number.isInteger(count) || count < 1 || count > 20) throw new Error("One or more cart items are invalid.");
    return { productId: product.id, name: product.name, price: product.price, quantity: count, total: product.price * count };
  });
  const subtotal = items.reduce((total, item) => total + item.total, 0);
  const delivery = subtotal >= 499 ? 0 : 40;
  const paymentMethod = payload.paymentMethod === "online" ? "Online payment" : "Cash on Delivery";
  return { address: Object.fromEntries(Object.entries(address).map(([key, value]) => [key, String(value).trim()])), items, subtotal, delivery, total: subtotal + delivery, paymentMethod };
}

async function api(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/products") {
    const products = await productModel.getAllProducts();
    return json(res, 200, { success: true, count: products.length, products });
  }
  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    const { name, email, password } = await readJson(req);
    if (!name || !/^\S+@\S+\.\S+$/.test(email || "") || String(password || "").length < 6) return json(res, 400, { error: "Name, a valid email, and a 6+ character password are required." });
    const store = readStore();
    if (store.users.some(user => user.email === email.toLowerCase())) return json(res, 409, { error: "An account with this email already exists." });
    const passwordData = hashPassword(password);
    const user = { id: crypto.randomUUID(), name: String(name).trim(), email: email.toLowerCase(), ...passwordData, createdAt: new Date().toISOString() };
    store.users.push(user); writeStore(store);
    return json(res, 201, { user: { id: user.id, name: user.name, email: user.email }, token: makeToken() });
  }
  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const { email, password } = await readJson(req);
    const user = readStore().users.find(item => item.email === String(email || "").toLowerCase());
    if (!user || !safeEqual(hashPassword(String(password || ""), user.salt).hash, user.hash)) return json(res, 401, { error: "Incorrect email or password." });
    return json(res, 200, { user: { id: user.id, name: user.name, email: user.email }, token: makeToken() });
  }
  if (req.method === "POST" && url.pathname === "/api/orders") {
    const orderData = validateOrder(await readJson(req));
    const store = readStore();
    const order = { id: `FB${Date.now().toString().slice(-9)}`, createdAt: new Date().toISOString(), status: "Confirmed", paymentStatus: orderData.paymentMethod === "Online payment" ? "Paid" : "Pay on delivery", ...orderData };
    store.orders.unshift(order); writeStore(store);
    return json(res, 201, { order });
  }
  const orderMatch = url.pathname.match(/^\/api\/orders\/([A-Za-z0-9-]+)$/);
  if (req.method === "GET" && orderMatch) {
    const order = readStore().orders.find(item => item.id === orderMatch[1]);
    return order ? json(res, 200, { order }) : json(res, 404, { error: "Receipt not found." });
  }
  return json(res, 404, { error: "API route not found." });
}

const mimeTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
function serveStatic(res, pathname) {
  const relativePath = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const target = path.resolve(FRONTEND_DIR, relativePath);
  if (!target.startsWith(FRONTEND_DIR + path.sep) && target !== path.join(FRONTEND_DIR, "index.html")) return json(res, 403, { error: "Forbidden" });
  fs.readFile(target, (error, file) => {
    if (error) return json(res, 404, { error: "Page or asset not found." });
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream" });
    res.end(file);
  });
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try { if (url.pathname.startsWith("/api/")) await api(req, res, url); else if (req.method === "GET" || req.method === "HEAD") serveStatic(res, url.pathname); else json(res, 405, { error: "Method not allowed." }); }
  catch (error) { json(res, 400, { error: error.message || "Request could not be completed." }); }
}).listen(PORT, () => console.log(`FreshBasket is running at http://localhost:${PORT}`));