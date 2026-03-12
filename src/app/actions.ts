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
  const rawEmail = formData.get("email");
  const rawSalonName = formData.get("salon_name");

  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const salonName =
    typeof rawSalonName === "string" ? rawSalonName.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "Merci d'entrer une adresse email valide.",
    };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("waitlist_leads").insert({
      email,
      salon_name: salonName || null,
      source: "laloge-waitlist",
      status: "new",
      metadata: { submitted_at: new Date().toISOString() },
    });

    if (error) {
      if (error.code === "23505") {
        return {
          status: "duplicate",
          message:
            "Vous faites déjà partie du cercle — nous vous contacterons bientôt.",
        };
      }

      console.error("[joinWaitlist]", error);
      return {
        status: "error",
        message: "Une erreur est survenue. Réessayez.",
      };
    }

    return {
      status: "success",
      message:
        "Bienvenue dans le cercle. Nous vous contacterons avant l'ouverture.",
    };
  } catch (error) {
    console.error("[joinWaitlist]", error);
    return {
      status: "error",
      message: "Impossible d'enregistrer pour le moment.",
    };
  }
}
