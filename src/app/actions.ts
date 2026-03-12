"use server";

import { createSupabaseServerClient } from "../lib/supabase";

export type WaitlistActionState = {
  status: "idle" | "success" | "duplicate" | "error";
  message: string;
};

export const initialWaitlistState: WaitlistActionState = {
  status: "idle",
  message: "",
};

export async function joinWaitlist(
  _prev: WaitlistActionState,
  formData: FormData
): Promise<WaitlistActionState> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Merci d'entrer une adresse email valide." };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("waitlist_leads").insert({
      email,
      source: "laloge-waitlist",
      status: "new",
      metadata: { submitted_at: new Date().toISOString() },
    });

    if (error) {
      if (error.code === "23505") {
        return { status: "duplicate", message: "Vous êtes déjà inscrit — on vous contactera bientôt." };
      }
      console.error("[joinWaitlist]", error);
      return { status: "error", message: "Une erreur est survenue. Réessayez." };
    }

    return { status: "success", message: "Vous êtes sur la liste ! On vous contactera avant l'ouverture." };
  } catch (e) {
    console.error("[joinWaitlist]", e);
    return { status: "error", message: "Impossible d'enregistrer pour le moment." };
  }
}
