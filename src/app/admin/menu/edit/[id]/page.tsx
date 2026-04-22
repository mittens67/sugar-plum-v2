import prisma from "@/lib/prisma";
import { updateProduct } from "../../../actions";
import ProductForm from "../../ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await prisma.products.findUnique({
    where: { id: BigInt(id) },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product: {product.item_name}</h1>
      <ProductForm 
        initialData={product} 
        action={updateProduct.bind(null, product.id)} 
      />
    </div>
  );
}
