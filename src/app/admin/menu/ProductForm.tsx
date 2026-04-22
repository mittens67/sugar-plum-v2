"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function ProductForm({ 
  initialData, 
  action 
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<void> 
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    await action(formData);
    setLoading(false);
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Item Name</label>
          <input
            name="item_name"
            defaultValue={initialData?.item_name || ""}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            name="product_type"
            defaultValue={initialData?.product_type || "cake"}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
          >
            <option value="cake">Cake</option>
            <option value="snack">Snack</option>
            <option value="custom">Custom</option>
            <option value="cupcake">Cupcake</option>
            <option value="pastry">Pastry</option>
            <option value="teacake">Teacake</option>
            <option value="cookies">Cookies</option>
            <option value="brownie">Brownie</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Base Price (₹)</label>
          <input
            type="number"
            name="base_price"
            defaultValue={initialData?.base_price?.toString() || ""}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description || ""}
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
