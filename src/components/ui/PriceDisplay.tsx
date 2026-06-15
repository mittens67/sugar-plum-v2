interface PriceDisplayProps {
  amount: number;
  currency?: "₹" | "$";
  size?: "sm" | "md" | "lg" | "xl";
  showDecimals?: boolean;
  className?: string;
}

const sizeStyles: Record<NonNullable<PriceDisplayProps["size"]>, string> = {
  sm: "text-sm font-bold",
  md: "text-lg font-black",
  lg: "text-2xl font-black",
  xl: "text-4xl font-black",
};

export default function PriceDisplay({
  amount,
  currency = "$",
  size = "md",
  showDecimals = true,
  className = "",
}: PriceDisplayProps) {
  const formatted = showDecimals ? amount.toFixed(2) : Math.round(amount).toString();
  return (
    <span className={`${sizeStyles[size]} ${className}`}>
      {currency}{formatted}
    </span>
  );
}
