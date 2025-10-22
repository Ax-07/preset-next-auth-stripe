/**
 * Hook pour récupérer et gérer les prix depuis l'API
 */

import { useState, useEffect } from "react";

interface StripePriceData {
  amount: number;
  currency: string;
  interval?: string;
  intervalCount?: number;
}

interface EnrichedPlan {
  name: string;
  displayName: string;
  description: string;
  priceId: string | null;
  price: number;
  currency: string;
  interval: string;
  annualDiscountPriceId?: string | null;
  annualPrice?: number;
  freeTrial?: { days: number } | null;
  features: readonly string[];
  highlighted: boolean;
  stripeData?: {
    monthly: StripePriceData | null;
    annual: StripePriceData | null;
  } | null;
}

interface PricingData {
  plans: EnrichedPlan[];
  timestamp: string;
}

export function usePricing() {
  const [plans, setPlans] = useState<EnrichedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPricing() {
      try {
        setLoading(true);
        const response = await fetch("/api/pricing");
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des prix");
        }
        
        const data: PricingData = await response.json();
        setPlans(data.plans);
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des prix:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchPricing();
  }, []);

  const getPlans = async () => {
    return plans.filter(plan => plan.priceId !== null);
  };

  /**
   * Obtient le prix réel depuis Stripe (si disponible) ou fallback sur le prix statique
   */
  const getPrice = (plan: EnrichedPlan, interval: "monthly" | "annual" = "monthly") => {
    if (plan.stripeData) {
      const priceData = interval === "annual" ? plan.stripeData.annual : plan.stripeData.monthly;
      if (priceData) {
        return priceData.amount;
      }
    }
    // Fallback sur les prix statiques
    return interval === "annual" && plan.annualPrice 
      ? plan.annualPrice / 12 
      : plan.price;
  };

  /**
   * Obtient le prix annuel total
   */
  const getAnnualPrice = (plan: EnrichedPlan) => {
    if (plan.stripeData?.annual) {
      return plan.stripeData.annual.amount;
    }
    return plan.annualPrice;
  };

  /**
   * Formate un prix pour l'affichage
   */
  const formatPrice = (amount: number, currency: string = "EUR") => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount);
  };

  /**
   * Calcule l'économie réalisée avec le plan annuel
   */
  const calculateAnnualSavings = (plan: EnrichedPlan) => {
    const monthlyTotal = plan.price * 12;
    const annualPrice = getAnnualPrice(plan);
    
    if (!annualPrice) return 0;
    
    return monthlyTotal - annualPrice;
  };

  return {
    plans,
    loading,
    error,
    getPlans,
    getPrice,
    getAnnualPrice,
    formatPrice,
    calculateAnnualSavings,
  };
}
