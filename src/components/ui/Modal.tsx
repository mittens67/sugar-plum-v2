"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const maxWidthStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
  variant?: "default" | "danger";
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
  variant = "default",
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={`w-full ${maxWidthStyles[maxWidth]} bg-white rounded-modal shadow-modal overflow-hidden relative z-10 border-4 ${variant === "danger" ? "border-red-100" : "border-plum/20"} animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-plum text-white rounded-full shadow-xl border-2 border-white hover:bg-plum/90 transition-all z-20 group"
          aria-label="Close"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        {title && (
          <div className={`px-8 pt-6 pb-2 ${variant === "danger" ? "text-red-600" : "text-plum"}`}>
            <h2 className="text-2xl font-serif italic font-bold">{title}</h2>
          </div>
        )}
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
