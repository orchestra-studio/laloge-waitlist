"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoaderCircle } from "lucide-react";

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

  return (
    <div className="waitlist-form-stack">
      <form ref={formRef} action={formAction} className="waitlist-form" noValidate>
        <label htmlFor="email" className="sr-only">
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="votre@email.com"
          className="waitlist-input"
          aria-describedby="waitlist-feedback"
        />

        <button type="submit" disabled={isPending} className="waitlist-submit">
          {isPending ? (
            <span className="submit-content">
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi
            </span>
          ) : (
            "Rejoindre"
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {state.status !== "idle" ? (
          <motion.p
            key={state.status}
            id="waitlist-feedback"
            className={`form-feedback ${state.status}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            aria-live="polite"
          >
            {state.message}
          </motion.p>
        ) : (
          <motion.p
            key="helper"
            id="waitlist-feedback"
            className="form-feedback helper"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            Ouverture par vagues, uniquement les annonces importantes.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
