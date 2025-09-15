import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies as nextCookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await nextCookies();
  const supabase = createClient(cookieStore);
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const limit = searchParams.get("limit");
  const random = searchParams.get("random");
  const search = searchParams.get("search");
  const productType = searchParams.get("product_type");
  const sortBy = searchParams.get("sortBy"); // "price" or "rating"
  const sortOrder = searchParams.get("sortOrder"); // "asc" or "desc"

  let query = supabase
  .from("products")
  .select(
    `
    id,
    item_name,
    description,
    base_price,
    info,
    avg_rating,
    ratings,
    image_large,
    image_small,
    image_medium,
    product_type,
    product_flavour_options (
      flavor_options (
        id,
        label
      )
    ),
    product_package_sizes (
      package_sizes (
        id,
        label,
        value,
        unit
      )
    )
    `
  );


  // 🎯 If querying a single product by id
  if (id) {
    const { data, error } = await query.eq("id", id).single();
    if (error) {
      return NextResponse.json({ error: error.message, data: null }, { status: 500 });
    }
    return NextResponse.json({data});
  }

  // 🔍 Search in item_name + description
  if (search) {
    query = query.or(
      `item_name.ilike.%${search}%,description.ilike.%${search}%`
    );
  }

  // 🎯 Filter by product_type
  if (productType) {
    query = query.eq("product_type", productType);
  }

  // 📊 Sorting (only if not random)
  if (!random && sortBy) {
    if (sortBy === "price") {
      query = query.order("base_price", { ascending: sortOrder === "asc" });
    } else if (sortBy === "rating") {
      query = query.order("avg_rating", { ascending: sortOrder === "asc" });
    }
  }

  // ⏳ Fetch data
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message, data: [] }, { status: 500 });
  }

  let finalData = data || [];

  // 🎲 Randomize in JS if requested
  if (random) {
    finalData = finalData.sort(() => Math.random() - 0.5);
  }

  // ⏱ Limit results
  if (limit) {
    finalData = finalData.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json({data: finalData});
}
