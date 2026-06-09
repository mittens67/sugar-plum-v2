import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    // baseClasses updated with whimsical rounded-full and a subtle active scale effect
    const baseClasses =
      "inline-flex items-center justify-center font-bold tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 rounded-full uppercase";

    let variantClasses = "";
    if (variant === "default") {
      // Artisanal Sun (#C5A059) base with Midnight Currant (#4A1E4D) text
      variantClasses = "bg-primary text-plum shadow-md hover:bg-primary-light hover:shadow-lg focus:ring-primary/40 hover:-translate-y-0.5";
    } else if (variant === "outline") {
      // Sophisticated outline using the primary gold color
      variantClasses = "border-2 border-primary/40 text-plum hover:border-primary hover:bg-primary/5 focus:ring-primary/20 hover:-translate-y-0.5";
    } else if (variant === "ghost") {
      // Clean look for secondary actions
      variantClasses = "text-plum/70 hover:text-plum hover:bg-primary/10";
    }

    let sizeClasses = "";
    if (size === "sm") {
      sizeClasses = "px-5 py-2 text-xs";
    } else if (size === "md") {
      sizeClasses = "px-8 py-3 text-sm";
    } else if (size === "lg") {
      sizeClasses = "px-10 py-4 text-base tracking-[0.12em]";
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";