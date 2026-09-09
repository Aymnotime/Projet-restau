import { BOBIGNY_RESTAURANT, GOOGLE_BOBIGNY_REVIEWS_URL, RESTAURANT } from "../data/site";
import { Kicker, OrderButton, Reveal, usePageMeta, WordsReveal } from "../components/ui";
import { IconArrowRight, IconClock, IconPhone, IconPin, IconScooter, IconBag } from "../components/Icons";

const STEPS = [
  {
    n: "01",
    icon: IconPin,
    title: "Choisissez votre destination",
    text: "Parcourez la carte : 19 sandwichs inspirés des cuisines du monde.",
  },
  {
    n: "02",
    icon: IconPhone,
    title: "Commandez",
    text: `En ligne, ou par téléphone au ${RESTAURANT.phoneDisplay}.`,
  },
  {
    n: "03",
    icon: IconScooter,
    title: "Livraison ou retrait",
    text: "Livraison sur Saint-Denis (93), ou retrait directement au restaurant.",
  },
];

export default function Restaurant() {
  usePageMeta(
    "Le restaurant — Le Monde du Goût · 45 Rue de la Boulangerie, Saint-Denis",
    "Le Monde du Goût, 45 Rue de la Boulangerie, 93200 Saint-Denis. Ouvert tous les jours de 11h30 à 5h00. Livraison et retrait sur place."
  );

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Kicker>Nous trouver</Kicker>
        </Reveal>
        <h1 className="mt-2 sm:mt-3 font-display text-[clamp(2rem,7vw,6rem)] leading-[0.88] tracking-wide">
          <WordsReveal text="LE" /> <span className="text-ember"><WordsReveal text="RESTAURANT." baseDelay={0.1} /></span>
        </h1>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-28">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ——— Informations ——— */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border border-graphite bg-soot p-4 sm:p-5 md:p-6 lg:p-8">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] text-ember">Adresse</p>
                <address className="mt-2 sm:mt-3 font-display text-2xl sm:text-3xl md:text-4xl not-italic leading-[1.02] tracking-wide text-cream">
                  45 RUE DE LA
                  <br />
                  BOULANGERIE
                  <br />
                  <span className="text-ember">93200 SAINT-DENIS</span>
                </address>
                <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href={RESTAURANT.mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 sm:gap-3 bg-ember px-4 py-2 sm:px-5 sm:py-2.5 font-display text-xs sm:text-sm tracking-[0.12em] text-coal transition-all hover:bg-ember-dark active:scale-[0.97]"
                  >
                    ITINÉRAIRE
                    <IconArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={RESTAURANT.phoneHref}
                    className="group inline-flex items-center gap-2 sm:gap-3 border border-sand/40 px-4 py-2 sm:px-5 sm:py-2.5 font-display text-xs sm:text-sm tracking-[0.12em] text-cream transition-all hover:border-ember hover:text-ember active:scale-[0.97]"
                  >
                    <IconPhone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    APPELER
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-3 sm:mt-4 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="border border-graphite bg-soot p-4 sm:p-5">
                  <IconClock className="h-6 w-6 sm:h-7 sm:w-7 text-ember" />
                  <h2 className="mt-2 sm:mt-3 font-display text-lg sm:text-xl tracking-wide">HORAIRES</h2>
                  <p className="mt-1.5 text-xs sm:text-sm font-semibold text-sand">Tous les jours</p>
                  <p className="font-display text-xl sm:text-2xl text-cream">11h30 – 5h00</p>
                </div>
                <div className="border border-graphite bg-soot p-4 sm:p-5">
                  <IconPhone className="h-6 w-6 sm:h-7 sm:w-7 text-ember" />
                  <h2 className="mt-2 sm:mt-3 font-display text-lg sm:text-xl tracking-wide">TÉLÉPHONE</h2>
                  <a
                    href={RESTAURANT.phoneHref}
                    className="mt-1.5 block font-display text-xl sm:text-2xl text-cream transition-colors hover:text-ember"
                  >
                    {RESTAURANT.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-muted">Commande, réservation, renseignements.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-3 sm:mt-4 flex items-start gap-2 sm:gap-3 border border-dashed border-line bg-graphite/30 p-3 sm:p-4">
                <IconBag className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-ember" />
                <p className="text-xs sm:text-sm leading-relaxed text-sand">
                  Livraison à domicile <strong className="text-cream">uniquement dans le secteur de Saint-Denis (93)</strong>.
                  Retrait sur place tous les jours.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ——— Carte interactive ——— */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1} className="h-full">
              <div className="relative h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] overflow-hidden border border-graphite bg-soot">
                <iframe
                  title="Plan d'accès — Le Monde du Goût, 45 Rue de la Boulangerie, 93200 Saint-Denis"
                  src={RESTAURANT.mapsEmbed}
                  className="map-dark absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-2 right-2 top-2 sm:left-3 sm:right-auto sm:top-3 border border-graphite bg-coal/90 p-2.5 sm:p-3.5 backdrop-blur-sm">
                  <p className="flex items-center gap-1.5 sm:gap-2 font-display text-base sm:text-lg tracking-wide text-cream">
                    <IconPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ember" /> LE MONDE DU GOÛT
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {RESTAURANT.address.street}, {RESTAURANT.address.zipCity}
                  </p>
                </div>
                <a
                  href={RESTAURANT.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 inline-flex items-center gap-1 sm:gap-1.5 bg-ember px-2.5 py-2 sm:px-3.5 sm:py-2.5 font-display text-[10px] sm:text-xs tracking-[0.12em] text-coal transition-colors hover:bg-ember-dark"
                >
                  OUVRIR L'ITINÉRAIRE <IconArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <section className="mt-16 sm:mt-20" aria-labelledby="locations-title">
          <Reveal>
            <Kicker>Deux adresses</Kicker>
          </Reveal>
          <h2 id="locations-title" className="mt-4 sm:mt-5 font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.92] tracking-wide">
            <WordsReveal text="RETROUVEZ-NOUS" />
            <br />
            <span className="text-ember"><WordsReveal text="PRÈS DE CHEZ VOUS." baseDelay={0.12} /></span>
          </h2>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
            <Reveal>
              <article className="h-full border border-ember/60 bg-soot p-5 sm:p-6 md:p-7 lg:p-8">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Adresse principale</p>
                <h3 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl tracking-wide">SAINT-DENIS</h3>
                <address className="mt-2 sm:mt-3 text-xs sm:text-sm not-italic leading-relaxed text-sand">{RESTAURANT.address.street}<br />{RESTAURANT.address.zipCity}</address>
                <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                  <a href={RESTAURANT.mapsDirections} target="_blank" rel="noopener noreferrer" className="bg-ember px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-coal hover:bg-ember-dark">ITINÉRAIRE</a>
                  <a href={RESTAURANT.phoneHref} className="border border-sand/40 px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-cream hover:border-ember hover:text-ember">{RESTAURANT.phoneDisplay}</a>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="h-full border border-graphite bg-soot p-5 sm:p-6 md:p-7 lg:p-8">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Nouvelle adresse</p>
                <h3 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl tracking-wide">BOBIGNY</h3>
                <address className="mt-2 sm:mt-3 text-xs sm:text-sm not-italic leading-relaxed text-sand">{BOBIGNY_RESTAURANT.address.street}<br />{BOBIGNY_RESTAURANT.address.zipCity}</address>
                <p className="mt-2 sm:mt-3 text-xs text-muted">{BOBIGNY_RESTAURANT.hoursLabel}</p>
                <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                  <a href={BOBIGNY_RESTAURANT.mapsDirections} target="_blank" rel="noopener noreferrer" className="bg-ember px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-coal hover:bg-ember-dark">ITINÉRAIRE</a>
                  <a href={BOBIGNY_RESTAURANT.phoneHref} className="border border-sand/40 px-4 py-2.5 sm:py-3 font-display text-xs sm:text-sm tracking-[0.14em] text-cream hover:border-ember hover:text-ember">{BOBIGNY_RESTAURANT.phoneDisplay}</a>
                </div>
                <a href={GOOGLE_BOBIGNY_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-5 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-ember hover:text-cream">★ 4,1/5 · 49 avis Google</a>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ——— Comment commander ——— */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <Kicker>En trois temps</Kicker>
          </Reveal>
          <h2 className="mt-4 sm:mt-5 font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[0.94] tracking-wide">
            <WordsReveal text="COMMENT" /> <span className="text-ember"><WordsReveal text="COMMANDER ?" baseDelay={0.12} /></span>
          </h2>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="group h-full border border-graphite bg-soot p-5 sm:p-6 md:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/60">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-7 w-7 sm:h-8 sm:w-8 text-ember" />
                    <span className="font-display text-3xl sm:text-4xl text-cream/15 transition-colors group-hover:text-ember/40">{s.n}</span>
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl tracking-wide text-cream">{s.title.toUpperCase()}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <OrderButton size="md" className="sm:lg">COMMANDER MAINTENANT</OrderButton>
              <a
                href={RESTAURANT.phoneHref}
                className="group inline-flex items-center gap-2.5 sm:gap-3 border border-sand/40 px-6 py-3 sm:px-8 sm:py-4 font-display text-sm sm:text-base tracking-[0.14em] text-cream transition-all hover:border-ember hover:text-ember"
              >
                <IconPhone className="h-4 w-4 sm:h-5 sm:w-5" /> APPELER
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
