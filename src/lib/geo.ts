/* ============================================================
   Moteur cartographique — Le Monde du Goût
   Projection Natural Earth I via d3-geo, frontières réelles
   Natural Earth 110m (world-atlas) embarquées dans le build,
   décodage TopoJSON via topojson-client, arcs grands-cercles
   par interpolation sphérique.
   Aucune donnée dessinée à la main. Aucune dépendance réseau
   au runtime : la carte s'affiche de manière déterministe.
   ============================================================ */

import { geoNaturalEarth1, geoPath, geoGraticule10, type GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
// Données Natural Earth 110m — réelles, embarquées à la compilation.
import worldTopoJson from "world-atlas/countries-110m.json";

export type Pt = [number, number]; // [lon, lat]
export type ScreenPt = [number, number];

const worldTopo: any = worldTopoJson;

/* ——— Chargement des données (immédiat, jamais en échec) ——— */
export function loadWorldTopo(): Promise<any> {
  return Promise.resolve(worldTopo);
}

/* ——— Décodage TopoJSON → pays ——— */
export interface Country {
  id: string; // ISO 3166-1 numérique (ex : « 250 » = France)
  name: string;
  polygons: Pt[][][]; // polygones → anneaux → points [lon, lat]
}

export function countriesFromTopo(topo: any): Country[] {
  const fc: any = feature(topo, topo.objects.countries);
  const feats: any[] = fc?.features ?? [];
  return feats
    .map((f) => ({
      id: String(f.id ?? ""),
      name: String(f.properties?.name ?? ""),
      polygons: (f.geometry?.coordinates ?? []) as Pt[][][],
    }))
    .filter((c) => c.polygons.length > 0);
}

/* ——— Projection Natural Earth I ——— */
export class Projection {
  private projection: GeoProjection;
  private path: ReturnType<typeof geoPath>;

  constructor(x0: number, y0: number, x1: number, y1: number) {
    this.projection = geoNaturalEarth1().fitExtent(
      [
        [x0, y0],
        [x1, y1],
      ],
      { type: "Sphere" }
    );
    this.path = geoPath(this.projection);
  }

  project([lon, lat]: Pt): ScreenPt {
    return (this.projection([lon, lat]) as ScreenPt) ?? [0, 0];
  }

  geoPath(): ReturnType<typeof geoPath> {
    return this.path;
  }
}

/* ——— Génération de tracés (gérée par d3-geo : découpage de
   l'antiméridien, clip sphérique, précision des côtes) ——— */
export function countryPath(polygons: Pt[][][], proj: Projection): string {
  return (
    proj.geoPath()({ type: "MultiPolygon", coordinates: polygons } as any) ?? ""
  );
}

export function graticulePath(proj: Projection, _step = 15): string {
  return proj.geoPath()(geoGraticule10()) ?? "";
}

/* ——— Arc grand-cercle (interpolation sphérique) ——— */
const RAD = Math.PI / 180;

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
