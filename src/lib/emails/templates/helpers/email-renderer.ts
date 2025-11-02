import { render } from "@react-email/render";
import { ReactElement } from "react";

/**
 * Rend un composant React Email en HTML
 * @param emailComponent - Le composant email à rendre
 * @param options - Options de rendu
 * @returns Promise contenant le HTML et le texte brut
 */
export async function renderEmail(
  emailComponent: ReactElement,
  options?: {
    pretty?: boolean;
    plainText?: boolean;
  }
): Promise<{
  html: string;
  text?: string;
}> {
  const { pretty = true, plainText = true } = options || {};

  try {
    // Rendu HTML
    const html = await render(emailComponent, { pretty });

    // Rendu texte brut (optionnel)
    let text: string | undefined;
    if (plainText) {
      text = await render(emailComponent, { plainText: true });
    }

    return { html, text };
  } catch (error) {
    console.error("Erreur lors du rendu de l'email:", error);
    throw new Error("Impossible de rendre l'email");
  }
}

/**
 * Interface pour les données d'email communes
 */
export interface EmailRenderData {
  to: string;
  subject: string;
  from?: string;
}

/**
 * Helper pour préparer les données d'email
 * @param emailComponent - Le composant email
 * @param data - Les données d'email (to, subject, from)
 * @returns Données prêtes pour l'envoi
 */
export async function prepareEmailData(
  emailComponent: ReactElement,
  data: EmailRenderData
): Promise<{
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}> {
  const { html, text } = await renderEmail(emailComponent);

  return {
    to: data.to,
    subject: data.subject,
    html,
    text,
    from: data.from || process.env.EMAIL_USER,
  };
}

/**
 * Constantes pour la configuration des emails
 */
export const EMAIL_CONFIG = {
  DEFAULT_FROM: process.env.EMAIL_USER || "no-reply@example.com",
  COMPANY_NAME: process.env.COMPANY_NAME || "Votre App",
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || "support@example.com",
  BASE_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  LOGO_URL: process.env.LOGO_URL,
  COMPANY_ADDRESS: process.env.COMPANY_ADDRESS || "123 Rue de la Tech, 75001 Paris, France",
} as const;