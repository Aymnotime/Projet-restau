import { Link } from "react-router-dom";
import { NAV, RESTAURANT } from "../data/site";
import { OrderButton } from "./ui";
import { IconClock, IconMail, IconPhone, IconPin, Wordmark } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-graphite bg-soot">
      {/* filigrane */}
      <p
        aria-hidden
        className="text-stroke pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[18vw] leading-none opacity-60"
      >
        LE MONDE DU GOÛT
      </p>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-cream">
              <Wordmark />
            </span>
            <p className="mt-6 font-display text-2xl leading-tight tracking-wide text-sand">
              LE GOÛT COMME GUIDE.
              <br />
              <span className="text-ember">LE MONDE COMME DESTINATION.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Sandwichs inspirés des cuisines du monde, préparés avec passion à Saint-Denis. Fait maison, généreux,
              sans compromis.
            </p>
            <OrderButton className="mt-8">COMMANDER</OrderButton>
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
                <span>
                  {RESTAURANT.address.street}
                  <br />
                  {RESTAURANT.address.zipCity}
                </span>
              </li>
              <li>
                <a href={RESTAURANT.phoneHref} className="flex items-center gap-3 transition-colors hover:text-ember">
                  <IconPhone className="h-5 w-5 shrink-0 text-ember" />
                  {RESTAURANT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${RESTAURANT.email}`} className="flex items-center gap-3 transition-colors hover:text-ember">
                  <IconMail className="h-5 w-5 shrink-0 text-ember" />
                  {RESTAURANT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <IconClock className="h-5 w-5 shrink-0 text-ember" />
                {RESTAURANT.hoursLabel}
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
        </div>
      </div>
    </footer>
  );
}
