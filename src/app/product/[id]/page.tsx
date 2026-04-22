"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, ShoppingBasket, Plus, Minus } from "lucide-react";
import ProductSkeleton from "@/components/skeleton-loaders/ProductSkeleton";
import ProductNotFound from "@/components/ProductNotFound";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementInCart,
  decrementInCart,
  CartProduct,
} from "@/lib/slices/cartSlice";
import type { RootState } from "@/lib/store";
import { Database } from "@/types/supabase";

type DbProduct = Database["public"]["Tables"]["products"]["Row"];
type DbFlavor = Database["public"]["Tables"]["flavor_options"]["Row"];
type DbPackage = Database["public"]["Tables"]["package_sizes"]["Row"];

interface FlavorOptionJoin {
  flavor_options: Pick<DbFlavor, "id" | "label">;
}

interface PackageSizeJoin {
  package_sizes: Pick<DbPackage, "id" | "label" | "value" | "unit">;
}

// Full product type matching the API response structure
interface Product extends Omit<DbProduct, "id" | "base_price" | "ratings" | "created_at" | "deleted_at"> {
  id: number;
  base_price: number;
  ratings: number | null;
  product_flavour_options: FlavorOptionJoin[];
  product_package_sizes: PackageSizeJoin[];
}

export default function Product() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.products);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<number | null>(null);

  const cartItem = cart.find(
    (p: CartProduct) =>
      p.id === product?.id &&
      p.flavor_id === selectedFlavor &&
      p.package_size_id === selectedSize
  );

  function handleAddToCart() {
    if (!product) return;
    const selectedFlavorLabel = product.product_flavour_options.find(
      ({ flavor_options }) => flavor_options.id === selectedFlavor
    )?.flavor_options.label;
    const selectedSizeLabel = product.product_package_sizes.find(
      ({ package_sizes }) => package_sizes.id === selectedSize
    )?.package_sizes.label;

    dispatch(
      addToCart({
        id: product.id,
        item_name: product.item_name || "Unknown Product",
        base_price: product.base_price,
        image_small: product.image_small || "/placeholder.png",
        flavor_id: selectedFlavor,
        package_size_id: selectedSize,
        flavor_name: selectedFlavorLabel ?? null,
        package_size_label: selectedSizeLabel ?? null,
        quantity: 1,
      })
    );
  }

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        const { data } = await res.json();
        setProduct(data);
        if (data?.product_package_sizes?.length > 0) {
          setSelectedSize(data.product_package_sizes[0].package_sizes.id);
        }
        if (data?.product_flavour_options?.length > 0) {
          setSelectedFlavor(data.product_flavour_options[0].flavor_options.id);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <ProductSkeleton />;
  if (!product) return <ProductNotFound />;

  return (
    // Adjusting for sticky nav with pt-32 and background color
    <Section className="bg-background min-h-screen pt-28 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* Left Column: Image with Whimsical Shadow */}
          <div className="relative group px-2 md:px-0">
            <div className="absolute -inset-2 md:-inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all" />
            <Image
              src={product.image_large || "/placeholder.png"}
              alt={product.item_name || "Product Image"}
              width={800}
              height={500}
              className="relative rounded-[1.5rem] md:rounded-[2rem] object-cover w-full h-auto border border-white/40 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
          </div>

          {/* Right Column: Details Pane */}
          <div className="space-y-8 md:space-y-10 px-2 md:px-0">
            <div>
                <span className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 block">
                    Artisanal Creation
                </span>
                <h1 className="text-3xl md:text-5xl font-serif italic text-plum leading-tight">
                    {product.item_name}
                </h1>
                <div className="flex items-center gap-2 mt-4">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.round(product.avg_rating ?? 0) ? "fill-primary text-primary" : "text-plum/20"}`} />
                        ))}
                    </div>
                    <span className="text-plum/40 text-sm font-medium">({product.ratings || 0} reviews)</span>
                </div>
            </div>

            {/* Price Tag */}
            <div className="text-3xl md:text-4xl font-black text-plum border-l-4 border-primary pl-4">
                ${product.base_price.toFixed(2)}
            </div>

            <div className="space-y-6 md:space-y-8 bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-3xl md:rounded-4xl border border-white/60 shadow-xl">
              {/* Description & Info Tabs/Layout */}
              <div className="space-y-4">
                <h3 className="font-bold uppercase tracking-tighter text-plum text-sm">The Story</h3>
                <p className="text-plum/70 leading-relaxed italic text-base md:text-lg">{product.description}</p>
                <div className="pt-4 border-t border-plum/20">
                    <p className="text-xs md:text-sm text-plum/60 leading-relaxed font-medium">{product.info}</p>
                </div>
              </div>

              {/* Selection Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {product.product_package_sizes?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold uppercase tracking-tighter text-[10px] text-plum/40">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.product_package_sizes.map(({ package_sizes }) => (
                        <Button
                          key={package_sizes.id}
                          variant={package_sizes.id === selectedSize ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full px-4 font-bold text-xs ${package_sizes.id === selectedSize ? 'bg-primary text-plum' : 'border-primary/20 text-plum/60'}`}
                          onClick={() => setSelectedSize(package_sizes.id)}
                        >
                          {package_sizes.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {product.product_flavour_options?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold uppercase tracking-tighter text-[10px] text-plum/40">Flavor</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.product_flavour_options.map(({ flavor_options }) => (
                        <Button
                          key={flavor_options.id}
                          variant={flavor_options.id === selectedFlavor ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full px-4 font-bold text-xs ${flavor_options.id === selectedFlavor ? 'bg-primary text-plum' : 'border-primary/20 text-plum/60'}`}
                          onClick={() => setSelectedFlavor(flavor_options.id)}
                        >
                          {flavor_options.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Logic */}
              <div className="pt-4">
                {cartItem ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="flex items-center bg-background rounded-full p-1 border border-primary/20 w-full sm:w-auto justify-between sm:justify-start">
                        <Button variant="ghost" size="md" className="rounded-full hover:bg-primary/10 text-plum" onClick={() => dispatch(decrementInCart({ id: cartItem.id, flavor_id: cartItem.flavor_id, package_size_id: cartItem.package_size_id }))}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-bold text-plum">{cartItem.quantity}</span>
                        <Button variant="ghost" size="md" className="rounded-full hover:bg-primary/10 text-plum" onClick={() => dispatch(incrementInCart({ id: cartItem.id, flavor_id: cartItem.flavor_id, package_size_id: cartItem.package_size_id }))}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <span className="text-xs font-bold uppercase text-primary animate-pulse">In your basket</span>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-plum font-bold rounded-full py-6 md:py-8 text-base md:text-lg shadow-lg hover:shadow-primary/20"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBasket className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
