import prisma from "@/lib/prisma";
import { updatePromotion } from "../../../actions";
import PromotionForm from "../../PromotionForm";
import { Edit3 } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promotion = await prisma.promotions.findUnique({
    where: { id: BigInt(id) },
  });

  if (!promotion) {
    notFound();
  }

  // Convert BigInt for the form if needed, but Prisma data is usually fine
  // Next.js Server Components can't pass BigInt to Client Components easily though
  const serializedPromo = {
    ...promotion,
    id: promotion.id.toString(),
  };

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2 mb-2">
            <Edit3 className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block">
                Marketing / Edit
            </span>
        </div>
        <h1 className="text-4xl font-serif italic text-plum">Refine Campaign</h1>
      </div>

      <PromotionForm 
        initialData={serializedPromo} 
        action={updatePromotion.bind(null, BigInt(id))} 
      />
    </div>
  );
}
