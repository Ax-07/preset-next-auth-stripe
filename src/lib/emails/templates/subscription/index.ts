// Templates d'abonnement
export { default as SubscriptionWelcome } from "./subscription-welcome";
export { default as SubscriptionCancelled } from "./subscription-cancelled";
export { SubscriptionUpdated } from "./subscription-updated";
export { SubscriptionDeleted } from "./subscription-deleted";

// Types pour les templates d'abonnement
export interface BaseSubscriptionEmailProps {
  userName: string;
  userEmail: string;
  planName: string;
  planPrice?: string;
  billingPeriod?: "monthly" | "yearly";
  subscriptionId?: string;
  companyName?: string;
  logoUrl?: string;
}

export interface WelcomeSubscriptionEmailData extends BaseSubscriptionEmailProps {
  nextBillingDate?: string;
  nextBillingAmount?: string;
  dashboardUrl?: string;
  billingUrl?: string;
  features?: string[];
}

export interface CancelledSubscriptionEmailData extends BaseSubscriptionEmailProps {
  cancelledDate: string;
  accessEndDate: string;
  refundAmount?: string;
  refundDate?: string;
  reason?: string;
  reactivateUrl?: string;
  exportDataUrl?: string;
  feedbackUrl?: string;
}