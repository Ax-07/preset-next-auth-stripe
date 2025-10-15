import { authClient } from "@/lib/auth/auth-client";
import { PlanName } from "@/lib/stripe/stripe-plan";
import { stripeClient } from "./stripe";

export const useStripeSubscribe = () => {
  const subscribeToPlan = async (plan: PlanName) => {
    await authClient.subscription.upgrade({
      plan,                 // doit matcher subscription.plans[].name
      successUrl: "/dashboard?subscription=success",
      cancelUrl: "/pricing",
      // annual: true,       // si tu as un prix annuel
      // referenceId: "org_123", // si multi-tenant (abonnement d’org)
      // seats: 5,              // si plan par siège => quantity Stripe
    });
    // La fonction redirige l’utilisateur vers Stripe Checkout.
    return {
      subscribeToPlan
    };
  };

  const unsubscribeFromPlan = async () => {
  };

  const getSubscriptionDetails = () => {
    // Implémentez la logique pour obtenir les détails de l'abonnement ici
  };

  const upgradeToPlan = async (plan: "basic" | "premium") => {
    // Implémentez la logique de mise à niveau ici
    await authClient.subscription.upgrade({
      plan,
      successUrl: "/dashboard",
      cancelUrl: "/pricing",
      subscriptionId: "sub_123", // the Stripe subscription ID of the user's current plan
    });
  };

  const downgradeToPlan = (_plan: "free" | "basic") => {
    // Implémentez la logique de rétrogradation ici
  };

  return {
    subscribeToPlan,
    unsubscribeFromPlan,
    getSubscriptionDetails,
    upgradeToPlan,
    downgradeToPlan
  };
};

/**
 * Hook pour récupérer les prix depuis Stripe
 */
export const useStripePrices = () => {
  const getPrices = async () => {
    return await stripeClient.prices.list();
  };
  
  const getPriceById = async (priceId: string) => {
    return await stripeClient.prices.retrieve(priceId);
  };

  /**
   * Récupère plusieurs prix par leurs IDs
   */
  const getPricesByIds = async (priceIds: string[]) => {
    const prices = await Promise.all(
      priceIds.map(id => stripeClient.prices.retrieve(id))
    );
    return prices;
  };

  /**
   * Formate le prix Stripe pour l'affichage
   */
  const formatPrice = (price: { 
    unit_amount?: number | null; 
    currency: string;
    recurring?: {
      interval?: string;
      interval_count?: number;
    } | null;
  }) => {
    if (!price.unit_amount) return { amount: 0, currency: 'eur', formatted: '0€' };
    
    const amount = price.unit_amount / 100;
    const formatted = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: price.currency.toUpperCase(),
    }).format(amount);
    
    return {
      amount,
      currency: price.currency,
      formatted,
      interval: price.recurring?.interval,
      intervalCount: price.recurring?.interval_count,
    };
  };

  return {
    getPrices,
    getPriceById,
    getPricesByIds,
    formatPrice,
  };
};