import { RESTAURANT, SITE_URL } from "../data/site";
import { Kicker, Reveal, usePageMeta, WordsReveal } from "../components/ui";

function Block({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="border-b border-graphite py-10">
        <h2 className="font-display text-3xl tracking-wide text-cream">
          {title.toUpperCase()}
          <span className="text-ember">.</span>
        </h2>
        <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-sand">{children}</div>
      </section>
    </Reveal>
  );
}

export default function Mentions() {
  usePageMeta(
    "Mentions légales — Le Monde du Goût · Saint-Denis",
    "Mentions légales et politique de confidentialité du site Le Monde du Goût, restaurant à Saint-Denis (93)."
  );

  return (
    <div className="pt-28 lg:pt-36">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Kicker>Informations</Kicker>
        </Reveal>
        <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-wide">
          <WordsReveal text="MENTIONS" /> <span className="text-ember"><WordsReveal text="LÉGALES." baseDelay={0.1} /></span>
        </h1>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pb-32">
        <Block title="Éditeur du site">
          <p>
            Le site <strong className="text-cream">{SITE_URL.replace("https://", "")}</strong> est édité par le
            restaurant <strong className="text-cream">Le Monde du Goût</strong>.
          </p>
          <p>
            Adresse : {RESTAURANT.address.street}, {RESTAURANT.address.zipCity}
            <br />
            Téléphone : <a href={RESTAURANT.phoneHref} className="text-ember hover:underline">{RESTAURANT.phoneDisplay}</a>
            <br />
            Email :{" "}
            <a href={`mailto:${RESTAURANT.email}`} className="text-ember hover:underline">
              {RESTAURANT.email}
            </a>
          </p>
          <p className="text-muted">
            Directeur de la publication : <em>[à compléter — nom du responsable]</em>.
            <br />
            Dénomination sociale et numéro d'immatriculation : <em>[à compléter]</em>.
          </p>
        </Block>

        <Block title="Hébergement">
          <p className="text-muted">
            Le site est hébergé par : <em>[à compléter — nom de l'hébergeur, adresse, contact]</em>.
          </p>
        </Block>

        <Block title="Propriété intellectuelle">
          <p>
            L'ensemble des contenus du site (textes, visuels, logo, charte graphique) est la propriété du Monde du
            Goût, sauf mention contraire. Toute reproduction, totale ou partielle, sans autorisation préalable écrite
            est interdite.
          </p>
          <p>
            Les photographies présentées sont des visuels d'illustration en attendant les photographies officielles du
            restaurant.
          </p>
        </Block>

        <Block id="confidentialite" title="Politique de confidentialité">
          <p>
            Le Monde du Goût attache une importance particulière à la protection de vos données personnelles.
          </p>
          <p>
            <strong className="text-cream">Données collectées :</strong> le formulaire de contact collecte uniquement
            les informations que vous choisissez de transmettre (nom, email, téléphone, message) afin de répondre à
            votre demande.
          </p>
          <p>
            <strong className="text-cream">Utilisation :</strong> ces données sont utilisées exclusivement pour le
            traitement de votre demande et ne sont ni cédées, ni vendues à des tiers.
          </p>
          <p>
            <strong className="text-cream">Vos droits :</strong> conformément à la réglementation applicable (RGPD),
            vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer,
            contactez-nous à{" "}
            <a href={`mailto:${RESTAURANT.email}`} className="text-ember hover:underline">
              {RESTAURANT.email}
            </a>
            .
          </p>
        </Block>

        <Block title="Cookies">
          <p>
            Le site n'utilise pas de cookies publicitaires. Seuls des cookies strictement nécessaires à son bon
            fonctionnement peuvent être déposés.
          </p>
        </Block>

        <Block title="Contact">
          <p>
            Pour toute question relative au site ou à ces mentions :{" "}
            <a href={`mailto:${RESTAURANT.email}`} className="text-ember hover:underline">
              {RESTAURANT.email}
            </a>{" "}
            — {RESTAURANT.phoneDisplay}.
          </p>
        </Block>
      </main>
    </div>
  );
}
