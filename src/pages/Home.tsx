import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { DESTINATIONS, featured, formatPrice, getProduct, inspirationOf } from "../data/products";
import { IMAGES, RESTAURANT, SITE_URL } from "../data/site";
import {
  Counter, Kicker, MaskLines, OrderButton, ProductImage, Reveal,
  SectionMark, usePageMeta, WordsReveal,
} from "../components/ui";
import {
  IconArrowRight, IconBag, IconFlame, IconGlobe, IconPlane, IconScooter,
} from "../components/Icons";
import atelierVideo from "../../video-promo/Alors  Team bœuf ou team poulet  🍗🥩📍 Saint-Denis45 Rue de la Boulangerie, 93200 Saint-Denis📞.mp4";

const WorldMap = lazy(() => import("../components/WorldMap"));

/* Carte montée immédiatement (chunk dédié, code-splitting conservé).
   Aucun gating IntersectionObserver : le rendu est déterministe. */
function MapGate() {
  return (
    <Suspense
      fallback={
        <div className="dot-grid flex aspect-[1000/620] w-full items-center justify-center border border-graphite bg-coal lg:aspect-[1000/520]">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sand/60">
            Préparation de la carte…
          </p>
        </div>
      }
    >
      <WorldMap />
    </Suspense>
  );
}

const MARQUEE = [
  "Fait maison", "Saint-Denis", "Livraison & retrait", "Saveurs du monde",
  "Recettes généreuses", "Commande en ligne",
];

function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-graphite bg-soot py-4" aria-hidden>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center">
            {MARQUEE.map((t) => (
              <span key={`${n}-${t}`} className="flex items-center gap-6 pr-6 font-display text-xl tracking-[0.2em] text-sand/80">
                {t.toUpperCase()}
                <IconGlobe className="h-4 w-4 text-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative flex h-svh min-h-[620px] flex-col overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <div className="animate-kenburns motion-reduce:animate-none absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Sandwich généreux du Monde du Goût, fromage fondant, lumières urbaines en arrière-plan"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/72 to-coal/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/55" />

      {/* coordonnées — micro-détail */}
      <p
        aria-hidden
        className="absolute bottom-32 right-6 hidden text-[10px] font-bold uppercase tracking-[0.34em] text-sand/50 [writing-mode:vertical-rl] lg:block"
      >
        48.9362° N — 2.3574° E · Saint-Denis, France
      </p>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-36 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <Reveal delay={0.15}>
          <Kicker>Street-food internationale · Saint-Denis (93)</Kicker>
        </Reveal>
        <h1 className="mt-6 font-display leading-[0.88] tracking-wide text-cream">
          <MaskLines
            className="block text-[clamp(2.35rem,11vw,10.5rem)]"
            startDelay={0.25}
            lines={[
              <>LE GOÛT</>,
              <>COMME GUIDE.</>,
            ]}
          />
          <MaskLines
            className="mt-3 block text-[clamp(2.35rem,11vw,10.5rem)] sm:mt-4"
            startDelay={0.55}
            lines={[
              <>LE MONDE</>,
              <>COMME <span className="text-ember">DESTINATION.</span></>,
            ]}
          />
        </h1>
        <Reveal delay={0.85}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
            Des sandwichs inspirés des cuisines du monde, préparés avec passion à Saint-Denis.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <OrderButton size="lg">COMMANDER</OrderButton>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 border border-cream/35 px-8 py-4 font-display text-base tracking-[0.14em] text-cream transition-all duration-300 hover:border-ember hover:bg-ember hover:text-coal"
            >
              DÉCOUVRIR LE MENU
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={1.15}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-bold uppercase tracking-[0.24em] text-sand/70">
            <span className="flex items-center gap-2"><IconScooter className="h-4 w-4 text-ember" /> Livraison</span>
            <span className="flex items-center gap-2"><IconBag className="h-4 w-4 text-ember" /> Retrait sur place</span>
            <span className="flex items-center gap-2"><IconFlame className="h-4 w-4 text-ember" /> Fait maison</span>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sand/70">
        <span>Scroll pour voyager</span>
        <span className="relative block h-8 w-px overflow-hidden bg-sand/25">
          <span className="absolute left-0 top-0 h-3 w-px animate-drop bg-ember motion-reduce:animate-none" />
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
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-graphite pt-8">
              <div>
                <p className="font-display text-5xl text-ember"><Counter to={19} /></p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Recettes signatures</p>
              </div>
              <div>
                <p className="font-display text-5xl text-ember"><Counter to={DESTINATIONS.length} /></p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Inspirations</p>
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
  return (
    <section className="border-y border-graphite bg-soot/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionMark n="02" label="La carte du monde" right="Projection Natural Earth" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-wide">
            <WordsReveal text="VOTRE PROCHAINE" />
            <br />
            <span className="text-ember"><WordsReveal text="DESTINATION ?" baseDelay={0.12} /></span>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Une bouchée, une destination. Survolez un pays — ou choisissez une escale — pour découvrir la recette
              qu'il nous a inspirée.
            </p>
          </Reveal>
        </div>
        <div className="mt-12">
          <MapGate />
        </div>
      </div>
    </section>
  );
}

/* ——— Signatures : grille éditoriale asymétrique ——— */
const SIG_SPANS = [
  "md:col-span-7",
  "md:col-span-5 md:mt-28",
  "md:col-span-5 md:mt-10",
  "md:col-span-7",
  "md:col-span-6 md:mt-20",
  "md:col-span-6 md:mt-6",
];

function Signatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
      <SectionMark n="03" label="Les signatures" right="06 recettes" />
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] tracking-wide">
          <WordsReveal text="LES" /> <span className="text-ember"><WordsReveal text="INCONTOURNABLES." baseDelay={0.1} /></span>
        </h2>
        <Reveal delay={0.2}>
          <p className="max-w-xs text-sm leading-relaxed text-muted">Les recettes à découvrir sans hésiter.</p>
        </Reveal>
      </div>

      {/* mobile / tablette : swipe */}
      <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:hidden">
        {featured.map((p, i) => (
          <article key={p.id} className="w-[78vw] max-w-[340px] shrink-0 snap-start border border-graphite bg-soot">
            <SignatureInner p={p} i={i} alwaysCta />
          </article>
        ))}
      </div>

      {/* desktop : grille éditoriale */}
      <div className="mt-12 hidden grid-cols-12 gap-x-8 gap-y-14 md:grid">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.1} className={SIG_SPANS[i]}>
            <article className="group border border-graphite bg-soot transition-all duration-500 hover:-translate-y-2 hover:border-ember/70">
              <SignatureInner p={p} i={i} />
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-graphite pt-8">
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
      </Reveal>
    </section>
  );
}

