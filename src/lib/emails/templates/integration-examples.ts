/**
 * EXEMPLE D'INTÉGRATION AVEC BETTER AUTH
 * 
 * Ce fichier montre comment intégrer les nouveaux templates React Email
 * avec votre configuration Better Auth existante.
 * 
 * Remplacez les callbacks dans votre auth.ts par ces exemples.
 */

import { sendEmail } from "@/lib/emails/mail.service";
import { 
  createVerificationEmail, 
  createPasswordResetEmail,
  createSubscriptionWelcomeEmail 
} from "./helpers";

// EXEMPLE 1: Callback de vérification d'email pour Better Auth
export const sendVerificationEmailCallback = async ({ user, url }: { 
  user: { name: string; email: string }, 
  url: string 
}) => {
  try {
    const emailData = await createVerificationEmail({
      user,
      url,
      expiresInHours: 24,
    });

    await sendEmail(emailData);
    console.log(`✅ Email de vérification envoyé à ${user.email}`);
  } catch (error) {
    console.error("❌ Erreur envoi email de vérification:", error);
    throw error;
  }
};

// EXEMPLE 2: Callback de réinitialisation mot de passe pour Better Auth
export const sendResetPasswordCallback = async ({ user, url }: { 
  user: { name: string; email: string }, 
  url: string 
}) => {
  try {
    const emailData = await createPasswordResetEmail({
      user,
      url,
      expiresInHours: 1,
    });

    await sendEmail(emailData);
    console.log(`✅ Email de réinitialisation envoyé à ${user.email}`);
  } catch (error) {
    console.error("❌ Erreur envoi email de réinitialisation:", error);
    throw error;
  }
};

// EXEMPLE 3: Callback de bienvenue abonnement pour Stripe
export const sendSubscriptionWelcomeCallback = async (data: {
  user: { name: string; email: string };
  plan: { name: string; price?: string };
  subscription: any;
}) => {
  try {
    const emailData = await createSubscriptionWelcomeEmail({
      user: data.user,
      plan: data.plan,
      subscription: {
        billingPeriod: data.subscription.billingPeriod || "monthly",
        nextBillingDate: data.subscription.nextBillingDate,
        nextBillingAmount: data.subscription.nextBillingAmount,
      },
      features: [
        "Accès complet à toutes les fonctionnalités",
        "Support prioritaire",
        "Mises à jour automatiques",
        "Sauvegarde cloud illimitée",
      ],
    });

    await sendEmail(emailData);
    console.log(`✅ Email de bienvenue abonnement envoyé à ${data.user.email}`);
  } catch (error) {
    console.error("❌ Erreur envoi email de bienvenue:", error);
    throw error;
  }
};

/*
INTÉGRATION DANS VOTRE auth.ts:

import { 
  sendVerificationEmailCallback, 
  sendResetPasswordCallback,
  sendSubscriptionWelcomeCallback 
} from "@/lib/mail/templates/integration-examples";

export const auth = betterAuth({
  // ... autres configs
  
  emailAndPassword: {
    enabled: true,
    sendResetPassword: sendResetPasswordCallback,
  },
  
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: sendVerificationEmailCallback,
  },
  
  plugins: [
    stripe({
      // ... config stripe
      subscription: {
        onSubscriptionComplete: async ({ user, plan, subscription }) => {
          await sendSubscriptionWelcomeCallback({
            user,
            plan,
            subscription,
          });
        },
      },
    }),
  ],
});
*/