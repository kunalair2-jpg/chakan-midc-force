import { getWarehouses } from "@/lib/queries";
import WarehousesClient from "./WarehousesClient";

export default async function WarehousesPage() {
  const warehouses = await getWarehouses();
  
  return <WarehousesClient initialWarehouses={warehouses} />;
}
