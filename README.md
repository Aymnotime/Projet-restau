# Le Monde du Goût

Site vitrine premium du restaurant **Le Monde du Goût**, situé à Saint-Denis (93). Le site présente la carte, l'histoire du restaurant, le lieu et les informations de contact, avec une expérience éditoriale inspirée du voyage culinaire.

## Sommaire

- [Objectifs](#objectifs)
- [Fonctionnalités](#fonctionnalités)
- [Démarrage](#démarrage)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Gestion du contenu](#gestion-du-contenu)
- [Charte graphique](#charte-graphique)
- [Routes](#routes)
- [Déploiement](#déploiement)
- [Bonnes pratiques](#bonnes-pratiques)

## Objectifs

- Donner envie de découvrir les sandwichs inspirés de plusieurs destinations.
- Permettre de consulter rapidement la carte et les prix.
- Faciliter la commande, la localisation et la prise de contact.
- Installer une identité visuelle forte, contemporaine et reconnaissable.

## Fonctionnalités

- Page d'accueil éditoriale avec hero, produits mis en avant et carte du monde.
- Menu filtrable par catégories : sandwichs, boissons et desserts.
- Fiches produits avec description, prix, photo et inspiration géographique lorsque disponible.
- Parcours de commande centralisé dans une fenêtre modale : livraison, à emporter ou téléphone.
- Page histoire, présentation du restaurant, contact et mentions légales.
- Carte interactive du monde avec destinations culinaires associées aux recettes.
- Navigation responsive avec barre de commande flottante sur mobile.
- Transitions de pages et animations respectant `prefers-reduced-motion`.
- Métadonnées et fichiers de référencement statiques dans `public/`.

## Démarrage

### Prérequis

- Node.js 20 ou version compatible.
- npm.

### Installation

```bash
npm install
```

### Lancer le serveur de développement

```bash
npm run dev
```

Le serveur Vite est configuré sur `http://localhost:3000`.

## Scripts

| Commande | Usage |
| --- | --- |
| `npm run dev` | Lance Vite en mode développement. |
| `npm run build` | Vérifie les types puis génère la version de production via Vite. |
| `npm run typecheck` | Lance TypeScript sans générer de fichiers. |

## Architecture

```text
src/
├── App.tsx                  # Routage, shell global et transitions de pages
├── index.css                # Tokens graphiques, animations et styles globaux
├── main.tsx                 # Point d'entrée React
├── components/              # Navigation, footer, commande, carte et composants UI
├── data/
│   ├── products.ts           # Produits, catégories, destinations et prix
│   └── site.ts               # Coordonnées, URLs, images et navigation du site
├── lib/geo.ts                # Utilitaires de projection géographique
└── pages/                   # Vues Home, Menu, Histoire, Restaurant, Contact, Mentions
```

Technologies principales :

- React 18 et TypeScript.
- Vite 6.
- React Router avec `HashRouter`.
- Tailwind CSS 4 via `@tailwindcss/vite`.
- Framer Motion pour les transitions et animations.
- D3 Geo, TopoJSON et World Atlas pour la carte.
- Lucide React et les icônes locales pour les contrôles.

## Gestion du contenu

Les informations éditoriales sont volontairement centralisées :

- **Restaurant, adresse, horaires, téléphone, navigation et commande** : `src/data/site.ts`.
- **Produits, catégories, prix, photos et destinations** : `src/data/products.ts`.
- **Photos du site** : `image-sandwich/` et `logo/`.
- **Vidéo promotionnelle** : `video-promo/`.

Pour modifier une information commerciale, privilégier ces fichiers de données plutôt que les composants de page. Les prix sont formatés en euros avec la locale française. Une image de produit peut être absente (`image: null`) : l'interface prévoit un visuel de remplacement.

### Commande en ligne

L'URL de commande se trouve dans `ORDER_URL` dans `src/data/site.ts`. Le composant `OrderContext` adapte automatiquement le contenu de la modale :

- URL renseignée : boutons vers la plateforme de commande.
- URL vide : invitation à commander par téléphone.

Ne pas ajouter d'URL de plateforme sans la valider avec le restaurant.

## Charte graphique

### Positionnement

Une identité de **street-food premium**, sombre et éditoriale, qui associe la précision d'un menu de restaurant à l'imaginaire du voyage. Le rouge sert de signal d'action ; il ne doit pas envahir les surfaces de lecture.

### Palette

| Token | Valeur | Usage |
| --- | --- | --- |
| `coal` | `#121212` | Fond principal et contraste fort. |
| `soot` | `#1B1B1B` | Panneaux, modales et surfaces secondaires. |
| `graphite` | `#292929` | Cartes, bordures et éléments intermédiaires. |
| `line` | `#424242` | Filets et séparateurs. |
| `cream` | `#FFFFFF` | Titres et texte principal. |
| `sand` | `#E3E3E3` | Texte secondaire clair et détails. |
| `muted` | `#A2A2A2` | Informations discrètes et légendes. |
| `ember` | `#E30613` | Actions, liens actifs, focus et marqueurs. |
| `ember-dark` | `#A90410` | État hover ou accent rouge assombri. |

Les tokens sont définis dans `@theme` au début de `src/index.css`. Utiliser les tokens Tailwind existants avant d'introduire une nouvelle couleur.

### Typographie

- **Titres et labels de marque** : `Bebas Neue`, avec fallback `Oswald` puis `Arial Narrow`.
- **Texte courant** : `Manrope`, avec fallback `Segoe UI`.
- Les titres sont courts, condensés, souvent en capitales et avec un tracking marqué.
- Le texte courant doit rester lisible, aéré et hiérarchisé.

### Principes d'interface

- Fond charbon, surfaces sobres et bordures fines.
- Rouge réservé aux actions, liens actifs, états de focus et repères importants.
- Photos culinaires utilisées comme preuves du produit, avec cadrage franc et contrasté.
- Motifs de grille, grain filmique, filets et grands lettrages en filigrane pour enrichir l'atmosphère.
- Animations courtes et signifiantes : révélation, déplacement doux, tracé de carte et marquee.
- Toujours conserver une alternative lisible lorsque les animations sont réduites.
- Les contrôles doivent rester accessibles au clavier avec un focus visible rouge.

## Routes

| URL | Page |
| --- | --- |
| `/` | Accueil |
| `/menu` | Carte complète et catégories |
| `/notre-histoire` | Histoire du restaurant |
| `/restaurant` | Présentation du lieu |
| `/contact` | Coordonnées, horaires et accès |
| `/mentions-legales` | Mentions légales |

Le routage utilise `HashRouter` : les URLs sont compatibles avec un hébergement statique sans configuration serveur spécifique. Netlify conserve également une redirection de secours vers `index.html`.

## Déploiement

Le déploiement Netlify est décrit dans `netlify.toml` :

- commande de build : `npm run build` ;
- dossier publié : `dist` ;
- version Node : `20` ;
- redirection `/*` vers `/index.html` pour les routes de l'application.

Avant une mise en production :

```bash
npm run typecheck
npm run build
```

## Bonnes pratiques

- Garder les données métier dans `src/data/`.
- Conserver les noms de produits et les coordonnées cohérents entre les pages, la carte et les liens externes.
- Vérifier les horaires, le téléphone, l'adresse et l'URL de commande avant chaque publication.
- Optimiser les nouveaux médias et éviter les fichiers inutilement lourds.
- Tester les parcours principaux sur mobile et desktop.
- Vérifier le clavier, les libellés ARIA, les contrastes et le comportement avec la réduction des animations.
