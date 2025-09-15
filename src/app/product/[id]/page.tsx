"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
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

interface FlavorOption {
  flavor_options: {
    id: number;
    label: string;
  };
}

interface PackageSize {
  package_sizes: {
    id: number;
    label: string;
    value: number;
    unit: string;
  };
}

interface Product {
  id: number;
  item_name: string;
  description: string;
  info: string;
  image_small: string;
  image_medium: string;
  image_large: string;
  base_price: number;
  avg_rating: number | null;
  ratings: number | null;
  product_flavour_options: FlavorOption[];
  product_package_sizes: PackageSize[];
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

  // Find if this product variation is already in the cart
  const cartItem = cart.find(
    (p: CartProduct) =>
      p.id === product?.id &&
      p.flavor_id === selectedFlavor &&
      p.package_size_id === selectedSize
  );

  function handleAddToCart() {
    if (!product) return;

    // Find selected flavor label
    const selectedFlavorLabel = product.product_flavour_options.find(
      ({ flavor_options }) => flavor_options.id === selectedFlavor
    )?.flavor_options.label;

    // Find selected package size label
    const selectedSizeLabel = product.product_package_sizes.find(
      ({ package_sizes }) => package_sizes.id === selectedSize
    )?.package_sizes.label;

    dispatch(
      addToCart({
        id: product.id,
        item_name: product.item_name,
        base_price: product.base_price,
        image_small: product.image_small,
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

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <Section className="bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title stays above grid */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">
          {product.item_name}
        </h1>

        {/* Grid: Image on left, Content + Reviews on right */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left column → Image */}
          <div>
            <Image
              src={product.image_large}
              alt={product.item_name}
              width={800}
              height={500}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Right column → Details + Reviews */}
          <div className="space-y-8">
            {/* Details */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg sm:text-xl text-gray-800">
                  Description
                </h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-semibold text-lg sm:text-xl text-gray-800">
                  Info
                </h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">
                  {product.info}
                </p>
              </div>

              {/* Package Sizes */}
              {product.product_package_sizes?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-800">
                    Package Size
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                    {product.product_package_sizes.map(({ package_sizes }) => (
                      <Button
                        key={package_sizes.id}
                        variant={
                          package_sizes.id === selectedSize
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedSize(package_sizes.id)}
                      >
                        {package_sizes.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavors */}
              {product.product_flavour_options?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-800">
                    Flavors
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                    {product.product_flavour_options.map(
                      ({ flavor_options }) => (
                        <Button
                          key={flavor_options.id}
                          variant={
                            flavor_options.id === selectedFlavor
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedFlavor(flavor_options.id)}
                        >
                          {flavor_options.label}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Add to Cart / Quantity Controls */}
              {cartItem ? (
                <div className="flex items-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      dispatch(
                        decrementInCart({
                          id: cartItem.id,
                          flavor_id: cartItem.flavor_id,
                          package_size_id: cartItem.package_size_id,
                        })
                      )
                    }
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      dispatch(
                        incrementInCart({
                          id: cartItem.id,
                          flavor_id: cartItem.flavor_id,
                          package_size_id: cartItem.package_size_id,
                        })
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="mt-4 w-full sm:w-auto"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
            </div>

            {/* Reviews */}
            <div>
              <SectionTitle color="pink">Reviews</SectionTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                <span className="text-2xl sm:text-3xl font-bold">
                  {product.avg_rating ?? "0"}
                </span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.avg_rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm sm:text-base">
                  {product.ratings || 0} reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
