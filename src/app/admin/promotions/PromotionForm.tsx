"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Info, Calendar, Layout, Link as LinkIcon, Type, AlertCircle } from "lucide-react";
import ImageUploadField from "@/components/ui/ImageUploadField";
import { $Enums } from "@prisma/client";

type promo_display_type = $Enums.promo_display_type;
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

function SubmitButton({ initialData }: { initialData?: any }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="px-8 py-3 rounded-full shadow-2xl shadow-secondary/20 transition-all hover:-translate-y-1 active:scale-95"
      disabled={pending}
    >
      {pending ? "Saving promotion..." : initialData ? "Update Promotion" : "Create Promotion"}
    </Button>
  );
}

export default function PromotionForm({
  initialData,
  action
}: {
  initialData?: any,
  action: (formData: FormData) => Promise<void>
}) {
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [displayType, setDisplayType] = useState<promo_display_type>(initialData?.display_type || "SPLIT");
  const [showSafetyZone, setShowSafetyZone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

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

    try {
        const imageFile = formData.get("image") as File;

        if (imageFile && imageFile.size > 0) {
            const optimizedFile = await optimizeImage(imageFile, {
                maxWidth: 1200,
                maxHeight: 675,
                quality: 0.85
            });

            if (!isFileSizeValid(optimizedFile, 0.9)) {
                setError("The banner image is too large even after optimization. Please use a smaller file.");
                return;
            }

            formData.set("image", optimizedFile);
        }

        await action(formData);
    } catch (err: any) {
        console.error("Promotion form error:", err);
        setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="space-y-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20"
    >
      <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-card-lg border border-white/60 shadow-2xl space-y-8">
        
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium text-sm">{error}</p>
            </div>
        )}

        <ImageUploadField
          name="image"
          label="Promotion Banner (16:9 Recommended)"
          initialImageUrl={initialData?.image_url || null}
          existingImageFields={{ url: initialData?.image_url }}
          aspectRatio="video"
          uploadLabel="Upload Banner Image"
          acceptHint="1200x675px (16:9) WebP preferred"
          accentColor="secondary"
          showOverlay={showSafetyZone}
          onPreviewChange={(url) => setImagePreview(url)}
        >
          {imagePreview && (
            <button
              type="button"
              onClick={() => setShowSafetyZone(!showSafetyZone)}
              className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${showSafetyZone ? "bg-primary text-plum border-primary" : "bg-white/50 text-plum/40 border-plum/10"}`}
            >
              {showSafetyZone ? "Hide Safety Zone" : "Show Safety Zone"}
            </button>
          )}
        </ImageUploadField>

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
          <SubmitButton initialData={initialData} />
        </div>
      </div>
    </form>
  );
}
