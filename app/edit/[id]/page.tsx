import { getRestaurant } from "@/lib/store";
import RestaurantForm from "@/components/RestaurantForm";
import { notFound } from "next/navigation";

export default async function EditSite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = getRestaurant(id);
  if (!restaurant) notFound();
  return <RestaurantForm initial={restaurant} />;
}
