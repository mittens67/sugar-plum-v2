"use client";

import { Button } from "@/components/ui/Button";
import { useState, useRef, useEffect } from "react";
import { ImagePlus, X, UploadCloud, Info, Check, AlertCircle } from "lucide-react";
import Image from "next/image";
import { package_sizes, flavor_options, category } from "@prisma/client";
import { optimizeImage, isFileSizeValid } from "@/utils/image-optimization";

export default function ProductForm({ 
  initialData, 
  action,
  allPackageSizes = [],
  allFlavorOptions = []
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<void>,
  allPackageSizes?: package_sizes[],
  allFlavorOptions?: flavor_options[]
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_large || null);
  const [productType, setProductType] = useState<category>(initialData?.product_type || "cake");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialData?.product_package_sizes?.map((pps: any) => pps.package_id.toString()) || []
  );
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(
    initialData?.product_flavour_options?.map((pfo: any) => pfo.flavor_id.toString()) || []
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter package sizes based on product type
  const availableSizes = allPackageSizes.filter(size => {
    const isCakeOrCustom = productType === "cake" || productType === "custom";
    return isCakeOrCustom ? size.unit === "kg" : size.unit === "piece";
  });

  // Reset selected sizes if they are no longer available for the current type
  useEffect(() => {
    const availableIds = availableSizes.map(s => s.id.toString());
    setSelectedSizes(prev => prev.filter(id => availableIds.includes(id)));
  }, [productType]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleSize = (id: string) => {
    setSelectedSizes(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleFlavor = (id: string) => {
    setSelectedFlavors(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (selectedSizes.length === 0) {
        alert("Please select at least one package size.");
        return;
    }

    setLoading(true);

    try {
        const formData = new FormData(e.currentTarget);
        const imageFile = formData.get("image") as File;

        if (imageFile && imageFile.size > 0) {
            // 1. Optimize image (convert to webp and resize)
            const optimizedFile = await optimizeImage(imageFile, {
                maxWidth: 1200,
                quality: 0.8
            });

            // 2. Check if it's still too large (Next.js body limit is 1MB by default)
            if (!isFileSizeValid(optimizedFile, 0.9)) { // Use 0.9 to be safe
                setError("Even after optimization, the image is too large. Please use a smaller image.");
                setLoading(false);
                return;
            }

            // 3. Replace the original file in FormData
            formData.set("image", optimizedFile);
        }

        // Call the server action
        await action(formData);
    } catch (err: any) {
        console.error("Form submission error:", err);
        setError(err.message || "An unexpected error occurred. Please try again.");
        setLoading(false);
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="space-y-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20"
    >
      <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-2xl space-y-8">
        
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium text-sm">{error}</p>
            </div>
        )}

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
                    <>
                        <input type="hidden" name="existing_image_large" value={initialData.image_large} />
                        <input type="hidden" name="existing_image_medium" value={initialData.image_medium} />
                        <input type="hidden" name="existing_image_small" value={initialData.image_small} />
                    </>
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
            <div className="relative">
                <select
                name="product_type"
                value={productType}
                onChange={(e) => setProductType(e.target.value as category)}
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
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-plum/30">
                    <Info className="w-4 h-4" />
                </div>
            </div>
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

        {/* Package Sizes Selection */}
        <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                Available Sizes ({productType === "cake" || productType === "custom" ? "kg" : "pieces"})
                <span className="text-red-500 font-black text-[10px]">* Mandatory</span>
            </label>
            <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                    <button
                        key={size.id.toString()}
                        type="button"
                        onClick={() => toggleSize(size.id.toString())}
                        className={`px-5 py-3 rounded-xl border transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest ${
                            selectedSizes.includes(size.id.toString())
                            ? "bg-plum text-white border-plum shadow-lg scale-105"
                            : "bg-white/50 text-plum/60 border-plum/10 hover:border-plum/30 hover:bg-white/80"
                        }`}
                    >
                        {size.label}
                        {selectedSizes.includes(size.id.toString()) && <Check className="w-3 h-3" />}
                    </button>
                ))}
                {availableSizes.length === 0 && (
                    <p className="text-xs italic text-plum/40 p-4 bg-plum/5 rounded-xl border border-dashed border-plum/10 w-full text-center">
                        No sizes found for this category.
                    </p>
                )}
            </div>
            {/* Hidden inputs for form submission */}
            {selectedSizes.map(id => (
                <input key={id} type="hidden" name="package_sizes" value={id} />
            ))}
        </div>

        {/* Flavor Options Selection (Conditional) */}
        {productType === "custom" && (
            <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                    Flavor Options
                </label>
                <div className="flex flex-wrap gap-3">
                    {allFlavorOptions.map((flavor) => (
                        <button
                            key={flavor.id.toString()}
                            type="button"
                            onClick={() => toggleFlavor(flavor.id.toString())}
                            className={`px-5 py-3 rounded-xl border transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest ${
                                selectedFlavors.includes(flavor.id.toString())
                                ? "bg-secondary text-white border-secondary shadow-lg scale-105"
                                : "bg-white/50 text-secondary/60 border-secondary/10 hover:border-secondary/30 hover:bg-white/80"
                            }`}
                        >
                            {flavor.label}
                            {selectedFlavors.includes(flavor.id.toString()) && <Check className="w-3 h-3" />}
                        </button>
                    ))}
                </div>
                {/* Hidden inputs for form submission */}
                {selectedFlavors.map(id => (
                    <input key={id} type="hidden" name="flavor_options" value={id} />
                ))}
            </div>
        )}

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
