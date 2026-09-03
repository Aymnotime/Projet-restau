import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DESTINATIONS, formatPrice, getProduct, HOME_PIN, type Destination } from "../data/products";
import { Kicker, ProductImage, Reveal } from "./ui";
import { OrderButton } from "./ui";
import { IconArrowRight, IconPlane } from "./Icons";

const CONTINENTS = [
  "M60,92 L120,58 L210,48 L300,66 L330,96 L310,116 L322,150 L282,160 L252,196 L222,246 L192,270 L170,232 L128,210 L96,168 L66,132 Z",
  "M330,40 L382,30 L414,52 L392,80 L348,76 Z",
  "M238,282 L292,266 L326,292 L318,344 L292,402 L262,448 L240,420 L246,352 Z",
  "M452,84 L496,62 L544,68 L562,92 L544,110 L556,126 L524,142 L494,152 L472,128 L456,106 Z",
  "M446,162 L504,150 L556,166 L578,202 L592,252 L562,302 L534,362 L508,398 L482,356 L458,302 L442,236 L438,196 Z",
  "M564,64 L642,46 L742,52 L834,72 L884,112 L872,152 L834,176 L806,214 L766,234 L726,216 L706,246 L670,228 L646,188 L606,162 L570,132 L578,96 Z",
  "M796,330 L856,318 L896,344 L890,392 L844,408 L804,388 Z",
];
const ISLANDS: [number, number, number][] = [
  [782, 262, 8],
  [806, 282, 6],
  [764, 288, 5],
  [832, 300, 7],
  [906, 132, 5],
];

const arcPath = (d: Destination) => {
  const { x: hx, y: hy } = HOME_PIN;
  const mx = (hx + d.x) / 2;
  const my = Math.min(hy, d.y) - 34 - Math.hypot(d.x - hx, d.y - hy) * 0.12;
  return `M ${hx} ${hy} Q ${mx} ${my} ${d.x} ${d.y}`;
};

