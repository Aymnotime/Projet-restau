import { Link } from "react-router-dom";
import { BOBIGNY_RESTAURANT, GOOGLE_REVIEWS_FALLBACK, GOOGLE_REVIEWS_URL, NAV, RESTAURANT } from "../data/site";
import { OrderButton } from "./ui";
import { IconClock, IconMail, IconPhone, IconPin, Wordmark } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-graphite bg-soot">
      {/* filigrane */}
      <p
        aria-hidden
        className="text-stroke pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[18vw] leading-none opacity-90"
      >
        LE MONDE DU GOÛT
      </p>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-cream inline-block mb-4">
              <Wordmark />
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-gray-400 via-gray-200 to-white bg-clip-text text-transparent mb-6">
              LE MONDE DU GOÛT
            </h2>
            <p className="font-display text-2xl leading-tight tracking-wide text-sand mb-4">
              LE GOÛT COMME GUIDE.
              <br />
              <span className="text-ember">LE MONDE COMME DESTINATION.</span>
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted mb-8">
              Sandwichs inspirés des cuisines du monde, préparés avec passion à Saint-Denis. Fait maison, généreux,
              sans compromis.
            </p>
            <div className="flex items-center gap-3 text-gray-300 mb-8">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <span className="text-sm">{GOOGLE_REVIEWS_FALLBACK.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5 sur Google · {GOOGLE_REVIEWS_FALLBACK.count} avis</span>
            </div>
            <OrderButton>COMMANDER</OrderButton>
          </div>

          <nav className="lg:col-span-3" aria-label="Navigation pied de page">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {[{ label: "Accueil", to: "/" }, ...NAV].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-display text-xl tracking-wide text-sand transition-colors hover:text-ember"
                  >
                    {item.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-ember">Nous trouver</h2>
            <ul className="mt-5 space-y-4 text-sm text-sand">
              <li className="flex items-start gap-3">
                <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <div>
                  <span className="font-display text-lg tracking-wide text-cream">SAINT-DENIS</span>
                  <address className="mt-1 not-italic leading-relaxed">
                    {RESTAURANT.address.street}
                    <br />
                    {RESTAURANT.address.zipCity}
                  </address>
                </div>
              </li>
              <li>
                <a href={RESTAURANT.phoneHref} className="flex items-center gap-3 transition-colors hover:text-ember">
                  <IconPhone className="h-5 w-5 shrink-0 text-ember" />
                  {RESTAURANT.phoneDisplay}
                </a>
              </li>
              <li className="border-t border-graphite pt-4 mt-2">
                <div className="flex items-center gap-3">
                  <IconClock className="h-5 w-5 shrink-0 text-ember" />
                  <div>
                    <p className="font-medium text-cream">SAINT-DENIS</p>
                    <p>{RESTAURANT.hoursLabel}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 border-t border-graphite pt-4">
                <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                <div>
                  <span className="font-display text-lg tracking-wide text-cream">BOBIGNY</span>
                  <address className="mt-1 not-italic leading-relaxed">
                    {BOBIGNY_RESTAURANT.address.street}
                    <br />
                    {BOBIGNY_RESTAURANT.address.zipCity}
                  </address>
                </div>
              </li>
              <li>
                <a href={BOBIGNY_RESTAURANT.phoneHref} className="flex items-center gap-3 transition-colors hover:text-ember">
                  <IconPhone className="h-5 w-5 shrink-0 text-ember" />
                  {BOBIGNY_RESTAURANT.phoneDisplay}
                </a>
              </li>
              <li className="border-t border-graphite pt-4">
                <div className="flex items-center gap-3">
                  <IconClock className="h-5 w-5 shrink-0 text-ember" />
                  <div>
                    <p className="font-medium text-cream">BOBIGNY</p>
                    <p>{BOBIGNY_RESTAURANT.hoursShort}</p>
                  </div>
                </div>
              </li>
              <li className="border-t border-graphite pt-4">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-ember"
                >
                  <span className="w-5 shrink-0 text-center text-ember" aria-hidden="true">★</span>
                  {GOOGLE_REVIEWS_FALLBACK.rating.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}/5 sur Google · {GOOGLE_REVIEWS_FALLBACK.count} avis
                </a>
              </li>
              <li>
                <a href={`mailto:${RESTAURANT.email}`} className="flex items-center gap-3 transition-colors hover:text-ember">
                  <IconMail className="h-5 w-5 shrink-0 text-ember" />
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-graphite pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Le Monde du Goût — Saint-Denis (93). Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/mentions-legales" className="transition-colors hover:text-ember">
              Mentions légales
            </Link>
            <Link to="/mentions-legales#confidentialite" className="transition-colors hover:text-ember">
              Politique de confidentialité
            </Link>
          </div>
          <p className="font-display text-sm tracking-widest uppercase text-gray-200 flex items-center gap-2">
            <span>Bon Voyage</span>
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </p>
        </div>
      </div>
    </footer>
  );
}
