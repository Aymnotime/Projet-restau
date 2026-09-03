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
export const ORDER_URL = "";

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
   📷 ZONE IMAGES — Remplacez ces visuels par les photos
   officielles du restaurant (mêmes clés, mêmes emplacements).
   ============================================================ */
export const IMAGES = {
  hero: "https://image.qwenlm.ai/generated-images/184797ae-e572-4f92-9730-683d9be965b5/_result.png",
  intro: "https://image.qwenlm.ai/generated-images/0c613848-0805-4f58-bc5a-ecc09a56c865/_result.png",
  atelier: "https://image.qwenlm.ai/generated-images/8c677b09-9811-446a-b55e-54c8c7f0f86c/_result.png",
  mg: "https://image.qwenlm.ai/generated-images/896372ce-46c9-4e4c-afe1-b0ff8656863c/_result.png",
  indien: "https://image.qwenlm.ai/generated-images/d6002850-169a-4fa7-85f9-244b2556faa5/_result.png",
  ricain: "https://image.qwenlm.ai/generated-images/9cf8ed81-50b4-437c-83aa-0c21e6f0712f/_result.png",
  chinaTown: "https://image.qwenlm.ai/generated-images/1f690726-ff4e-43ae-a2ed-4c5f3a26a7c8/_result.png",
  suissard: "https://image.qwenlm.ai/generated-images/39039bce-6c94-4138-8b7b-2193e7e7dd30/_result.png",
  frenchy: "https://image.qwenlm.ai/generated-images/6c26dc4c-2bc5-4a7a-aeab-734195bff207/_result.png",
};

export const MICROCOPY = [
  "Une bouchée. Une destination.",
  "Le monde dans un sandwich.",
  "Votre prochain voyage commence ici.",
  "Fait maison. Inspiré du monde.",
  "Choisissez votre destination.",
];
