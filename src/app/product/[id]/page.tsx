import Section from "@/components/ui/Section";
import Image from "next/image";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ProductActions from "@/components/ProductActions";
import { Database } from "@/types/supabase";
import { Metadata } from "next";

type DbProduct = Database["public"]["Tables"]["products"]["Row"];
type DbFlavor = Database["public"]["Tables"]["flavor_options"]["Row"];
type DbPackage = Database["public"]["Tables"]["package_sizes"]["Row"];

interface FlavorOptionJoin {
  flavor_options: Pick<DbFlavor, "id" | "label">;
}

interface PackageSizeJoin {
  package_sizes: Pick<DbPackage, "id" | "label" | "value" | "unit">;
}

interface Product extends Omit<DbProduct, "id" | "base_price" | "ratings" | "created_at" | "deleted_at"> {
  id: number;
  base_price: number;
  ratings: number | null;
  product_flavour_options: FlavorOptionJoin[];
  product_package_sizes: PackageSizeJoin[];
}

async function getProduct(id: string): Promise<Product | null> {
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
    return null;
  }

  return {
    ...data,
    base_price: Number(data.base_price),
    ratings: data.ratings ? Number(data.ratings) : 0,
  } as Product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product could not be found.",
    };
  }

  const productUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://sugarplum.local"}/product/${product.id}`;
  const imageUrl = product.image_large || "/placeholder.png";

  return {
    title: `${product.item_name} | Sugar Plum`,
    description:
      product.description || "Artisanal sugar plum confection.",
    openGraph: {
      title: product.item_name || "Sugar Plum",
      description:
        product.description || "Artisanal sugar plum confection.",
      url: productUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 500,
          alt: product.item_name || "Product",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.item_name || "Sugar Plum",
      description:
        product.description || "Artisanal sugar plum confection.",
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <Section className="bg-background min-h-screen pt-28 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Column: Image with Whimsical Shadow */}
          <div className="relative group px-2 md:px-0">
            <div className="absolute -inset-2 md:-inset-4 bg-primary/10 rounded-card-lg blur-2xl group-hover:bg-primary/20 transition-all" />
            <Image
              src={product.image_large || "/placeholder.png"}
              alt={product.item_name || "Product Image"}
              width={800}
              height={500}
              className="relative rounded-[1.5rem] md:rounded-card object-cover w-full h-auto border border-white/40 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
          </div>

          {/* Right Column: Details Pane */}
          <div className="space-y-8 md:space-y-10 px-2 md:px-0">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
                Artisanal Creation
              </span>
              <h1 className="text-3xl md:text-5xl font-serif italic text-plum leading-tight">
                {product.item_name}
              </h1>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.avg_rating ?? 0)
                          ? "fill-primary text-primary"
                          : "text-plum/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-plum/40 text-sm font-medium">
                  ({product.ratings || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price Tag */}
            <div className="text-3xl md:text-4xl font-black text-plum border-l-4 border-primary pl-4">
              ${product.base_price.toFixed(2)}
            </div>

            {/* Interactive actions */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </Section>
  );
}
