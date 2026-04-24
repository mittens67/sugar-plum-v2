"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";

export default function PromotionSearchBar({ initialValue = "" }: { initialValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/admin/promotions/suggestions?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data.suggestions);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Suggestion fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("q", searchTerm);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`/admin/promotions?${params.toString()}`);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const selection = suggestions[selectedIndex];
        setQuery(selection);
        handleSearch(selection);
      } else {
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative flex-1 max-w-md group" ref={suggestionsRef}>
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-secondary animate-spin" />
        ) : (
          <Search className="w-4 h-4 text-plum/30 group-focus-within:text-secondary transition-colors" />
        )}
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search promotions..."
        className="w-full pl-12 pr-12 py-3 bg-white border border-plum/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-plum focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all shadow-sm hover:shadow-md placeholder:text-plum/20"
      />

      {query && (
        <button
          onClick={() => {
            setQuery("");
            handleSearch("");
          }}
          className="absolute inset-y-0 right-5 flex items-center text-plum/20 hover:text-red-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-plum/10 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-plum/5">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-plum/30 px-3">Suggestions</span>
          </div>
          <div className="py-1">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(suggestion);
                  handleSearch(suggestion);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full text-left px-5 py-3 text-[11px] font-bold transition-colors flex items-center gap-3 ${
                  idx === selectedIndex ? "bg-secondary/10 text-secondary" : "text-plum hover:bg-secondary/5 hover:text-secondary"
                }`}
              >
                <Search className="w-3 h-3 opacity-30" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
