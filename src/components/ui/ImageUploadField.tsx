"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ImagePlus, X, UploadCloud } from "lucide-react";

interface ExistingImageFields {
  large?: string;
  medium?: string;
  small?: string;
  url?: string;
}

interface ImageUploadFieldProps {
  name: string;
  label?: string;
  initialImageUrl?: string | null;
  existingImageFields?: ExistingImageFields;
  aspectRatio?: "square" | "video";
  acceptHint?: string;
  uploadLabel?: string;
  accentColor?: "primary" | "secondary";
  showOverlay?: boolean;
  children?: React.ReactNode;
  onPreviewChange?: (url: string | null) => void;
}

export default function ImageUploadField({
  name,
  label,
  initialImageUrl = null,
  existingImageFields,
  aspectRatio = "video",
  acceptHint = "PNG, JPG or WebP (Max 5MB)",
  uploadLabel = "Upload Image",
  accentColor = "primary",
  showOverlay = false,
  children,
  onPreviewChange,
}: ImageUploadFieldProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImagePreview(url);
        onPreviewChange?.(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    onPreviewChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-video";
  const iconColorClass = accentColor === "primary" ? "text-primary" : "text-secondary";
  const hoverBorderClass = accentColor === "primary" ? "hover:border-primary/30" : "hover:border-secondary/30";

  return (
    <div className="space-y-4">
      {(label || children) && (
        <div className="flex justify-between items-end">
          {label && (
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-plum/50 flex items-center gap-2">
              <ImagePlus className="w-3 h-3" />
              {label}
            </label>
          )}
          {children}
        </div>
      )}

      <div className="relative group">
        {imagePreview ? (
          <div className={`relative ${aspectClass} w-full rounded-card overflow-hidden border-2 border-white/60 shadow-lg bg-slate-100`}>
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover"
            />

            {showOverlay && (
              <div className="absolute inset-0 [border:10%_solid_rgba(239,68,68,0.2)] pointer-events-none">
                <div className="absolute inset-[15%] border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center">
                  <span className="bg-black/40 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-tighter backdrop-blur-sm">
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
            className={`w-full ${aspectClass} rounded-card border-4 border-dashed border-plum/10 bg-plum/5 flex flex-col items-center justify-center gap-4 hover:bg-plum/10 ${hoverBorderClass} transition-all group`}
          >
            <div className="bg-white p-4 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <UploadCloud className={`w-8 h-8 ${iconColorClass}`} />
            </div>
            <div className="text-center">
              <p className="font-bold text-plum uppercase tracking-widest text-xs">{uploadLabel}</p>
              <p className="text-xs text-plum/40 mt-1">{acceptHint}</p>
            </div>
          </button>
        )}

        <input
          type="file"
          name={name}
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

        {existingImageFields?.large && (
          <input type="hidden" name="existing_image_large" value={existingImageFields.large} />
        )}
        {existingImageFields?.medium && (
          <input type="hidden" name="existing_image_medium" value={existingImageFields.medium} />
        )}
        {existingImageFields?.small && (
          <input type="hidden" name="existing_image_small" value={existingImageFields.small} />
        )}
        {existingImageFields?.url && (
          <input type="hidden" name="existing_image" value={existingImageFields.url} />
        )}
      </div>
    </div>
  );
}
