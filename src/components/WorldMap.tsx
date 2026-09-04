import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Projection, countriesFromTopo, countryPath, graticulePath,
  greatCirclePoints, loadWorldTopo, type ScreenPt,
} from "../lib/geo";
import { DESTINATIONS, HOME_PIN, formatPrice, getProduct } from "../data/products";
import { OrderButton, ProductImage } from "./ui";
import { IconArrowRight, IconClose } from "./Icons";

/* ============================================================
   CARTE DU MONDE — frontières réelles (Natural Earth 110m via
   world-atlas), projection Natural Earth I, arcs grands-cercles,
   avion éditorial sur la route Saint-Denis → 9 escales.
   ============================================================ */

const W = 1000;
const H = 520;
const proj = new Projection(14, 14, W - 14, H - 14);

const AFRICA_IDS = [
  "012","024","204","072","854","108","132","120","140","148","174","178","180","262",
  "818","226","232","748","231","266","270","288","324","624","384","404","426","430",
  "434","450","454","466","478","480","504","508","516","562","566","646","678","686",
  "690","694","706","710","728","729","834","768","788","800","894","716","732",
];

const COUNTRY_IDS: Record<string, string[]> = {
  algerie: ["012"], maroc: ["504"], usa: ["840"], inde: ["356"], chine: ["156"],
  italie: ["380"], france: ["250"], suisse: ["756"], afrique: AFRICA_IDS,
};
const COUNTRY_TO_DEST: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_IDS).flatMap(([d, ids]) => ids.map((i) => [i, d]))
);

/* Cadrages éditoriaux par destination (centre + facteur de zoom) */
const ZOOMS: Record<string, { c: [number, number]; k: number }> = {
  monde: { c: [0, 0], k: 1 },
  algerie: { c: [2.7, 27.5], k: 3.1 },
  maroc: { c: [-7.2, 31.5], k: 3.9 },
  usa: { c: [-97, 38.5], k: 2.1 },
  inde: { c: [78.5, 22.5], k: 3.0 },
  chine: { c: [103, 34], k: 2.4 },
  italie: { c: [12.4, 42.6], k: 4.6 },
  france: { c: [2.3, 46.8], k: 4.6 },
  suisse: { c: [8.2, 46.85], k: 6.4 },
  afrique: { c: [16, 9], k: 1.85 },
};
interface View { k: number; tx: number; ty: number }
const zoomView = (id: string): View => {
  const z = ZOOMS[id] ?? ZOOMS.monde;
  const [cx, cy] = proj.project(z.c);
  return { k: z.k, tx: W / 2 - z.k * cx, ty: H / 2 - z.k * cy };
};
const IDENTITY: View = { k: 1, tx: 0, ty: 0 };

const DEST_PTS: Record<string, ScreenPt> = Object.fromEntries(
  DESTINATIONS.map((d) => [d.id, proj.project([d.lon, d.lat])])
);
const HOME_PT = proj.project([HOME_PIN.lon, HOME_PIN.lat]);

const LABELS: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  algerie: { dx: 16, dy: -12, anchor: "start" },
  maroc: { dx: -14, dy: 18, anchor: "end" },
  usa: { dx: -16, dy: -12, anchor: "end" },
  inde: { dx: 14, dy: 20, anchor: "start" },
  chine: { dx: 16, dy: -12, anchor: "start" },
  italie: { dx: 15, dy: 19, anchor: "start" },
  france: { dx: -14, dy: -12, anchor: "end" },
  suisse: { dx: 17, dy: 5, anchor: "start" },
  afrique: { dx: 18, dy: 4, anchor: "start" },
};

/* ——— Route de l'avion : Saint-Denis → 9 escales → retour ——— */
const ROUTE: [number, number][] = [
  [HOME_PIN.lon, HOME_PIN.lat],
  ...DESTINATIONS.map((d) => [d.lon, d.lat] as [number, number]),
  [HOME_PIN.lon, HOME_PIN.lat],
];
interface Leg { pts: ScreenPt[]; cum: number[]; len: number; d: string }
const LEGS: Leg[] = ROUTE.slice(0, -1).map((a, i) => {
  const b = ROUTE[i + 1];
  const pts = greatCirclePoints(a, b, 72).map((p) => proj.project(p));
  const cum: number[] = [0];
  for (let j = 1; j < pts.length; j++) {
    cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
  }
  return {
    pts, cum, len: cum[cum.length - 1],
    d: "M" + pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("L"),
  };
});
const LEG_DUR = 2500;
const LEG_PAUSE = 420;
const PLANE_PATH =
  "M0,-8.4 C1.1,-5.9 1.5,-3 1.4,-0.6 L8.8,3.9 L8.8,5.3 L1.2,2.8 L0.9,5.9 L3.2,7.7 L3.2,8.5 L0,7.7 L-3.2,8.5 L-3.2,7.7 L-0.9,5.9 L-1.2,2.8 L-8.8,5.3 L-8.8,3.9 L-1.4,-0.6 C-1.5,-3 -1.1,-5.9 0,-8.4 Z";

