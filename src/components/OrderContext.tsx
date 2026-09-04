import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ORDER_URL, RESTAURANT } from "../data/site";
import { IconBag, IconCheck, IconClose, IconPhone, IconPin, IconScooter } from "./Icons";

const OrderContext = createContext<() => void>(() => {});
export const useOrder = () => useContext(OrderContext);

/**
 * Système de commande centralisé.
 * — Si ORDER_URL est configurée (src/data/site.ts) : bouton vers la plateforme.
 * — Sinon : panneau propre invitant à commander par téléphone.
 */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const openOrder = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const configured = ORDER_URL.trim().length > 0;

  return (
    <OrderContext.Provider value={openOrder}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Commander au Monde du Goût"
          >
            <button
              aria-label="Fermer"
              onClick={close}
              className="absolute inset-0 cursor-default bg-coal/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: reduce ? 0 : 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduce ? 0 : 32, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg border border-graphite bg-soot p-6 sm:p-8"
            >
              <button
                onClick={close}
                aria-label="Fermer la fenêtre de commande"
                className="absolute right-4 top-4 p-2 text-sand transition-colors hover:text-ember"
              >
                <IconClose className="h-5 w-5" />
              </button>

              <p className="font-display text-sm tracking-[0.3em] text-ember">LE MONDE DU GOÛT</p>
              <h2 className="mt-2 font-display text-4xl leading-none sm:text-5xl">COMMANDER</h2>
              <p className="mt-3 text-sm leading-relaxed text-sand">
                Livraison à domicile (secteur Saint-Denis 93) ou retrait sur place, tous les jours de 11h30 à 5h00.
              </p>

              <div className="mt-6 space-y-3">
                {configured ? (
                  <>
                    <a
                      href={ORDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 border border-ember bg-ember p-4 text-coal transition-colors hover:bg-ember-dark hover:border-ember-dark"
                    >
                      <IconScooter className="h-7 w-7 shrink-0" />
                      <span className="flex-1">
                        <span className="block font-display text-xl leading-none">COMMANDER EN LIVRAISON</span>
                        <span className="text-xs font-semibold text-coal/70">Livraison à domicile — Saint-Denis (93)</span>
                      </span>
                      <IconCheck className="h-5 w-5" />
                    </a>
                    <a
                      href={ORDER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 border border-graphite bg-graphite/40 p-4 transition-colors hover:border-ember"
                    >
                      <IconBag className="h-7 w-7 shrink-0 text-ember" />
                      <span className="flex-1">
                        <span className="block font-display text-xl leading-none">COMMANDER À EMPORTER</span>
                        <span className="text-xs font-semibold text-muted">Retrait sur place au restaurant</span>
                      </span>
                      <IconCheck className="h-5 w-5 text-ember" />
                    </a>
                  </>
                ) : (
                  <>
                    <div className="border border-dashed border-line bg-graphite/30 p-4">
                      <p className="text-sm font-semibold text-cream">La commande en ligne arrive bientôt.</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        En attendant, commandez directement par téléphone — préparation rapide, retrait sur place ou
                        livraison sur Saint-Denis (93).
                      </p>
                    </div>
                    <a
                      href={RESTAURANT.phoneHref}
                      className="flex items-center gap-4 border border-ember bg-ember p-4 text-coal transition-colors hover:bg-ember-dark hover:border-ember-dark"
                    >
                      <IconPhone className="h-7 w-7 shrink-0" />
                      <span className="flex-1">
                        <span className="block font-display text-2xl leading-none tracking-wide">
                          {RESTAURANT.phoneDisplay}
                        </span>
                        <span className="text-xs font-semibold text-coal/70">Appeler pour commander</span>
                      </span>
                    </a>
                  </>
                )}

                <a
                  href={RESTAURANT.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-graphite p-3 text-sm font-semibold text-sand transition-colors hover:border-ember hover:text-cream"
                >
                  <IconPin className="h-5 w-5 text-ember" />
                  {RESTAURANT.address.street}, {RESTAURANT.address.zipCity}
                </a>
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-muted">{RESTAURANT.hoursLabel}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OrderContext.Provider>
  );
}
