import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
  glass?: boolean;
  skeleton?: boolean;
}

export function Card({
  children,
  className = "",
  glass = false,
  skeleton = false,
}: CardProps) {
  // Base classes that apply to both states for layout consistency
  // Note: We removed default padding (p-6) to support sub-components like CardHeader/CardContent.
  // Feature cards in this project (Testimonials, FeaturedItems) provide padding in className.
  const baseLayout = "rounded-[2.5rem] transition-all duration-500 overflow-hidden";

  if (skeleton) {
    return (
      <div 
        className={`${baseLayout} p-6 bg-plum/5 animate-pulse border border-transparent ${className}`} 
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

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-xl font-semibold leading-none tracking-tight text-plum ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export default Card;
