import { getWarehouses } from "@/lib/queries";
import WarehousesClient from "./WarehousesClient";

export const revalidate = 60;

export default async function WarehousesPage() {
  const warehouses = await getWarehouses();
  
  return <WarehousesClient initialWarehouses={warehouses} />;
}
