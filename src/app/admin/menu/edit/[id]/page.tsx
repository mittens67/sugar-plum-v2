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
  
  const [product, allPackageSizes, allFlavorOptions] = await Promise.all([
    prisma.products.findUnique({
      where: { id: BigInt(id) },
      include: {
        product_package_sizes: true,
        product_flavour_options: true,
      }
    }),
    prisma.package_sizes.findMany(),
    prisma.flavor_options.findMany(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product: {product.item_name}</h1>
      <ProductForm 
        initialData={product} 
        action={updateProduct.bind(null, product.id)} 
        allPackageSizes={allPackageSizes}
        allFlavorOptions={allFlavorOptions}
      />
    </div>
  );
}
