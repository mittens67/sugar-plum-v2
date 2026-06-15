import Link from "next/link";

interface EmptyStateCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  cta?: EmptyStateCta;
  className?: string;
}

export default function EmptyState({ icon, title, description, cta, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 md:py-24 px-6 bg-white/30 backdrop-blur-md rounded-card-lg border border-dashed border-plum/20 ${className}`}>
      {icon && (
        <div className="mb-6 text-plum/20">
          {icon}
        </div>
      )}
      <p className="font-serif italic text-plum/50 text-xl mb-2">{title}</p>
      {description && (
        <p className="text-sm text-plum/40 max-w-xs mt-1">{description}</p>
      )}
      {cta && (
        <div className="mt-6">
          {cta.href ? (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-plum font-black text-xs uppercase tracking-widest rounded-full shadow-sm hover:bg-primary-light transition-all"
            >
              {cta.label}
            </Link>
          ) : (
            <button
              onClick={cta.onClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-plum font-black text-xs uppercase tracking-widest rounded-full shadow-sm hover:bg-primary-light transition-all"
            >
              {cta.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