const smooth = (t: number) => t * t * (3 - 2 * t);

/* ——— Couche arcs + avion (pilotée en impératif, zéro re-render) ——— */
function FlightLayer({ started, reduce, viewRef, viewStr }: {
  started: boolean;
  reduce: boolean | null;
  viewRef: React.MutableRefObject<View>;
  viewStr: string;
}) {
  const gRef = useRef<SVGGElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const arcRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (reduce || !started) return;
    let raf = 0;
    const total = LEGS.length * (LEG_DUR + LEG_PAUSE);
    const t0 = performance.now();
    const DELAY = 1600;

    const tick = (now: number) => {
      const v = viewRef.current;
      gRef.current?.setAttribute("transform", `translate(${v.tx},${v.ty}) scale(${v.k})`);
      const elapsed = now - t0 - DELAY;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let t = elapsed % total;
      let idx = 0;
      while (t > LEG_DUR + LEG_PAUSE && idx < LEGS.length - 1) {
        t -= LEG_DUR + LEG_PAUSE;
        idx++;
      }
      const drawing = t <= LEG_DUR;
      const p = drawing ? smooth(Math.min(1, t / LEG_DUR)) : 1;

      LEGS.forEach((leg, i) => {
        const el = arcRefs.current[i];
        if (!el) return;
        const frac = i < idx ? 1 : i === idx ? p : 0;
        el.style.strokeDashoffset = String(leg.len * (1 - frac));
        el.style.opacity = i === idx ? "0.85" : i < idx ? "0.22" : "0";
      });

      const leg = LEGS[idx];
      const target = p * leg.len;
      let j = 1;
      while (j < leg.cum.length - 1 && leg.cum[j] < target) j++;
      const segLen = leg.cum[j] - leg.cum[j - 1] || 1;
      const st = (target - leg.cum[j - 1]) / segLen;
      const x = leg.pts[j - 1][0] + (leg.pts[j][0] - leg.pts[j - 1][0]) * st;
      const y = leg.pts[j - 1][1] + (leg.pts[j][1] - leg.pts[j - 1][1]) * st;
      const ang = (Math.atan2(leg.pts[j][1] - leg.pts[j - 1][1], leg.pts[j][0] - leg.pts[j - 1][0]) * 180) / Math.PI;
      planeRef.current?.setAttribute(
        "transform",
        `translate(${x},${y}) rotate(${ang + 90}) scale(${0.8 / v.k})`
      );
      if (planeRef.current) planeRef.current.style.opacity = "0.95";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduce, viewRef]);

  return (
    <g ref={gRef} transform={viewStr}>
      {LEGS.map((leg, i) => (
        <path
          key={i}
          ref={(el) => { arcRefs.current[i] = el; }}
          d={leg.d}
          fill="none"
          stroke="#E85D04"
          strokeWidth={1.1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={leg.len}
          strokeDashoffset={reduce ? 0 : leg.len}
          opacity={reduce ? 0.22 : 0}
        />
      ))}
      {!reduce && (
        <g ref={planeRef} opacity="0">
          <path d={PLANE_PATH} fill="#E85D04" />
          <path d={PLANE_PATH} fill="none" stroke="#111111" strokeWidth="0.6" opacity="0.5" />
        </g>
      )}
    </g>
  );
}