function SignatureInner({ p, i, alwaysCta }: { p: (typeof featured)[number]; i: number; alwaysCta?: boolean }) {
  const dest = inspirationOf(p.id);
  return (
    <>
      <div className="relative overflow-hidden">
        <ProductImage
          product={p}
          className="aspect-[16/11]"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 bg-coal/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sand backdrop-blur-sm">
          N°{String(i + 1).padStart(2, "0")}
        </span>
        {dest && (
          <span className="absolute bottom-3 right-4 font-display text-sm tracking-[0.18em] text-cream/85">
            ◆ {dest.country.toUpperCase()}
          </span>
        )}
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-3xl tracking-wide text-cream transition-colors duration-300 group-hover:text-ember sm:text-4xl">
            {p.name.toUpperCase()}
          </h3>
          <span className="leader" />
          <span className="font-display text-2xl text-ember sm:text-3xl">{formatPrice(p.price)}</span>
        </div>
        {p.short && <p className="mt-3 text-sm leading-relaxed text-muted">{p.short}</p>}
        <div
          className={`mt-5 transition-all duration-500 ${
            alwaysCta ? "" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          }`}
        >
          <OrderButton size="sm">COMMANDER</OrderButton>
        </div>
      </div>
    </>
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
        <SectionMark n="04" label="L'atelier" right="Rue de la Boulangerie" />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* image sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <figure className="relative overflow-hidden border border-graphite">
                <div className="animate-kenburns motion-reduce:animate-none">
                    <video
                      src={atelierVideo}
                      poster={IMAGES.atelier}
                      aria-label="L'atelier du Monde du Goût : équipe bœuf ou poulet à Saint-Denis"
                      className="aspect-[4/5] w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      controls
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
      <SectionMark n="05" label="Livraison & retrait" right="Saint-Denis (93)" />
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
              <OrderButton variant="outline">COMMANDER EN LIVRAISON</OrderButton>
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
        className="text-stroke pointer-events-none absolute left-1/2 top-6 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[16vw] leading-none opacity-50"
      >
        BON VOYAGE
      </p>
      <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-40">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-ember">
            <IconPlane className="h-5 w-5" /> Embarquement immédiat
          </p>
        </Reveal>
        <h2 className="mt-6 font-display leading-[0.88] tracking-wide text-cream">
          <MaskLines
            className="block text-[clamp(3.4rem,11vw,9rem)]"
            lines={[<>PRÊT À</>, <><span className="text-ember">VOYAGER ?</span></>]}
          />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-sand">
            Choisissez votre destination. Choisissez votre sandwich. Et laissez le goût faire le reste.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex justify-center">
            <OrderButton size="lg">COMMANDER MAINTENANT</OrderButton>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
            {RESTAURANT.address.street} · {RESTAURANT.address.zipCity} — {RESTAURANT.hoursLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    "Le Monde du Goût — Sandwichs inspirés des cuisines du monde à Saint-Denis",
    "Restaurant de street-food à Saint-Denis (93) : sandwichs inspirés des cuisines du monde, faits maison. Livraison et retrait sur place. Commandez en ligne."
  );

  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <MapSection />
      <Signatures />
      <FaitMaison />
      <Travel />
      <FinalCta />
    </>
  );
}
