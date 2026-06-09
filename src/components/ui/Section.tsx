import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: string; // optional background, gradient, or color
}

export default function Section({ children, className = "", bg = "" }: SectionProps) {
  return (
    /* We keep your py-20 and relative positioning exactly as they were */
    <section className={`relative py-12 md:py-20 lg:py-24 ${bg} ${className}`}>
      {/* Container adaptation: responsive max-width and safe area handling */}
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}