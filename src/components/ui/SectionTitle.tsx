interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  color?: "pink" | "gray" | "white";
}

export default function SectionTitle({ children, className = "", color = "pink" }: SectionTitleProps) {
  const colorClass =
    color === "pink"
      ? "text-pink-600"
      : color === "gray"
      ? "text-gray-800"
      : "text-white";

  return (
    <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${colorClass} ${className}`}>
      {children}
    </h2>
  );
}
