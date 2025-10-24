/**
 * Types partagés pour les plans et abonnements Stripe
 */

/**
 * Plan Stripe enrichi avec les données du produit
 */
export interface StripePlan {
  name: string;
  displayName: string;
  description: string;
  priceId: string | null;
  priceLookupKey?: string | null;
  price: number;
  currency: string;
  interval: string;
  annualDiscountPriceId?: string | null;
  annualLookupKey?: string | null;
  annualPrice?: number;
  freeTrial?: { days: number } | null;
  features: readonly string[];
  highlighted: boolean;
}

/**
 * Résultat de la récupération des plans Stripe
 */
export interface StripePlansResult {
  plans: StripePlan[];
  timestamp?: string;
  error?: string;
}

/**
 * Abonnement utilisateur
 */
export interface Subscription {
  id: string;
  plan: string;
  status: string;
  periodStart?: Date | string;
  periodEnd?: Date | string;
  trialEnd?: Date | string;
  cancelAtPeriodEnd?: boolean;
  seats?: number;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

/**
 * Facture Stripe
 */
export interface Invoice {
  id: string;
  number: string | null;
  status: string | null;
  total: number;
  currency: string;
  created: Date;
  dueDate: Date | null;
  hostedInvoiceUrl?: string | null;
  invoicePdf?: string | null;
  periodStart: Date | null;
  periodEnd: Date | null;
  description?: string | null;
  amountDue: number;
  amountPaid: number;
}
