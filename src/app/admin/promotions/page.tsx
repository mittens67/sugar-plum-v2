import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { revalidatePath } from "next/cache";
import { Plus, Edit2, Trash2, Power, PowerOff } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

async function togglePromotion(id: bigint, currentStatus: boolean) {
  "use server";
  await prisma.promotions.update({
    where: { id },
    data: { is_active: !currentStatus },
  });
  revalidatePath("/admin/promotions");
  revalidatePath("/");
}

async function deletePromotion(id: bigint) {
  "use server";
  await prisma.promotions.delete({
    where: { id },
  });
  revalidatePath("/admin/promotions");
  revalidatePath("/");
}

export default async function AdminPromotions() {
  const promotions = await prisma.promotions.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
                Marketing
            </span>
            <h1 className="text-4xl font-serif italic text-plum">Promotions</h1>
        </div>
        <Link href="/admin/promotions/new">
          <Button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90">
            <Plus className="w-4 h-4" />
            Create New Promotion
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {promotions.map((promo) => (
          <Card key={promo.id.toString()} glass className={`overflow-hidden transition-all ${!promo.is_active ? "opacity-60 grayscale" : ""}`}>
            {promo.image_url && (
              <div className="relative h-48 w-full overflow-hidden">
                <img src={promo.image_url} alt={promo.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute top-4 right-4">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg ${promo.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                        {promo.is_active ? "Active" : "Inactive"}
                    </span>
                </div>
              </div>
            )}
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-serif italic text-plum">{promo.title}</CardTitle>
              <p className="text-sm text-plum/60 mt-2 line-clamp-2">{promo.description}</p>
            </CardHeader>
            
            <CardContent className="p-8 pt-0 flex justify-end gap-3">
              <form action={togglePromotion.bind(null, promo.id, promo.is_active)}>
                <button type="submit" className={`p-3 rounded-2xl border transition-all shadow-sm hover:shadow-md ${promo.is_active ? "text-amber-500 border-amber-100 bg-amber-50 hover:bg-amber-100" : "text-green-500 border-green-100 bg-green-50 hover:bg-green-100"}`} title={promo.is_active ? "Deactivate" : "Activate"}>
                  {promo.is_active ? <PowerOff className="w-5 h-5" /> : <Power className="w-5 h-5" />}
                </button>
              </form>
              <Link href={`/admin/promotions/edit/${promo.id}`} className="p-3 text-plum/40 hover:text-primary transition-all bg-white/50 rounded-2xl border border-plum/5 shadow-sm hover:shadow-md" title="Edit">
                <Edit2 className="w-5 h-5" />
              </Link>
              <form action={deletePromotion.bind(null, promo.id)}>
                <button type="submit" className="p-3 text-plum/40 hover:text-red-500 transition-all bg-white/50 rounded-2xl border border-plum/5 shadow-sm hover:shadow-md" title="Delete">
                  <Trash2 className="w-5 h-5" />
                </button>
              </form>
            </CardContent>
          </Card>
        ))}

        {promotions.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white/30 backdrop-blur-md rounded-[2.5rem] border border-dashed border-plum/20">
            <p className="text-plum/40 italic font-medium">No marketing magic has been created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
