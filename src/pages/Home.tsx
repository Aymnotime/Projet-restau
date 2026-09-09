import { lazy, Suspense, useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform, useInView } from "framer-motion";
import { DESTINATIONS, featured, formatPrice, getProduct, inspirationOf } from "../data/products";
import { GOOGLE_REVIEWS_FALLBACK, GOOGLE_REVIEWS_URL, IMAGES, RESTAURANT, SITE_URL } from "../data/site";
import {
  Counter, Kicker, MaskLines, OrderButton, ProductImage, Reveal,
  SectionMark, usePageMeta, WordsReveal,
} from "../components/ui";
import {
  IconArrowRight, IconBag, IconFlame, IconGlobe, IconPhone, IconPlane, IconScooter,
} from "../components/Icons";
import WorldMap from "../components/WorldMap";
import atelierVideo from "../../video-promo/Alors  Team bœuf ou team poulet  🍗🥩📍 Saint-Denis45 Rue de la Boulangerie, 93200 Saint-Denis📞.mp4";
import chinatownVideo from "../../video-promo/TU CONNAIS NOTRE CHINATOWN  🇨🇳🥙 📍 Saint-Denis45 Rue de la Boulangerie, 93200 Saint-Denis📞 0.mp4";
import bigRicainPoster from "../../video-promo/Le Big Ricain.png";
const MobileGlobe = lazy(() => import("../components/MobileGlobe"));

/* Carte importée statiquement : le code + les données Natural Earth
   voyagent dans le bundle principal, garantissant un rendu déterministe
   (aucun chunk séparé, aucun Suspense, aucun observateur). */

const MARQUEE = [
  "Fait maison", "Saint-Denis", "Livraison & retrait", "Saveurs du monde",
  "Recettes généreuses", "Commande en ligne",
];

function MapGate() {
  return (
    <>
      <div className="md:hidden">
        <Suspense fallback={<div className="mobile-globe-real" aria-hidden="true" />}>
          <MobileGlobe />
        </Suspense>
      </div>
      <div className="hidden md:block">
        <WorldMap />
      </div>
    </>
  );
}

function LazyVideo({ src, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const containerRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = containerRef.current;
    if (!video || ready) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ready]);

  return <video ref={containerRef} {...props} src={ready ? src : undefined} preload={ready ? "metadata" : "none"} />;
}

const LOGOS = [
  { name: "Uber Eats", src: "/logos/ubereats.svg" },
  { name: "Deliveroo", src: "/logos/deliveroo.svg" },
  { name: "DoorDash", src: "/logos/doordash.svg" },
];

