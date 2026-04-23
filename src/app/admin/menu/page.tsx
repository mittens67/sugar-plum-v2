import prisma from "@/lib/prisma";
import { deleteProduct, restoreProduct } from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, RefreshCw, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default async function AdminMenu() {
  const products = await prisma.products.findMany({
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
  });

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
                Inventory
            </span>
            <h1 className="text-4xl font-serif italic text-plum">Menu Items</h1>
        </div>
        <Link href="/admin/menu/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-plum/10">
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Product</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Sizes</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Flavors</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Price</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 whitespace-nowrap">Status</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 text-right whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-plum/5">
                {products.map((product) => (
                <tr key={product.id.toString()} className={`transition-colors hover:bg-white/30 ${product.deleted_at ? "opacity-40" : ""}`}>
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
                    <td className="px-8 py-6 font-black text-plum whitespace-nowrap">
                        ${product.base_price?.toString()}
                    </td>
                    <td className="px-8 py-6">
                    {product.deleted_at ? (
                        <span className="inline-flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Deleted
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Active
                        </span>
                    )}
                    </td>
                    <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                            <Link href={`/admin/menu/edit/${product.id}`} className="p-2 text-plum/40 hover:text-primary transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md">
                                <Edit2 className="w-4 h-4" />
                            </Link>
                            {product.deleted_at ? (
                                <form action={restoreProduct.bind(null, product.id)} className="inline">
                                    <button type="submit" className="p-2 text-plum/40 hover:text-blue-500 transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md">
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                </form>
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
        {products.length === 0 && (
            <div className="p-20 text-center">
                <p className="text-plum/40 italic">No magical creations found in your inventory.</p>
            </div>
        )}
      </div>
    </div>
  );
}
