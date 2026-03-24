import { NextRequest, NextResponse } from "next/server";
import { createRestaurant, listRestaurants } from "@/lib/store";
import { RestaurantInput } from "@/lib/types";

export async function GET() {
  const restaurants = listRestaurants();
  return NextResponse.json(restaurants);
}

export async function POST(req: NextRequest) {
  const body: RestaurantInput = await req.json();
  if (!body.name || !body.cuisine) {
    return NextResponse.json({ error: "name and cuisine are required" }, { status: 400 });
  }
  const restaurant = createRestaurant({
    ...{
      templateId: "modern" as const,
      primaryColor: "#1a1a2e",
      accentColor: "#d4a853",
      description: "",
    },
    ...body,
  });
  return NextResponse.json(restaurant, { status: 201 });
}
