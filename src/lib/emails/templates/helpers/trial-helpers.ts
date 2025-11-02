import { prepareEmailData, EMAIL_CONFIG } from "./email-renderer";
import { TrialStarted, TrialEndingSoon, TrialEnding, TrialExpired } from "../trial";

/**
 * HELPERS POUR LES ESSAIS GRATUITS
 * 
 * Ces helpers génèrent des emails liés aux périodes d'essai :
 * - Début d'essai
 * - Fin d'essai proche
 * - Dernier jour d'essai
 * - Essai expiré
 */

/**
 * Helper pour générer l'email de début d'essai
 */
export async function createTrialStartedEmail(data: {
  user: { name: string; email: string };
  plan: { name: string; price: string };
  trial: {
    duration: number;
    startDate: string;
    endDate: string;
  };
}) {
  const emailComponent = TrialStarted({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    trialDays: data.trial.duration,
    trialEndDate: data.trial.endDate,
    fullPrice: data.plan.price,
    dashboardUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard`,
    upgradeUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing/upgrade`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `🚀 Votre essai gratuit de ${data.plan.name} a commencé !`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de fin d'essai proche
 */
export async function createTrialEndingSoonEmail(data: {
  user: { name: string; email: string };
  plan: { name: string; price: string };
  trial: {
    endDate: string;
    daysRemaining: number;
  };
  billingPeriod?: "monthly" | "yearly";
  discount?: {
    percentage: number;
    validUntil: string;
  };
}) {
  const emailComponent = TrialEndingSoon({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    daysRemaining: data.trial.daysRemaining,
    trialEndDate: data.trial.endDate,
    fullPrice: data.plan.price,
    billingPeriod: data.billingPeriod || "monthly",
    upgradeUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing/upgrade`,
    discount: data.discount,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `⏰ Votre essai se termine dans ${data.trial.daysRemaining} jours`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de fin d'essai naturelle
 */
export async function createTrialEndingEmail(data: {
  user: { name: string; email: string };
  plan: { name: string; price: string };
  trial: {
    endDate: string;
    usageStats?: Array<{ label: string; value: string }>;
  };
}) {
  const emailComponent = TrialEnding({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    trialEndDate: data.trial.endDate,
    fullPrice: data.plan.price,
    usageStats: data.trial.usageStats,
    upgradeUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing/upgrade`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Votre essai de ${data.plan.name} se termine aujourd'hui`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email d'essai expiré
 */
export async function createTrialExpiredEmail(data: {
  user: { name: string; email: string };
  plan: { name: string; price: string };
  trial: {
    expiredDate: string;
    daysExpired?: number;
  };
  specialOffer?: {
    discount: number;
    validUntil: string;
    code?: string;
  };
}) {
  const emailComponent = TrialExpired({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    expiredDate: data.trial.expiredDate,
    fullPrice: data.plan.price,
    specialOffer: data.specialOffer,
    reactivateUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing/upgrade`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Offre spéciale : Revenez sur ${data.plan.name} !`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Types pour les essais gratuits
 */
export interface TrialUser {
  name: string;
  email: string;
  id?: string;
}

export interface TrialData {
  duration: number;
  startDate: string;
  endDate: string;
  expiredDate?: string;
  daysRemaining?: number;
  daysExpired?: number;
  usageStats?: Array<{ label: string; value: string }>;
}

export interface TrialDiscount {
  percentage: number;
  validUntil: string;
}

export interface SpecialOffer {
  discount: number;
  validUntil: string;
  code?: string;
}