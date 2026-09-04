import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { byCategory, CATEGORIES, formatPrice, inspirationOf, type Category, PRODUCTS } from "../data/products";
import { RESTAURANT } from "../data/site";
import { Kicker, OrderButton, PriceLine, ProductImage, Reveal, usePageMeta, WordsReveal } from "../components/ui";
import { IconClock, IconPhone, IconSauce, IconArrowRight } from "../components/Icons";
import { Link } from "react-router-dom";

export default function MenuPage() {
  usePageMeta(
    "Le Menu — Le Monde du Goût · Sandwichs, boissons & desserts à Saint-Denis",
    "Découvrez la carte du Monde du Goût : 19 sandwichs inspirés des cuisines du monde, boissons et desserts. Fait maison, servi avec frites maison. Saint-Denis (93)."
  );
  const [cat, setCat] = useState<Category>("sandwichs");
  const reduce = useReducedMotion();
  const items = byCategory(cat);
  
  // Get featured products for signatures section
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 3);

  return (
    <div className="bg-cream">
      {/* ——— HERO SECTION ——— */}
      <header className="relative overflow-hidden bg-coal pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <Kicker tone="sand">La carte</Kicker>
              </Reveal>
              <h1 className="mt-4 font-display text-[clamp(3rem,10vw,7rem)] leading-[0.88] tracking-wide text-cream">
                <WordsReveal text="18 RECETTES." />
                <br />
                <span className="text-ember"><WordsReveal text="UN MONDE" baseDelay={0.1} /></span>{" "}
                <WordsReveal text="DE SAVEURS." baseDelay={0.2} />
              </h1>
              <Reveal delay={0.3}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-sand">
                  Des sandwichs généreux inspirés des cuisines du monde, préparés avec passion à Saint-Denis.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Fait maison", "Frites incluses", "Saint-Denis (93)"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-2 border border-sand/30 bg-soot/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sand">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            
            {/* Hero image - large sandwich photo */}
            <Reveal delay={0.2}>
              <div className="relative hidden lg:block">
                <div className="aspect-square overflow-hidden border-2 border-sand/20">
                  <img
                    src="/image-sandwich/dz.jpg"
                    alt="Sandwich Le DZ du Monde du Goût"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-ember px-6 py-4">
                  <p className="font-display text-3xl tracking-wide text-white">À TESTER</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ——— CATEGORY NAVIGATION (sticky) ——— */}
      <nav
        aria-label="Catégories du menu"
        className="sticky top-16 z-30 border-b border-border bg-cream/95 backdrop-blur-md lg:top-20"
      >
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {CATEGORIES.map((c) => {
            const active = cat === c.id;
            const count = byCategory(c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-2 rounded-md px-6 py-3 font-display text-sm tracking-[0.12em] transition-all duration-200 ${
                  active 
                    ? "bg-ember text-white shadow-md" 
                    : "bg-sand text-text-muted hover:bg-sand-dark hover:text-text-dark"
                }`}
              >
                {c.label.toUpperCase()}
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-body font-bold ${
                    active ? "bg-white/20 text-white" : "bg-border text-text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ——— FEATURED PRODUCTS SECTION (for sandwichs category) ——— */}
      {cat === "sandwichs" && featuredProducts.length > 0 && (
        <section className="border-b border-border bg-sand py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <Kicker>Nos signatures</Kicker>
                  <h2 className="mt-3 font-display text-[clamp(2rem,6vw,4rem)] leading-[0.9] tracking-wide text-text-dark">
                    LES <span className="text-ember">INCONTOURNABLES</span>
                  </h2>
                </div>
                <Link
                  to="/restaurant"
                  className="hidden items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-ember lg:flex"
                >
                  Voir le restaurant <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            
            <div className="grid gap-8 md:grid-cols-3">
              {featuredProducts.map((p, idx) => {
                const isLarge = idx === 0;
                const dest = inspirationOf(p.id);
                return (
                  <Reveal key={p.id} delay={idx * 0.1}>
                    <article 
                      className={`group relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        isLarge ? "md:col-span-2 md:grid md:grid-cols-2" : ""
                      }`}
                    >
                      <div className={`relative overflow-hidden ${isLarge ? "aspect-video md:aspect-square" : "aspect-[4/3]"}`}>
                        <ProductImage
                          product={p}
                          className="absolute inset-0 h-full w-full"
                          imgClassName="transition-transform duration-500 group-hover:scale-105"
                          eager={idx < 2}
                        />
                        {dest && (
                          <span className="absolute left-4 top-4 badge badge-red">
                            ◆ {dest.code}
                          </span>
                        )}
                        <span className="absolute right-4 top-4 badge badge-black">
                          SIGNATURE MG
                        </span>
                      </div>
                      <div className={`p-6 ${isLarge ? "md:flex md:flex-col md:justify-center" : ""}`}>
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-display text-3xl tracking-wide text-text-dark transition-colors group-hover:text-ember">
                            {p.name.toUpperCase()}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-text-body">{p.short || p.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-display text-3xl text-ember">{formatPrice(p.price)}</span>
                          <OrderButton size="sm">COMMANDER</OrderButton>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ——— MENU GRID ——— */}
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* SANDWICHS - Card Grid */}
            {cat === "sandwichs" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => {
                  const dest = inspirationOf(p.id);
                  return (
                    <article
                      key={p.id}
                      className="group product-card"
                    >
                      <div className="product-image-container aspect-[4/3]">
                        <ProductImage
                          product={p}
                          className="absolute inset-0 h-full w-full"
                          imgClassName="transition-transform duration-500 group-hover:scale-105"
                        />
                        {dest && (
                          <span className="absolute left-3 top-3 badge badge-red">
                            {dest.code}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h2 className="font-display text-2xl tracking-wide text-text-dark transition-colors group-hover:text-ember">
                          {p.name.toUpperCase()}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-text-body">{p.description}</p>
                        {p.note && <p className="mt-1 text-xs italic text-text-muted">{p.note}</p>}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-display text-2xl text-ember">{formatPrice(p.price)}</span>
                          <OrderButton size="sm">COMMANDER</OrderButton>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* BOISSONS - Simple List */}
            {cat === "boissons" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <article 
                    key={p.id} 
                    className="group flex items-center gap-4 border-b border-border py-4 transition-colors hover:bg-sand/50"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-sand text-ember transition-colors group-hover:bg-ember group-hover:text-white">
                      <IconSauce className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg tracking-wide text-text-dark">{p.name}</h3>
                      <p className="text-xs text-text-muted">{p.description}</p>
                    </div>
                    <span className="shrink-0 font-display text-xl text-ember">{formatPrice(p.price)}</span>
                  </article>
                ))}
              </div>
            )}

            {/* DESSERTS - Cards */}
            {cat === "desserts" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <article
                    key={p.id}
                    className="group product-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-display text-3xl tracking-wide text-text-dark transition-colors group-hover:text-ember">
                        {p.name.toUpperCase()}
                      </h2>
                      <span className="font-display text-2xl text-ember">{formatPrice(p.price)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-body">{p.description}</p>
                    <div className="mt-5">
                      <OrderButton size="sm" variant="outline">COMMANDER</OrderButton>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Info note */}
        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-border pt-6">
            <p className="text-sm italic leading-relaxed text-text-muted">
              Chaque sandwich est servi avec des frites maison. Les visuels affichés correspondent aux recettes proposées.
            </p>
          </div>
        </Reveal>

        {/* ——— ORDER BANNER ——— */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-2 border-border bg-sand p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="font-display text-3xl tracking-wide text-text-dark sm:text-4xl">
                UNE PETITE FAIM<span className="text-ember"> ?</span>
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-body">
                <span className="flex items-center gap-2">
                  <IconClock className="h-5 w-5 text-ember" /> {RESTAURANT.hoursLabel}
                </span>
                <a href={RESTAURANT.phoneHref} className="flex items-center gap-2 font-semibold text-text-dark transition-colors hover:text-ember">
                  <IconPhone className="h-5 w-5 text-ember" /> {RESTAURANT.phoneDisplay}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <OrderButton>COMMANDER</OrderButton>
              <OrderButton variant="outline">RETRAIT SUR PLACE</OrderButton>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
