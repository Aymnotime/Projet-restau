import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RESTAURANT } from "../data/site";
import { Kicker, OrderButton, Reveal, usePageMeta, WordsReveal } from "../components/ui";
import { IconCheck, IconClock, IconMail, IconPhone, IconPin } from "../components/Icons";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function Contact() {
  usePageMeta(
    "Contact — Le Monde du Goût · Saint-Denis",
    "Contactez Le Monde du Goût : 45 Rue de la Boulangerie, 93200 Saint-Denis. 09 87 41 78 73 · contact@lemondedugout.fr"
  );
  const reduce = useReducedMotion();
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = "Veuillez saisir une adresse email valide.";
    if (values.phone.trim() && !/^[+\d][\d\s.\-]{7,}$/.test(values.phone.trim()))
      e.phone = "Veuillez saisir un numéro de téléphone valide.";
    if (values.message.trim().length < 10) e.message = "Votre message doit contenir au moins 10 caractères.";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const field =
    "w-full border border-graphite bg-coal px-4 py-3 text-sm text-cream placeholder:text-muted/70 transition-colors focus:border-ember focus:outline-none";
  const label = "mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-sand";
  const err = "mt-1.5 text-xs font-semibold text-ember";

  return (
    <div className="pt-28 lg:pt-36">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Kicker>Écrivez-nous</Kicker>
        </Reveal>
        <h1 className="mt-5 font-display text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.88] tracking-wide">
          <WordsReveal text="CONTACT" />
          <span className="text-ember"><WordsReveal text="." baseDelay={0.1} /></span>
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-sand">
            Une question, une commande spéciale, un événement ? Laissez-nous un message — ou passez nous voir, c'est
            encore mieux.
          </p>
        </Reveal>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ——— Coordonnées ——— */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {[
                {
                  icon: IconPin,
                  title: "Adresse",
                  body: (
                    <>
                      {RESTAURANT.address.street}
                      <br />
                      {RESTAURANT.address.zipCity}
                    </>
                  ),
                  href: RESTAURANT.mapsDirections,
                  cta: "Itinéraire",
                },
                {
                  icon: IconPhone,
                  title: "Téléphone",
                  body: RESTAURANT.phoneDisplay,
                  href: RESTAURANT.phoneHref,
                  cta: "Appeler",
                },
                {
                  icon: IconMail,
                  title: "Email",
                  body: RESTAURANT.email,
                  href: `mailto:${RESTAURANT.email}`,
                  cta: "Écrire",
                },
                {
                  icon: IconClock,
                  title: "Horaires",
                  body: RESTAURANT.hoursLabel,
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div className="group flex items-start gap-4 border border-graphite bg-soot p-5 transition-colors hover:border-ember/60">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-graphite text-ember transition-colors group-hover:border-ember group-hover:bg-ember group-hover:text-coal">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.26em] text-muted">{item.title}</h2>
                      <p className="mt-1 text-sm font-semibold leading-relaxed text-cream">{item.body}</p>
                      {item.href && (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1 inline-block text-xs font-bold uppercase tracking-[0.18em] text-ember transition-colors hover:text-cream"
                        >
                          {item.cta} →
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="mt-6 border border-dashed border-line bg-graphite/30 p-5">
                <p className="text-sm font-semibold text-cream">Envie de commander maintenant ?</p>
                <div className="mt-3">
                  <OrderButton size="sm">COMMANDER</OrderButton>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ——— Formulaire ——— */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="border border-graphite bg-soot p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4 }}
                      className="py-10 text-center"
                      role="status"
                    >
                      <span className="mx-auto flex h-16 w-16 items-center justify-center border border-ember bg-ember/10 text-ember">
                        <IconCheck className="h-8 w-8" />
                      </span>
                      <h2 className="mt-6 font-display text-4xl tracking-wide">
                        MESSAGE ENVOYÉ<span className="text-ember">.</span>
                      </h2>
                      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-sand">
                        Merci {values.name.trim().split(" ")[0]} ! Nous revenons vers vous très vite. Pour une commande
                        immédiate, appelez le{" "}
                        <a href={RESTAURANT.phoneHref} className="font-semibold text-ember hover:underline">
                          {RESTAURANT.phoneDisplay}
                        </a>
                        .
                      </p>
                      <button
                        onClick={() => {
                          setSent(false);
                          setValues({ name: "", email: "", phone: "", message: "" });
                        }}
                        className="mt-8 border border-sand/40 px-6 py-3 font-display text-sm tracking-[0.14em] text-cream transition-colors hover:border-ember hover:text-ember"
                      >
                        ENVOYER UN AUTRE MESSAGE
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      noValidate
                      initial={false}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: reduce ? 0 : 0.3 }}
                    >
                      <h2 className="font-display text-3xl tracking-wide">
                        LAISSEZ-NOUS UN MESSAGE<span className="text-ember">.</span>
                      </h2>
                      <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className={label}>
                            Nom <span className="text-ember">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-err" : undefined}
                            placeholder="Votre nom"
                            className={field}
                          />
                          {errors.name && (
                            <p id="name-err" className={err} role="alert">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className={label}>
                            Email <span className="text-ember">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-err" : undefined}
                            placeholder="vous@exemple.fr"
                            className={field}
                          />
                          {errors.email && (
                            <p id="email-err" className={err} role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="phone" className={label}>
                            Téléphone <span className="text-muted">(facultatif)</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={values.phone}
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-err" : undefined}
                            placeholder="06 12 34 56 78"
                            className={field}
                          />
                          {errors.phone && (
                            <p id="phone-err" className={err} role="alert">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="message" className={label}>
                            Message <span className="text-ember">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={values.message}
                            onChange={(e) => setValues({ ...values, message: e.target.value })}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-err" : undefined}
                            placeholder="Votre message…"
                            className={`${field} resize-y`}
                          />
                          {errors.message && (
                            <p id="message-err" className={err} role="alert">
                              {errors.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap items-center gap-5">
                        <button
                          type="submit"
                          className="group inline-flex items-center gap-3 bg-ember px-8 py-4 font-display text-base tracking-[0.14em] text-coal transition-all hover:bg-ember-dark active:scale-[0.97]"
                        >
                          ENVOYER
                          <IconCheck className="h-5 w-5 transition-transform group-hover:scale-110" />
                        </button>
                        <p className="text-xs text-muted">
                          <span className="text-ember">*</span> Champs obligatoires
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
