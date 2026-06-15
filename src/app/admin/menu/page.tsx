import prisma from "@/lib/prisma";
import { deleteProduct, restoreProduct, permanentlyDeleteProduct } from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, RefreshCw, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import HardDeleteModal from "@/components/admin/HardDeleteModal";
import TypeFilter from "./TypeFilter";
import AdminSearchBar from "@/components/admin/SearchBar";
import Badge from "@/components/ui/Badge";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { $Enums, Prisma } from "@prisma/client";

type category = $Enums.category;

export default async function AdminMenu({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const typeFilter = params.type as category | undefined;
  const searchQuery = params.q || "";
  
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where: Prisma.productsWhereInput = {
    AND: [
        typeFilter ? { product_type: typeFilter } : {},
        searchQuery ? {
            item_name: {
                contains: searchQuery,
                mode: 'insensitive'
            }
        } : {}
    ]
  };

  const [products, totalCount] = await Promise.all([
    prisma.products.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { created_at: "desc" },
        include: {
          product_package_sizes: {
            include: {
              package_sizes: true,
            },
          },
          product_flavour_options: {
            include: {
              flavor_options: true,
            },
          },
        },
    }),
    prisma.products.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);
  const categories = Object.values($Enums.category);

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
                Inventory
            </span>
            <h1 className="text-4xl font-serif italic text-plum">Menu Items</h1>
            <p className="text-xs text-plum/40 mt-1 uppercase tracking-widest font-bold">
                {searchQuery ? `Searching "${searchQuery}": ` : typeFilter ? `${typeFilter}s: ` : "All: "} {totalCount} creations found
            </p>
        </div>
        <Link href="/admin/menu/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4">
            <TypeFilter currentType={typeFilter} categories={categories} />
            <AdminSearchBar
              initialValue={searchQuery}
              apiEndpoint="/api/admin/products/suggestions"
              redirectPath="/admin/menu"
              accentColor="primary"
              placeholder="Search creations by name..."
            />
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm self-start lg:self-auto">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-plum/60">{totalCount} Items Found</span>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-card-lg border border-white/60 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-plum/10">
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap w-16">No.</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Product</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Sizes</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Flavors</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Price</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Status</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 text-right whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-plum/5">
                {products.map((product, index) => (
                <tr key={product.id.toString()} className={`transition-colors hover:bg-white/30 ${product.deleted_at ? "opacity-40" : ""}`}>
                    <td className="px-8 py-6">
                        <span className="text-xs font-black text-plum/60">
                            {skip + index + 1}
                        </span>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-4 min-w-[200px]">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-plum/5 border border-plum/10 flex-shrink-0">
                                {product.image_small || product.image_medium || product.image_large ? (
                                    <Image 
                                        src={product.image_small || product.image_medium || product.image_large || ""} 
                                        alt={product.item_name || ""} 
                                        fill 
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-plum/20">
                                        <ImageIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-plum line-clamp-1">{product.item_name}</span>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-plum/40">
                                    {product.product_type}
                                </span>
                            </div>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {product.product_package_sizes.length > 0 ? (
                                product.product_package_sizes.map((pps) => (
                                    <span key={pps.id.toString()} className="text-[10px] font-bold uppercase tracking-tight text-plum px-2.5 py-1 bg-plum/10 rounded-lg border border-plum/20">
                                        {pps.package_sizes.label}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[10px] text-plum/30 italic">No sizes</span>
                            )}
                        </div>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {product.product_flavour_options.length > 0 ? (
                                product.product_flavour_options.map((pfo) => (
                                    <span key={pfo.id.toString()} className="text-[10px] font-bold uppercase tracking-tight text-secondary px-2.5 py-1 bg-secondary/10 rounded-lg border border-secondary/20">
                                        {pfo.flavor_options.label}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[10px] text-plum/30 italic">No flavors</span>
                            )}
                        </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-plum">
                        <PriceDisplay amount={Number(product.base_price)} size="sm" />
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant={product.deleted_at ? "deleted" : "active"} />
                    </td>
                    <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                            <Link href={`/admin/menu/edit/${product.id}`} className="p-2 text-plum/40 hover:text-primary transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md">
                                <Edit2 className="w-4 h-4" />
                            </Link>
                            {product.deleted_at ? (
                                <div className="flex gap-2">
                                    <form action={restoreProduct.bind(null, product.id)} className="inline">
                                        <button type="submit" className="p-2 text-plum/40 hover:text-blue-500 transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md" title="Restore Product">
                                            <RefreshCw className="w-4 h-4" />
                                        </button>
                                    </form>
                                    <HardDeleteModal itemId={product.id.toString()} itemName={product.item_name || "this item"} itemType="product" onDelete={permanentlyDeleteProduct} />
                                </div>
                            ) : (
                                <form action={deleteProduct.bind(null, product.id)} className="inline">
                                    <button type="submit" className="p-2 text-plum/40 hover:text-red-500 transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        {products.length === 0 ? (
            <div className="p-20 text-center">
                <p className="text-plum/40 italic">No {typeFilter ? typeFilter + "s" : "magical creations"} found in your inventory.</p>
            </div>
        ) : (
            <div className="px-8 py-6 bg-plum/5 border-t border-plum/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-plum/40">
                        Page {page} of {totalPages}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Link 
                        href={`/admin/menu?page=${page - 1}${typeFilter ? `&type=${typeFilter}` : ""}`}
                        className={`p-2 rounded-xl border transition-all ${page <= 1 ? "pointer-events-none opacity-20 bg-transparent border-plum/10 text-plum/40" : "bg-white hover:bg-primary/10 border-plum/10 text-plum shadow-sm hover:shadow-md"}`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                    <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={`/admin/menu?page=${p}${typeFilter ? `&type=${typeFilter}` : ""}`}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-black transition-all ${p === page ? "bg-plum text-white shadow-lg scale-110" : "bg-white/50 text-plum/40 hover:bg-white hover:text-plum border border-plum/5"}`}
                            >
                                {p}
                            </Link>
                        ))}
                    </div>
                    <Link 
                        href={`/admin/menu?page=${page + 1}${typeFilter ? `&type=${typeFilter}` : ""}`}
                        className={`p-2 rounded-xl border transition-all ${page >= totalPages ? "pointer-events-none opacity-20 bg-transparent border-plum/10 text-plum/40" : "bg-white hover:bg-primary/10 border-plum/10 text-plum shadow-sm hover:shadow-md"}`}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
