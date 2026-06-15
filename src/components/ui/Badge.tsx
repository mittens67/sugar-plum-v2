interface BadgeProps {
  variant: "active" | "deleted" | "inactive" | "pending" | "priority";
  label?: string;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  active:   "bg-green-500 text-white border-green-400",
  deleted:  "bg-red-500 text-white border-red-400",
  inactive: "bg-gray-400 text-white border-gray-300",
  pending:  "bg-amber-500 text-white border-amber-400",
  priority: "bg-primary text-plum border-primary-light/50",
};

const defaultLabels: Record<BadgeProps["variant"], string> = {
  active:   "Active",
  deleted:  "Deleted",
  inactive: "Inactive",
  pending:  "Pending",
  priority: "Priority",
};

export default function Badge({ variant, label, dot, className = "" }: BadgeProps) {
  const showDot = dot !== undefined ? dot : variant === "active";
  const text = label ?? defaultLabels[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border backdrop-blur-md shadow-sm ${variantStyles[variant]} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${variant === "active" ? "bg-white animate-pulse" : "bg-white/70"}`} />
      )}
      {text}
    </span>
  );
}