/* ——— Composant principal ——— */
export default function WorldMap() {
  const [topo, setTopo] = useState<any>(null);
  const [failed, setFailed] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState("algerie");
  const [zoomed, setZoomed] = useState<string | null>(null);
  const [view, setView] = useState<View>(IDENTITY);
  const [compact, setCompact] = useState(false);
  const viewRef = useRef<View>(IDENTITY);
  const rafRef = useRef(0);
  const reduce = useReducedMotion();

  /* Données Natural Earth embarquées → disponibles immédiatement. */
  useEffect(() => {
    let on = true;
    loadWorldTopo()
      .then((t) => on && setTopo(t))
      .catch(() => on && setFailed(true));
    return () => { on = false; };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const fn = () => setCompact(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  /* La chorégraphie démarre dès que les données sont prêtes
     (le montage est déjà différé à l'approche de la section). */
  useEffect(() => {
    if (topo) setEntered(true);
  }, [topo]);

  /* Échap → retour vue monde */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && zoomed) resetZoom();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomed]);

  const countries = useMemo(() => (topo ? countriesFromTopo(topo) : []), [topo]);
  const land = useMemo(
    () =>
      countries.map((c) => {
        const lon = c.polygons[0][0][0][0];
        return { c, d: countryPath(c.polygons, proj), cx: proj.project([lon, 0])[0] };
      }),
    [countries]
  );
  const grat = useMemo(() => (topo ? graticulePath(proj) : ""), [topo]);

  const animateTo = (target: View) => {
    cancelAnimationFrame(rafRef.current);
    if (reduce) {
      viewRef.current = target;
      setView(target);
      return;
    }
    const from = { ...viewRef.current };
    const t0 = performance.now();
    const DUR = 950;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / DUR);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const v = {
        k: from.k + (target.k - from.k) * e,
        tx: from.tx + (target.tx - from.tx) * e,
        ty: from.ty + (target.ty - from.ty) * e,
      };
      viewRef.current = v;
      setView(v);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const resetZoom = () => {
    setZoomed(null);
    animateTo(IDENTITY);
  };
  const select = (id: string) => {
    setSelected(id);
    setZoomed(id);
    animateTo(zoomView(id));
  };

  const T = (p: ScreenPt): ScreenPt => [view.k * p[0] + view.tx, view.k * p[1] + view.ty];
  const viewStr = `translate(${view.tx},${view.ty}) scale(${view.k})`;

  const hoveredDest = hovered ? DESTINATIONS.find((d) => d.id === hovered) : null;
  const selectedDest = DESTINATIONS.find((d) => d.id === selected) ?? DESTINATIONS[0];
  const selectedProduct = getProduct(selectedDest.productId)!;
  const selectedIndex = DESTINATIONS.indexOf(selectedDest);

  /* Position de la fiche hover (en % du conteneur) */
  let ficheStyle: React.CSSProperties | null = null;
  if (hoveredDest && !compact) {
    const [px, py] = T(DEST_PTS[hoveredDest.id]);
    const leftPct = (px / W) * 100;
    const topPct = Math.min(78, Math.max(20, (py / H) * 100));
    const flip = leftPct > 60;
    ficheStyle = {
      left: `${leftPct}%`,
      top: `${topPct}%`,
      transform: `translate(${flip ? "calc(-100% - 18px)" : "18px"}, -50%)`,
    };
  }
  const hoveredProduct = hoveredDest ? getProduct(hoveredDest.productId)! : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      {/* ————— LA CARTE ————— */}
      <div>
        <div className="relative overflow-hidden border border-graphite bg-coal">
          {/* barre éditoriale */}
          <div className="flex items-center justify-between border-b border-graphite px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-sand/60">
            <span>Planisphère · Natural Earth</span>
            <span className="hidden sm:inline">Départ — Saint-Denis (93)</span>
            <span className="text-ember">09 escales</span>
          </div>

          {failed ? (
            /* Repli hors-ligne : aucune fausse géographie */
            <div className="px-6 py-16 text-center">
              <p className="font-display text-3xl tracking-wide text-sand">CARTE INDISPONIBLE HORS CONNEXION</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                Les frontières chargent depuis les données Natural Earth. Sélectionnez une escale ci-dessous —
                le voyage continue.
              </p>
            </div>
          ) : (
            <div className="dot-grid relative">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="block w-full"
                role="group"
                aria-label="Carte du monde interactive : 9 inspirations culinaires reliées à Saint-Denis"
              >
                {/* terres — toujours visibles dès que les données sont prêtes */}
                <g transform={viewStr}>
                  <path
                    d={grat}
                    fill="none"
                    stroke="#F5F1E8"
                    strokeOpacity={0.06}
                    strokeWidth={0.7}
                    vectorEffect="non-scaling-stroke"
                    className={entered && !reduce ? "rise-in" : undefined}
                    style={entered && !reduce ? { animationDelay: "0.4s" } : undefined}
                  />
                  {land.map(({ c, d, cx }) => {
                    const destId = COUNTRY_TO_DEST[c.id];
                    const lit =
                      !!destId &&
                      (hovered === destId || zoomed === destId || (selected === destId && !zoomed));
                    return (
                      <path
                        key={c.id}
                        d={d}
                        fill={lit ? "#FFFFFF" : "#F5F1E8"}
                        fillOpacity={lit ? 1 : 0.92}
                        stroke={lit ? "#E85D04" : "#111111"}
                        strokeWidth={lit ? 1.3 : 0.6}
                        vectorEffect="non-scaling-stroke"
                        className={
                          (entered && !reduce ? "land-in " : "") +
                          (destId ? "cursor-pointer outline-none transition-[fill-opacity] focus-visible:fill-white" : "")
                        }
                        style={
                          entered && !reduce
                            ? { animationDelay: `${0.06 + (cx / W) * 0.62}s` }
                            : undefined
                        }
                        {...(destId
                          ? {
                              tabIndex: 0,
                              role: "button",
                              "aria-pressed": zoomed === destId,
                              "aria-label": `${DESTINATIONS.find((d) => d.id === destId)?.country} — découvrir ${
                                getProduct(DESTINATIONS.find((d) => d.id === destId)!.productId)?.name
                              }`,
                              onMouseEnter: () => setHovered(destId),
                              onMouseLeave: (e: React.MouseEvent) => {
                                const rt = e.relatedTarget as Element | null;
                                if (rt && rt.closest?.("[data-fiche]")) return;
                                setHovered(null);
                              },
                              onFocus: () => setHovered(destId),
                              onBlur: () => setHovered(null),
                              onClick: () => select(destId),
                              onKeyDown: (e: React.KeyboardEvent) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  select(destId);
                                }
                              },
                            }
                          : {})}
                      />
                    );
                  })}
                </g>

                {/* arcs + avion */}
                {topo && (
                  <FlightLayer
                    started={entered}
                    reduce={reduce}
                    viewRef={viewRef}
                    viewStr={viewStr}
                  />
                )}

                {/* repères & étiquettes */}
                <g>
                  {/* Saint-Denis */}
                  <g transform={`translate(${T(HOME_PT)[0]},${T(HOME_PT)[1]})`}>
                    <rect x={-5} y={-5} width={10} height={10} fill="#E85D04" transform="rotate(45)" />
                    <rect x={-2} y={-2} width={4} height={4} fill="#111111" transform="rotate(45)" />
                  </g>
                  <text
                    x={T(HOME_PT)[0] + 14}
                    y={T(HOME_PT)[1] - 10}
                    fill="#F5F1E8"
                    fontSize={15}
                    fontFamily="Bebas Neue"
                    letterSpacing={2.4}
                    className={`hidden sm:block${entered && !reduce ? " rise-in" : ""}`}
                    style={entered && !reduce ? { animationDelay: "1.15s" } : undefined}
                  >
                    SAINT-DENIS — DÉPART
                  </text>

                  {DESTINATIONS.map((d, i) => {
                    const [x, y] = T(DEST_PTS[d.id]);
                    const active = hovered === d.id || zoomed === d.id || selected === d.id;
                    const lab = LABELS[d.id];
                    return (
                      <g key={d.id}>
                        {active && <circle cx={x} cy={y} r={11} fill="#E85D04" opacity={0.16} />}
                        <circle
                          cx={x}
                          cy={y}
                          r={active ? 5 : 3.8}
                          fill={active ? "#E85D04" : "#111111"}
                          stroke="#E85D04"
                          strokeWidth={1.8}
                          style={{ transition: "r .25s ease, fill .25s ease" }}
                        />
                        {!compact && (
                          <g
                            className={entered && !reduce ? "rise-in" : undefined}
                            style={entered && !reduce ? { animationDelay: `${1.1 + i * 0.07}s` } : undefined}
                          >
                            <line
                              x1={x}
                              y1={y}
                              x2={x + lab.dx * 0.8}
                              y2={y + lab.dy * 0.8}
                              stroke="#D9D0C1"
                              strokeOpacity={0.35}
                              strokeWidth={0.8}
                              strokeDasharray="2 3"
                            />
                            <text
                              x={x + lab.dx}
                              y={y + lab.dy}
                              textAnchor={lab.anchor}
                              fill={active ? "#E85D04" : "#D9D0C1"}
                              fontSize={14}
                              fontFamily="Bebas Neue"
                              letterSpacing={2}
                              style={{ transition: "fill .25s ease" }}
                            >
                              {d.country.toUpperCase()}
                            </text>
                            <text
                              x={x + lab.dx}
                              y={y + lab.dy + 12}
                              textAnchor={lab.anchor}
                              fill="#9b948a"
                              fontSize={8.5}
                              fontWeight={700}
                              letterSpacing={1.6}
                            >
                              {getProduct(d.productId)?.name.toUpperCase()} · {formatPrice(getProduct(d.productId)?.price ?? 0).toUpperCase()}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* retour vue monde */}
              <AnimatePresence>
                {zoomed && (
                  <motion.button
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    onClick={resetZoom}
                    className="absolute right-3 top-12 inline-flex items-center gap-2 border border-ember bg-coal/90 px-3 py-2 font-display text-sm tracking-[0.16em] text-ember backdrop-blur-sm transition-colors hover:bg-ember hover:text-coal"
                  >
                    <IconClose className="h-3.5 w-3.5" /> VUE MONDE
                  </motion.button>
                )}
              </AnimatePresence>

              {/* état de chargement (bref : données embarquées) */}
              {!topo && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-coal/80 backdrop-blur-[2px]">
                  <svg width="120" height="24" viewBox="0 0 120 24" aria-hidden>
                    <path d="M4 18 Q 60 -8 116 14" fill="none" stroke="#E85D04" strokeWidth="1.6" strokeDasharray="5 6" className="dash-crawl" />
                  </svg>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sand/70">
                    Traçage des routes aériennes…
                  </p>
                </div>
              )}

              {/* fiche hover (desktop) */}
              <AnimatePresence>
                {ficheStyle && hoveredDest && hoveredProduct && (
                  <motion.div
                    data-fiche
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    style={ficheStyle}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute z-20 w-[248px] border border-graphite bg-soot shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
                  >
                    <div className="flex gap-3 p-3">
                      <ProductImage product={hoveredProduct} className="h-16 w-16 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-ember">
                          Escale {hoveredDest.code} · {hoveredDest.country}
                        </p>
                        <p className="mt-1 truncate font-display text-xl leading-none tracking-wide text-cream">
                          {hoveredProduct.name.toUpperCase()}
                        </p>
                        <p className="mt-1 font-display text-lg text-ember">{formatPrice(hoveredProduct.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-graphite px-3 py-2">
                      <OrderButton size="sm" className="!px-3 !py-1.5 text-xs">COMMANDER</OrderButton>
                      <Link to="/menu" className="link-line text-[10px] font-bold uppercase tracking-[0.2em] text-sand hover:text-ember">
                        La carte
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* escales — sélection accessible (tactile & clavier) */}
        <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Choisir une escale">
          {DESTINATIONS.map((d, i) => {
            const active = selected === d.id;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={active}
                onClick={() => select(d.id)}
                className={`group flex shrink-0 items-baseline gap-2 border px-3.5 py-2 transition-all duration-300 ${
                  active
                    ? "border-ember bg-ember text-coal"
                    : "border-graphite bg-soot text-sand hover:border-ember/70 hover:text-cream"
                }`}
              >
                <span className={`font-display text-base leading-none tracking-[0.14em] ${active ? "text-coal" : "text-ember"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base leading-none tracking-[0.14em]">
                  {d.country.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-muted">
          Frontières · Natural Earth / world-atlas — Projection Natural Earth I
        </p>
      </div>

      {/* ————— PANNEAU DESTINATION ————— */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="relative flex h-full flex-col overflow-hidden border border-graphite bg-soot">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDest.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col"
            >
              <div className="relative">
                <ProductImage product={selectedProduct} className="aspect-[16/10]" imgClassName="transition-transform duration-700 hover:scale-105" />
                <span className="absolute left-4 top-4 bg-ember px-2.5 py-1 font-display text-sm tracking-[0.2em] text-coal">
                  ESCALE {selectedDest.code}
                </span>
                <span className="absolute bottom-3 right-4 font-display text-lg tracking-[0.2em] text-cream/80">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(DESTINATIONS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ember">
                  Inspiration {selectedDest.country} · {selectedDest.lat.toFixed(2)}°, {selectedDest.lon.toFixed(2)}°
                </p>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-4xl leading-none tracking-wide">{selectedProduct.name.toUpperCase()}</h3>
                  <p className="font-display text-3xl text-ember">{formatPrice(selectedProduct.price)}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-sand">{selectedProduct.description}</p>
                {selectedProduct.note && <p className="mt-1 text-xs text-muted">{selectedProduct.note}</p>}
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
      </div>
    </div>
  );
}
