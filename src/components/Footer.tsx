import { Link } from "react-router-dom";
import { BOBIGNY_RESTAURANT, BOBIGNY_REVIEWS_FALLBACK, GOOGLE_BOBIGNY_REVIEWS_URL, GOOGLE_REVIEWS_FALLBACK, GOOGLE_REVIEWS_URL, NAV, RESTAURANT } from "../data/site";
import { OrderButton } from "./ui";
import { IconClock, IconMail, IconPhone, IconPin, Wordmark } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-graphite bg-soot">
      {/* filigrane */}
      <p
        aria-hidden
        className="text-stroke pointer-events-none absolute -bottom-4 sm:-bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[10vw] sm:text-[12vw] md:text-[14vw] lg:text-[16vw] leading-none opacity-90"
      >
        LE MONDE DU GOÛT
      </p>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-cream inline-block mb-4">
              <Wordmark />
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-gray-400 via-gray-200 to-white bg-clip-text text-transparent mb-4 sm:mb-6">
              LE MONDE DU GOÛT
            </h2>
            <p className="font-display text-base sm:text-lg md:text-xl leading-tight tracking-wide text-sand mb-3 sm:mb-4">
              LE GOÛT COMME GUIDE.
              <br />
              <span className="text-ember">LE MONDE COMME DESTINATION.</span>
            </p>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted mb-6 sm:mb-8">
              Sandwichs inspirés des cuisines du monde, préparés avec passion à Saint-Denis. Fait maison, généreux,
              sans compromis.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-300 mb-6 sm:mb-8">
              <span className="text-amber-400 text-base sm:text-lg">★★★★★</span>
              <span className="text-xs sm:text-sm">{GOOGLE_REVIEWS_FALLBACK.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5 sur Google · {GOOGLE_REVIEWS_FALLBACK.count} avis</span>
            </div>
            <OrderButton size="sm">COMMANDER</OrderButton>
          </div>

          <nav className="lg:col-span-3" aria-label="Navigation pied de page">
            <h2 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Navigation</h2>
            <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
              {[{ label: "Accueil", to: "/" }, ...NAV].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-display text-base sm:text-lg tracking-wide text-sand transition-colors hover:text-ember"
                  >
                    {item.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Nous trouver</h2>
            <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 text-xs sm:text-sm text-sand">
              <li className="flex items-start gap-2 sm:gap-3">
                <IconPin className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                <div>
                  <span className="font-display text-sm sm:text-base tracking-wide text-cream">SAINT-DENIS</span>
                  <address className="mt-0.5 sm:mt-1 not-italic leading-relaxed text-xs sm:text-sm">
                    {RESTAURANT.address.street}
                    <br />
                    {RESTAURANT.address.zipCity}
                  </address>
                </div>
              </li>
              <li>
                <a href={RESTAURANT.phoneHref} className="flex items-center gap-2 sm:gap-3 transition-colors hover:text-ember text-xs sm:text-sm">
                  <IconPhone className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                  {RESTAURANT.phoneDisplay}
                </a>
              </li>
              <li className="border-t border-graphite pt-3 sm:pt-4 mt-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <IconClock className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                  <div>
                    <p className="font-medium text-cream text-xs sm:text-sm">SAINT-DENIS</p>
                    <p className="text-xs sm:text-sm">{RESTAURANT.hoursLabel}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 border-t border-graphite pt-3 sm:pt-4">
                <IconPin className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                <div>
                  <span className="font-display text-sm sm:text-base tracking-wide text-cream">BOBIGNY</span>
                  <address className="mt-0.5 sm:mt-1 not-italic leading-relaxed text-xs sm:text-sm">
                    {BOBIGNY_RESTAURANT.address.street}
                    <br />
                    {BOBIGNY_RESTAURANT.address.zipCity}
                  </address>
                </div>
              </li>
              <li>
                <a href={BOBIGNY_RESTAURANT.phoneHref} className="flex items-center gap-2 sm:gap-3 transition-colors hover:text-ember text-xs sm:text-sm">
                  <IconPhone className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                  {BOBIGNY_RESTAURANT.phoneDisplay}
                </a>
              </li>
              <li className="border-t border-graphite pt-3 sm:pt-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <IconClock className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                  <div>
                    <p className="font-medium text-cream text-xs sm:text-sm">BOBIGNY</p>
                    <p className="text-xs sm:text-sm">{BOBIGNY_RESTAURANT.hoursShort}</p>
                  </div>
                </div>
              </li>
              <li className="border-t border-graphite pt-3 sm:pt-4">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 transition-colors hover:text-ember text-xs sm:text-sm"
                >
                  <span className="w-4 sm:w-5 shrink-0 text-center text-ember text-sm sm:text-base" aria-hidden="true">★</span>
                  {GOOGLE_REVIEWS_FALLBACK.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5 sur Google · {GOOGLE_REVIEWS_FALLBACK.count} avis
                </a>
              </li>
              <li>
                <a href={`mailto:${RESTAURANT.email}`} className="flex items-center gap-2 sm:gap-3 transition-colors hover:text-ember text-xs sm:text-sm">
                  <IconMail className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-ember" />
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col items-start justify-between gap-3 sm:gap-4 border-t border-graphite pt-5 sm:pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p className="text-[10px] sm:text-xs">
            © {new Date().getFullYear()} Le Monde du Goût — Saint-Denis (93). Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/mentions-legales" className="text-[10px] sm:text-xs transition-colors hover:text-ember">
              Mentions légales
            </Link>
            <Link to="/mentions-legales#confidentialite" className="text-[10px] sm:text-xs transition-colors hover:text-ember">
              Politique de confidentialité
            </Link>
          </div>
          <p className="font-display text-[10px] sm:text-sm tracking-widest uppercase text-gray-200 flex items-center gap-1.5 sm:gap-2">
            <span>Bon Voyage</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </p>
        </div>
      </div>
    </footer>
  );
}
