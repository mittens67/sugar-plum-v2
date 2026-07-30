import { NextResponse } from "next/server";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import { Database } from "@/types/supabase";

type category = Database["public"]["Enums"]["category"];

const getCachedProducts = unstable_cache(
  async (searchTerm?: string, typeFilter?: string) => {
    const supabase = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

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
      )
      .is("deleted_at", null);

    if (searchTerm) {
      query = query.or(`item_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    if (typeFilter) {
      query = query.eq("product_type", typeFilter as category);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map((item) => ({
      ...item,
      base_price: Number(item.base_price),
      ratings: item.ratings ? Number(item.ratings) : 0
    }));
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] }
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const limit = searchParams.get("limit");
  const random = searchParams.get("random");
  const search = searchParams.get("search");
  const productType = searchParams.get("product_type");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  try {
    if (id) {
      const supabase = await createClient();
      const { data, error } = await supabase
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
        )
        .eq("id", parseInt(id, 10))
        .is("deleted_at", null)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Product not found", data: null }, { status: 404 });
      }

      return NextResponse.json({
        data: {
          ...data,
          base_price: Number(data.base_price),
          ratings: data.ratings ? Number(data.ratings) : 0
        }
      });
    }

    let finalData = await getCachedProducts(search || undefined, productType || undefined);

    if (sortBy && !random) {
      if (sortBy === "price") {
        finalData = finalData.sort((a, b) =>
          sortOrder === "asc" ? a.base_price - b.base_price : b.base_price - a.base_price
        );
      } else if (sortBy === "rating") {
        finalData = finalData.sort((a, b) =>
          sortOrder === "asc"
            ? (a.avg_rating ?? 0) - (b.avg_rating ?? 0)
            : (b.avg_rating ?? 0) - (a.avg_rating ?? 0)
        );
      }
    }

    if (random) {
      finalData = finalData.sort(() => Math.random() - 0.5);
    }

    if (limit) {
      finalData = finalData.slice(0, parseInt(limit, 10));
    }

    return NextResponse.json({ data: finalData });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error", data: [] },
      { status: 500 }
    );
  }
}
