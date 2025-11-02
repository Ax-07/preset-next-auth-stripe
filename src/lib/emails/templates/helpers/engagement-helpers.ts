import { prepareEmailData, EMAIL_CONFIG } from "./email-renderer";
import { FeedbackRequest, AbandonedProcess } from "../engagement";

/**
 * HELPERS POUR L'ENGAGEMENT UTILISATEUR
 * 
 * Ces helpers génèrent des emails pour améliorer l'engagement :
 * - Demande de feedback
 * - Processus abandonnés
 * - Onboarding
 * - Réactivation
 */

/**
 * Helper pour générer l'email de demande de feedback
 */
export async function createFeedbackRequestEmail(data: {
  user: { name: string; email: string };
  feedbackType: "onboarding" | "feature_usage" | "satisfaction" | "churn_prevention" | "general";
  timeSinceSignup: string;
  userActivity?: {
    loginCount: number;
    featuresUsed: string[];
    lastActiveDate: string;
  };
  surveyUrl?: string;
  incentive?: {
    type: "discount" | "credit" | "gift" | "none";
    description: string;
  };
}) {
  const emailComponent = FeedbackRequest({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    feedbackType: data.feedbackType,
    timeSinceSignup: data.timeSinceSignup,
    userActivity: data.userActivity,
    surveyUrl: data.surveyUrl,
    incentive: data.incentive,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  const subjectMap = {
    onboarding: "Comment s'est passée votre découverte ? 🚀",
    feature_usage: "Votre avis sur nos fonctionnalités ? ⚡",
    satisfaction: "Êtes-vous satisfait de votre expérience ? 😊",
    churn_prevention: "Nous aimerions vous entendre... 💭",
    general: "Votre avis nous intéresse ! 💬"
  };

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: subjectMap[data.feedbackType],
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de processus abandonné
 */
export async function createAbandonedProcessEmail(data: {
  user: { name: string; email: string };
  processType: "signup" | "subscription" | "checkout" | "profile_completion" | "onboarding";
  abandonedAt: string;
  resumeUrl: string;
  progress?: {
    completed: number;
    total: number;
    lastStep: string;
  };
  incentive?: {
    type: "discount" | "credit" | "free_trial" | "none";
    description: string;
    expiresAt?: string;
  };
}) {
  const emailComponent = AbandonedProcess({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    processType: data.processType,
    abandonedAt: data.abandonedAt,
    progress: data.progress,
    resumeUrl: data.resumeUrl,
    incentive: data.incentive,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  const subjectMap = {
    signup: "Finalisez votre inscription en quelques clics",
    subscription: "Votre abonnement premium vous attend",
    checkout: "Votre commande est en attente",
    profile_completion: "Complétez votre profil pour une meilleure expérience",
    onboarding: "Terminez votre configuration"
  };

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: subjectMap[data.processType],
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Types pour l'engagement utilisateur
 */
export interface EngagementUser {
  name: string;
  email: string;
  id?: string;
}

export interface FeedbackData {
  type: "onboarding" | "feature_usage" | "satisfaction" | "churn_prevention" | "general";
  timeSinceSignup: string;
  activity?: {
    loginCount: number;
    featuresUsed: string[];
    lastActiveDate: string;
  };
  surveyUrl?: string;
  incentive?: {
    type: "discount" | "credit" | "gift" | "none";
    description: string;
  };
}

export interface AbandonedProcessData {
  type: "signup" | "subscription" | "checkout" | "profile_completion" | "onboarding";
  abandonedAt: string;
  resumeUrl: string;
  progress?: {
    completed: number;
    total: number;
    lastStep: string;
  };
  incentive?: {
    type: "discount" | "credit" | "free_trial" | "none";
    description: string;
    expiresAt?: string;
  };
}

export interface UserActivity {
  loginCount: number;
  featuresUsed: string[];
  lastActiveDate: string;
}

export interface ProcessProgress {
  completed: number;
  total: number;
  lastStep: string;
}

export interface Incentive {
  type: "discount" | "credit" | "gift" | "free_trial" | "none";
  description: string;
  expiresAt?: string;
}