import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  // Updated to match your brand palette
  color?: "plum" | "gold" | "white";
  align?: "left" | "center";
}

export default function SectionTitle({ 
  children, 
  className = "", 
  color = "plum",
  align = "center" 
}: SectionTitleProps) {
  
  const colorClass =
    color === "plum"
      ? "text-plum" // Deep Plum (#4A1E4D)
      : color === "gold"
      ? "text-primary" // Antique Gold (#C5A059)
      : "text-white";

  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 relative ${alignmentClass} ${className}`}>
      {/* The Main Title: 
          Using font-serif and italic for that 'Artisanal' feel 
      */}
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight ${colorClass}`}>
        {children}
      </h2>

      {/* Whimsical Decorative Underline:
          A soft gold gradient flare that sits under the title
      */}
      {align === "center" && (
        <div className="mt-4 flex justify-center items-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/40" />
          <div className="w-2 h-2 rounded-full border border-primary/30 rotate-45" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      )}
    </div>
  );
}