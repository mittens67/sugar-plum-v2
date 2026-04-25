import { addPromotion } from "../../actions";
import PromotionForm from "../PromotionForm";
import { Sparkles } from "lucide-react";

export default function NewPromotionPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block">
                Marketing / New
            </span>
        </div>
        <h1 className="text-4xl font-serif italic text-plum">Craft New Promotion</h1>
      </div>

      <PromotionForm action={addPromotion} />
    </div>
  );
}
