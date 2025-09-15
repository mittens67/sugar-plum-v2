interface GradientBackgroundProps {
  className?: string;
}

export default function GradientBackground({ className = "" }: GradientBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 ${className}`} />
  );
}
