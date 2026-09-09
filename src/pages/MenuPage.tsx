import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { byCategory, CATEGORIES, formatPrice, inspirationOf, type Category } from "../data/products";
import { RESTAURANT } from "../data/site";
import { Kicker, OrderButton, PriceLine, ProductImage, Reveal, usePageMeta, WordsReveal } from "../components/ui";
import { IconClock, IconPhone, IconSauce } from "../components/Icons";

export default function MenuPage() {
  usePageMeta(
    "Le Menu — Le Monde du Goût · Sandwichs, boissons & desserts à Saint-Denis",
    "Découvrez la carte du Monde du Goût : 19 sandwichs inspirés des cuisines du monde, boissons et desserts. Fait maison, servi avec frites maison. Saint-Denis (93)."
  );
  const [cat, setCat] = useState<Category>("sandwichs");
  const reduce = useReducedMotion();
  const items = byCategory(cat);

  return (
    <div className="pt-24 sm:pt-28 lg:pt-36">
      {/* ——— En-tête ——— */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Kicker>La carte</Kicker>
        </Reveal>
        <h1 className="mt-3 sm:mt-5 font-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.88] tracking-wide">
          <WordsReveal text="LE" /> <span className="text-ember"><WordsReveal text="MENU." baseDelay={0.1} /></span>
        </h1>
        <Reveal delay={0.15}>
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em]">
            {["Fait maison", "Frites maison incluses", "Saint-Denis (93)"].map((t) => (
              <span key={t} className="border border-graphite bg-soot px-2.5 py-1 sm:px-3 sm:py-1.5 text-sand">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      {/* ——— Onglets catégories (sticky) ——— */}
      <nav
        aria-label="Catégories du menu"
        className="sticky top-14 z-30 mt-6 sm:mt-8 lg:mt-10 border-y border-graphite bg-coal/90 backdrop-blur-md lg:top-20"
      >
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {CATEGORIES.map((c) => {
            const active = cat === c.id;
            const count = byCategory(c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 font-display text-base sm:text-lg tracking-[0.12em] transition-all duration-300 ${
                  active ? "bg-ember text-coal" : "text-sand hover:bg-graphite/60 hover:text-cream"
                }`}
              >
                {c.label.toUpperCase()}
                <span
                  className={`px-1.5 py-0.5 text-[10px] sm:text-[11px] font-body font-bold ${
                    active ? "bg-coal/20 text-coal" : "bg-graphite text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ——— Contenu ——— */}
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {cat === "sandwichs" && (
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {items.map((p, idx) => {
                  const dest = inspirationOf(p.id);
                  return (
                    <article
                      key={p.id}
                      className="group flex items-start gap-3 border-b border-graphite pb-5 pt-4 transition-colors hover:bg-cream/[0.02] sm:gap-5 sm:pb-6 sm:pt-5"
                    >
                      <ProductImage
                        product={p}
                        className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24"
                        imgClassName="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2 sm:gap-3">
                          <span className="tnum hidden text-[9px] font-bold tracking-[0.22em] text-muted xs:inline sm:text-[10px]">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h2 className="font-display text-xl tracking-wide text-cream transition-colors group-hover:text-ember sm:text-2xl md:text-3xl">
                            {p.name.toUpperCase()}
                          </h2>
                          <span className="leader" />
                          <span className="shrink-0 font-display text-xl text-ember sm:text-2xl md:text-3xl">{formatPrice(p.price)}</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-sand sm:text-sm">{p.description}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
                          {p.note && <p className="text-[10px] sm:text-xs text-muted">{p.note}</p>}
                          {dest && (
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-ember">
                              ◆ Inspiration {dest.country}
                            </span>
                          )}
                        </div>
                      </div>
                      <OrderButton variant="ghost" size="sm" className="mt-0.5 shrink-0 !px-2 text-[10px] sm:text-xs">
                        COMMANDER
                      </OrderButton>
                    </article>
                  );
                })}
              </div>
            )}

            {cat === "boissons" && (
              <div>
                <div className="grid gap-x-6 sm:gap-x-10 sm:grid-cols-2">
                  {items.map((p) => (
                    <article key={p.id} className="group flex items-center gap-3 border-b border-graphite py-3 sm:gap-4 sm:py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-graphite text-ember transition-colors group-hover:border-ember sm:h-10 sm:w-10">
                        <IconSauce className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <PriceLine name={p.name} price={p.price} className="flex-1" />
                    </article>
                  ))}
                </div>
                <p className="mt-4 sm:mt-6 text-xs text-muted">Boissons fraîches, servies bien fraîches.</p>
              </div>
            )}

            {cat === "desserts" && (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {items.map((p) => (
                  <article
                    key={p.id}
                    className="group border border-graphite bg-soot p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/60 sm:p-6 md:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-3 sm:gap-4">
                      <h2 className="font-display text-2xl tracking-wide text-cream transition-colors group-hover:text-ember sm:text-3xl md:text-4xl">
                        {p.name.toUpperCase()}
                      </h2>
                      <span className="font-display text-xl text-ember sm:text-2xl md:text-3xl">{formatPrice(p.price)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-sand">{p.description}</p>
                    <div className="mt-4 sm:mt-6">
                      <OrderButton size="sm" variant="outline">COMMANDER</OrderButton>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 sm:mt-10 border-t border-graphite pt-4 sm:pt-5 text-xs leading-relaxed text-muted">
          Photos des recettes préparées au restaurant. Chaque sandwich est servi avec des frites maison.
        </p>

        {/* ——— Bandeau commande ——— */}
        <div className="mt-10 sm:mt-14 flex flex-col items-start justify-between gap-4 sm:gap-6 border border-graphite bg-soot p-5 sm:p-6 md:p-8 lg:p-10">
          <div>
            <p className="font-display text-2xl tracking-wide sm:text-3xl md:text-4xl">
              UNE PETITE FAIM<span className="text-ember"> ?</span>
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-muted">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <IconClock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ember" /> {RESTAURANT.hoursLabel}
              </span>
              <a href={RESTAURANT.phoneHref} className="flex items-center gap-1.5 sm:gap-2 font-semibold text-sand transition-colors hover:text-ember">
                <IconPhone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ember" /> {RESTAURANT.phoneDisplay}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <OrderButton size="sm" className="sm:md">COMMANDER</OrderButton>
            <OrderButton variant="outline" size="sm" className="sm:md">RETRAIT SUR PLACE</OrderButton>
          </div>
        </div>
      </main>
    </div>
  );
}
