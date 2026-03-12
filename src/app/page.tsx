import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Gem,
  HandCoins,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AnimatedStats } from "../components/animated-stats";
import { WaitlistForm } from "../components/waitlist-form";

const HERO_STATS = [
  {
    value: "1 700+",
    label: "salons cartographiés",
  },
  {
    value: "6",
    label: "marques partenaires",
  },
  {
    value: "100%",
    label: "piloté par IA",
  },
] as const;

const PILLARS: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Négociation exclusive",
    description:
      "La Loge parle aux marques avec le poids d’un collectif sélectionné, pour défendre les intérêts du salon au bon moment.",
    icon: HandCoins,
  },
  {
    title: "Conditions premium",
    description:
      "Tarifs, formations, activations et attentions commerciales structurés comme un service de conciergerie, pas comme un simple achat.",
    icon: Gem,
  },
  {
    title: "IA au service du salon",
    description:
      "Scoring, enrichissement et matching intelligent permettent de prioriser les meilleures opportunités sans surcharge opérationnelle.",
    icon: Bot,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Inscription privée",
    description:
      "Vous laissez vos informations et votre positionnement. Nous réservons votre place dans la prochaine vague d’activation.",
  },
  {
    number: "02",
    title: "Match IA",
    description:
      "Notre moteur croise profil salon, localisation, volume potentiel et affinités marques pour identifier les meilleures pistes.",
  },
  {
    number: "03",
    title: "Négociation pilotée",
    description:
      "La Loge orchestre les échanges et prépare les conditions à négocier avant même votre entrée dans le programme concierge.",
  },
] as const;

const BENEFITS = [
  "Accès prioritaire à l’ouverture de La Loge.",
  "Matching marques aligné avec le profil réel de votre salon.",
  "Premières négociations préparées avant le lancement public.",
] as const;

