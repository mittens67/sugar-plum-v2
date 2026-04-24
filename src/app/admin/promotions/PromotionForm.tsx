"use client";

import { Button } from "@/components/ui/Button";
import { useState, useRef } from "react";
import { ImagePlus, X, UploadCloud, Info, Calendar, Layout, Link as LinkIcon, Type, AlertCircle } from "lucide-react";
import Image from "next/image";
import { promo_display_type } from "@prisma/client";
import { optimizeImage, isFileSizeValid } from "@/utils/image-optimization";

const formatDateForInput = (dateValue: Date | string | null | undefined) => {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  if (isNaN(d.getTime())) return "";
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function PromotionForm({ 
  initialData, 
  action 
}: { 
  initialData?: any, 
  action: (formData: FormData) => Promise<void>
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [displayType, setDisplayType] = useState<promo_display_type>(initialData?.display_type || "SPLIT");
  const [showSafetyZone, setShowSafetyZone] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Date Validation
    const startDateStr = formData.get("start_date") as string;
    const endDateStr = formData.get("end_date") as string;
    
    if (startDateStr && endDateStr) {
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        if (end <= start) {
            setError("End date must be after the start date.");
            return;
        }
    }

    setLoading(true);

    try {
        const imageFile = formData.get("image") as File;

        if (imageFile && imageFile.size > 0) {
            // 1. Optimize image (16:9 ratio optimization)
            const optimizedFile = await optimizeImage(imageFile, {
                maxWidth: 1200,
                maxHeight: 675, // 16:9 ratio
                quality: 0.85
            });

            // 2. Check size
            if (!isFileSizeValid(optimizedFile, 0.9)) {
                setError("The banner image is too large even after optimization. Please use a smaller file.");
                setLoading(false);
                return;
            }

            // 3. Update FormData
            formData.set("image", optimizedFile);
        }

        await action(formData);
    } catch (err: any) {
        console.error("Promotion form error:", err);
        setError(err.message || "An unexpected error occurred.");
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

        {/* Image Upload Section with Safety Zone */}
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                    <ImagePlus className="w-3 h-3" />
                    Promotion Banner (16:9 Recommended)
                </label>
                {imagePreview && (
                    <button 
                        type="button"
                        onClick={() => setShowSafetyZone(!showSafetyZone)}
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${showSafetyZone ? 'bg-primary text-plum border-primary' : 'bg-white/50 text-plum/40 border-plum/10'}`}
                    >
                        {showSafetyZone ? 'Hide Safety Zone' : 'Show Safety Zone'}
                    </button>
                )}
            </div>
            
            <div className="relative group">
                {imagePreview ? (
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-2 border-white/60 shadow-lg bg-slate-100">
                        <Image 
                            src={imagePreview} 
                            alt="Preview" 
                            fill 
                            className="object-cover"
                        />
                        
                        {showSafetyZone && (
                            <div className="absolute inset-0 border-[10%] border-red-500/20 pointer-events-none">
                                <div className="absolute inset-[15%] border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center">
                                    <span className="bg-black/40 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter backdrop-blur-sm">
                                        Safe Text Area
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform z-20"
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
                            <UploadCloud className="w-8 h-8 text-secondary" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-plum uppercase tracking-widest text-xs">Upload Banner Image</p>
                            <p className="text-[10px] text-plum/40 mt-1">1200x675px (16:9) WebP preferred</p>
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
                {initialData?.image_url && (
                    <input type="hidden" name="existing_image" value={initialData.image_url} />
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <Type className="w-3 h-3" />
                Campaign Title
            </label>
            <input
              name="title"
              placeholder="e.g. Enchanted Holiday Sale"
              defaultValue={initialData?.title || ""}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-bold text-plum"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <Layout className="w-3 h-3" />
                Display Style
            </label>
            <div className="relative">
                <select
                name="display_type"
                value={displayType}
                onChange={(e) => setDisplayType(e.target.value as promo_display_type)}
                className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-bold text-plum uppercase tracking-widest text-xs appearance-none"
                >
                <option value="SPLIT">Split View (Text + Image)</option>
                <option value="IMAGE_ONLY">Image Only (Banner Full)</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-plum/30">
                    <Layout className="w-4 h-4" />
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                Call to Action Link
            </label>
            <input
              name="link"
              placeholder="e.g. /menu or https://..."
              defaultValue={initialData?.link || ""}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-medium text-plum"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <Info className="w-3 h-3" />
                Display Priority (Weight)
            </label>
            <input
              type="number"
              name="priority"
              placeholder="0"
              defaultValue={initialData?.priority || 0}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-black text-plum"
            />
          </div>
        </div>

        {/* Scheduling Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Start Date (Optional)
            </label>
            <input
              type="datetime-local"
              name="start_date"
              defaultValue={formatDateForInput(initialData?.start_date)}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-medium text-plum"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                End Date (Optional)
            </label>
            <input
              type="datetime-local"
              name="end_date"
              defaultValue={formatDateForInput(initialData?.end_date)}
              className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-medium text-plum"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50">Promotion Details / Subtext</label>
          <textarea
            name="description"
            placeholder="Describe the magic of this offer..."
            defaultValue={initialData?.description || ""}
            rows={4}
            className="w-full px-6 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-medium text-plum leading-relaxed italic"
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            size="lg"
            className="px-12 py-8 bg-secondary text-white hover:bg-secondary/90 rounded-full shadow-2xl shadow-secondary/20 transition-all hover:-translate-y-1 active:scale-95"
            disabled={loading}
          >
            {loading ? "Casting Spell..." : initialData ? "Update Campaign" : "Launch Promotion"}
          </Button>
        </div>
      </div>
    </form>
  );
}
