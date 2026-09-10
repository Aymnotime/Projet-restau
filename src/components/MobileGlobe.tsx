import { useEffect, useMemo, useRef, useState } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { countriesFromTopo, loadWorldTopo } from "../lib/geo";
import { DESTINATIONS, getProduct, formatPrice } from "../data/products";
import { OrderButton, ProductImage } from "./ui";
import { Link } from "react-router-dom";
import { IconArrowRight } from "./Icons";
import { AnimatePresence, motion } from "framer-motion";

const WIDTH = 360;
const HEIGHT = 360;
const DESTINATION_IDS: Record<string, string[]> = {
  algerie: ["012"], maroc: ["504"], usa: ["840"], inde: ["356"], chine: ["156"],
  italie: ["380"], france: ["250"], suisse: ["756"], afrique: [],
};
const COUNTRY_TO_DEST = Object.fromEntries(
  Object.entries(DESTINATION_IDS).flatMap(([destination, ids]) => ids.map((id) => [id, destination]))
);

export default function MobileGlobe() {
  const [topo, setTopo] = useState<any>(null);
  const [rotation, setRotation] = useState<[number, number, number]>([-12, -8, 0]);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const rotationRef = useRef(rotation);
  const draggingRef = useRef(false);
  const dragRef = useRef<{ x: number; y: number; rotation: [number, number, number]; target: EventTarget | null } | null>(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const result = loadWorldTopo();
    if (result.ok) {
      setTopo(result.data);
    } else {
      console.error("[MobileGlobe] loadWorldTopo: Échec du chargement des données", result.error);
      // En cas d'échec, on ne bloque pas l'UI — le globe restera vide mais fonctionnel
      setTopo(null);
    }
  }, []);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    if (dragging || !topo) return;
    let frame = 0;
    let previous = performance.now();
    const spin = (now: number) => {
      const elapsed = now - previous;
      previous = now;
      if (draggingRef.current) return;
      const [longitude, latitude, roll] = rotationRef.current;
      setRotation([longitude + elapsed * 0.006, latitude, roll]);
      frame = requestAnimationFrame(spin);
    };
    frame = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frame);
  }, [dragging, topo]);

  const selectDestination = (destinationId: string) => {
    const destination = DESTINATIONS.find((item) => item.id === destinationId);
    if (!destination) return;
    cancelAnimationFrame(animationRef.current);
    draggingRef.current = true;
    setDragging(true);
    setSelected(destinationId);
    const from = rotationRef.current;
    const target: [number, number, number] = [-destination.lon, -destination.lat, 0];
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next: [number, number, number] = [
        from[0] + (target[0] - from[0]) * eased,
        from[1] + (target[1] - from[1]) * eased,
        0,
      ];
      rotationRef.current = next;
      setRotation(next);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        draggingRef.current = false;
        setDragging(false);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  const projection = useMemo(
    () => geoOrthographic().translate([WIDTH / 2, HEIGHT / 2]).scale(151).rotate(rotation).clipAngle(90),
    [rotation]
  );
  const path = useMemo(() => geoPath(projection), [projection]);
  const countries = useMemo(() => (topo ? countriesFromTopo(topo) : []), [topo]);
  const graticule = path(geoGraticule10()) ?? "";

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    dragRef.current = { x: event.clientX, y: event.clientY, rotation: rotationRef.current, target: event.target };
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current) return;
    const longitude = dragRef.current.rotation[0] + (event.clientX - dragRef.current.x) * 0.45;
    const latitude = Math.max(-75, Math.min(75, dragRef.current.rotation[1] - (event.clientY - dragRef.current.y) * 0.3));
    const next: [number, number, number] = [longitude, latitude, 0];
    rotationRef.current = next;
    setRotation(next);
  };

  const stopDragging = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    if (dragRef.current && event.type === 'pointerup') {
      const dx = event.clientX - dragRef.current.x;
      const dy = event.clientY - dragRef.current.y;
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5 && dragRef.current.target) {
        const targetElement = dragRef.current.target as Element;
        const destElement = targetElement.closest('[data-destination-id]');
        if (destElement) {
          const destId = destElement.getAttribute('data-destination-id');
          if (destId) {
            selectDestination(destId);
          }
        }
      }
    }

    dragRef.current = null;
    setDragging(false);
  };

  const selectedDest = selected ? DESTINATIONS.find((d) => d.id === selected) : null;
  const selectedProduct = selectedDest ? getProduct(selectedDest.productId) : null;
  const selectedIndex = selectedDest ? DESTINATIONS.indexOf(selectedDest) : -1;

  return (
    <div className={`mobile-globe-real flex flex-col items-center ${dragging ? "is-dragging" : ""}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label="Globe interactif des inspirations culinaires"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
        className="w-full max-w-[360px]"
      >
        <defs>
          <radialGradient id="globe-fill" cx="34%" cy="28%">
            <stop offset="0" stopColor="#78b9d0" />
            <stop offset="0.52" stopColor="#2d7898" />
            <stop offset="1" stopColor="#123d5c" />
          </radialGradient>
          <filter id="globe-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-8" dy="12" stdDeviation="12" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>
        <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="151" fill="url(#globe-fill)" filter="url(#globe-shadow)" />
        <g className="mobile-globe-map" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={graticule} stroke="#e8f5f8" strokeOpacity="0.3" strokeWidth="0.7" />
          {countries.map((country) => {
            const destinationId = COUNTRY_TO_DEST[country.id];
            const destination = destinationId ? DESTINATIONS.find((item) => item.id === destinationId) : undefined;
            const countryShape = path({ type: "MultiPolygon", coordinates: country.polygons } as any) ?? "";
            return (
              <path
                key={country.id}
                d={countryShape}
                fill={destination ? "#e85d04" : "#709b63"}
                fillOpacity={destination ? 0.95 : 0.9}
                stroke="#d5e1c8"
                strokeWidth="0.45"
                vectorEffect="non-scaling-stroke"
                role={destination ? "button" : undefined}
                tabIndex={destination ? 0 : undefined}
                aria-label={destination ? `${destination.country} — ${getProduct(destination.productId)?.name}` : undefined}
                data-destination-id={destination ? destination.id : undefined}
                onClick={destination ? () => selectDestination(destination.id) : undefined}
              />
            );
          })}
        </g>
        <g aria-label="Destinations culinaires">
          {DESTINATIONS.map((destination) => {
            const center = projection.invert?.([WIDTH / 2, HEIGHT / 2]);
            if (!center || geoDistance([destination.lon, destination.lat], center) > Math.PI / 2) return null;
            const point = projection([destination.lon, destination.lat]);
            if (!point) return null;
            const [x, y] = point;
            return (
              <g
                key={destination.id}
                transform={`translate(${x},${y})`}
                role="button"
                tabIndex={0}
                aria-pressed={selected === destination.id}
                aria-label={`${destination.country} — ${getProduct(destination.productId)?.name ?? "Inspiration"}`}
                data-destination-id={destination.id}
                onClick={() => selectDestination(destination.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectDestination(destination.id);
                  }
                }}
              >
                <circle className={selected === destination.id ? "mobile-globe-marker--selected" : undefined} r="7" fill="#e85d04" fillOpacity="0.22" />
                <circle r="2.8" fill="#fff7e8" stroke="#e85d04" strokeWidth="1.3" />
                <title>{`${destination.country} — ${getProduct(destination.productId)?.name ?? "Inspiration"}`}</title>
              </g>
            );
          })}
        </g>
        <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="151" fill="none" stroke="#a9d5df" strokeOpacity="0.8" strokeWidth="1.5" />
      </svg>
      <p className="mobile-globe-real__hint mb-2">Faites tourner le globe</p>

      {/* PANNEAU DESTINATION MOBILE */}
      <div className="w-full max-w-[360px] px-4 sm:px-0">
        <AnimatePresence mode="wait">
          {selectedDest && selectedProduct && (
            <motion.div
              key={selectedDest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full border border-graphite bg-soot text-left"
            >
              <div className="relative">
                <ProductImage product={selectedProduct} className="aspect-[16/10]" />
                <span className="absolute left-3 top-3 bg-ember px-2 py-1 font-display text-xs tracking-[0.2em] text-coal">
                  ESCALE {selectedDest.code}
                </span>
                <span className="absolute bottom-2 right-3 font-display text-base tracking-[0.2em] text-cream/80">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(DESTINATIONS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ember">
                  Inspiration {selectedDest.country}
                </p>
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl sm:text-3xl leading-none tracking-wide">{selectedProduct.name.toUpperCase()}</h3>
                  <p className="font-display text-xl sm:text-2xl text-ember">{formatPrice(selectedProduct.price)}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sand">{selectedProduct.description}</p>
                {selectedProduct.note && <p className="mt-1 text-xs text-muted">{selectedProduct.note}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    to="/menu"
                    className="group inline-flex items-center gap-2 py-2 font-display text-xs tracking-[0.14em] text-sand transition-colors hover:text-ember"
                  >
                    VOIR LA CARTE
                    <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
