import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform, useInView } from "framer-motion";
import {
  SAINT_DENIS_RESTAURANT as RESTAURANT,
  ORDER_URL,
  GOOGLE_REVIEWS_URL,
  SITE_URL,
} from "../data/site";
import { IMAGES } from "../data/site";
import {
  Counter, Kicker, MaskLines, OrderButton, ProductImage, Reveal,
  SectionMark, WordsReveal,
} from "../components/ui";
import {
  IconArrowRight, IconBag, IconClock, IconFlame, IconPhone, IconPin, IconPlane, IconScooter,
} from "../components/Icons";
import { featured, formatPrice, getProduct } from "../data/products";

const MARQUEE = [
  "Fait maison", "Saint-Denis", "Livraison & retrait", "Saveurs du monde",
  "Recettes généreuses", "Commande en ligne",
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative flex h-svh min-h-[420px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] flex-col overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <div className="animate-kenburns motion-reduce:animate-none absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Sandwich généreux du Monde du Goût à Saint-Denis, fromage fondant, lumières urbaines en arrière-plan"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            fetchPriority="high"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/72 to-coal/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/55" />

      <p
        aria-hidden
        className="absolute bottom-16 sm:bottom-24 right-3 sm:right-6 hidden text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.34em] text-sand/50 [writing-mode:vertical-rl] lg:block"
      >
        48.9362° N — 2.3574° E · Saint-Denis, France
      </p>

      <div className="absolute bottom-12 sm:bottom-16 right-3 sm:right-6 z-30 hidden lg:block">
        <Reveal delay={0.15}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 rounded-lg bg-white/95 px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
            aria-label={`Voir les avis Google : ${RESTAURANT.googleRating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} sur 5, ${RESTAURANT.googleReviewCount} avis`}
          >
            <span className="text-lg sm:text-xl text-amber-500" aria-hidden="true">★</span>
            <div className="text-left">
              <p className="font-bold text-coal text-sm sm:text-base">{RESTAURANT.googleRating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5</p>
              <p className="text-[10px] sm:text-xs text-gray-600">{RESTAURANT.googleReviewCount} avis Google</p>
            </div>
          </a>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-3 sm:px-4 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <h1 className="font-display leading-[0.88] tracking-wide text-cream">
          <MaskLines
            className="block text-[clamp(2rem,9vw,8rem)] sm:text-[clamp(2.2rem,10vw,9rem)] md:text-[clamp(2.5rem,12vw,10.5rem)]"
            startDelay={0.25}
            lines={[
              <>LE MONDE DU GOÛT</>,
              <>SAINT-DENIS</>,
            ]}
          />
        </h1>
        <Reveal delay={0.85}>
          <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-sand sm:mt-3 lg:text-base">
            Sandwichs signatures & cuisine du monde à Saint-Denis (93).
          </p>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-3.5 flex flex-wrap items-center gap-2.5 sm:gap-3 sm:mt-5">
            <a
              href={ORDER_URL || RESTAURANT.phoneHref}
              target={ORDER_URL ? "_blank" : undefined}
              rel={ORDER_URL ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 sm:gap-3 bg-ember px-5 sm:px-6 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-coal transition-all duration-300 hover:bg-ember-dark min-h-10 sm:min-h-11"
            >
              COMMANDER
              <IconArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 border border-cream/35 px-4 py-2.5 sm:px-6 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-cream transition-all duration-300 hover:border-ember hover:bg-ember hover:text-coal"
            >
              VOIR LA CARTE
              <IconArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={1.15}>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.24em] text-sand/70">
            <span className="flex items-center gap-1"><IconScooter className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-ember" /> Livraison</span>
            <span className="flex items-center gap-1"><IconBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-ember" /> Retrait</span>
            <span className="flex items-center gap-1"><IconFlame className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-ember" /> Fait maison</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoStrip() {
  return (
    <section className="border-b border-graphite bg-soot" aria-label="Informations pratiques">
      <div className="mx-auto grid max-w-7xl divide-y divide-graphite px-4 sm:px-6 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-8">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-4 transition-colors hover:text-ember md:px-6 md:py-5 md:first:pl-0"
          aria-label={`Voir les avis Google du Monde du Goût Saint-Denis, note ${RESTAURANT.googleRating} sur 5 et ${RESTAURANT.googleReviewCount} avis`}
        >
          <span className="font-display text-xl tracking-wide text-ember" aria-hidden="true">★</span>
          <div>
            <p className="font-display text-lg leading-none text-cream">AVIS GOOGLE</p>
            <p className="mt-1 text-xs text-muted">{RESTAURANT.googleRating}/5 · {RESTAURANT.googleReviewCount} avis</p>
          </div>
        </a>
        <div className="flex items-center gap-3 py-4 md:px-6 md:py-5 md:first:pl-0">
          <IconScooter className="h-5 w-5 shrink-0 text-ember" />
          <div>
            <p className="font-display text-lg leading-none text-cream">LIVRAISON</p>
            <p className="mt-1 text-xs text-muted">Saint-Denis (93)</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4 md:px-6 md:py-5">
          <IconFlame className="h-5 w-5 shrink-0 text-ember" />
          <div>
            <p className="font-display text-lg leading-none text-cream">FAIT MAISON</p>
            <p className="mt-1 text-xs text-muted">Sandwichs et frites préparés sur place</p>
          </div>
        </div>
        <a href={RESTAURANT.phoneHref} className="flex items-center gap-3 py-4 transition-colors hover:text-ember md:px-6 md:py-5 md:last:pr-0">
          <IconPhone className="h-5 w-5 shrink-0 text-ember" />
          <div>
            <p className="font-display text-lg leading-none text-cream">OUVERT 7J/7</p>
            <p className="mt-1 text-xs text-muted">{RESTAURANT.hoursShort} · {RESTAURANT.phoneDisplay}</p>
          </div>
        </a>
      </div>
    </section>
  );
}

function LocationCard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
      <SectionMark n="01" label="Notre restaurant" right="Saint-Denis — 93" />
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div className="border border-graphite bg-soot p-6 sm:p-8">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-ember">Adresse</p>
            <address className="mt-3 font-display text-2xl sm:text-3xl not-italic leading-[1.02] tracking-wide text-cream">
              {RESTAURANT.address.street}
              <br />
              <span className="text-ember">{RESTAURANT.address.zipCity}</span>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={RESTAURANT.mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 sm:gap-3 bg-ember px-5 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.12em] text-coal transition-all hover:bg-ember-dark"
              >
                ITINÉRAIRE
                <IconArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={RESTAURANT.phoneHref}
                className="group inline-flex items-center gap-2 sm:gap-3 border border-sand/40 px-5 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.12em] text-cream transition-all hover:border-ember hover:text-ember"
              >
                <IconPhone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                APPELER
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="border border-graphite bg-soot p-5 sm:p-6">
              <IconClock className="h-7 w-7 text-ember" />
              <h2 className="mt-3 font-display text-lg tracking-wide">HORAIRES</h2>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-sand">Tous les jours</p>
              <p className="font-display text-xl sm:text-2xl text-cream">11h30 – 5h00</p>
            </div>
            <div className="border border-graphite bg-soot p-5 sm:p-6">
              <IconPhone className="h-7 w-7 text-ember" />
              <h2 className="mt-3 font-display text-lg tracking-wide">TÉLÉPHONE</h2>
              <a
                href={RESTAURANT.phoneHref}
                className="mt-1.5 block font-display text-xl sm:text-2xl text-cream transition-colors hover:text-ember"
              >
                {RESTAURANT.phoneDisplay}
              </a>
              <p className="mt-1 text-xs text-muted">Commande, réservation.</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <article className="h-full border border-ember/60 bg-soot p-6">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Notre restaurant Bobigny</p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl tracking-wide">SAINT-DENIS</h3>
            <address className="mt-2 text-xs sm:text-sm not-italic leading-relaxed text-sand">
              {RESTAURANT.address.street}<br />{RESTAURANT.address.zipCity}
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={RESTAURANT.mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ember px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-coal hover:bg-ember-dark"
              >
                ITINÉRAIRE
              </a>
              <a
                href={ORDER_URL || RESTAURANT.phoneHref}
                target={ORDER_URL ? "_blank" : undefined}
                rel={ORDER_URL ? "noopener noreferrer" : undefined}
                className="border border-sand/40 px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-cream hover:border-ember hover:text-ember"
              >
                COMMANDER
              </a>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="h-full border border-graphite bg-soot p-6">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Deuxième adresse</p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl tracking-wide">BOBIGNY</h3>
            <address className="mt-2 text-xs sm:text-sm not-italic leading-relaxed text-sand">
              4 Avenue Louis Aragon<br />93000 Bobigny
            </address>
            <p className="mt-2 text-xs text-muted">11h00 — 2h00 · 7j/7</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/restaurant"
                className="bg-ember px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-coal hover:bg-ember-dark"
              >
                BOBIGNY
              </Link>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=4%20Avenue%20Louis%20Aragon%2C%2093000%20Bobigny"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-sand/40 px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-cream hover:border-ember hover:text-ember"
              >
                ITINÉRAIRE
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Signatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
      <SectionMark n="02" label="Les signatures" right="Saint-Denis" />
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4 sm:gap-6">
        <h2 className="font-display text-[clamp(2rem,7vw,5.5rem)] leading-[0.92] tracking-wide">
          <WordsReveal text="LES" /> <span className="text-ember"><WordsReveal text="INCONTOURNABLES." baseDelay={0.1} /></span>
        </h2>
        <Reveal delay={0.2}>
          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-muted">Nos recettes phares à Saint-Denis.</p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <article className="group h-full overflow-hidden border border-graphite bg-soot transition-colors duration-500 hover:border-ember/70">
            <div className="relative overflow-hidden aspect-[4/3]">
              <ProductImage
                product={featured[0]}
                className="aspect-[4/3]"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute left-3 top-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-cream">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 bg-ember" /> N°01
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-xl tracking-wide text-cream transition-colors duration-300 group-hover:text-ember sm:text-2xl lg:text-3xl">
                  {featured[0].name.toUpperCase()}
                </h3>
                <span className="leader hidden sm:block" />
                <span className="font-display text-lg text-ember sm:text-xl lg:text-2xl">{formatPrice(featured[0].price)}</span>
              </div>
              {featured[0].short && <p className="mt-2 text-xs leading-relaxed text-muted">{featured[0].short}</p>}
              <div className="mt-4">
                <a
                  href={ORDER_URL || "#"}
                  target={ORDER_URL ? "_blank" : undefined}
                  rel={ORDER_URL ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 bg-ember px-4 py-2 font-display text-xs tracking-[0.14em] text-coal hover:bg-ember-dark"
                >
                  COMMANDER
                </a>
              </div>
            </div>
          </article>
        </Reveal>
        <div className="flex flex-col divide-y divide-graphite border-y border-graphite md:col-span-5">
          {featured.slice(1).map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <article className="group bg-soot/50 transition-colors duration-300 hover:bg-soot">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-28 sm:w-28">
                    <ProductImage
                      product={p}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <span className="absolute left-1.5 top-1.5 text-[8px] font-bold tracking-[0.16em] text-cream sm:text-[9px]">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2 sm:gap-3">
                      <h3 className="truncate font-display text-lg tracking-wide text-cream transition-colors group-hover:text-ember sm:text-2xl">
                        {p.name.toUpperCase()}
                      </h3>
                      <span className="shrink-0 font-display text-base text-ember sm:text-xl">{formatPrice(p.price)}</span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[10px] sm:text-xs leading-relaxed text-muted">{p.short}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 sm:gap-6 border-t border-graphite pt-6 sm:pt-8">
        <p className="font-display text-lg sm:text-xl tracking-wide text-sand">
          19 RECETTES AU TOTAL — <span className="text-ember">TOUTES FAITES MAISON.</span>
        </p>
        <Link
          to="/menu"
          className="group inline-flex items-center gap-2 sm:gap-3 border border-sand/40 px-5 py-2.5 sm:px-7 sm:py-3.5 font-display text-xs sm:text-sm tracking-[0.14em] text-cream transition-all hover:border-ember hover:bg-ember hover:text-coal"
        >
          VOIR TOUTE LA CARTE
          <IconArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-graphite bg-soot">
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="flex items-center justify-center gap-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.28em] text-sand/90">
            <IconPlane className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" /> Embarquement immédiat
          </p>
        </Reveal>
        <h2 className="mt-2 sm:mt-3 font-display leading-[0.88] tracking-wide text-cream">
          <MaskLines
            className="block text-[clamp(1.8rem,8vw,6rem)] sm:text-[clamp(2.4rem,9vw,7rem)]"
            lines={[<>PRÊT À</>, <><span className="text-ember">COMMANDER ?</span></>]}
          />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-3 sm:mt-4 max-w-md text-xs leading-relaxed text-sand">
            Commandez en ligne ou par téléphone. Livraison à domicile dans le secteur de Saint-Denis.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-4 sm:mt-6 flex justify-center gap-3">
            <a
              href={ORDER_URL || RESTAURANT.phoneHref}
              target={ORDER_URL ? "_blank" : undefined}
              rel={ORDER_URL ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 sm:gap-3 bg-ember px-6 py-3 sm:py-4 font-display text-sm sm:text-base tracking-[0.14em] text-coal transition-all hover:bg-ember-dark"
            >
              COMMANDER MAINTENANT
              <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href={RESTAURANT.phoneHref}
              className="group inline-flex items-center gap-2.5 sm:gap-3 border border-sand/40 px-6 py-3 sm:py-4 font-display text-sm sm:text-base tracking-[0.14em] text-cream transition-all hover:border-ember hover:text-ember"
            >
              <IconPhone className="h-4 w-4 sm:h-5 sm:w-5" /> APPELER
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-3 sm:mt-4 text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-muted">
            {RESTAURANT.address.street} · {RESTAURANT.address.zipCity} — {RESTAURANT.hoursLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function SaintDenisPage() {
  useEffect(() => {
    document.title = "Le Monde du Goût – Restaurant à Saint-Denis | Sandwichs & Cuisine du Monde";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Restaurant Le Monde du Goût à Saint-Denis (93200). Sandwichs signatures inspirés des cuisines du monde, faits maison. Livraison et retrait sur place. Ouvert 7j/7 de 11h30 à 5h00.");
    }
  }, []);

  // Structured data for Saint-Denis restaurant
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": RESTAURANT.name,
    "image": `${SITE_URL}${IMAGES.hero}`,
    "url": `${SITE_URL}/saint-denis`,
    "telephone": RESTAURANT.phoneDisplay.replace(/\s/g, ""),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": RESTAURANT.address.street,
      "addressLocality": "Saint-Denis",
      "postalCode": "93200",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": RESTAURANT.coordinates.lat,
      "longitude": RESTAURANT.coordinates.lng
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": RESTAURANT.hoursStructured.opens,
      "closes": RESTAURANT.hoursStructured.closes
    },
    "servesCuisine": "Street food, Sandwichs, Cuisine du monde",
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": RESTAURANT.googleRating.toString(),
      "reviewCount": RESTAURANT.googleReviewCount.toString()
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <InfoStrip />
      <LocationCard />
      <Signatures />
      <FinalCTA />
    </>
  );
}
