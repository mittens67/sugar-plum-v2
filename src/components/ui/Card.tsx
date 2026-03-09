import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
  glass?: boolean;
  skeleton?: boolean;
}

export default function Card({
  children,
  className = "",
  glass = false,
  skeleton = false,
}: CardProps) {
  // Base classes that apply to both states for layout consistency
  const baseLayout = "rounded-[2.5rem] p-6 transition-all duration-500";

  if (skeleton) {
    return (
      <div 
        className={`${baseLayout} bg-text/5 animate-pulse border border-transparent ${className}`} 
        aria-hidden="true"
      />
    );
  }

  // Whimsical Glass vs Solid Styling
  // We add a subtle border to the glass effect to make it pop against the background
  const glassStyle = glass 
    ? "bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-2xl hover:-translate-y-1" 
    : "bg-white shadow-md hover:shadow-xl border border-transparent";

  return (
    <div className={`${baseLayout} ${glassStyle} ${className}`}>
      {children}
    </div>
  );
}