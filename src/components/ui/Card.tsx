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
  if (skeleton) {
    return <div className={`rounded-2xl ${className}`} />;
  }

  const base = "rounded-2xl shadow-md hover:shadow-xl p-6 transition";
  const glassStyle = glass ? "bg-white/30 backdrop-blur-md" : "bg-white";
  return <div className={`${base} ${glassStyle} ${className}`}>{children}</div>;
}

