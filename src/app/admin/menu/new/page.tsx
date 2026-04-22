import { addProduct } from "../../actions";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Product</h1>
      <ProductForm action={addProduct} />
    </div>
  );
}
