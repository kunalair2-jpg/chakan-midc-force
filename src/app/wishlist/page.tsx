import { getWarehouses } from "@/lib/queries";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const warehouses = await getWarehouses();
  return <WishlistClient warehouses={warehouses} />;
}
