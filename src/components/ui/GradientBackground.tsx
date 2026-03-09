interface GradientBackgroundProps {
  className?: string;
}

export default function GradientBackground({ className = "" }: GradientBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden bg-background ${className}`}>
      {/* Primary Soft Glow (Top Left - Plum Hint) */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-text/5 blur-[120px] animate-pulse" />
      
      {/* Secondary Soft Glow (Bottom Right - Gold Hint) */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px]" />
      
      {/* Center Warmth (Subtle Vanilla/Champagne) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-white/20 via-transparent to-white/10 pointer-events-none" />
      
      {/* Texture Overlay (Optional: Subtle grain to make it look like artisanal paper/frosting) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
    </div>
  );
}