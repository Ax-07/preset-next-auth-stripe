// Templates de période d'essai
export { default as TrialStarted } from "./trial-started";
export { default as TrialEndingSoon } from "./trial-ending-soon";
export { TrialEnding } from "./trial-ending";
export { TrialExpired } from "./trial-expired";

// Types pour les templates de trial
export interface TrialEmailProps {
  userName: string;
  userEmail: string;
  planName: string;
  companyName?: string;
  logoUrl?: string;
}

export interface TrialStartedEmailData extends TrialEmailProps {
  trialDays: number;
  trialEndDate: string;
  dashboardUrl?: string;
  features?: string[];
  upgradeUrl?: string;
  trialPrice?: string;
  fullPrice?: string;
}

export interface TrialEndingSoonEmailData extends TrialEmailProps {
  daysRemaining: number;
  trialEndDate: string;
  fullPrice: string;
  billingPeriod?: "monthly" | "yearly";
  upgradeUrl?: string;
  cancelUrl?: string;
  featuresUsed?: string[];
  discount?: {
    percentage: number;
    validUntil: string;
  };
}