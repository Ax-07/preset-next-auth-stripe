import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@/lib/database/prisma.client";
import { stripe, Subscription } from "@better-auth/stripe"
import { stripeClient } from "../stripe/stripe";
import { findUserForSubscription, getStripePlans } from "../stripe/stripe-server";
import Stripe from "stripe";
import { sendEmail } from "../emails/mail.service";
import { createAccountDeletedEmail, createPasswordResetEmail, createSubscriptionWelcomeEmail, createTrialEndingEmail, createTrialExpiredEmail, createTrialStartedEmail, createVerificationEmail, createWelcomeEmail } from "../emails/templates/helpers";
import { formatDate } from "@/utils/formatDate";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  session: {
    freshAge: 0, // Désactiver la vérification de session fraîche pour la suppression de compte
  },
  user: {
    stripe: {
      customerIdField: "stripeCustomerId", // Champ dans la table User pour stocker l'ID client Stripe
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
        const accountDeletedEmail = await createAccountDeletedEmail({
          user: { name: user.name, email: user.email },
          deletedDate: formatDate(new Date()),
        });
        await sendEmail(accountDeletedEmail);
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
      // Webhooks Stripe - PAS de rate limiting (Stripe envoie beaucoup d'événements rapidement)
      "/api/auth/stripe/webhook": {
        window: 60,
        max: 1000, // Très permissif pour les webhooks
      },

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
      const resetEmail = await createPasswordResetEmail({
        user: { name: user.name, email: user.email },
        url
      });
      await sendEmail(resetEmail);
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Mot de passe réinitialisé pour l'utilisateur: ${user.email}`);
    }
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
      const verificationEmail = await createVerificationEmail({
        user: { name: user.name, email: user.email },
        url
      });
      await sendEmail(verificationEmail);
    },
    afterEmailVerification: async ({ id, email, name, createdAt }) => {
      console.log(`Utilisateur vérifié: ${email} id: ${id} name: ${name} createdAt: ${createdAt}`);
      const welcomeEmail = await createWelcomeEmail({
        user: { name, email },
        signupMethod: "email",
        registrationDate: formatDate(createdAt),
        isEmailVerified: true
      });

      await sendEmail(welcomeEmail);
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Modify user data before creation
          return { data: { ...user, customField: "value" } };
        },
        after: async (user) => {
          // Perform actions after user creation
          // Envoyer un email de bienvenue si l'email est déjà vérifié (cas OAuth)
          if (user.emailVerified) {
            const welcomeEmail = await createWelcomeEmail({
              user: { name: user.name, email: user.email },
              signupMethod: "google",
              registrationDate: formatDate(user.createdAt),
              isEmailVerified: true
            });

            await sendEmail(welcomeEmail);
          }
        }
      },
      update: {
        before: async (userData) => {
          // Modify user data before update
          return { data: { ...userData, updatedAt: new Date() } };
        },
        after: async (user) => {
          // Perform actions after user update
        }
      }
    },
    session: {
      // Session hooks
    },
    account: {
      // Account hooks
    },
    verification: {
      // Verification hooks
    }
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
            // freeTrial: p.freeTrial || undefined,
            freeTrial: {
              days: p.freeTrial?.days || 0,
              onTrialStart: async (subscription) => {
                // Appelé lorsque la période d'essai commence
                const user = await findUserForSubscription({ stripeCustomerId: subscription.stripeCustomerId });
                console.log("user n'a pas été récupérer")
                if (user) {
                  const trialStartedEmail = await createTrialStartedEmail({
                    user: { name: user.name, email: user?.email },
                    plan: { name: p.name, price: p.price.toString() },
                    trial: {
                      duration: p.freeTrial?.days || 0,
                      startDate: formatDate(subscription.periodStart || new Date()),
                      endDate: formatDate(subscription.periodEnd || new Date())
                    }
                  })
                  await sendEmail(trialStartedEmail)
                }
              },
              onTrialEnd: async ({ subscription }, request) => {
                // Appelé lorsque la période d'essai se termine
                const user = await findUserForSubscription({ stripeCustomerId: subscription.stripeCustomerId });
                console.log("user n'a pas été récupérer")
                if (user) {
                  const trialStartedEmail = await createTrialEndingEmail({
                    user: { name: user.name, email: user?.email },
                    plan: { name: p.name, price: p.price.toString() },
                    trial: {
                      endDate: formatDate(subscription.periodEnd || new Date())
                    }
                  })
                  await sendEmail(trialStartedEmail)
                }
              },
              onTrialExpired: async (subscription) => {
                // Appelé lorsque la période d'essai expire sans conversion
                const user = await findUserForSubscription({ stripeCustomerId: subscription.stripeCustomerId });
                console.log("user n'a pas été récupérer")
                if (user) {
                  const trialStartedEmail = await createTrialExpiredEmail({
                    user: { name: user.name, email: user?.email },
                    plan: { name: p.name, price: p.price.toString() },
                    trial: {
                      expiredDate: formatDate(subscription.periodEnd || new Date())
                    }
                  })
                  await sendEmail(trialStartedEmail)
                }
              }
            }
          }));
        },

        onSubscriptionComplete: async ({ event, subscription, stripeSubscription, plan }) => {
          console.log("🎯 onSubscriptionComplete DÉCLENCHÉ !");

          const e = event as Stripe.Event;
          const sub = subscription as Subscription; console.log("subscription:", sub)
          const stripeSub = stripeSubscription as Stripe.Subscription; console.log('stripe subscription: ', stripeSub)
          const p = plan; console.log("plan: ", plan)

          console.log("✅ Nouvelle souscription créée via webhook Stripe:", {
            eventType: e.type,
            eventId: e.id,
            userId: sub.referenceId,
            stripeSub: stripeSub.id,
            statusStripe: stripeSub.status,
            planName: p?.name || 'unknown',
          });
          
          
          const user = await findUserForSubscription({ stripeCustomerId: subscription.stripeCustomerId });
          console.log("user: ", user)
          if (user) {
            const interval = stripeSub.items.data[0]?.price?.recurring?.interval;
            const billingPeriod = interval === 'year' ? 'yearly' : interval === 'month' ? 'monthly' : undefined;

            const subscriptionEmail = await createSubscriptionWelcomeEmail({
              user: { name: user.name, email: user.email },
              plan: { name: p.name, price: p.priceId },
              subscription: {
                billingPeriod,
                nextBillingDate: formatDate(sub.periodEnd || new Date()),
                nextBillingAmount: ((stripeSub.items.data[0]?.price?.unit_amount || 0) / 100).toString()
              },
              features: []
            })
            await sendEmail(subscriptionEmail)
          }
        },
        onSubscriptionUpdate: async ({ subscription }) => {
          console.log("🔄 onSubscriptionUpdate DÉCLENCHÉ !");

          // Logs détaillés pour debug
          console.log("📊 Détails de la mise à jour:", {
            referenceId: subscription.referenceId,
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
          });

          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: {
              status: subscription.status,
              cancelAtPeriodEnd: !!subscription.cancelAtPeriodEnd,
            },
          });

          // Si l'abonnement est marqué pour annulation, le signaler
          if (subscription.cancelAtPeriodEnd) {
            console.log("⚠️ Abonnement programmé pour annulation à la fin de la période");
          }

          console.log("✅ Subscription updated:", subscription.id);
        },
        onSubscriptionCancel: async ({ subscription }) => {
          console.log("❌ onSubscriptionCancel DÉCLENCHÉ !");

          await prisma.subscription.updateMany({
            where: { referenceId: subscription.referenceId },
            data: { status: "canceled" },
          });

          await prisma.user.update({
            where: { id: subscription.referenceId },
            data: { stripeSubscriptionId: null },
          });

          console.log("✅ Subscription cancelled:", subscription.referenceId);
        },
        onSubscriptionDeleted: async ({ subscription }) => {
          console.log("🗑️ onSubscriptionDeleted DÉCLENCHÉ !");
          await prisma.subscription.deleteMany({
            where: { stripeSubscriptionId: subscription.stripeSubscriptionId },
          });
          console.log("✅ Subscription deleted:", subscription.stripeSubscriptionId);
        }
      },
      onEvent: async (event) => {
        console.log("📢 Événement Stripe reçu:", event.type);
        switch (event.type) {
          case "invoice.payment_failed":
            const invoice = event.data.object as Stripe.Invoice;
            console.log(`⚠️ Paiement échoué pour la facture ${invoice.id} du client ${invoice.customer}`);
            break;
          case "customer.subscription.trial_will_end":
            const subscription = event.data.object as Stripe.Subscription;
            console.log(`⏳ La période d'essai de l'abonnement ${subscription.id} du client ${subscription.customer} va bientôt se terminer.`);
            break;
          // Gérer d'autres types d'événements si nécessaire
          default:
            console.log(`ℹ️ Événement non géré: ${event.type}`);
        }
      }
    }),
  ],
});