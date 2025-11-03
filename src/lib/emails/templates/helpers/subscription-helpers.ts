import { prepareEmailData, EMAIL_CONFIG } from "./email-renderer";
import { SubscriptionWelcome, SubscriptionCancelled, SubscriptionUpdated, SubscriptionDeleted, SubscriptionRestored } from "../subscription";

/**
 * HELPERS POUR LES ABONNEMENTS
 * 
 * Ces helpers génèrent des emails liés à la gestion des abonnements :
 * - Bienvenue abonnement
 * - Annulation d'abonnement
 * - Mise à jour d'abonnement
 * - Suppression d'abonnement
 * - Restauration d'abonnement
 */

/**
 * Helper pour générer l'email de bienvenue abonnement
 * Compatible avec Better Auth Stripe onSubscriptionComplete
 */
export async function createSubscriptionWelcomeEmail(data: {
  user: { name: string; email: string };
  plan: { name: string; price?: string };
  subscription: {
    billingPeriod?: "monthly" | "yearly";
    nextBillingDate?: string;
    nextBillingAmount?: string;
  };
  features?: string[];
}) {
  const emailComponent = SubscriptionWelcome({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    planPrice: data.plan.price,
    billingPeriod: data.subscription.billingPeriod || "monthly",
    nextBillingDate: data.subscription.nextBillingDate,
    nextBillingAmount: data.subscription.nextBillingAmount,
    dashboardUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard`,
    billingUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing`,
    features: data.features || [],
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `🎉 Bienvenue dans ${data.plan.name} - ${EMAIL_CONFIG.COMPANY_NAME}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email d'annulation d'abonnement
 */
export async function createSubscriptionCancelledEmail(data: {
  user: { name: string; email: string };
  plan: { name: string };
  cancellation: {
    date: string;
    accessEndDate: string;
    reason?: string;
    refundAmount?: string;
    refundDate?: string;
  };
}) {
  const emailComponent = SubscriptionCancelled({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    cancelledDate: data.cancellation.date,
    accessEndDate: data.cancellation.accessEndDate,
    refundAmount: data.cancellation.refundAmount,
    refundDate: data.cancellation.refundDate,
    reason: data.cancellation.reason,
    reactivateUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/subscription`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Annulation de votre abonnement ${data.plan.name}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de mise à jour d'abonnement
 */
export async function createSubscriptionUpdatedEmail(data: {
  user: { name: string; email: string };
  oldPlan: { name: string; price?: string };
  newPlan: { name: string; price?: string };
  changeType: "upgrade" | "downgrade" | "billing_change";
  effectiveDate: string;
}) {
  const emailComponent = SubscriptionUpdated({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    oldPlan: {
      name: data.oldPlan.name,
      price: data.oldPlan.price,
    },
    newPlan: {
      name: data.newPlan.name,
      price: data.newPlan.price,
    },
    changeType: data.changeType,
    effectiveDate: data.effectiveDate,
    prorationAmount: "0€", // À calculer selon la logique métier
    nextBillingDate: data.effectiveDate,
    dashboardUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Votre abonnement a été modifié - ${EMAIL_CONFIG.COMPANY_NAME}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de suppression d'abonnement
 */
export async function createSubscriptionDeletedEmail(data: {
  user: { name: string; email: string };
  plan: { name: string };
  deletedDate: string;
  reason?: "payment_failed" | "cancelled_by_user" | "admin_action" | "other";
}) {
  const emailComponent = SubscriptionDeleted({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    deletedDate: data.deletedDate,
    reason: data.reason || "other",
    dataRetentionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Abonnement ${data.plan.name} supprimé définitivement`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de restauration d'abonnement
 */
export async function createSubscriptionRestoredEmail(data: {
  user: { name: string; email: string };
  plan: { name: string };
  restoration: {
    date: string;
    nextBillingDate: string;
    nextBillingAmount?: string;
    billingPeriod?: "monthly" | "yearly";
    previousCancellationDate?: string;
    wasDowngraded?: boolean;
  };
  features?: string[];
}) {
  const emailComponent = SubscriptionRestored({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    restoredDate: data.restoration.date,
    nextBillingDate: data.restoration.nextBillingDate,
    nextBillingAmount: data.restoration.nextBillingAmount || "0",
    billingPeriod: data.restoration.billingPeriod || "monthly",
    wasDowngraded: data.restoration.wasDowngraded || false,
    previousCancellationDate: data.restoration.previousCancellationDate,
    dashboardUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard`,
    billingUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing`,
    supportUrl: `${EMAIL_CONFIG.BASE_URL}/support`,
    features: data.features || [],
    companyName: EMAIL_CONFIG.COMPANY_NAME,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `🎉 Votre abonnement ${data.plan.name} a été restauré - ${EMAIL_CONFIG.COMPANY_NAME}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Types pour les abonnements
 */
export interface SubscriptionUser {
  name: string;
  email: string;
  id?: string;
}

export interface PlanData {
  name: string;
  price?: string;
}

export interface SubscriptionData {
  id?: string;
  billingPeriod?: "monthly" | "yearly";
  nextBillingDate?: string;
  nextBillingAmount?: string;
}

export interface CancellationData {
  date: string;
  accessEndDate: string;
  reason?: string;
  refundAmount?: string;
  refundDate?: string;
}

export interface RestorationData {
  date: string;
  nextBillingDate: string;
  nextBillingAmount: string;
  billingPeriod?: "monthly" | "yearly";
  previousCancellationDate?: string;
  wasDowngraded?: boolean;
}