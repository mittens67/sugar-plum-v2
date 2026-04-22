import prisma from "@/lib/prisma";
import { deleteProduct, restoreProduct } from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, RefreshCw } from "lucide-react";

export default async function AdminMenu() {
  const products = await prisma.products.findMany({
    orderBy: { created_at: "desc" },
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
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50">Name</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50">Type</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50">Price</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50">Status</th>
                <th className="px-8 py-6 font-bold uppercase tracking-widest text-[10px] text-plum/50 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-plum/5">
                {products.map((product) => (
                <tr key={product.id.toString()} className={`transition-colors hover:bg-white/30 ${product.deleted_at ? "opacity-40" : ""}`}>
                    <td className="px-8 py-6">
                        <span className="font-bold text-plum">{product.item_name}</span>
                    </td>
                    <td className="px-8 py-6">
                        <span className="text-xs font-bold uppercase tracking-tighter text-plum/60 px-3 py-1 bg-plum/5 rounded-full border border-plum/10">
                            {product.product_type}
                        </span>
                    </td>
                    <td className="px-8 py-6 font-black text-plum">
                        ${product.base_price?.toString()}
                    </td>
                    <td className="px-8 py-6">
                    {product.deleted_at ? (
                        <span className="inline-flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Deleted
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-widest">
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