export default function WorldMap() {
  const [selectedId, setSelectedId] = useState<string>(DESTINATIONS[0].id);
  const reduce = useReducedMotion();
  const dest = DESTINATIONS.find((d) => d.id === selectedId) ?? DESTINATIONS[0];
  const product = getProduct(dest.productId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:gap-10">
      {/* ——— Carte stylisée (interactive dès sm) ——— */}
      <Reveal className="hidden sm:block">
        <div className="relative overflow-hidden border border-graphite bg-soot">
          <div className="dot-grid absolute inset-0 opacity-60" />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-sand/70">
            <IconPlane className="h-4 w-4 text-ember" /> Tour du monde — 9 escales
          </div>
          <div className="absolute bottom-4 right-4 z-10 text-[10px] font-bold uppercase tracking-[0.28em] text-sand/50">
            Départ : Saint-Denis (93)
          </div>

          <svg viewBox="0 0 1000 520" className="relative w-full" role="group" aria-label="Carte du monde interactive des inspirations">
            {/* continents */}
            {CONTINENTS.map((d, i) => (
              <path key={i} d={d} fill="#1e1d1a" stroke="#3a3833" strokeWidth="1.4" strokeLinejoin="round" />
            ))}
            {ISLANDS.map(([cx, cy, r], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.75} fill="#1e1d1a" stroke="#3a3833" strokeWidth="1.2" />
            ))}

            {/* routes */}
            {DESTINATIONS.map((d) => {
              const active = d.id === selectedId;
              return (
                <motion.path
                  key={`arc-${d.id}`}
                  d={arcPath(d)}
                  fill="none"
                  stroke={active ? "#E85D04" : "#3a3833"}
                  strokeWidth={active ? 2.4 : 1.2}
                  strokeDasharray={active ? undefined : "3 7"}
                  initial={false}
                  animate={
                    active && !reduce
                      ? { pathLength: [0, 1], opacity: [0.4, 1] }
                      : { pathLength: 1, opacity: active ? 1 : 0.65 }
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}

            {/* repère Saint-Denis */}
            <g>
              <rect x={HOME_PIN.x - 6} y={HOME_PIN.y - 6} width="12" height="12" fill="#E85D04" transform={`rotate(45 ${HOME_PIN.x} ${HOME_PIN.y})`} />
              <rect x={HOME_PIN.x - 2.5} y={HOME_PIN.y - 2.5} width="5" height="5" fill="#111111" transform={`rotate(45 ${HOME_PIN.x} ${HOME_PIN.y})`} />
              <text x={HOME_PIN.x + 14} y={HOME_PIN.y - 8} fill="#F5F1E8" fontSize="13" fontFamily="Bebas Neue" letterSpacing="2">
                SAINT-DENIS
              </text>
            </g>

            {/* escales */}
            {DESTINATIONS.map((d) => {
              const active = d.id === selectedId;
              return (
                <g
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  onMouseEnter={() => setSelectedId(d.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedId(d.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.country} — découvrir ${getProduct(d.productId)?.name ?? ""}`}
                  aria-pressed={active}
                  className="cursor-pointer outline-none focus-visible:opacity-80"
                >
                  {active && <circle cx={d.x} cy={d.y} r="10" fill="none" stroke="#E85D04" strokeWidth="2" className="animate-pulse-ring motion-reduce:animate-none" style={{ transformOrigin: `${d.x}px ${d.y}px` }} />}
                  <circle cx={d.x} cy={d.y} r="20" fill="transparent" />
                  <circle cx={d.x} cy={d.y} r={active ? 8 : 6} fill={active ? "#E85D04" : "#111111"} stroke="#E85D04" strokeWidth="2" />
                  <text
                    x={d.x + 13}
                    y={d.y + 5}
                    fill={active ? "#E85D04" : "#D9D0C1"}
                    fontSize="16"
                    fontFamily="Bebas Neue"
                    letterSpacing="2"
                  >
                    {d.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Nos recettes rendent hommage aux saveurs de ces destinations — des inspirations culinaires, généreuses et
          faites maison.
        </p>
      </Reveal>

      {/* ——— Panneau destination ——— */}
      <div>
        {/* Escales scrollables (mobile) — au-dessus du panneau */}
        <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:hidden" role="tablist" aria-label="Choisir une destination">
          {DESTINATIONS.map((d) => {
            const p = getProduct(d.productId)!;
            const active = d.id === selectedId;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedId(d.id)}
                className={`shrink-0 border px-4 py-2.5 text-left transition-all ${
                  active ? "border-ember bg-ember/10" : "border-graphite bg-soot hover:border-line"
                }`}
              >
                <span className={`block font-display text-base leading-none tracking-wider ${active ? "text-ember" : "text-sand"}`}>
                  {d.country.toUpperCase()}
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-muted">
                  {p.name} · {formatPrice(p.price)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative flex h-full flex-col overflow-hidden border border-graphite bg-soot">
          <AnimatePresence mode="wait">
            <motion.div
              key={dest.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col"
            >
              <div className="relative">
                <ProductImage product={product} className="aspect-[16/10]" imgClassName="transition-transform duration-700 hover:scale-105" />
                <span className="absolute left-4 top-4 bg-ember px-2.5 py-1 font-display text-sm tracking-[0.2em] text-coal">
                  ESCALE {dest.code}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Kicker>Inspiration {dest.country}</Kicker>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-4xl leading-none tracking-wide">{product.name.toUpperCase()}</h3>
                  <p className="font-display text-3xl text-ember">{formatPrice(product.price)}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-sand">{product.description}</p>
                {product.note && <p className="mt-1 text-xs text-muted">{product.note}</p>}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <OrderButton size="sm">COMMANDER</OrderButton>
                  <Link
                    to="/menu"
                    className="group inline-flex items-center gap-2 px-2 py-2 font-display text-sm tracking-[0.14em] text-sand transition-colors hover:text-ember"
                  >
                    VOIR LA CARTE
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ——— Escales scrollables (tablette) ——— */}
        <div className="no-scrollbar -mx-4 mt-4 hidden gap-2 overflow-x-auto px-4 sm:flex lg:hidden" role="tablist" aria-label="Choisir une destination">
          {DESTINATIONS.map((d) => {
            const p = getProduct(d.productId)!;
            const active = d.id === selectedId;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedId(d.id)}
                className={`shrink-0 border px-4 py-2.5 text-left transition-all ${
                  active ? "border-ember bg-ember/10" : "border-graphite bg-soot hover:border-line"
                }`}
              >
                <span className={`block font-display text-base leading-none tracking-wider ${active ? "text-ember" : "text-sand"}`}>
                  {d.country.toUpperCase()}
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-muted">
                  {p.name} · {formatPrice(p.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
