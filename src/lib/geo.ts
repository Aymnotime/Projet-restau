/* ============================================================
   Moteur cartographique — Le Monde du Goût
   Projection Natural Earth I (coefficients publiés par Tom
   Patterson & Jenny, repris par d3-geo), décodage TopoJSON
   (world-atlas / Natural Earth 110m) et arcs grands-cercles.
   Aucune donnée dessinée à la main : frontières réelles.
   ============================================================ */

export type Pt = [number, number]; // [lon, lat]
export type ScreenPt = [number, number];

/* ——— Natural Earth I (d3-geo naturalEarth1Raw) ——— */
const A0 = 0.8707, A1 = -0.131979, A2 = -0.013791, A3 = 0.003971, A4 = -0.001529;
const B0 = 1.007226, B1 = 0.015085, B2 = -0.044475, B3 = 0.028874, B4 = -0.005916;
const RAD = Math.PI / 180;

function rawProject(lon: number, lat: number): ScreenPt {
  const phi = lat * RAD;
  const lambda = lon * RAD;
  const p2 = phi * phi, p4 = p2 * p2;
  return [
    lambda * (A0 + p2 * (A1 + p2 * (A2 + p2 * (A3 + p2 * A4)))),
    phi * (B0 + p2 * (B1 + p2 * (B2 + p2 * (B3 + p2 * B4)))),
  ];
}

/** Étendue brute de la sphère en coordonnées projetées. */
const RAW_W = Math.PI * A0 * 2; // φ = 0, λ = ±π
const RAW_H = Math.PI * (B0 + B1 + B2 + B3 + B4); // λ = 0, φ = ±π/2

export class Projection {
  k = 1;
  tx = 0;
  ty = 0;

  constructor(x0: number, y0: number, x1: number, y1: number) {
    this.k = Math.min((x1 - x0) / RAW_W, (y1 - y0) / RAW_H);
    this.tx = (x0 + x1) / 2;
    this.ty = (y0 + y1) / 2;
  }

  project([lon, lat]: Pt): ScreenPt {
    const [x, y] = rawProject(lon, lat);
    return [this.tx + this.k * x, this.ty - this.k * y]; // nord en haut
  }
}

/* ——— Décodage TopoJSON (quantisé, delta-encodé — spec topojson) ——— */
export interface Country {
  id: string;
  name: string;
  polygons: Pt[][][]; // polygones → anneaux → points [lon, lat]
}

function decodeArcs(topo: any): Pt[][] {
  const t = topo.transform;
  return topo.arcs.map((arc: number[][]) => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => {
      x += dx; y += dy;
      return t
        ? ([x * t.scale[0] + t.translate[0], y * t.scale[1] + t.translate[1]] as Pt)
        : ([x, y] as Pt);
    });
  });
}

function ringFromArcs(arcs: Pt[][], indices: number[]): Pt[] {
  const pts: Pt[] = [];
  for (const idx of indices) {
    const arc = idx < 0 ? arcs[~idx].slice().reverse() : arcs[idx];
    for (let i = pts.length ? 1 : 0; i < arc.length; i++) pts.push(arc[i]);
  }
  return pts;
}

function geometryPolygons(geom: any, arcs: Pt[][]): Pt[][][] {
  const build = (ringIdxs: number[][]) => ringIdxs.map((r) => ringFromArcs(arcs, r));
  if (geom.type === "Polygon") return [build(geom.arcs)];
  if (geom.type === "MultiPolygon") return geom.arcs.map((p: number[][]) => build(p));
  if (geom.type === "GeometryCollection")
    return geom.geometries.flatMap((g: any) => geometryPolygons(g, arcs));
  return [];
}

export function countriesFromTopo(topo: any): Country[] {
  const arcs = decodeArcs(topo);
  const obj = topo.objects.countries ?? topo.objects.land;
  const geoms: any[] = obj.geometries ?? [];
  return geoms
    .map((g) => ({
      id: String(g.id ?? ""),
      name: String(g.properties?.name ?? ""),
      polygons: geometryPolygons(g, arcs),
    }))
    .filter((c) => c.polygons.length > 0);
}

