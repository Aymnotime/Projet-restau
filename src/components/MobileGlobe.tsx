import { useEffect, useMemo, useRef, useState } from "react";
import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { countriesFromTopo, loadWorldTopo } from "../lib/geo";
import { DESTINATIONS, getProduct } from "../data/products";

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
  const rotationRef = useRef(rotation);
  const dragRef = useRef<{ x: number; y: number; rotation: [number, number, number] } | null>(null);

  useEffect(() => {
    loadWorldTopo().then(setTopo);
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
      const [longitude, latitude, roll] = rotationRef.current;
      setRotation([longitude + elapsed * 0.006, latitude, roll]);
      frame = requestAnimationFrame(spin);
    };
    frame = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frame);
  }, [dragging, topo]);

  const projection = useMemo(
    () => geoOrthographic().translate([WIDTH / 2, HEIGHT / 2]).scale(151).rotate(rotation).clipAngle(90),
    [rotation]
  );
  const path = useMemo(() => geoPath(projection), [projection]);
  const countries = useMemo(() => (topo ? countriesFromTopo(topo) : []), [topo]);
  const graticule = path(geoGraticule10()) ?? "";

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, rotation: rotationRef.current };
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current) return;
    const longitude = dragRef.current.rotation[0] + (event.clientX - dragRef.current.x) * 0.45;
    const latitude = Math.max(-75, Math.min(75, dragRef.current.rotation[1] - (event.clientY - dragRef.current.y) * 0.3));
    setRotation([longitude, latitude, 0]);
  };

  const stopDragging = () => {
    dragRef.current = null;
    setDragging(false);
  };

  return (
    <div className={`mobile-globe-real ${dragging ? "is-dragging" : ""}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label="Globe interactif des inspirations culinaires"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        <defs>
          <radialGradient id="globe-fill" cx="34%" cy="28%">
            <stop offset="0" stopColor="#4a4a4a" />
            <stop offset="0.52" stopColor="#202020" />
            <stop offset="1" stopColor="#080808" />
          </radialGradient>
          <filter id="globe-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-8" dy="12" stdDeviation="12" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>
        <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="151" fill="url(#globe-fill)" filter="url(#globe-shadow)" />
        <g className="mobile-globe-map" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={graticule} stroke="#ffffff" strokeOpacity="0.16" strokeWidth="0.7" />
          {countries.map((country) => {
            const destinationId = COUNTRY_TO_DEST[country.id];
            const destination = destinationId ? DESTINATIONS.find((item) => item.id === destinationId) : undefined;
            const countryShape = path({ type: "MultiPolygon", coordinates: country.polygons } as any) ?? "";
            return (
              <path
                key={country.id}
                d={countryShape}
                fill={destination ? "#e30613" : "#eeeeee"}
                fillOpacity={destination ? 0.9 : 0.78}
                stroke="#111111"
                strokeWidth="0.45"
                vectorEffect="non-scaling-stroke"
                role={destination ? "button" : undefined}
                tabIndex={destination ? 0 : undefined}
                aria-label={destination ? `${destination.country} — ${getProduct(destination.productId)?.name}` : undefined}
              />
            );
          })}
        </g>
        <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="151" fill="none" stroke="#e30613" strokeOpacity="0.8" strokeWidth="1.5" />
        <circle cx="130" cy="106" r="3.5" fill="#ffffff" stroke="#e30613" strokeWidth="1.5" />
        <circle cx="200" cy="184" r="3.5" fill="#ffffff" stroke="#e30613" strokeWidth="1.5" />
      </svg>
      <p className="mobile-globe-real__hint">Faites tourner le globe</p>
    </div>
  );
}
