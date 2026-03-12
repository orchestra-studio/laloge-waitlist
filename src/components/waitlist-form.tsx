"use client";

import { useActionState, useEffect, useRef } from "react";
import { joinWaitlist, initialWaitlistState } from "../app/actions";

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(
    joinWaitlist,
    initialWaitlistState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <div className="waitlist-form-stack" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <form ref={formRef} action={formAction} className="form">
        <label className="form-label">
          <div className="form-input-wrapper">
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.com"
              autoComplete="email"
              className="form-input"
            />
          </div>
        </label>
        <button type="submit" disabled={isPending} className="form-btn">
          {isPending ? "..." : "Rejoindre"}
        </button>
      </form>

      {state.status !== "idle" && (
        <p className={`feedback ${state.status}`} aria-live="polite">
          {state.message}
        </p>
      )}
    </div>
  );
}
