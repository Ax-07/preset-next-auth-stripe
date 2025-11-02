import { createTransporter } from "./mail.config";

/**
 * Fonction utilitaire pour envoyer un email.
 * @param email Destinataire
 * @param subject Sujet de l'email
 * @param html Contenu HTML
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}) {
  // Initialiser le transporter si pas déjà fait
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: from || process.env.EMAIL_USER, // Valeur par défaut
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);

    transporter.close();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
  }
}
