import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  tone?: "default" | "sand" | "petrol";
};

const toneClasses = {
  default: "bg-background",
  sand: "bg-sand/35",
  petrol: "bg-petrol text-white",
};

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  tone = "default",
}: SectionProps) {
  const isPetrol = tone === "petrol";

  return (
    <section id={id} className={`py-14 lg:py-20 ${toneClasses[tone]} ${className}`}>
      <div className="container-x">
        {(eyebrow || title || subtitle) && (
          <header className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
            {eyebrow && (
              <p
                className={`mb-3 text-sm font-semibold uppercase tracking-widest ${
                  isPetrol ? "text-gold" : "text-gold"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${
                  isPetrol ? "text-white" : "text-petrol-dark"
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mt-4 text-base leading-relaxed sm:text-lg ${
                  isPetrol ? "text-slate-brand/90" : "text-foreground/75"
                }`}
              >
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
