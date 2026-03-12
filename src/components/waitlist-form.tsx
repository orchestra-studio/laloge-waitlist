"use client";

import { useActionState, useEffect, useRef } from "react";
import { initialWaitlistState, joinWaitlist } from "../app/actions";

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(
    joinWaitlist,
    initialWaitlistState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="waitlist-form-stack">
      <form ref={formRef} action={formAction} className="form">
        <label className="form-label">
          <div className="form-input-wrapper">
            <input
              type="text"
              name="salon_name"
              placeholder="Nom de votre salon (optionnel)"
              autoComplete="organization"
              aria-label="Nom de votre salon"
              className="form-input"
            />
          </div>
        </label>

        <label className="form-label">
          <div className="form-input-wrapper">
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.com"
              autoComplete="email"
              aria-label="Adresse email"
              className="form-input"
            />
          </div>
        </label>

        <button type="submit" disabled={isPending} className="form-btn">
          {isPending ? "Envoi..." : "Demander mon accès"}
        </button>

        <p className="micro-text">Gratuit · Sans engagement</p>
      </form>

      {state.status !== "idle" && (
        <p className={`feedback ${state.status}`} aria-live="polite">
          {state.message}
        </p>
      )}
    </div>
  );
}