export default function Home() {
  return (
    <main className="page-shell">
      <a
        href="#waitlist"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-full)] focus:bg-[color:var(--color-cream)] focus:px-4 focus:py-2 focus:text-[color:var(--color-black)]"
      >
        Aller directement au formulaire
      </a>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-5 pb-10 pt-5 sm:px-8 lg:px-10">
        <header className="luxury-card rounded-[var(--radius-full)] px-5 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] text-[color:var(--color-gold)]">
                <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-[1.25rem] text-[color:var(--color-cream)]">
                  La Loge
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-subtle">
                  Premier Concierge IA Beauté
                </p>
              </div>
            </div>

            <a
              href="#waitlist"
              className="gold-button inline-flex min-h-11 items-center justify-center gap-2 px-5 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Liste privée
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-7rem)] items-center py-14 sm:py-18 lg:py-24">
          <div className="grid w-full gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="flex flex-col justify-center gap-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-full)] border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-gold)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                La Loge · Premier Concierge IA Beauté
              </div>

              <div className="space-y-6">
                <h1 className="font-display text-[clamp(4.5rem,11vw,8.5rem)] leading-[0.92] text-[color:var(--color-cream)]">
                  <span className="block">La Loge</span>
                  <span className="mt-5 block max-w-[12ch] text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[0.98]">
                    La conciergerie beauté qui négocie <span className="italic text-[color:var(--color-gold)]">pour vous</span>.
                  </span>
                </h1>
                <p className="max-w-[43rem] text-lg leading-8 text-muted sm:text-[1.12rem]">
                  Les meilleurs salons de France ont enfin un concierge IA. Scoring
                  intelligent, enrichissement automatique et mise en relation avec
                  les grandes marques beauté pour obtenir des conditions plus nettes,
                  sans friction côté salon.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#waitlist"
                  className="gold-button inline-flex min-h-14 items-center justify-center gap-2 px-7 text-sm font-semibold uppercase tracking-[0.18em]"
                >
                  Demander un accès prioritaire
                  <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
                <a
                  href="#how-it-works"
                  className="ghost-button inline-flex min-h-14 items-center justify-center gap-2 px-6 text-sm uppercase tracking-[0.16em]"
                >
                  Découvrir la méthode
                  <ChevronDown className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="luxury-card rounded-[var(--radius-lg)] px-4 py-4"
                  >
                    <div className="text-[1.45rem] font-semibold tracking-tight text-[color:var(--color-gold)]">
                      {stat.value}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[38rem]">
                <div className="luxury-card rounded-[calc(var(--radius-xl)+6px)] p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-gold)]">
                        Cabinet privé
                      </p>
                      <h2 className="mt-3 font-display text-[2rem] leading-tight text-[color:var(--color-cream)] sm:text-[2.45rem]">
                        Un dossier concierge pensé pour les salons <span className="italic text-[color:var(--color-gold)]">désirables</span>.
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] text-[color:var(--color-gold)]">
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-[var(--radius-lg)] border border-[color:rgba(250,247,242,0.1)] bg-[rgba(250,247,242,0.03)] p-5">
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-subtle">
                        Salon observé
                      </p>
                      <p className="mt-2 font-display text-[1.6rem] text-[color:var(--color-cream)]">
                        Maison Éclat · Paris 8
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        Profil premium, expertise coloration, panier moyen élevé,
                        clientèle fidèle et fort potentiel de partenariat marque.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[var(--radius-lg)] border border-[color:rgba(250,247,242,0.1)] bg-[rgba(250,247,242,0.03)] p-5">
                        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-subtle">
                          Marques matchées
                        </p>
                        <ul className="mt-4 space-y-3 text-sm text-muted">
                          <li className="flex items-center justify-between gap-3">
                            <span>Wella Professionals</span>
                            <span className="text-[color:var(--color-gold)]">92%</span>
                          </li>
                          <li className="flex items-center justify-between gap-3">
                            <span>Schwarzkopf Pro</span>
                            <span className="text-[color:var(--color-gold)]">88%</span>
                          </li>
                          <li className="flex items-center justify-between gap-3">
                            <span>Revlon Pro</span>
                            <span className="text-[color:var(--color-gold)]">84%</span>
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-[var(--radius-lg)] border border-[color:rgba(250,247,242,0.1)] bg-[rgba(250,247,242,0.03)] p-5">
                        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-subtle">
                          Angles de négociation
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                          <li>Remise réseau sur la coloration.</li>
                          <li>Plan formation pour l’équipe.</li>
                          <li>Activation marque en salon.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="luxury-card absolute -bottom-6 left-4 max-w-[15rem] rounded-[var(--radius-lg)] px-4 py-4 backdrop-blur-xl sm:-left-4 sm:max-w-[16rem]">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">
                    Concierge IA active
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Enrichissement, scoring et priorisation déjà en marche avant
                    votre entrée sur invitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="space-y-5">
            <div className="space-y-4">
              <span className="section-eyebrow">Trois piliers</span>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-4">
                  <h2 className="font-display text-[2.3rem] leading-tight text-[color:var(--color-cream)] sm:text-[3.2rem]">
                    Un service pensé comme un <span className="italic text-[color:var(--color-gold)]">club privé</span>, opéré par la donnée.
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-muted sm:text-[1.04rem]">
                    La Loge ne vend pas un outil de plus. Elle défend le salon,
                    prépare les dossiers et crée les bonnes conversations avec les
                    bonnes marques, au bon niveau d’exigence.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <article
                    key={pillar.title}
                    className="luxury-card rounded-[var(--radius-xl)] p-6 sm:p-7"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] text-[color:var(--color-gold)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-display text-[1.7rem] leading-tight text-[color:var(--color-cream)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted">
                      {pillar.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="space-y-5">
              <span className="section-eyebrow">Comment ça marche</span>
              <h2 className="font-display text-[2.2rem] leading-tight text-[color:var(--color-cream)] sm:text-[3.1rem]">
                Une entrée fluide, une préparation <span className="italic text-[color:var(--color-gold)]">très sérieuse</span>.
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted sm:text-[1.04rem]">
                Chaque salon dépose sa demande. Ensuite, La Loge active son moteur,
                enrichit le dossier et prépare la négociation avant la mise en
                relation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {STEPS.map((step) => (
                <article
                  key={step.number}
                  className="luxury-card rounded-[var(--radius-xl)] p-6 sm:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] font-display text-[1.15rem] text-[color:var(--color-gold)]">
                    {step.number}
                  </div>
                  <h3 className="mt-5 font-display text-[1.6rem] leading-tight text-[color:var(--color-cream)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-14">
            <div className="space-y-5">
              <span className="section-eyebrow">Chiffres</span>
              <h2 className="font-display text-[2.25rem] leading-tight text-[color:var(--color-cream)] sm:text-[3.15rem]">
                Un réseau qui parle déjà le langage des <span className="italic text-[color:var(--color-gold)]">grandes marques</span>.
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted sm:text-[1.04rem]">
                La Loge s’appuie sur une base salons structurée, un scoring dynamique
                et un travail d’enrichissement continu pour sélectionner les dossiers
                avec le plus de valeur de négociation.
              </p>
            </div>
            <AnimatedStats />
          </div>
        </section>

        <section id="waitlist" className="scroll-mt-28 py-14 sm:py-18 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-14">
            <div className="space-y-6">
              <span className="section-eyebrow">Waitlist</span>
              <h2 className="font-display text-[2.45rem] leading-tight text-[color:var(--color-cream)] sm:text-[3.45rem]">
                Rejoignez la liste d’attente d’un <span className="italic text-[color:var(--color-gold)]">service rare</span>.
              </h2>
              <p className="max-w-xl text-base leading-7 text-muted sm:text-[1.06rem]">
                Nous ouvrons La Loge par vagues successives pour préserver la qualité
                du matching et la profondeur de la négociation. Les premiers inscrits
                obtiennent l’accès prioritaire.
              </p>

              <div className="luxury-card rounded-[var(--radius-xl)] p-6 sm:p-7">
                <div className="space-y-4">
                  {BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] text-[color:var(--color-gold)]">
                        <Check className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>
                      <p className="text-base leading-7 text-muted">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="luxury-card rounded-[var(--radius-lg)] p-5">
                  <ShieldCheck className="h-5 w-5 text-[color:var(--color-gold)]" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-6 text-muted">
                    Données utilisées uniquement pour votre onboarding La Loge.
                  </p>
                </div>
                <div className="luxury-card rounded-[var(--radius-lg)] p-5">
                  <Gem className="h-5 w-5 text-[color:var(--color-gold)]" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-6 text-muted">
                    Approche premium, volume limité et lancement par invitation.
                  </p>
                </div>
              </div>
            </div>

            <WaitlistForm />
          </div>
        </section>

        <footer className="border-t border-[color:rgba(250,247,242,0.08)] py-8 text-sm text-subtle">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Orchestra Intelligence · La Loge © 2026</p>
            <a
              href="mailto:ludovic@orchestraintelligence.fr"
              className="inline-flex items-center gap-2 text-muted transition-colors hover:text-[color:var(--color-gold)]"
            >
              Contact
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
