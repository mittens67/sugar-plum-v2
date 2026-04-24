"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { permanentlyDeletePromotion } from "../actions";

interface PromotionHardDeleteButtonProps {
  promoId: string;
  title: string;
}

export default function PromotionHardDeleteButton({ promoId, title }: PromotionHardDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmString, setConfirmString] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  useEffect(() => {
    if (isOpen) {
      setConfirmString(generateRandomString());
      setUserInput("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleDelete = async () => {
    if (userInput !== confirmString) return;
    
    setIsDeleting(true);
    try {
      await permanentlyDeletePromotion(BigInt(promoId));
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete promotion:", error);
      alert("Failed to delete promotion. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const modalContent = isOpen && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden relative z-10 border-4 border-plum/20 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 bg-plum text-white rounded-full shadow-xl border-2 border-white hover:bg-plum/90 transition-all z-20 group"
        >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
            <CardHeader className="text-center pt-10 px-8 pb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-3xl font-serif italic text-plum mb-3">Confirm Deletion</CardTitle>
              <div className="space-y-1">
                <p className="text-[10px] text-plum/50 font-black uppercase tracking-[0.2em]">Promotion to be purged:</p>
                <p className="text-lg font-bold text-plum px-4 py-1.5 bg-plum/5 rounded-xl inline-block border border-plum/10">
                    {title}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-8 pt-0">
              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 text-center relative shadow-inner">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Security Code</p>
                <span className="text-4xl font-mono font-black tracking-[0.4em] text-slate-900 select-none">
                  {confirmString}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-plum/40 ml-4">Type code to unlock delete</label>
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                      placeholder="•••••"
                      className="w-full px-6 py-4 bg-white border-4 border-slate-100 rounded-xl focus:border-red-500 focus:ring-0 outline-none transition-all text-center font-mono font-black text-xl uppercase tracking-[0.3em] text-red-600 placeholder:text-slate-200"
                      autoFocus
                    />
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    className="w-full py-5 bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all font-black text-base tracking-[0.1em] rounded-xl disabled:opacity-20 disabled:grayscale"
                    onClick={handleDelete}
                    disabled={userInput !== confirmString || isDeleting}
                  >
                    {isDeleting ? "PURGING CAMPAIGN..." : "CONFIRM HARD DELETE"}
                  </Button>
                  <button
                    className="w-full py-2 text-slate-400 font-bold hover:text-plum transition-colors uppercase tracking-widest text-[10px]"
                    onClick={() => setIsOpen(false)}
                    disabled={isDeleting}
                  >
                    Cancel and go back
                  </button>
                </div>
              </div>
            </CardContent>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-plum/40 hover:text-red-600 transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md"
        title="Permanently Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
