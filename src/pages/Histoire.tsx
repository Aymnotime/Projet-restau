import { motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "../data/site";
import { Kicker, LinkArrow, MaskLines, OrderButton, Reveal, usePageMeta, WordsReveal } from "../components/ui";
import { IconCompass } from "../components/Icons";

const GALLERY = [
  { src: IMAGES.hero, alt: "Sandwich signature du Monde du Goût sur ardoise", tag: "Signature", span: "md:col-span-2 md:row-span-2" },
  { src: IMAGES.intro, alt: "Sandwich au poulet mariné, cœur fondant", tag: "Poulet mariné", span: "" },
  { src: IMAGES.atelier, alt: "L'atelier : préparation maison chaque jour", tag: "L'atelier", span: "" },
  { src: IMAGES.suissard, alt: "Le Suissard, raclette fondante", tag: "Le Suissard", span: "md:col-span-2" },
  { src: IMAGES.mg, alt: "Le MG, double steak et sauce Boursin", tag: "Le MG", span: "" },
  { src: IMAGES.frenchy, alt: "Le Frenchy, chèvre et miel", tag: "Le Frenchy", span: "" },
];

export default function Histoire() {
  usePageMeta(
    "Notre histoire — Le Monde du Goût · Saint-Denis",
    "Le Monde du Goût, à Saint-Denis : un voyage culinaire à travers les saveurs du monde, en sandwichs généreux et faits maison."
  );
  const reduce = useReducedMotion();

  return (
    <div className="pt-28 lg:pt-36">
      {/* ——— Héros éditorial ——— */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Kicker>Notre histoire</Kicker>
            </Reveal>
            <h1 className="mt-6 font-display leading-[0.86] tracking-wide">
              <MaskLines
                className="block text-[clamp(4rem,12vw,10rem)]"
                lines={[
                  <>LE MONDE</>,
                  <>
                    DU GOÛT<span className="text-ember">.</span>
                  </>,
                ]}
              />
            </h1>
            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.5, duration: 0.7 }}
              className="mt-6 font-display text-2xl leading-snug tracking-wide text-sand sm:text-3xl"
            >
              LE GOÛT COMME GUIDE.
              <br />
              <span className="text-ember">LE MONDE COMME DESTINATION.</span>
            </motion.p>
          </div>
          <div className="flex items-end lg:col-span-5">
            <div className="space-y-5 border-l-2 border-ember pl-6 text-base leading-relaxed text-sand">
              <Reveal delay={0.15}>
                <p>
                  Situé à Saint-Denis, <strong className="text-cream">Le Monde du Goût</strong> vous invite à un voyage
                  culinaire à travers les saveurs du monde.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p>
                  Notre cuisine s'inspire des traditions culinaires internationales et transforme ces inspirations en
                  sandwichs généreux, originaux et accessibles.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="font-semibold text-cream">
                  Chaque recette est une invitation à découvrir une culture, une histoire et une émotion.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ——— Manifeste ——— */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <IconCompass className="mx-auto h-10 w-10 text-ember" />
        <p className="mt-8 font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.02] tracking-wide text-cream">
          <WordsReveal text="DES CUISINES DU MONDE," />
          <br />
          <WordsReveal text="UN SANDWICH À LA FOIS." baseDelay={0.2} />
          <br />
          <span className="text-ember">
            <WordsReveal text="SAINT-DENIS POUR PORT D'ATTACHE." baseDelay={0.4} />
          </span>
        </p>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted">
            Du DZ à l'Africana, du China Town au Suissard : nos recettes rendent hommage aux saveurs qui nous font
            voyager, préparées chaque jour avec des produits faits maison.
          </p>
        </Reveal>
      </section>

      {/* ——— Galerie ——— */}
      <section className="border-y border-graphite bg-soot/60 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <Kicker>En images</Kicker>
              </Reveal>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] tracking-wide">
                <WordsReveal text="LA GALERIE DU" /> <span className="text-ember"><WordsReveal text="GOÛT." baseDelay={0.12} /></span>
              </h2>
            </div>
            <Reveal delay={0.2}>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
                Photos d'illustration — à remplacer par les visuels officiels
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[220px]">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 0.08} className={g.span}>
                <figure className="group relative h-full min-h-[240px] overflow-hidden border border-graphite">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <figcaption className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="h-2 w-2 rotate-45 bg-ember" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-cream">{g.tag}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Valeurs + CTA ——— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap gap-3">
          {["Généreux", "International", "Convivial", "Fait maison", "Urbain", "Accessible"].map((v, i) => (
            <Reveal key={v} delay={i * 0.05}>
              <span className="inline-block border border-graphite bg-soot px-5 py-2.5 font-display text-xl tracking-[0.1em] text-sand transition-colors hover:border-ember hover:text-ember">
                {v.toUpperCase()}
              </span>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-graphite pt-10 lg:flex-row lg:items-end">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] tracking-wide">
            <WordsReveal text="LA SUITE DU VOYAGE" />
            <br />
            <span className="text-ember"><WordsReveal text="EST DANS LA CARTE." baseDelay={0.15} /></span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <LinkArrow to="/menu">DÉCOUVRIR LE MENU</LinkArrow>
            <OrderButton>COMMANDER</OrderButton>
          </div>
        </div>
      </section>
    </div>
  );
}
