import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV, RESTAURANT } from "../data/site";
import { OrderButton } from "./ui";
import { IconClock, IconClose, IconMenu, IconPhone, LogoMark, Wordmark } from "./Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-cream/95 backdrop-blur-md"
            : "bg-gradient-to-b from-coal/80 via-coal/30 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-20 lg:h-24"
          }`}
        >
          <Link to="/" aria-label="Le Monde du Goût — accueil" className={`${scrolled ? "text-text-dark" : "text-cream"} transition-opacity hover:opacity-80`}>
            <span className="sm:hidden">
              <LogoMark className={scrolled ? "h-9 w-9" : "h-11 w-11"} />
            </span>
            <span className="hidden sm:block">
              <Wordmark compact={scrolled} />
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative font-display text-sm tracking-[0.22em] transition-colors ${
                    isActive ? "text-ember" : scrolled ? "text-text-body hover:text-text-dark" : "text-sand hover:text-cream"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label.toUpperCase()}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] bg-ember transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <OrderButton size="sm">COMMANDER</OrderButton>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className={`p-2 transition-colors hover:text-ember lg:hidden ${scrolled ? "text-text-dark" : "text-cream"}`}
            >
              <IconMenu className="h-7 w-7" />
            </button>
          </div>
        </div>
        {/* indicateur de lecture */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 block h-[2px] origin-left bg-ember"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* — Menu mobile plein écran — */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col bg-coal lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative flex h-20 items-center justify-between px-4 sm:px-6">
              <span className="text-cream">
                <Wordmark />
              </span>
              <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="p-2 text-cream hover:text-ember">
                <IconClose className="h-8 w-8" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Navigation mobile">
              {[{ label: "Accueil", to: "/" }, ...NAV].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-baseline gap-4 border-b border-graphite py-4 font-display text-4xl tracking-wide transition-colors sm:text-5xl ${
                        isActive ? "text-ember" : "text-cream hover:text-ember"
                      }`
                    }
                  >
                    <span className="text-xs font-body font-bold text-ember">0{i + 1}</span>
                    {item.label.toUpperCase()}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="relative space-y-4 px-6 pb-10">
              <OrderButton className="w-full" size="lg">
                COMMANDER
              </OrderButton>
              <div className="flex items-center justify-between text-xs text-muted">
                <a href={RESTAURANT.phoneHref} className="flex items-center gap-2 font-semibold text-sand hover:text-ember">
                  <IconPhone className="h-4 w-4 text-ember" /> {RESTAURANT.phoneDisplay}
                </a>
                <span className="flex items-center gap-2">
                  <IconClock className="h-4 w-4 text-ember" /> {RESTAURANT.hoursShort}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
