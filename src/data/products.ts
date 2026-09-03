import { IMAGES } from "./site";

/* ============================================================
   LE MONDE DU GOÛT — Données produits centralisées.
   Pour modifier la carte : éditez simplement ce fichier.
   image: null → visuel d'attente élégant (remplaçable facilement
   par les vraies photos dans /public/images/menu/{slug}).
   ============================================================ */

export type Category = "sandwichs" | "boissons" | "desserts";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  /** Précision de service (ex : « Servi avec des frites maison. ») */
  note?: string;
  price: number;
  image: string | null;
  featured?: boolean;
  /** Description courte pour les cartes */
  short?: string;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "sandwichs", label: "Sandwichs" },
  { id: "boissons", label: "Boissons" },
  { id: "desserts", label: "Desserts" },
];

const F = "Servi avec des frites maison.";

export const PRODUCTS: Product[] = [
  // ——— SANDWICHS ———
  {
    id: "dz", slug: "dz", name: "Le DZ", category: "sandwichs", price: 8.9,
    description: "Viande hachée maison / Omelette / Fromage / Sauce maison.",
    note: F, image: null, short: "Viande hachée maison, omelette, fromage, sauce maison.",
  },
  {
    id: "camaro", slug: "camaro", name: "Le Camaro", category: "sandwichs", price: 8.9,
    description: "Poulet mariné aux oignons, poivrons et olives en sauce maison.",
    note: F, image: null, short: "Poulet mariné aux oignons, poivrons et olives, sauce maison.",
  },
  {
    id: "zyent", slug: "zyent", name: "Le Zyent", category: "sandwichs", price: 8.9,
    description: "Thon / Pommes de terre / Sauce épicée / Olives / Œuf.",
    note: F, image: null, short: "Thon, pommes de terre, sauce épicée, olives, œuf.",
  },
  {
    id: "latinos", slug: "latinos", name: "Le Latinos", category: "sandwichs", price: 8.9,
    description: "Poulet mariné / Sauce épicée / Piment / Cheddar.",
    note: F, image: null, short: "Poulet mariné, sauce épicée, piment, cheddar.",
  },
  {
    id: "ricain", slug: "ricain", name: "Le Ricain", category: "sandwichs", price: 12.5,
    description: "4 steaks maison / Bacon / Cheddar / Œuf / Sauce cocktail.",
    note: F, image: IMAGES.ricain, featured: true,
    short: "4 steaks maison, bacon, cheddar, œuf, sauce cocktail.",
  },
  {
    id: "suissard", slug: "suissard", name: "Le Suissard", category: "sandwichs", price: 10.9,
    description: "Poulet mariné / Sauce fromagère / Jambon de dinde / Raclette.",
    note: F, image: IMAGES.suissard, featured: true,
    short: "Poulet mariné, sauce fromagère, jambon de dinde, raclette.",
  },
  {
    id: "paname", slug: "paname", name: "Le Paname", category: "sandwichs", price: 10.9,
    description: "3 steaks maison / Champignons / Sauce moutarde à l'ancienne / Jambon de dinde / Cheddar.",
    note: F, image: null, short: "3 steaks maison, champignons, moutarde à l'ancienne, cheddar.",
  },
  {
    id: "indien", slug: "indien", name: "L'Indien", category: "sandwichs", price: 8.9,
    description: "Poulet mariné maison, curry ou tandoori / Cheddar.",
    note: F, image: IMAGES.indien, featured: true,
    short: "Poulet mariné maison, curry ou tandoori, cheddar.",
  },
  {
    id: "china-town", slug: "china-town", name: "Le China Town", category: "sandwichs", price: 12.9,
    description: "Émincé de bavette aux oignons et champignons / Sauce maison / Cheddar.",
    note: F, image: IMAGES.chinaTown, featured: true,
    short: "Émincé de bavette aux oignons et champignons, sauce maison.",
  },
  {
    id: "viking", slug: "viking", name: "Le Viking", category: "sandwichs", price: 10.9,
    description: "Saumon fumé / Sauce maison / Galette de pommes de terre / Boursin / Oignons rouges / Citron.",
    note: F, image: null, short: "Saumon fumé, Boursin, galette de pommes de terre, citron.",
  },
  {
    id: "oriental", slug: "oriental", name: "L'Oriental", category: "sandwichs", price: 10.9,
    description: "Poulet mariné aux épices / Steak maison / Merguez / Poivrons / Œuf.",
    note: F, image: null, short: "Poulet mariné aux épices, steak maison, merguez, poivrons.",
  },
  {
    id: "mg", slug: "mg", name: "Le MG", category: "sandwichs", price: 11.9,
    description: "2 steaks maison / Poulet mariné / Sauce Boursin / Fromage / Poulet fumé.",
    note: F, image: IMAGES.mg, featured: true,
    short: "2 steaks maison, poulet mariné, sauce Boursin, poulet fumé.",
  },
  {
    id: "africana", slug: "africana", name: "L'Africana", category: "sandwichs", price: 8.9,
    description: "Poulet mariné / Sauce Nokoss / Cheddar.",
    note: F, image: null, short: "Poulet mariné, sauce Nokoss, cheddar.",
  },
  {
    id: "gaulois", slug: "gaulois", name: "Le Gaulois", category: "sandwichs", price: 10.9,
    description: "3 steaks maison / Sauce au poivre / Œuf.",
    note: F, image: null, short: "3 steaks maison, sauce au poivre, œuf.",
  },
  {
    id: "vege", slug: "vege", name: "Le Végé", category: "sandwichs", price: 8.9,
    description: "Galette de pommes de terre / Crudités / Cheddar / Œuf.",
    note: F, image: null, short: "Galette de pommes de terre, crudités, cheddar, œuf.",
  },
  {
    id: "frenchy", slug: "frenchy", name: "Le Frenchy", category: "sandwichs", price: 11.9,
    description: "2 steaks maison / Chèvre / Miel / Cheddar.",
    note: F, image: IMAGES.frenchy, featured: true,
    short: "2 steaks maison, chèvre, miel, cheddar.",
  },
  {
    id: "flamand", slug: "flamand", name: "Le Flamand", category: "sandwichs", price: 10.9,
    description: "Escalope panée maison / Sauce tartare maison / Citron / Cheddar.",
    note: F, image: null, short: "Escalope panée maison, sauce tartare maison, citron.",
  },
  {
    id: "rital", slug: "rital", name: "Le Rital", category: "sandwichs", price: 10.9,
    description: "3 steaks maison / Sauce tomate basilic / Mozzarella / Huile d'olive.",
    note: F, image: null, short: "3 steaks maison, sauce tomate basilic, mozzarella.",
  },
  {
    id: "mg-tacos", slug: "mg-tacos", name: "Le MG — Tacos", category: "sandwichs", price: 11.9,
    description: "2 steaks maison / Poulet mariné / Sauce Boursin / Fromage / Poulet fumé.",
    note: "Avec frites maison à l'intérieur.", image: null,
    short: "La recette MG en version tacos, frites maison à l'intérieur.",
  },

  // ——— BOISSONS ———
  { id: "cristalline-citron", slug: "cristalline-citron", name: "Cristalline citron", category: "boissons", price: 1.5, description: "Eau aromatisée citron.", image: null },
  { id: "cristaline-peche", slug: "cristaline-peche", name: "Cristaline pêche-abricot", category: "boissons", price: 1.5, description: "Eau aromatisée pêche-abricot.", image: null },
  { id: "cristalline-fraise", slug: "cristalline-fraise", name: "Cristalline fraise", category: "boissons", price: 1.5, description: "Eau aromatisée fraise.", image: null },
  { id: "oasis-tropical", slug: "oasis-tropical", name: "Oasis tropical", category: "boissons", price: 1.5, description: "Boisson aux fruits tropicaux.", image: null },
  { id: "oasis-pomme-cassis", slug: "oasis-pomme-cassis", name: "Oasis Pomme Cassis", category: "boissons", price: 1.5, description: "Boisson pomme cassis.", image: null },
  { id: "perrier", slug: "perrier", name: "Perrier", category: "boissons", price: 1.5, description: "Eau pétillante.", image: null },
  { id: "schweppes-agrumes", slug: "schweppes-agrumes", name: "Schweppes agrumes", category: "boissons", price: 1.5, description: "Soda aux agrumes.", image: null },
  { id: "boga", slug: "boga", name: "Boga", category: "boissons", price: 1.5, description: "Soda Boga.", image: null },
  { id: "hamoud", slug: "hamoud", name: "Hamoud", category: "boissons", price: 1.5, description: "Soda Hamoud.", image: null },
  { id: "panama-bissap", slug: "panama-bissap", name: "Panama hibiscus bissap", category: "boissons", price: 1.5, description: "Boisson à l'hibiscus (bissap).", image: null },
  { id: "dada", slug: "dada", name: "Dada", category: "boissons", price: 1.5, description: "Soda Dada.", image: null },

  // ——— DESSERTS ———
  { id: "tiramisu", slug: "tiramisu", name: "Tiramisu", category: "desserts", price: 3.5, description: "Tiramisu maison, généreux et onctueux.", image: null },
  { id: "tarte-daim", slug: "tarte-daim", name: "Tarte au Daim", category: "desserts", price: 3.0, description: "Tarte au chocolat Daim, croustillante et gourmande.", image: null },
];

