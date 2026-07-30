import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";

type DbProduct = Database["public"]["Tables"]["products"]["Row"];

interface Product extends Omit<DbProduct, "id" | "base_price" | "ratings" | "created_at" | "deleted_at"> {
  id: number;
  base_price: number;
  ratings: number | null;
}

async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select(
      `
      id,
      item_name,
      description,
      base_price,
      avg_rating,
      ratings,
      image_large
      `
    )
    .eq("id", parseInt(id, 10))
    .is("deleted_at", null)
    .single();

  if (!data) {
    return null;
  }

  return {
    ...data,
    base_price: Number(data.base_price),
    ratings: data.ratings ? Number(data.ratings) : 0,
  } as Product;
}

export const runtime = "nodejs";
export const revalidate = 3600;

export default async function OG({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const ratingStars = Math.round(product.avg_rating ?? 0);
  const starArray = Array.from({ length: 5 }).map((_, i) =>
    i < ratingStars ? "★" : "☆"
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f8f4f0",
          padding: "60px",
          gap: "40px",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        {/* Left: Product Image Container */}
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={product.image_large || "/placeholder.png"}
            alt={product.item_name || "Sugar Plum Product"}
            style={{
              width: 400,
              height: 400,
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right: Product Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "24px",
            flex: 1,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              color: "#c67c59",
              textTransform: "uppercase",
            }}
          >
            Artisanal Creation
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "700",
              fontStyle: "italic",
              color: "#5a3f7f",
              margin: 0,
              lineHeight: "1.2",
              fontFamily: '"Serif", serif',
            }}
          >
            {product.item_name}
          </h1>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                letterSpacing: "2px",
                color: "#c67c59",
              }}
            >
              {starArray.join("")}
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#5a3f7f",
                opacity: 0.6,
              }}
            >
              ({product.ratings || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#5a3f7f",
              borderLeft: "4px solid #c67c59",
              paddingLeft: "20px",
            }}
          >
            ${product.base_price.toFixed(2)}
          </div>

          {/* Description snippet */}
          {product.description && (
            <p
              style={{
                fontSize: "16px",
                color: "#5a3f7f",
                opacity: 0.8,
                margin: 0,
                lineHeight: "1.6",
              }}
            >
              {product.description.substring(0, 120)}
              {product.description.length > 120 ? "..." : ""}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
