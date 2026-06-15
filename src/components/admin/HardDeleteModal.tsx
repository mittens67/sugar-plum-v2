"use client";

import { useState, useEffect } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";

interface HardDeleteModalProps {
  itemId: string;
  itemName: string;
  itemType: "product" | "promotion";
  onDelete: (id: bigint) => Promise<void>;
  triggerClassName?: string;
}

const itemTypeLabels: Record<HardDeleteModalProps["itemType"], { purgeLabel: string; confirmLabel: string }> = {
  product:   { purgeLabel: "Item to be purged:",       confirmLabel: "PURGING DATA..." },
  promotion: { purgeLabel: "Promotion to be purged:",  confirmLabel: "PURGING CAMPAIGN..." },
};

export default function HardDeleteModal({
  itemId,
  itemName,
  itemType,
  onDelete,
  triggerClassName,
}: HardDeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmString, setConfirmString] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { purgeLabel, confirmLabel } = itemTypeLabels[itemType];

  useEffect(() => {
    if (isOpen) {
      setConfirmString(Math.random().toString(36).substring(2, 7).toUpperCase());
      setUserInput("");
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (userInput !== confirmString) return;
    setIsDeleting(true);
    try {
      await onDelete(BigInt(itemId));
      setIsOpen(false);
    } catch (error) {
      console.error(`Failed to delete ${itemType}:`, error);
      alert(`Failed to delete ${itemType}. Please try again.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={triggerClassName ?? "p-2 text-plum/40 hover:text-red-600 transition-colors bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md"}
        title="Permanently Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} variant="danger">
        <div className="overflow-y-auto flex-1">
          <CardHeader className="text-center pt-10 px-8 pb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-serif italic text-plum mb-3">Confirm Deletion</CardTitle>
            <div className="space-y-1">
              <p className="text-xs text-plum/50 font-black uppercase tracking-[0.2em]">{purgeLabel}</p>
              <p className="text-lg font-bold text-plum px-4 py-1.5 bg-plum/5 rounded-xl inline-block border border-plum/10">
                {itemName}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-8 pt-0">
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 text-center relative shadow-inner">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Security Code</p>
              <span className="text-4xl font-mono font-black tracking-[0.4em] text-slate-900 select-none">
                {confirmString}
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-plum/40 ml-4">
                  Type code to unlock delete
                </label>
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
                  {isDeleting ? confirmLabel : "CONFIRM HARD DELETE"}
                </Button>
                <button
                  className="w-full py-2 text-slate-400 font-bold hover:text-plum transition-colors uppercase tracking-widest text-xs"
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel and go back
                </button>
              </div>
            </div>
            <p className="text-xs text-center text-red-500 font-bold opacity-60">
              Warning: This action is final and permanent.
            </p>
          </CardContent>
        </div>
      </Modal>
    </>
  );
}
