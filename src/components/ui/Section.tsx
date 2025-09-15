import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: string; // optional background, gradient, or color
}

export default function Section({ children, className = "", bg = "" }: SectionProps) {
  return (
    <section className={`relative py-20 ${bg} ${className}`}>
      <div className="max-w-[90%] mx-auto px-6">{children}</div>
    </section>
  );
}
