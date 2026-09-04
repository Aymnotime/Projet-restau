import dzImage from "../../image-sandwich/le-dz.jpeg";
import camaroImage from "../../image-sandwich/le-camaro.jpeg";
import zyentImage from "../../image-sandwich/le-bollywood.jpeg";
import latinosImage from "../../image-sandwich/le-latinos.jpeg";
import ricainImage from "../../image-sandwich/le-ricain.jpeg";
import suissardImage from "../../image-sandwich/LE-SUISSARD.jpeg";
import panameImage from "../../image-sandwich/LE-PANAME.jpeg";
import indienImage from "../../image-sandwich/L'INDIEN.jpeg";
import chinaTownImage from "../../image-sandwich/chinatown.jpeg";
import vikingImage from "../../image-sandwich/le-viking.jpeg";
import orientalImage from "../../image-sandwich/L'ORIENTAL.jpeg";
import mgImage from "../../image-sandwich/le-mg.jpeg";
import africanaImage from "../../image-sandwich/MG ROUGE.jpeg";
import gauloisImage from "../../image-sandwich/le-normand.jpeg";
import frenchyImage from "../../image-sandwich/LE FRENCHY.jpeg";
import introImage from "../../image-sandwich/FRENCHYKEN.jpeg";
import ritalImage from "../../image-sandwich/le-rital.jpeg";
import heroImage from "../../image-sandwich/multi-image.jpeg";
import logoImage from "../../logo/logo.png";

/* ============================================================
   LE MONDE DU GOÛT — Configuration centrale du site
   Modifiez ce fichier pour mettre à jour les informations.
   ============================================================ */

export const SITE_URL = "https://www.lemondedugout.fr";

/**
 * ⚙️ COMMANDE EN LIGNE
 * Renseignez ici l'URL réelle de votre plateforme de commande
 * (Uber Eats, Deliveroo, Click&Collect…). Tant que la valeur est vide,
 * le site propose proprement la commande par téléphone.
 * Ne jamais inventer d'URL.
 */
export const ORDER_URL = "https://www.ubereats.com/fr/store/le-monde-du-gout-saint-denis/iBBHrkvCVQGHlzrDwnqpiA?srsltid=AfmBOorvKxUJqeZEjY9NIXjdre5tpfYdgHgPbQiGtH71zUisStaFcvqD";

export const RESTAURANT = {
  name: "Le Monde du Goût",
  signature: ["Le goût comme guide.", "Le monde comme destination."],
  address: {
    street: "45 Rue de la Boulangerie",
    zipCity: "93200 Saint-Denis",
    area: "Saint-Denis (93)",
  },
  phoneDisplay: "09 87 41 78 73",
  phoneHref: "tel:+33987417873",
  email: "contact@lemondedugout.fr",
  hoursLabel: "Tous les jours : 11h30 – 5h00",
  hoursShort: "7j/7 · 11h30 – 5h00",
  mapsEmbed:
    "https://www.google.com/maps?q=45%20Rue%20de%20la%20Boulangerie%2C%2093200%20Saint-Denis&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=45%20Rue%20de%20la%20Boulangerie%2C%2093200%20Saint-Denis",
};

export const NAV = [
  { label: "Menu", to: "/menu" },
  { label: "Notre histoire", to: "/notre-histoire" },
  { label: "Le restaurant", to: "/restaurant" },
  { label: "Contact", to: "/contact" },
] as const;

/* ============================================================
  📷 ZONE IMAGES — Photos officielles du restaurant.
   ============================================================ */
export const IMAGES = {
  hero: heroImage,
  intro: introImage,
  atelier: mgImage,
  logo: logoImage,
  dz: dzImage,
  camaro: camaroImage,
  zyent: zyentImage,
  latinos: latinosImage,
  mg: mgImage,
  indien: indienImage,
  ricain: ricainImage,
  chinaTown: chinaTownImage,
  suissard: suissardImage,
  frenchy: frenchyImage,
  paname: panameImage,
  viking: vikingImage,
  oriental: orientalImage,
  africana: africanaImage,
  gaulois: gauloisImage,
  rital: ritalImage,
};

export const MICROCOPY = [
  "Une bouchée. Une destination.",
  "Le monde dans un sandwich.",
  "Votre prochain voyage commence ici.",
  "Fait maison. Inspiré du monde.",
  "Choisissez votre destination.",
];
