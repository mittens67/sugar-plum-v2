import prisma from "@/lib/prisma";
import { addProduct } from "../../actions";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const [allPackageSizes, allFlavorOptions] = await Promise.all([
    prisma.package_sizes.findMany(),
    prisma.flavor_options.findMany(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Product</h1>
      <ProductForm 
        action={addProduct} 
        allPackageSizes={allPackageSizes}
        allFlavorOptions={allFlavorOptions}
      />
    </div>
  );
}
