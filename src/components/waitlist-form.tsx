"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";

import { initialWaitlistState, joinWaitlist } from "../app/actions";

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(
    joinWaitlist,
    initialWaitlistState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const isFeedbackVisible = state.status !== "idle";
  const isSuccess = state.status === "success";
  const isDuplicate = state.status === "duplicate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="luxury-card rounded-[var(--radius-xl)] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-8"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[color:var(--color-gold-border)] bg-[var(--color-gold-soft)] px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-gold)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Liste privée
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-[2rem] leading-tight text-[color:var(--color-cream)] sm:text-[2.4rem]">
                Réservez votre <span className="italic text-[color:var(--color-gold)]">accès prioritaire</span>.
              </h3>
              <p className="max-w-xl text-base leading-7 text-muted sm:text-[1.05rem]">
                Quelques informations suffisent pour activer votre passage dans la
                prochaine vague d’onboarding salons.
              </p>
            </div>
          </div>
          <div className="hidden min-w-[132px] rounded-[var(--radius-lg)] border border-[color:var(--color-gold-border)] bg-[rgba(250,247,242,0.03)] px-4 py-3 text-right text-sm text-subtle sm:block">
            <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--color-gold)]">
              Activation
            </div>
            <div className="mt-1 font-display text-[1.2rem] text-[color:var(--color-cream)]">
              Vague 01
            </div>
          </div>
        </div>

        <form ref={formRef} action={formAction} className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="form-label">Email professionnel</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="salon@exemple.fr"
              className="input-shell"
            />
          </label>

          <label className="space-y-2">
            <span className="form-label">Nom du salon</span>
            <input
              type="text"
              name="salon_name"
              required
              autoComplete="organization"
              placeholder="Maison Éclat"
              className="input-shell"
            />
          </label>

          <label className="space-y-2">
            <span className="form-label">Ville</span>
            <input
              type="text"
              name="city"
              required
              autoComplete="address-level2"
              placeholder="Paris"
              className="input-shell"
            />
          </label>

          <div className="flex flex-col gap-3 pt-2 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-sm leading-6 text-subtle">
              En soumettant ce formulaire, vous demandez un accès prioritaire à La
              Loge. Aucun spam, uniquement l’ouverture de la conciergerie.
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="gold-button inline-flex min-h-14 items-center justify-center gap-2 px-6 text-sm font-semibold uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
                  Enregistrement
                </>
              ) : (
                <>
                  Rejoindre la liste
                  <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {isFeedbackVisible ? (
            <motion.div
              key={state.status}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-live="polite"
              className={`rounded-[var(--radius-lg)] border px-4 py-4 sm:px-5 ${
                isSuccess
                  ? "border-[color:rgba(197,165,114,0.34)] bg-[linear-gradient(135deg,rgba(197,165,114,0.18),rgba(250,247,242,0.05))]"
                  : isDuplicate
                    ? "border-[color:rgba(197,165,114,0.26)] bg-[rgba(197,165,114,0.08)]"
                    : "border-[color:rgba(255,255,255,0.12)] bg-[rgba(250,247,242,0.04)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:rgba(197,165,114,0.24)] bg-[rgba(197,165,114,0.14)] text-[color:var(--color-gold)]">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-[color:var(--color-cream)]">
                    {state.message}
                  </p>
                  <p className="text-sm leading-6 text-muted">
                    {isSuccess
                      ? "Nous vous contacterons avant l’ouverture publique pour organiser votre accès concierge."
                      : isDuplicate
                        ? "Votre salon fait déjà partie de la pré-liste. Nous reviendrons vers vous dès l’ouverture."
                        : "Vérifiez vos informations puis réessayez. Si le problème persiste, contactez-nous directement."}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
