import { RestaurantData } from "@/lib/types";
import { generateModern } from "./modern";
import { generateClassic } from "./classic";
import { generateMinimal } from "./minimal";

export function generateHTML(restaurant: RestaurantData): string {
  switch (restaurant.templateId) {
    case "modern":
      return generateModern(restaurant);
    case "classic":
      return generateClassic(restaurant);
    case "minimal":
      return generateMinimal(restaurant);
    default:
      return generateModern(restaurant);
  }
}

export const TEMPLATES = [
  {
    id: "modern" as const,
    name: "Modern Dark",
    description: "Sleek dark theme — perfect for fine dining & steakhouses",
    preview: "bg-gray-900",
    accent: "#d4a853",
  },
  {
    id: "classic" as const,
    name: "Classic Warm",
    description: "Warm elegant style — great for traditional & family restaurants",
    preview: "bg-amber-50",
    accent: "#8B4513",
  },
  {
    id: "minimal" as const,
    name: "Minimal Clean",
    description: "Clean modern layout — works for any type of restaurant",
    preview: "bg-white",
    accent: "#2d7a3a",
  },
];
