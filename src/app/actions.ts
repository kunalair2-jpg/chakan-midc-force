"use server";

import { revalidatePath } from "next/cache";
import { Warehouse } from "@/lib/warehouses";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function addWarehouseAction(formData: FormData) {
  const title = formData.get("title") as string || "New Warehouse Space";
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  const supabase = await createClient();
  // Storage uploads use the service-role client because owners aren't
  // authenticated via Supabase Auth, so the anon key gets rejected by the
  // bucket's RLS policies.
  const supabaseAdmin = createAdminClient();

  // Handle Image Uploads
  const imageFiles = formData.getAll("images") as File[];
  const uploadedImageUrls: string[] = [];
  const uploadErrors: string[] = [];

  for (const file of imageFiles) {
    if (file.size > 0) { // Check if a real file was uploaded
      const fileExt = file.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabaseAdmin.storage
        .from("warehouse-images")
        .upload(fileName, file);

      if (!error && data) {
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from("warehouse-images")
          .getPublicUrl(data.path);
        uploadedImageUrls.push(publicUrl);
      } else {
        console.error("Supabase Storage Upload Error:", error);
        uploadErrors.push(`${file.name}: ${error?.message || "unknown error"}`);
      }
    }
  }

  if (imageFiles.some(f => f.size > 0) && uploadedImageUrls.length === 0) {
    throw new Error("Image upload failed: " + uploadErrors.join("; "));
  }

  // Fallback to stock images if none uploaded
  const finalImages = uploadedImageUrls.length > 0 
    ? uploadedImageUrls 
    : [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80"
      ];

  const newWarehouse: Warehouse = {
    slug,
    title,
    city: formData.get("city") as string || "Mumbai",
    state: "Maharashtra", // Hardcoded for demo
    area: Number(formData.get("area")) || 50000,
    available: Number(formData.get("area")) || 50000,
    price: Number(formData.get("price")) || 45,
    rating: 5.0,
    reviews: 0,
    category: formData.get("category") as string || "General / Dry storage",
    tag: "New Listing",
    image: finalImages[0],
    images: finalImages,
    facilities: ["24/7 security", "Loading docks", "CCTV", "Fire NOC"],
    description: formData.get("description") as string || "A premium warehouse space available for immediate move-in.",
    specs: {
      microMarket: formData.get("microMarket") as string || "Chakan",
      highwayDistance: formData.get("highwayDistance") as string || "Within 2 km",
      airportDistance: formData.get("airportDistance") as string || "20-40 km",
      railwayDistance: formData.get("railwayDistance") as string || "5-15 km",
      containerAccess: true,
      clearHeight: Number(formData.get("clearHeight")) || 10,
      grade: formData.get("grade") as string || "Grade A",
      flooring: formData.get("flooring") as string || "Trimix",
      floorLoad: Number(formData.get("floorLoad")) || 5,
      minLease: formData.get("minLease") as string || "1-3 years",
      availableFrom: formData.get("availableFrom") as string || "Immediately",
      powerLoad: Number(formData.get("powerLoad")) || 250,
      powerBackup: formData.get("powerBackup") as string || "Full DG backup",
      fireSafety: formData.get("fireSafety") as string || "Fire sprinkler",
      fireNoc: true,
      roadWidth: formData.get("roadWidth") as string || "12 m road"
    },
    mapx: 45,
    mapy: 45,
    lat: 19.0760,
    lng: 72.8777
  } as unknown as Warehouse; // Typecast to satisfy TS while matching Postgres lowercase column names

  const { error } = await supabase.from("warehouses").insert([newWarehouse]);

  if (error) {
    console.error("Error inserting warehouse:", error);
    throw new Error("Supabase Error: " + error.message + " | Details: " + (error.details || "none"));
  }
  
  // Revalidate the routes so the UI updates immediately
  revalidatePath("/");
  revalidatePath("/warehouses");
  return { success: true };
}

export async function submitBookingAction(formData: FormData) {
  const supabase = await createClient();
  
  const bookingData = {
    warehouse_slug: formData.get("warehouse_slug") as string,
    warehouse_title: formData.get("warehouse_title") as string,
    area_requested: Number(formData.get("area_requested")) || 0,
    storage_type: formData.get("storage_type") as string,
    move_in_date: formData.get("move_in_date") as string,
    requirements: formData.get("requirements") as string,
    request_type: formData.get("request_type") as string || "quote",
    company_name: "Guest Company",
    status: "Pending"
  };

  const { error } = await supabase.from("booking_requests").insert([bookingData]);

  if (error) {
    console.error("Error inserting booking request:", error);
    throw new Error("Failed to submit booking request");
  }

  // Revalidate the owner dashboard so the new request shows up immediately
  revalidatePath("/owner");
  return { success: true };
}

