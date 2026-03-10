import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: string; // optional background, gradient, or color
}

export default function Section({ children, className = "", bg = "" }: SectionProps) {
  return (
    /* We keep your py-20 and relative positioning exactly as they were */
    <section className={`relative py-20 ${bg} ${className}`}>
      {/* We keep your max-w-[90%] and px-6. 
          Added 'relative z-10' to ensure content stays on top of any background gradients.
      */}
      <div className="max-w-[90%] mx-auto px-6  z-10">
        {children}
      </div>
    </section>
  );
}