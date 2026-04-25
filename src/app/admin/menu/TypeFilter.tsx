"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { $Enums } from "@prisma/client";

type category = $Enums.category;
import { Filter, ChevronDown } from "lucide-react";

export default function TypeFilter({ 
  currentType, 
  categories 
}: { 
  currentType?: string; 
  categories: string[] 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTypeChange = (newType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newType === "all") {
      params.delete("type");
    } else {
      params.set("type", newType);
    }
    params.set("page", "1"); // Reset to first page on filter change
    router.push(`/admin/menu?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative group min-w-[200px]">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Filter className="w-3.5 h-3.5 text-plum/40 group-focus-within:text-primary transition-colors" />
        </div>
        
        <select
          value={currentType || "all"}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white border border-plum/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-plum appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <option value="all">All Magical Creations</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}s
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <ChevronDown className="w-3.5 h-3.5 text-plum/40 group-focus-within:text-primary transition-colors" />
        </div>
      </div>

      {currentType && (
        <button
          onClick={() => handleTypeChange("all")}
          className="text-[10px] font-black uppercase tracking-widest text-plum/40 hover:text-red-500 transition-colors px-2"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
}
