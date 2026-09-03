import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { featured, formatPrice, inspirationOf } from "../data/products";
import { IMAGES, MICROCOPY, RESTAURANT } from "../data/site";
import WorldMap from "../components/WorldMap";
import {
  Counter,
  Kicker,
  LinkArrow,
  Marquee,
  MaskLines,
  OrderButton,
  ProductImage,
  Reveal,
  usePageMeta,
  WordsReveal,
} from "../components/ui";
import {
  IconArrowDown,
  IconBag,
  IconCleaver,
  IconFlame,
  IconFries,
  IconSauce,
  IconScooter,
  IconStack,
} from "../components/Icons";

/* — Parallaxe légère, respectueuse de prefers-reduced-motion — */
function Parallax({ children, className = "", range = 36 }: { children: ReactNode; className?: string; range?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* — Carte signature — */
function SignatureCard({ id, delay }: { id: string; delay: number }) {
  const product = featured.find((p) => p.id === id)!;
  const dest = inspirationOf(product.id);
  return (
    <Reveal
      delay={delay}
      className="min-w-[82%] snap-center sm:min-w-[58%] md:min-w-0"
    >
      <article className="group flex h-full flex-col border border-graphite bg-soot transition-all duration-500 hover:-translate-y-2 hover:border-ember/60 hover:shadow-[0_24px_60px_-24px_rgba(232,93,4,0.35)]">
        <div className="relative overflow-hidden">
          <ProductImage
            product={product}
            className="aspect-[4/3]"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {dest && (
            <span className="absolute left-4 top-4 bg-coal/85 px-2.5 py-1 font-display text-xs tracking-[0.22em] text-ember backdrop-blur-sm">
              {dest.country.toUpperCase()}
            </span>
          )}
          <span className="absolute right-4 top-4 bg-ember px-2.5 py-1 font-display text-lg leading-none text-coal">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-3xl tracking-wide text-cream transition-colors group-hover:text-ember">
            {product.name.toUpperCase()}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-sand">{product.short}</p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Frites maison incluses</p>
            <OrderButton size="sm" className="md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100">
              COMMANDER
            </OrderButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const HOMEMADE = [
  {
    icon: IconCleaver,
    title: "Viandes préparées maison",
    text: "Steaks, poulet mariné, escalopes panées : travaillés chaque jour dans notre cuisine.",
  },
  {
    icon: IconSauce,
    title: "Sauces maison",
    text: "Sauce Boursin, tartare, Nokoss ou cocktail — préparées par nos soins.",
  },
  {
    icon: IconFries,
    title: "Frites maison",
    text: "Des frites fraîches, dorées à la commande, servies avec chaque sandwich.",
  },
  {
    icon: IconStack,
    title: "Recettes généreuses",
    text: "Des sandwichs pensés pour caler les vraies faims, sans compromis sur le goût.",
  },
];

export default function Home() {
  usePageMeta(
    "Le Monde du Goût — Sandwichs inspirés du monde à Saint-Denis (93)",
    "Street-food premium à Saint-Denis : sandwichs inspirés des cuisines du monde, fait maison, livraison et retrait sur place. 7j/7 de 11h30 à 5h00."
  );
  const reduce = useReducedMotion();

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-label="Le Monde du Goût">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Sandwich généreux du Monde du Goût, steaks maison et cheddar fondant"
            className="h-full w-full object-cover object-[62%_center] animate-kenburns motion-reduce:animate-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/72 to-coal/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/70" />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {["Saint-Denis (93)", "Fait maison", RESTAURANT.hoursShort].map((b) => (
              <motion.span
                key={b}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.9, duration: 0.6 }}
                className="border border-sand/25 bg-coal/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-sand backdrop-blur-sm"
              >
                {b}
              </motion.span>
            ))}
          </div>

          <h1 className="mt-6 font-display leading-[0.86] tracking-wide text-cream">
            <MaskLines
              className="block text-[clamp(2.75rem,13vw,10.5rem)]"
              startDelay={0.15}
              lines={[
                <>LE GOÛT</>,
                <>
                  COMME GUIDE<span className="text-ember">.</span>
                </>,
              ]}
            />
            <MaskLines
              className="mt-4 block text-[clamp(2.75rem,13vw,10.5rem)] sm:mt-6"
              startDelay={0.5}
              lines={[
                <>LE MONDE</>,
                <>
                  COMME DESTINATION<span className="text-ember">.</span>
                </>,
              ]}
            />
          </h1>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1.05, duration: 0.7 }}
            className="mt-6 max-w-md text-base leading-relaxed text-sand sm:text-lg"
          >
            Des sandwichs inspirés des cuisines du monde, préparés avec passion à Saint-Denis.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1.2, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <OrderButton size="lg">COMMANDER</OrderButton>
            <LinkArrow to="/menu">DÉCOUVRIR LE MENU</LinkArrow>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1.6, duration: 0.8 }}
          className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 pb-6 sm:px-6 lg:px-8"
          aria-hidden
        >
          <div className="hidden items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-sand/80 sm:flex">
            Scroll pour voyager
            <span className="relative flex h-10 w-[2px] overflow-hidden bg-sand/25">
              <span className="absolute h-4 w-full animate-drop bg-ember motion-reduce:animate-none" />
            </span>
            <IconArrowDown className="h-4 w-4 text-ember" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sand/50">
            {MICROCOPY[1]}
          </p>
        </motion.div>
      </section>

      <Marquee
        items={[
          "Le monde dans un sandwich",
          "Fait maison",
          "Saint-Denis (93)",
          "Livraison & retrait",
          "9 destinations, 19 recettes",
        ]}
      />

      {/* ═══════════ INTRO ÉDITORIALE ═══════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>Bienvenue à bord</Kicker>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-wide text-cream">
              <WordsReveal text="UN RESTAURANT." />
              <br />
              <WordsReveal text="DES SAVEURS" baseDelay={0.15} />
              <br />
              <span className="text-ember">
                <WordsReveal text="DU MONDE." baseDelay={0.3} />
              </span>
            </h2>
            <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-sand">
              <Reveal delay={0.1}>
                <p>
                  Situé à Saint-Denis, <strong className="text-cream">Le Monde du Goût</strong> vous invite à un voyage
                  culinaire à travers les saveurs du monde.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  Nos sandwichs s'inspirent de différentes traditions culinaires pour proposer une expérience
                  généreuse, originale et conviviale.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.26}>
              <p className="mt-8 border-l-2 border-ember pl-5 font-display text-2xl leading-snug tracking-wide text-cream sm:text-3xl">
                « CHAQUE RECETTE EST PENSÉE COMME UNE NOUVELLE DESTINATION. »
              </p>
            </Reveal>

            {/* compteurs */}
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {[
                { n: <Counter to={19} />, label: "recettes signature" },
                { n: <Counter to={9} />, label: "destinations inspirées" },
                { n: <Counter to={100} suffix=" %" />, label: "fait maison" },
              ].map((s, i) => (
                <Reveal key={i} delay={0.1 * i} className="border-l-2 border-graphite pl-4">
                  <p className="font-display text-5xl leading-none text-ember">{s.n}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Parallax className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border border-ember/50" aria-hidden />
              <div className="relative overflow-hidden">
                <img
                  src={IMAGES.intro}
                  alt="Sandwich au poulet mariné du Monde du Goût, cœur fondant"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-cream">
                  <IconFlame className="h-4 w-4 text-ember" /> Fait maison. Inspiré du monde.
                </p>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ═══════════ CARTE DU MONDE ═══════════ */}
      <section className="relative border-y border-graphite bg-soot/60 py-24 lg:py-32" id="destinations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
            <div>
              <Reveal>
                <Kicker>Embarquement immédiat</Kicker>
              </Reveal>
              <h2 className="mt-5 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-wide text-cream">
                <WordsReveal text="VOTRE PROCHAINE" />
                <br />
                <span className="text-ember">
                  <WordsReveal text="DESTINATION ?" baseDelay={0.15} />
                </span>
              </h2>
            </div>
            <Reveal delay={0.2} className="max-w-xs">
              <p className="text-sm leading-relaxed text-muted">
                Survolez une escale pour découvrir la recette qu'elle inspire. Une bouchée. Une destination.
              </p>
            </Reveal>
          </div>
          <WorldMap />
        </div>
      </section>

      {/* ═══════════ LES INCONTOURNABLES ═══════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>Les plus demandés</Kicker>
            </Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] tracking-wide">
              <WordsReveal text="LES" /> <span className="text-ember"><WordsReveal text="INCONTOURNABLES." baseDelay={0.1} /></span>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-3 text-sm text-muted">Les recettes à découvrir sans hésiter.</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <LinkArrow to="/menu">TOUTE LA CARTE</LinkArrow>
          </Reveal>
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {featured.map((p, i) => (
            <SignatureCard key={p.id} id={p.id} delay={(i % 3) * 0.1} />
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.24em] text-muted md:hidden">
          ← Faites glisser pour explorer →
        </p>
      </section>

      {/* ═══════════ FAIT MAISON ═══════════ */}
      <section className="relative overflow-hidden border-y border-graphite bg-soot py-24 lg:py-32">
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Kicker>Notre exigence</Kicker>
              </Reveal>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.94] tracking-wide text-cream">
                <WordsReveal text="ICI," />
                <br />
                <WordsReveal text="ON FAIT LES CHOSES" baseDelay={0.12} />
                <br />
                <span className="text-ember">
                  <WordsReveal text="MAISON." baseDelay={0.3} />
                </span>
              </h2>
              <div className="mt-10 space-y-2">
                {HOMEMADE.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="group flex gap-5 border-b border-graphite py-5 transition-colors hover:border-ember/50">
                      <span className="font-display text-lg text-ember/70">0{i + 1}</span>
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center border border-graphite text-ember transition-colors duration-300 group-hover:border-ember group-hover:bg-ember group-hover:text-coal">
                        <item.icon className="h-6 w-6" />
                      </span>
                      <span>
                        <span className="block font-display text-2xl tracking-wide text-cream">{item.title.toUpperCase()}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">{item.text}</span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Parallax range={28}>
              <div className="relative">
                <div className="absolute -right-4 -top-4 h-full w-full border border-ember/50" aria-hidden />
                <div className="relative overflow-hidden">
                  <img
                    src={IMAGES.atelier}
                    alt="L'atelier du Monde du Goût : viandes grillées, sauces maison et frites fraîches"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[14/10] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/60 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.26em] text-cream">
                    L'atelier — <span className="text-ember">chaque jour</span>
                  </p>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ═══════════ LIVRAISON / RETRAIT ═══════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <Kicker>Commander</Kicker>
        </Reveal>
        <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.94] tracking-wide">
          <WordsReveal text="COMMENT ÇA" /> <span className="text-ember"><WordsReveal text="MARCHE ?" baseDelay={0.12} /></span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="group relative h-full overflow-hidden bg-ember p-8 text-coal transition-transform duration-500 hover:-translate-y-1.5 sm:p-10">
              <svg aria-hidden viewBox="0 0 400 120" className="absolute right-0 top-0 w-72 opacity-20" fill="none" stroke="#111111" strokeWidth="2" strokeDasharray="6 8">
                <path d="M-10 110 Q 120 -20 210 60 T 410 30" />
              </svg>
              <IconScooter className="h-12 w-12" />
              <h3 className="mt-6 font-display text-4xl tracking-wide sm:text-5xl">LIVRAISON À DOMICILE</h3>
              <p className="mt-4 max-w-md text-sm font-semibold leading-relaxed text-coal/80">
                Commandez en ligne et faites-vous livrer vos spécialités directement à votre porte.
              </p>
              <p className="mt-3 inline-block border border-coal/30 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
                Livraison dans le secteur de Saint-Denis (93)
              </p>
              <div className="mt-8">
                <OrderButton variant="onOrange">COMMANDER EN LIVRAISON</OrderButton>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-2">
            <div className="group flex h-full flex-col border border-graphite bg-soot p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/60 sm:p-10">
              <IconBag className="h-12 w-12 text-ember" />
              <h3 className="mt-6 font-display text-4xl tracking-wide text-cream sm:text-5xl">RETRAIT SUR PLACE</h3>
              <p className="mt-4 text-sm leading-relaxed text-sand">
                Préparez votre commande en ligne et venez la récupérer directement au restaurant.
              </p>
              <p className="mt-3 text-xs text-muted">
                {RESTAURANT.address.street}, {RESTAURANT.address.zipCity}
              </p>
              <div className="mt-auto pt-8">
                <OrderButton variant="outline">COMMANDER À EMPORTER</OrderButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="relative overflow-hidden border-t border-graphite bg-coal">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 80% at 78% 20%, rgba(232,93,4,0.16), transparent 65%)" }}
        />
        <div className="dot-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="max-w-4xl">
            <Reveal>
              <Kicker>Dernière escale</Kicker>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.88] tracking-wide text-cream">
              <WordsReveal text="PRÊT À" /> <span className="text-ember"><WordsReveal text="VOYAGER ?" baseDelay={0.12} /></span>
            </h2>
            <div className="mt-8 space-y-1 font-display text-2xl tracking-wide text-sand sm:text-3xl">
              <p><WordsReveal text="Choisissez votre destination." /></p>
              <p><WordsReveal text="Choisissez votre sandwich." baseDelay={0.12} /></p>
              <p className="text-ember"><WordsReveal text="Et laissez le goût faire le reste." baseDelay={0.24} /></p>
            </div>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <OrderButton size="lg">COMMANDER MAINTENANT</OrderButton>
                <LinkArrow to="/restaurant">NOUS TROUVER</LinkArrow>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-muted">{MICROCOPY[0]}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
