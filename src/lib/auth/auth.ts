import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@/lib/database/prisma.client";
import { sendEmail } from "@/lib/mail/mail.service";
import { stripe } from "@better-auth/stripe"
import { stripeClient } from "../stripe/stripe";
import { getStripePlans } from "../stripe/stripe-server";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  session: {
    freshAge: 0, // Désactiver la vérification de session fraîche pour la suppression de compte
  },
  user: {
    stripe: {
      customerIdField: "stripeCustomerId" // Champ dans la table User pour stocker l'ID client Stripe

    },
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        // Supprimer les abonnements Stripe avant de supprimer l'utilisateur
        const userWithStripe = await prisma.user.findUnique({
          where: { id: user.id },
          select: { stripeCustomerId: true }
        });

        if (userWithStripe?.stripeCustomerId) {
          try {
            await prisma.subscription.deleteMany({
              where: {
                stripeCustomerId: userWithStripe.stripeCustomerId
              }
            });
          } catch (error) {
            console.error("Erreur lors de la suppression des abonnements:", error);
          }
        }
      },
      afterDelete: async (user) => {
        console.log(`Compte supprimé: ${user.email}`);
      }
    }
  },
  // Configuration Rate Limiting optimisée
  rateLimit: {
    enabled: true,
    window: 60, // 60 secondes = 1 minute (fenêtre par défaut)
    max: 10, // 10 requêtes max par minute (par défaut pour routes non spécifiées)

    // Règles personnalisées par endpoint Better Auth
    customRules: {
      // Inscription - très restrictif
      "/sign-up/email": {
        window: 3600, // 1 heure
        max: 3, // Maximum 3 inscriptions par heure par IP
      },

      // Connexion - modérément restrictif (protection brute force)
      "/sign-in/email": {
        window: 900, // 15 minutes
        max: 5, // Maximum 5 tentatives de connexion
      },

      // OAuth - moins restrictif (pas de brute force possible)
      "/sign-in/social": {
        window: 300, // 5 minutes
        max: 10, // 10 tentatives max
      },

      // Mot de passe oublié - très restrictif
      "/forget-password": {
        window: 3600, // 1 heure
        max: 3, // Maximum 3 demandes par heure
      },

      // Réinitialisation mot de passe - restrictif
      "/reset-password": {
        window: 3600, // 1 heure
        max: 5, // Maximum 5 tentatives avec différents tokens
      },

      // Envoi email de vérification - restrictif
      "/send-verification-email": {
        window: 3600, // 1 heure
        max: 3, // Maximum 3 renvois par heure
      },

      // Vérification email - modéré
      "/verify-email": {
        window: 300, // 5 minutes
        max: 10, // 10 tentatives (cas où utilisateur clique plusieurs fois)
      },

      // Mise à jour profil - modéré
      "/update-user": {
        window: 300, // 5 minutes
        max: 10, // 10 modifications max
      },

      // Session/Refresh - moins restrictif
      "/get-session": {
        window: 60, // 1 minute
        max: 30, // 30 vérifications de session par minute
      },
    },

    // IMPORTANT: Utiliser "database" en production pour persistance entre instances
    // "memory" uniquement pour développement local
    storage: process.env.NODE_ENV === "production" ? "database" : "memory",
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // Ne pas connecter automatiquement - l'utilisateur doit vérifier son email d'abord
    requireEmailVerification: true, // Exiger la vérification de l'email avant de se connecter
    sendResetPassword: async ({ user, url }) => {
      // L'URL générée par better-auth contient déjà le token
      // Elle pointe vers /auth/reset-password?token=xxx grâce au redirectTo
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        text: `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${url}`,
        html: `<p>Bonjour,</p>
                       <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
                       <p><a href="${url}" target="_blank">${url}</a></p>
                       <p>Ce lien expirera dans 1 heure.</p>
                       <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>`,
        from: process.env.EMAIL_USER || "no-reply@example.com"
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendOnSignUp: true, // Envoyer automatiquement l'email de vérification lors de l'inscription
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Vérification de votre adresse email",
        text: `Cliquez sur ce lien pour vérifier votre adresse email: ${url}`,
        html: `<p>Bonjour <strong>${user.name}</strong>,</p>
                       <p>Merci de vous être inscrit. Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p>
                       <p><a href="${url}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Vérifier mon email</a></p>
                       <p>Ou copiez ce lien dans votre navigateur :</p>
                       <p>${url}</p>
                       <p>Ce lien expirera dans 24 heures.</p>
                       <p>Si vous n'avez pas demandé cette vérification, ignorez cet email.</p>`,
        from: process.env.EMAIL_USER || "no-reply@example.com"
      });
    },
  },
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: async () => {
          const plans = (await getStripePlans()).plans;
          return plans.map(p => ({
            name: p.name,
            priceId: p.priceId!,
            annualDiscountPriceId: p.annualDiscountPriceId || undefined,
            freeTrial: p.freeTrial || undefined,
          }));
        },
        onSubscriptionComplete: async ({ subscription, stripeSubscription }) => {
          const refId = subscription.referenceId;          // <- référence (user/org)
          // Exemple 1 : via referenceId (si ta table le stocke)
          await prisma.subscription.updateMany({
            where: { referenceId: refId },
            data: { stripeSubscriptionId: stripeSubscription.id },
          });
        }, 
      }
    })
  ],
})