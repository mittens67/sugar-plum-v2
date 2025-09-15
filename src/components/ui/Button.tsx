import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    let variantClasses = "";
    if (variant === "default") {
      variantClasses = "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-400";
    } else if (variant === "outline") {
      variantClasses = "border border-pink-500 text-pink-600 hover:bg-pink-50";
    } else if (variant === "ghost") {
      variantClasses = "text-pink-600 hover:bg-pink-100";
    }

    let sizeClasses = "";
    if (size === "sm") {
      sizeClasses = "px-3 py-1.5 text-sm";
    } else if (size === "md") {
      sizeClasses = "px-4 py-2 text-base";
    } else if (size === "lg") {
      sizeClasses = "px-6 py-3 text-lg";
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