/* ——— Génération de tracé avec ré-échantillonnage adaptatif ——— */
const TOL = 3.4; // unités viewBox
const r2 = (n: number) => Math.round(n * 100) / 100;

function subdivide(
  a: ScreenPt, b: ScreenPt, proj: Projection, la: Pt, lb: Pt, depth: number, out: ScreenPt[]
) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  if (depth < 6 && dx * dx + dy * dy > TOL * TOL) {
    const mLon = (la[0] + lb[0]) / 2, mLat = (la[1] + lb[1]) / 2;
    const m: Pt = [mLon, mLat];
    const pm = proj.project(m);
    subdivide(a, pm, proj, la, m, depth + 1, out);
    out.push(pm);
    subdivide(pm, b, proj, m, lb, depth + 1, out);
  }
}

export function countryPath(polygons: Pt[][][], proj: Projection): string {
  let d = "";
  for (const rings of polygons) {
    for (const ring of rings) {
      if (ring.length < 3) continue;
      const pts: ScreenPt[] = [];
      let prev = ring[0];
      let pp = proj.project(prev);
      pts.push(pp);
      for (let i = 1; i < ring.length; i++) {
        const cur = ring[i];
        const cp = proj.project(cur);
        subdivide(pp, cp, proj, prev, cur, 0, pts);
        pts.push(cp);
        pp = cp; prev = cur;
      }
      d += "M" + pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join("L") + "Z";
    }
  }
  return d;
}

export function graticulePath(proj: Projection, step = 15): string {
  let d = "";
  for (let lon = -180; lon <= 180; lon += step) {
    let pen = false;
    for (let lat = -90; lat <= 90; lat += 2) {
      const [x, y] = proj.project([lon, lat]);
      d += (pen ? "L" : "M") + r2(x) + "," + r2(y);
      pen = true;
    }
  }
  for (let lat = -75; lat <= 75; lat += step) {
    let pen = false;
    for (let lon = -180; lon <= 180; lon += 2) {
      const [x, y] = proj.project([lon, lat]);
      d += (pen ? "L" : "M") + r2(x) + "," + r2(y);
      pen = true;
    }
  }
  return d;
}

/* ——— Arc grand-cercle (interpolation sphérique) ——— */
export function greatCirclePoints(a: Pt, b: Pt, n = 64): Pt[] {
  const toCart = ([lon, lat]: Pt): [number, number, number] => {
    const l = lon * RAD, p = lat * RAD;
    return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
  };
  const A = toCart(a), B = toCart(b);
  const dot = Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const d = Math.acos(dot);
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    if (d < 1e-6) {
      pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      continue;
    }
    const s1 = Math.sin((1 - t) * d) / Math.sin(d);
    const s2 = Math.sin(t * d) / Math.sin(d);
    const x = A[0] * s1 + B[0] * s2, y = A[1] * s1 + B[1] * s2, z = A[2] * s1 + B[2] * s2;
    pts.push([Math.atan2(y, x) / RAD, Math.asin(Math.max(-1, Math.min(1, z))) / RAD]);
  }
  return pts;
}

/* ——— Chargement des données Natural Earth (world-atlas 110m) ——— */
const CDN_SOURCES = [
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
  "https://fastly.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
  "https://unpkg.com/world-atlas@2/countries-110m.json",
];

let worldPromise: Promise<any> | null = null;

export function loadWorldTopo(): Promise<any> {
  if (worldPromise) return worldPromise;
  const attempt = async (i: number): Promise<any> => {
    if (i >= CDN_SOURCES.length) throw new Error("world-atlas indisponible");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    try {
      const res = await fetch(CDN_SOURCES[i], { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return attempt(i + 1);
    } finally {
      clearTimeout(timer);
    }
  };
  worldPromise = attempt(0);
  return worldPromise;
}
