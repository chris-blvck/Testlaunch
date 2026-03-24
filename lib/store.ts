import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { RestaurantData, RestaurantInput } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "restaurants.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDB(): RestaurantData[] {
  ensureDir();
  if (!fs.existsSync(DB_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeDB(data: RestaurantData[]) {
  ensureDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function listRestaurants(): RestaurantData[] {
  return readDB().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getRestaurant(id: string): RestaurantData | null {
  return readDB().find((r) => r.id === id) ?? null;
}

export function createRestaurant(input: RestaurantInput): RestaurantData {
  const db = readDB();
  const now = new Date().toISOString();
  const restaurant: RestaurantData = {
    ...input,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  db.push(restaurant);
  writeDB(db);
  return restaurant;
}

export function updateRestaurant(
  id: string,
  input: Partial<RestaurantInput>
): RestaurantData | null {
  const db = readDB();
  const idx = db.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  db[idx] = { ...db[idx], ...input, updatedAt: new Date().toISOString() };
  writeDB(db);
  return db[idx];
}

export function deleteRestaurant(id: string): boolean {
  const db = readDB();
  const filtered = db.filter((r) => r.id !== id);
  if (filtered.length === db.length) return false;
  writeDB(filtered);
  return true;
}
