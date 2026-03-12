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

  if (!EMAIL_REGEX.test(email)) {
    return {
      status: "error",
      message: "Merci d’entrer une adresse email valide.",
    };
  }

  try {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("waitlist_leads").insert({
      email,
      source: "laloge-waitlist",
      status: "new",
      metadata: {
        form: "framer-v4-minimal-waitlist",
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
