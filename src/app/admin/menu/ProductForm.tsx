"use client";

import { Button } from "@/components/ui/Button";
import { useState, useRef } from "react";
import { ImagePlus, X, UploadCloud, Info } from "lucide-react";
import Image from "next/image";

export default function ProductForm({ 
  initialData, 
  action 
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<void> 
}) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_large || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form action={action} className="space-y-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-2xl space-y-8">
        
        {/* Image Upload Section */}
        <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <ImagePlus className="w-3 h-3" />
                Product Imagery
            </label>
            
            <div className="relative group">
                {imagePreview ? (
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-2 border-white/60 shadow-lg">
                        <Image 
                            src={imagePreview} 
                            alt="Preview" 
                            fill 
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-3xl border-4 border-dashed border-plum/10 bg-plum/5 flex flex-col items-center justify-center gap-4 hover:bg-plum/10 hover:border-primary/30 transition-all group"
                    >
                        <div className="bg-white p-4 rounded-full shadow-md group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-plum uppercase tracking-widest text-xs">Upload Magical Image</p>
                            <p className="text-[10px] text-plum/40 mt-1">PNG, JPG or WebP (Max 5MB)</p>
                        </div>
                    </button>
                )}
                <input 
                    type="file" 
                    name="image"
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {initialData?.image_large && (
                    <input type="hidden" name="existing_image" value={initialData.image_large} />
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50">Item Name</label>
            <input
              name="item_name"
              placeholder="e.g. Celestial Velvet Cake"
              defaultValue={initialData?.item_name || ""}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-primary/40 outline-none transition-all font-medium text-plum"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50">Category</label>
            <select
              name="product_type"
              defaultValue={initialData?.product_type || "cake"}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-primary/40 outline-none transition-all font-bold text-plum uppercase tracking-widest text-xs appearance-none"
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

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50">Base Price ($)</label>
            <input
              type="number"
              name="base_price"
              placeholder="0.00"
              defaultValue={initialData?.base_price?.toString() || ""}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-primary/40 outline-none transition-all font-black text-plum text-xl"
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50">Story / Description</label>
          <textarea
            name="description"
            placeholder="Tell the magical story behind this creation..."
            defaultValue={initialData?.description || ""}
            rows={4}
            className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-primary/40 outline-none transition-all font-medium text-plum leading-relaxed italic"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
            <Info className="w-3 h-3" />
            Additional Info (Ingredients, Allergy advice)
          </label>
          <textarea
            name="info"
            placeholder="Specify ingredients or notes for the customer..."
            defaultValue={initialData?.info || ""}
            rows={3}
            className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-primary/40 outline-none transition-all font-medium text-plum/70 text-sm leading-relaxed"
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            size="lg"
            className="px-12 py-8 rounded-full shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
            disabled={loading}
          >
            {loading ? "Magic in progress..." : initialData ? "Update Creation" : "Enchant New Product"}
          </Button>
        </div>
      </div>
    </form>
  );
}
