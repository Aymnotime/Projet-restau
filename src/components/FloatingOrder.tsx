import { RESTAURANT } from "../data/site";
import { useOrder } from "./OrderContext";
import { IconPhone } from "./Icons";

/** Barre flottante mobile — CTA Commander toujours accessible. */
export default function FloatingOrder() {
  const openOrder = useOrder();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-graphite bg-coal/90 p-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={openOrder}
          className="flex-1 bg-ember px-6 py-3.5 font-display text-lg tracking-[0.18em] text-coal transition-all active:scale-[0.97]"
        >
          COMMANDER
        </button>
        <a
          href={RESTAURANT.phoneHref}
          aria-label={`Appeler le restaurant : ${RESTAURANT.phoneDisplay}`}
          className="border border-graphite bg-graphite/60 p-3.5 text-cream transition-colors hover:border-ember hover:text-ember"
        >
          <IconPhone className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
