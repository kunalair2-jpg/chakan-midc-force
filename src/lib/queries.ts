import { createClient } from "@/utils/supabase/server";
import { Warehouse } from "./warehouses";

export async function getWarehouses(): Promise<Warehouse[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("warehouses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching warehouses:", error);
    return [];
  }
  return data as Warehouse[];
}

export async function getWarehouse(slug: string): Promise<Warehouse | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("warehouses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching warehouse by slug:", error);
    return null;
  }
  return data as Warehouse;
}