function LogoMarquee() {
  return (
    <div className="absolute bottom-6 right-6 z-20 hidden lg:flex items-center gap-4 overflow-hidden">
      <div className="flex items-center gap-4 animate-marquee-slow motion-reduce:animate-none">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center gap-4">
            {LOGOS.map((logo) => (
              <img
                key={`${n}-${logo.name}`}
                src={logo.src}
                alt={`Logo ${logo.name}`}
                className="h-8 w-auto opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessStrip() {
  const [reviews, setReviews] = useState(GOOGLE_REVIEWS_FALLBACK);

  useEffect(() => {
    let active = true;
    fetch("/api/google-rating")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { rating?: number; count?: number } | null) => {
        if (active && data?.rating && data.count) setReviews({ rating: data.rating, count: data.count });
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const rating = reviews.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <section className="border-b border-graphite bg-soot" aria-label="Informations pratiques">
      <div className="mx-auto grid max-w-7xl divide-y divide-graphite px-4 sm:px-6 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-8">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-4 transition-colors hover:text-ember md:px-6 md:py-5 md:first:pl-0"
          aria-label={`Voir les avis Google du Monde du Goût, note ${rating} sur 5 et ${reviews.count} avis`}
        >
          <span className="font-display text-xl tracking-wide text-ember" aria-hidden="true">★</span>
          <div>
            <p className="font-display text-lg leading-none text-cream">AVIS GOOGLE</p>
            <p className="mt-1 text-xs text-muted">{rating}/5 · {reviews.count} avis</p>
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

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative flex h-svh min-h-[480px] sm:min-h-[560px] md:min-h-[620px] flex-col overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <div className="animate-kenburns motion-reduce:animate-none absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Sandwich généreux du Monde du Goût, fromage fondant, lumières urbaines en arrière-plan"
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            fetchPriority="high"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/72 to-coal/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/55" />

      {/* coordonnées — micro-détail */}
      <p
        aria-hidden
        className="absolute bottom-24 sm:bottom-32 right-4 sm:right-6 hidden text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.34em] text-sand/50 [writing-mode:vertical-rl] lg:block"
      >
        48.9362° N — 2.3574° E · Saint-Denis, France
      </p>

      {/* Note Google en bas à droite - bien visible */}
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6 z-30 hidden lg:block">
        <Reveal delay={0.15}>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-lg bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
            aria-label={`Voir les avis Google : ${GOOGLE_REVIEWS_FALLBACK.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} sur 5, ${GOOGLE_REVIEWS_FALLBACK.count} avis`}
          >
            <span className="text-xl text-amber-500" aria-hidden="true">★</span>
            <div className="text-left">
              <p className="font-bold text-coal">{GOOGLE_REVIEWS_FALLBACK.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5</p>
              <p className="text-xs text-gray-600">{GOOGLE_REVIEWS_FALLBACK.count} avis Google</p>
            </div>
          </a>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-20 sm:pb-24 lg:pb-16">
        <h1 className="font-display leading-[0.88] tracking-wide text-cream">
          <MaskLines
            className="block text-[clamp(2.2rem,10vw,10.5rem)] sm:text-[clamp(2.5rem,12vw,10.5rem)]"
            startDelay={0.25}
            lines={[
              <>LE GOÛT</>,
              <>COMME GUIDE.</>,
            ]}
          />
          <MaskLines
            className="mt-2 block text-[clamp(2.2rem,10vw,10.5rem)] sm:mt-3 sm:text-[clamp(2.5rem,12vw,10.5rem)]"
            startDelay={0.55}
            lines={[
              <>LE MONDE</>,
              <>COMME <span className="text-ember">DESTINATION.</span></>,
            ]}
          />
        </h1>
        <Reveal delay={0.85}>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-sand sm:text-base sm:mt-4 lg:text-lg">
            Sandwichs signatures & cuisine du monde à Saint-Denis et Bobigny.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 sm:mt-6">
            <OrderButton size="lg">COMMANDER</OrderButton>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 sm:gap-3 border border-cream/35 px-6 py-3 sm:px-8 sm:py-4 font-display text-sm sm:text-base tracking-[0.14em] text-cream transition-all duration-300 hover:border-ember hover:bg-ember hover:text-coal"
            >
              VOIR LA CARTE
              <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={1.15}>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-sand/70">
            <span className="flex items-center gap-1.5 sm:gap-2"><IconScooter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ember" /> Livraison</span>
            <span className="flex items-center gap-1.5 sm:gap-2"><IconBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ember" /> Retrait sur place</span>
            <span className="flex items-center gap-1.5 sm:gap-2"><IconFlame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ember" /> Fait maison</span>
          </div>
        </Reveal>
      </div>

      {/* Logos partenaires en bas à droite */}
      <LogoMarquee />

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-sand/70">
        <span>Scroll pour voyager</span>
        <span className="relative block h-6 sm:h-8 w-px overflow-hidden bg-sand/25">
          <span className="absolute left-0 top-0 h-2.5 sm:h-3 w-px animate-drop bg-ember motion-reduce:animate-none" />
        </span>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
      <SectionMark n="01" label="Le concept" right="Saint-Denis — 93" />
      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <h2 className="font-display text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.9] tracking-wide lg:col-span-7">
          <WordsReveal text="UN RESTAURANT." />
          <br />
          <span className="text-ember">
            <WordsReveal text="DES SAVEURS" baseDelay={0.15} />
          </span>{" "}
          <WordsReveal text="DU MONDE." baseDelay={0.3} />
        </h2>
        <div className="lg:col-span-5 lg:pt-4">
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-sand">
              Situé à Saint-Denis, Le Monde du Goût vous invite à un voyage culinaire à travers les saveurs du monde.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 leading-relaxed text-muted">
              Nos sandwichs s'inspirent de différentes traditions culinaires pour proposer une expérience généreuse,
              originale et conviviale.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-5 font-display text-2xl tracking-wide text-cream">
              CHAQUE RECETTE EST PENSÉE COMME UNE NOUVELLE DESTINATION.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-graphite pt-8">
              <div>
                <p className="font-display text-5xl text-ember"><Counter to={19} /></p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Recettes signatures</p>
              </div>
              <div>
                <p className="font-display text-5xl text-ember"><Counter to={100} suffix=" %" /></p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Fait maison</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-y border-graphite bg-soot/60 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionMark n="04" label="La carte du monde" right="Saint-Denis & Bobigny" />
        <div className="mt-8 sm:mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2rem,6vw,5.5rem)] leading-[0.92] tracking-wide">
            <WordsReveal text="VOTRE PROCHAINE" />
            <br />
            <span className="text-ember"><WordsReveal text="DESTINATION ?" baseDelay={0.12} /></span>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted">
              Une bouchée, une destination. Survolez un pays — ou choisissez une escale — pour découvrir la recette
              qu'il nous a inspirée.
            </p>
          </Reveal>
        </div>
        <div className="mt-8 sm:mt-12 min-h-[320px] sm:min-h-[400px]">
          {isInView ? <MapGate /> : <div className="flex h-[320px] sm:h-[400px] items-center justify-center text-sm text-muted">Chargement de la carte...</div>}
        </div>
      </div>
    </section>
  );
}

function Chinatown() {
  return (
    <section className="border-y border-graphite bg-soot/60 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionMark n="03" label="Chinatown" right="Saint-Denis — 93" />
        <Reveal>
          <Kicker>Une escale à deux pas</Kicker>
          <h2 className="mt-3 sm:mt-5 max-w-[9ch] font-display text-[clamp(2rem,6vw,6rem)] leading-[0.9] tracking-wide">
            <WordsReveal text="TU CONNAIS NOTRE CHINATOWN ?" className="whitespace-nowrap" />
          </h2>
        </Reveal>
        <div className="mt-8 sm:mt-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5 lg:col-start-2">
            <figure className="relative overflow-hidden border border-graphite bg-coal">
              <LazyVideo
                src={chinatownVideo}
                poster={IMAGES.atelier}
                aria-label="Découvrir le Chinatown de Saint-Denis avec Le Monde du Goût"
                className="aspect-[9/16] max-h-[520px] sm:max-h-[600px] md:max-h-[680px] w-full object-cover"
                style={{ objectPosition: 'center 30%' }}
                autoPlay
                muted
                loop
                playsInline
              />
              <figcaption className="flex items-center justify-between border-t border-graphite px-4 py-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                <span>Saint-Denis</span>
                <span className="text-ember">45 rue de la Boulangerie</span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal delay={0.18}>
              <p className="mt-5 sm:mt-7 max-w-md text-base sm:text-lg leading-relaxed text-sand">
                Au cœur de Saint-Denis, notre quartier est une destination à lui tout seul. Passe nous voir et découvre
                l&apos;adresse où les saveurs du monde se retrouvent.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl tracking-wide text-cream">
                LE MONDE DU GOÛT, C&apos;EST ICI.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
      <SectionMark n="05" label="Les signatures" right="06 recettes" />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] tracking-wide">
          <WordsReveal text="LES" /> <span className="text-ember"><WordsReveal text="INCONTOURNABLES." baseDelay={0.1} /></span>
        </h2>
        <Reveal delay={0.2}>
          <p className="max-w-xs text-sm leading-relaxed text-muted">Les recettes à découvrir sans hésiter.</p>
        </Reveal>
      </div>

      <div className="mt-10 md:hidden">
        <article className="group overflow-hidden border border-graphite bg-soot">
          <SignatureInner p={featured[0]} i={0} featured />
        </article>
        <div className="mt-4 divide-y divide-graphite border-y border-graphite">
          {featured.slice(1).map((p, i) => (
            <article key={p.id} className="group bg-soot/50">
              <CompactSignatureNoButton p={p} i={i + 1} />
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 hidden gap-5 md:grid md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <article className="group h-full overflow-hidden border border-graphite bg-soot transition-colors duration-500 hover:border-ember/70">
            <SignatureInner p={featured[0]} i={0} featured />
          </article>
        </Reveal>
        <div className="flex flex-col divide-y divide-graphite border-y border-graphite md:col-span-5">
          {featured.slice(1).map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <article className="group bg-soot/50 transition-colors duration-300 hover:bg-soot">
                <CompactSignatureNoButton p={p} i={i + 1} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-graphite pt-8">
          <p className="font-display text-2xl tracking-wide text-sand">
            19 RECETTES AU TOTAL — <span className="text-ember">TOUTES FAITES MAISON.</span>
          </p>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-3 border border-sand/40 px-7 py-3.5 font-display text-sm tracking-[0.14em] text-cream transition-all hover:border-ember hover:bg-ember hover:text-coal"
          >
            VOIR TOUTE LA CARTE
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
    </section>
  );
}

function PosterSection() {
  return (
    <section className="border-y border-graphite bg-soot/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionMark n="02" label="L'affiche du moment" right="Le Big Ricain" />
        <Reveal delay={0.1}>
          <figure className="mt-10 overflow-hidden border border-graphite bg-coal">
            <img
              src={bigRicainPoster}
              alt="Affiche du Big Ricain, sandwich généreux aux steaks et au fromage"
              className="h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>
        <div className="mt-8 grid items-end gap-8 border-t border-graphite pt-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Kicker>La recette qui fait parler</Kicker>
            <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-wide">
              <WordsReveal text="LE BIG" />
              <br />
              <span className="text-ember"><WordsReveal text="RICAIN." baseDelay={0.1} /></span>
            </h2>
          </Reveal>
          <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-between lg:gap-8">
            <Reveal delay={0.16}>
              <p className="max-w-sm text-base leading-relaxed text-sand">
                Un sandwich généreux, des steaks grillés, du fromage fondant et tout ce qu&apos;il faut pour une vraie
                escale américaine.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-6 shrink-0 lg:mt-0">
                <OrderButton size="md">COMMANDER</OrderButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureInner({ p, i, featured: isFeatured = false }: { p: (typeof featured)[number]; i: number; featured?: boolean }) {
  const dest = inspirationOf(p.id);
  return (
    <>
      <div className="relative overflow-hidden">
        <ProductImage
          product={p}
          className={isFeatured ? "aspect-[4/3]" : "aspect-[16/11]"}
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-5 top-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cream">
          <span className="h-1.5 w-1.5 bg-ember" /> N°{String(i + 1).padStart(2, "0")}
        </span>
        {dest && (
          <span className="absolute bottom-4 right-5 font-display text-sm tracking-[0.18em] text-cream/85">
            ◆ {dest.country.toUpperCase()}
          </span>
        )}
      </div>
      <div className={isFeatured ? "p-6 sm:p-8" : "p-6 sm:p-7"}>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-3xl tracking-wide text-cream transition-colors duration-300 group-hover:text-ember sm:text-4xl">
            {p.name.toUpperCase()}
          </h3>
          <span className="leader hidden sm:block" />
          <span className="font-display text-2xl text-ember sm:text-3xl">{formatPrice(p.price)}</span>
        </div>
        {p.short && <p className="mt-3 text-sm leading-relaxed text-muted">{p.short}</p>}
        <div className="mt-5">
          <OrderButton size="sm">COMMANDER</OrderButton>
        </div>
      </div>
    </>
  );
}

function CompactSignature({ p, i }: { p: (typeof featured)[number]; i: number }) {
  const dest = inspirationOf(p.id);
  return (
    <div className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:h-28 sm:w-28">
        <ProductImage
          product={p}
          className="h-full w-full"
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <span className="absolute left-2 top-2 text-[9px] font-bold tracking-[0.16em] text-cream">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="truncate font-display text-2xl tracking-wide text-cream transition-colors group-hover:text-ember sm:text-3xl">
            {p.name.toUpperCase()}
          </h3>
          <span className="shrink-0 font-display text-xl text-ember">{formatPrice(p.price)}</span>
        </div>
        {dest && <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{dest.country}</p>}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{p.short}</p>
        <div className="mt-3">
          <OrderButton size="xs">COMMANDER</OrderButton>
        </div>
      </div>
    </div>
  );
}

function CompactSignatureNoButton({ p, i }: { p: (typeof featured)[number]; i: number }) {
  const dest = inspirationOf(p.id);
  return (
    <div className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:h-28 sm:w-28">
        <ProductImage
          product={p}
          className="h-full w-full"
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <span className="absolute left-2 top-2 text-[9px] font-bold tracking-[0.16em] text-cream">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="truncate font-display text-2xl tracking-wide text-cream transition-colors group-hover:text-ember sm:text-3xl">
            {p.name.toUpperCase()}
          </h3>
          <span className="shrink-0 font-display text-xl text-ember">{formatPrice(p.price)}</span>
        </div>
        {dest && <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{dest.country}</p>}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{p.short}</p>
      </div>
    </div>
  );
}

/* ——— Fait maison : colonne sticky ——— */
const ATELIER = [
  {
    t: "VIANDES PRÉPARÉES MAISON",
    d: "Steaks, marinades et escalopes panées préparés chaque jour dans notre cuisine.",
  },
  {
    t: "SAUCES MAISON",
    d: "Boursin, cocktail, nokoss, tartare… des sauces signées, jamais industrielles.",
  },
  {
    t: "FRITES MAISON",
    d: "Coupées et frites sur place, servies avec chacun de nos sandwichs.",
  },
  {
    t: "RECETTES GÉNÉREUSES",
    d: "Des garnitures pleines, du goût, et l'envie d'y revenir.",
  },
];

function FaitMaison() {
  return (
    <section className="border-y border-graphite bg-soot/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionMark n="06" label="L'atelier" right="Rue de la Boulangerie" />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* image sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <figure className="relative overflow-hidden border border-graphite">
                <div>
                  <LazyVideo
                    src={atelierVideo}
                    poster={IMAGES.atelier}
                    aria-label="L'atelier du Monde du Goût : équipe bœuf ou poulet à Saint-Denis"
                    className="aspect-[4/5] w-full object-cover"
                    style={{ objectPosition: 'center 25%' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-coal via-coal/70 to-transparent px-5 pb-4 pt-14 text-[10px] font-bold uppercase tracking-[0.26em] text-sand/80">
                  <span>L'atelier — fait maison</span>
                  <span className="text-ember">Saint-Denis</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* liste éditoriale */}
          <div>
            <h2 className="font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.94] tracking-wide">
              <WordsReveal text="ICI, ON FAIT" />
              <br />
              <WordsReveal text="LES CHOSES" baseDelay={0.12} />
              <br />
              <span className="text-ember"><WordsReveal text="MAISON." baseDelay={0.24} /></span>
            </h2>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
                Fait maison. Inspiré du monde. Du steak à la sauce, tout part de la cuisine du restaurant.
              </p>
            </Reveal>
            <div className="mt-10">
              {ATELIER.map((a, i) => (
                <Reveal key={a.t} delay={i * 0.08}>
                  <div className="group grid grid-cols-[auto_1fr] items-start gap-6 border-t border-graphite py-7 transition-colors hover:bg-cream/[0.02] sm:gap-8">
                    <span className="font-display text-4xl leading-none text-ember/70 transition-colors group-hover:text-ember sm:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-cream transition-transform duration-500 group-hover:translate-x-1.5 sm:text-3xl">
                        {a.t}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{a.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-graphite" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Travel() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
      <SectionMark n="07" label="Livraison & retrait" right="Saint-Denis (93)" />
      <div className="mt-10">
        <h2 className="font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.92] tracking-wide">
          <WordsReveal text="LE VOYAGE VIENT" /> <span className="text-ember"><WordsReveal text="À VOUS." baseDelay={0.12} /></span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <article className="group flex h-full flex-col justify-between overflow-hidden border border-graphite bg-soot p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/60 sm:p-10">
            <div>
              <div className="flex items-center justify-between">
                <IconScooter className="h-12 w-12 text-ember transition-transform duration-500 group-hover:translate-x-2" />
                <span className="font-display text-6xl text-cream/8 transition-colors duration-500 group-hover:text-ember/20">01</span>
              </div>
              <h3 className="mt-8 font-display text-4xl tracking-wide text-cream sm:text-5xl">LIVRAISON À DOMICILE</h3>
              <p className="mt-4 max-w-md leading-relaxed text-sand">
                Commandez en ligne et faites-vous livrer vos spécialités directement à votre porte.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Livraison à domicile uniquement dans le secteur de Saint-Denis (93).
              </p>
            </div>
            <div className="mt-10">
              <OrderButton variant="outline">COMMANDER SUR UBER EATS</OrderButton>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-5">
          <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-graphite bg-soot p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/60 sm:p-10">
            <div>
              <div className="flex items-center justify-between">
                <IconBag className="h-12 w-12 text-ember transition-transform duration-500 group-hover:-rotate-6" />
                <span className="font-display text-6xl text-cream/8 transition-colors duration-500 group-hover:text-ember/20">02</span>
              </div>
              <h3 className="mt-8 font-display text-4xl tracking-wide text-cream sm:text-5xl">RETRAIT SUR PLACE</h3>
              <p className="mt-4 leading-relaxed text-sand">
                Préparez votre commande en ligne et venez la récupérer directement au restaurant.
              </p>
            </div>
            <div className="mt-10">
              <OrderButton variant="outline">COMMANDER À EMPORTER</OrderButton>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-graphite bg-soot">
      <p
        aria-hidden
        className="text-stroke pointer-events-none absolute left-1/2 top-4 sm:top-6 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[14vw] sm:text-[16vw] leading-none opacity-80"
      >
        BON VOYAGE
      </p>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-40 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-sand/90">
            <IconPlane className="h-4 w-4 sm:h-5 sm:w-5" /> Embarquement immédiat
          </p>
        </Reveal>
        <h2 className="mt-4 sm:mt-6 font-display leading-[0.88] tracking-wide text-cream">
          <MaskLines
            className="block text-[clamp(2.5rem,9vw,9rem)] sm:text-[clamp(3.4rem,11vw,9rem)]"
            lines={[<>PRÊT À</>, <><span className="text-ember">VOYAGER ?</span></>]}
          />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 sm:mt-8 max-w-md text-sm sm:text-lg leading-relaxed text-sand">
            Choisissez votre destination. Choisissez votre sandwich. Et laissez le goût faire le reste.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-8 sm:mt-10 flex justify-center">
            <OrderButton size="lg">COMMANDER MAINTENANT</OrderButton>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-6 sm:mt-8 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
            {RESTAURANT.address.street} · {RESTAURANT.address.zipCity} — {RESTAURANT.hoursLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    "Le Monde du Goût — Sandwichs signatures & cuisine du monde à Saint-Denis et Bobigny",
    "Restaurant de street-food à Saint-Denis et Bobigny (93) : sandwichs signatures inspirés des cuisines du monde, faits maison. Livraison et retrait sur place. Commandez en ligne."
  );

  return (
    <>
      <Hero />
      <BusinessStrip />
      <Signatures />
      <Intro />
      <PosterSection />
      <MapSection />
      <Chinatown />
      <FaitMaison />
      <Travel />
      <FinalCta />
    </>
  );
}
