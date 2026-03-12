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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function joinWaitlist(
  _prevState: WaitlistActionState,
  formData: FormData,
): Promise<WaitlistActionState> {
  const email = getStringValue(formData.get("email")).toLowerCase();
  const salonName = getStringValue(formData.get("salon_name"));
  const city = getStringValue(formData.get("city"));

  if (!EMAIL_REGEX.test(email)) {
    return {
      status: "error",
      message: "Merci d’entrer une adresse email valide.",
    };
  }

  if (salonName.length < 2) {
    return {
      status: "error",
      message: "Indiquez le nom de votre salon pour rejoindre la liste privée.",
    };
  }

  if (city.length < 2) {
    return {
      status: "error",
      message: "Ajoutez votre ville pour que le matching soit plus précis.",
    };
  }

  try {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("waitlist_leads").insert({
      city,
      email,
      salon_name: salonName,
      source: "laloge-waitlist",
      status: "new",
      metadata: {
        form: "luxury-waitlist-landing",
        surface: "bottom-hero",
        submitted_at: new Date().toISOString(),
      },
    });

    if (error) {
      if (error.code === "23505") {
        return {
          status: "duplicate",
          message: "Vous êtes déjà inscrit !",
        };
      }

      console.error("[joinWaitlist] Supabase insert failed", error);

      return {
        status: "error",
        message: "Une erreur est survenue. Réessayez dans un instant.",
      };
    }

    return {
      status: "success",
      message: "Vous êtes sur la liste ! 🎉",
    };
  } catch (error) {
    console.error("[joinWaitlist] Unexpected error", error);

    return {
      status: "error",
      message: "Impossible d’enregistrer votre demande pour le moment.",
    };
  }
}
