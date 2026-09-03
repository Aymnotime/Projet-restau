import { RESTAURANT } from "../data/site";
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
    <div className="pt-28 lg:pt-36">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Kicker>Nous trouver</Kicker>
        </Reveal>
        <h1 className="mt-5 font-display text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.88] tracking-wide">
          <WordsReveal text="LE" /> <span className="text-ember"><WordsReveal text="RESTAURANT." baseDelay={0.1} /></span>
        </h1>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* ——— Informations ——— */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border border-graphite bg-soot p-8 sm:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Adresse</p>
                <address className="mt-4 font-display text-4xl not-italic leading-[1.02] tracking-wide text-cream sm:text-5xl">
                  45 RUE DE LA
                  <br />
                  BOULANGERIE
                  <br />
                  <span className="text-ember">93200 SAINT-DENIS</span>
                </address>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={RESTAURANT.mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-ember px-6 py-3 font-display text-sm tracking-[0.14em] text-coal transition-all hover:bg-ember-dark active:scale-[0.97]"
                  >
                    ITINÉRAIRE
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={RESTAURANT.phoneHref}
                    className="group inline-flex items-center gap-3 border border-sand/40 px-6 py-3 font-display text-sm tracking-[0.14em] text-cream transition-all hover:border-ember hover:text-ember active:scale-[0.97]"
                  >
                    <IconPhone className="h-4 w-4" />
                    APPELER
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="border border-graphite bg-soot p-6">
                  <IconClock className="h-8 w-8 text-ember" />
                  <h2 className="mt-4 font-display text-2xl tracking-wide">HORAIRES</h2>
                  <p className="mt-2 text-sm font-semibold text-sand">Tous les jours</p>
                  <p className="font-display text-3xl text-cream">11h30 – 5h00</p>
                </div>
                <div className="border border-graphite bg-soot p-6">
                  <IconPhone className="h-8 w-8 text-ember" />
                  <h2 className="mt-4 font-display text-2xl tracking-wide">TÉLÉPHONE</h2>
                  <a
                    href={RESTAURANT.phoneHref}
                    className="mt-2 block font-display text-3xl text-cream transition-colors hover:text-ember"
                  >
                    {RESTAURANT.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-muted">Commande, réservation, renseignements.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-6 flex items-center gap-4 border border-dashed border-line bg-graphite/30 p-5">
                <IconBag className="h-8 w-8 shrink-0 text-ember" />
                <p className="text-sm leading-relaxed text-sand">
                  Livraison à domicile <strong className="text-cream">uniquement dans le secteur de Saint-Denis (93)</strong>.
                  Retrait sur place tous les jours.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ——— Carte interactive ——— */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1} className="h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden border border-graphite bg-soot">
                <iframe
                  title="Plan d'accès — Le Monde du Goût, 45 Rue de la Boulangerie, 93200 Saint-Denis"
                  src={RESTAURANT.mapsEmbed}
                  className="map-dark absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-4 top-4 border border-graphite bg-coal/90 p-4 backdrop-blur-sm">
                  <p className="flex items-center gap-2 font-display text-xl tracking-wide text-cream">
                    <IconPin className="h-5 w-5 text-ember" /> LE MONDE DU GOÛT
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {RESTAURANT.address.street}, {RESTAURANT.address.zipCity}
                  </p>
                </div>
                <a
                  href={RESTAURANT.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ember px-4 py-2.5 font-display text-sm tracking-[0.14em] text-coal transition-colors hover:bg-ember-dark"
                >
                  OUVRIR L'ITINÉRAIRE <IconArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ——— Comment commander ——— */}
        <div className="mt-20">
          <Reveal>
            <Kicker>En trois temps</Kicker>
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.94] tracking-wide">
            <WordsReveal text="COMMENT" /> <span className="text-ember"><WordsReveal text="COMMANDER ?" baseDelay={0.12} /></span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="group h-full border border-graphite bg-soot p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/60">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-8 w-8 text-ember" />
                    <span className="font-display text-4xl text-cream/15 transition-colors group-hover:text-ember/40">{s.n}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-wide text-cream">{s.title.toUpperCase()}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <OrderButton size="lg">COMMANDER MAINTENANT</OrderButton>
              <a
                href={RESTAURANT.phoneHref}
                className="group inline-flex items-center gap-3 border border-sand/40 px-8 py-4 font-display text-base tracking-[0.14em] text-cream transition-all hover:border-ember hover:text-ember"
              >
                <IconPhone className="h-5 w-5" /> APPELER
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
