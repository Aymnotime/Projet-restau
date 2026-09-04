import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { formatPrice, type Product } from "../data/products";
import { useOrder } from "./OrderContext";
import { IconArrowRight, LogoMark } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/* — SEO par page — */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}

/* — Révélation au scroll — */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: reduce ? 0 : 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* — Titre révélé ligne par ligne (masque) — */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  startDelay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduce ? { y: 0 } : { y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, delay: startDelay + i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* — Texte révélé mot à mot au scroll — */
export function WordsReveal({ text, className = "", baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            aria-hidden
            className="inline-block"
            initial={reduce ? { y: 0, opacity: 1 } : { y: "105%", opacity: 0.4 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduce ? 0 : 0.55, delay: baseDelay + i * 0.035, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* — Bandeau défilant — */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl tracking-[0.08em] text-white/90 sm:text-3xl">
            {t}
          </span>
          <span className="inline-block h-2 w-2 rotate-45 bg-ember" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden border-y border-border bg-soot py-4 ${className}`} aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* — Petit surtitre éditorial — */
export function Kicker({ children, tone = "ember" }: { children: ReactNode; tone?: "ember" | "sand" }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] ${
        tone === "ember" ? "text-ember" : "text-text-muted"
      }`}
    >
      <span className="inline-block h-[2px] w-8 bg-current" />
      {children}
    </p>
  );
}

/* — Image produit avec visuel de remplacement si nécessaire — */
export function ProductImage({
  product,
  className = "",
  imgClassName = "",
  eager = false,
}: {
  product: Product;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const initials = product.name
    .split(" ")
    .filter((w) => w.length > 2 || w === product.name.split(" ")[0])
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  if (!product.image || failed) {
    return (
      <div className={`dot-grid relative overflow-hidden bg-sand ${className}`} role="img" aria-label={`${product.name} — visuel à venir`}>
        <span className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-ember/70" />
        <span className="absolute right-3 bottom-3 h-3 w-3 border-r-2 border-b-2 border-ember/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span className="font-display text-6xl leading-none tracking-wide text-text-dark/10">{initials}</span>
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-text-muted">
            <LogoMark className="h-4 w-4 text-text-muted/50" /> Visuel non fourni
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <img
        src={product.image}
        alt={`${product.name} — sandwich ${product.category === "sandwichs" ? "du Monde du Goût" : ""}`.trim()}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* — Boutons Commander (branchés sur ORDER_URL) — */
export function OrderButton({
  variant = "solid",
  size = "md",
  children,
  className = "",
}: {
  variant?: "solid" | "outline" | "onOrange" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}) {
  const openOrder = useOrder();
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }[size];
  const variants = {
    solid: "bg-ember text-white hover:bg-ember-dark border-2 border-ember hover:border-ember-dark",
    outline: "border-2 border-text-dark text-text-dark hover:bg-text-dark hover:text-white",
    onOrange: "bg-coal text-white hover:bg-graphite border-2 border-coal",
    ghost: "text-ember hover:text-ember-dark",
  }[variant];
  return (
    <button
      onClick={openOrder}
      className={`group inline-flex items-center justify-center gap-3 font-display font-bold tracking-[0.08em] uppercase transition-all duration-200 active:scale-[0.98] ${sizes} ${variants} ${className}`}
    >
      {children}
      {variant !== "ghost" && (
        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
}

export function LinkArrow({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 border-2 border-text-dark px-6 py-3 font-display font-bold tracking-[0.08em] uppercase text-text-dark transition-all duration-200 hover:bg-text-dark hover:text-white active:scale-[0.98] ${className}`}
    >
      {children}
      <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* — Compteur animé — */
export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/* — Marqueur de section éditorial : ( n° ) — libellé — filet ——— */
export function SectionMark({
  n,
  label,
  className = "",
  right,
}: {
  n: string;
  label: string;
  className?: string;
  right?: ReactNode;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4">
        <span className="font-display text-lg tracking-[0.2em] text-ember">( {n} )</span>
        <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.32em] text-text-muted">
          {label}
        </span>
        <span className="hairline min-w-8 flex-1" aria-hidden />
        {right && (
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.26em] text-text-muted md:block">
            {right}
          </span>
        )}
      </div>
    </Reveal>
  );
}

/* — Rangée de menu avec pointillés — */
export function PriceLine({ name, price, className = "" }: { name: ReactNode; price: number; className?: string }) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-display text-2xl tracking-wide text-text-dark">{name}</span>
      <span className="leader" />
      <span className="font-display text-2xl tracking-wide text-ember">{formatPrice(price)}</span>
    </div>
  );
}