export const byCategory = (c: Category) => PRODUCTS.filter((p) => p.category === c);
export const featured = PRODUCTS.filter((p) => p.featured);
export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

/* ============================================================
   CARTE DU MONDE — Destinations & inspirations culinaires.
   Chaque destination est associée à une recette du menu.
   (x, y) : position du repère sur la carte stylisée (viewBox 1000×520).
   ============================================================ */
export interface Destination {
  id: string;
  country: string;
  code: string;
  x: number;
  y: number;
  productId: string;
}

export const HOME_PIN = { x: 478, y: 96 };

export const DESTINATIONS: Destination[] = [
  { id: "algerie", country: "Algérie", code: "DZ", x: 486, y: 184, productId: "dz" },
  { id: "maroc", country: "Maroc", code: "MA", x: 448, y: 196, productId: "oriental" },
  { id: "usa", country: "USA", code: "US", x: 208, y: 148, productId: "ricain" },
  { id: "inde", country: "Inde", code: "IN", x: 676, y: 236, productId: "indien" },
  { id: "chine", country: "Chine", code: "CN", x: 768, y: 142, productId: "china-town" },
  { id: "italie", country: "Italie", code: "IT", x: 516, y: 136, productId: "rital" },
  { id: "france", country: "France", code: "FR", x: 470, y: 110, productId: "frenchy" },
  { id: "suisse", country: "Suisse", code: "CH", x: 500, y: 118, productId: "suissard" },
  { id: "afrique", country: "Afrique", code: "AF", x: 524, y: 322, productId: "africana" },
];

/** inspiration culinaire d'une recette (si associée à une destination) */
export const inspirationOf = (productId: string): Destination | undefined =>
  DESTINATIONS.find((d) => d.productId === productId);
