import { stripeClient } from "./stripe";
import type Stripe from "stripe";
import type { StripePlan } from "@/lib/stripe/types/stripe";

export const PLANS = [
    {
        name: "free" as const,
        displayName: "Gratuit",
        description: "Parfait pour démarrer",
        // IDs Stripe non utilisés pour le plan gratuit
        priceId: null,
        priceLookupKey: null,
        price: 0,
        currency: "EUR",
        interval: "month" as const,
        annualDiscountPriceId: null,
        annualLookupKey: null,
        annualPrice: undefined,
        freeTrial: null,
        features: [
            "Accès de base",
            "Support par email",
            "1 projet",
            "500 MB de stockage",
        ],
        highlighted: false,
    },
    {
        name: "basic" as const,
        displayName: "Basic",
        description: "Pour les professionnels",
        // Option B: Stripe = source de vérité via lookup keys
        priceId:  "",
        priceLookupKey: "basic_monthly", // définir ce lookup_key dans Stripe
        price: "", // Le montant sera récupéré dynamiquement depuis Stripe
        currency: "EUR",
        interval: "month" as const,
        annualDiscountPriceId: "",
        annualLookupKey: "basic_yearly", // définir ce lookup_key annuel dans Stripe (optionnel)
        annualPrice: "", // Le montant sera récupéré dynamiquement depuis Stripe
        freeTrial: { days: 7 },
        features: [
            "Tout du plan Gratuit",
            "10 projets",
            "10 GB de stockage",
            "Support prioritaire",
            "Analyses avancées",
            "API accès",
        ],
        highlighted: true,
    }
];

export type PlanName = typeof PLANS[number]["name"];

/**
 * Récupère les plans Stripe avec leurs prix et informations à jour.
 * @returns Liste des plans enrichis avec les données Stripe
 */
export const getStripePlans = async (): Promise<{
  plans: StripePlan[];
  timestamp?: string;
  error?: string;
}> => {
  try {
    // Préparer liste des identifiants à récupérer (lookup_key prioritaire)
    type PriceRef = { key: string; type: "lookup" | "id" };
    const refs: PriceRef[] = PLANS.flatMap(plan => {
      const list: PriceRef[] = [];
      if (plan.priceLookupKey) list.push({ key: plan.priceLookupKey, type: "lookup" });
      else if (plan.priceId) list.push({ key: plan.priceId, type: "id" });
      if (plan.annualLookupKey) list.push({ key: plan.annualLookupKey, type: "lookup" });
      else if (plan.annualDiscountPriceId) list.push({ key: plan.annualDiscountPriceId, type: "id" });
      return list;
    });

    if (refs.length === 0) {
      return { plans: PLANS as StripePlan[] };
    }

    // Résoudre chaque référence en Price Stripe
    const pricePromises = refs.map(async (ref) => {
      try {
        if (ref.type === "lookup") {
          const list = await stripeClient.prices.list({
            lookup_keys: [ref.key],
            expand: ['data.product']
          });
          const price = list.data?.[0] || null;
          return { ref: ref.key, data: price };
        } else {
          const price = await stripeClient.prices.retrieve(ref.key, {
            expand: ['product']
          });
          return { ref: ref.key, data: price };
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération du prix (${ref.type}=${ref.key}):`, error);
        return { ref: ref.key, data: null };
      }
    });

    const pricesResults = await Promise.all(pricePromises);
    const pricesMap = new Map<string, Stripe.Price>(
      pricesResults
        .filter((p): p is { ref: string; data: Stripe.Price } => p.data !== null)
        .map(p => [p.ref, p.data])
    );

    // Enrichir les plans avec les données Stripe
    const enrichedPlans = PLANS.map(plan => {
      // Récupérer les prix mensuels et annuels
      const monthlyPrice = plan.priceLookupKey
        ? pricesMap.get(plan.priceLookupKey)
        : plan.priceId
          ? pricesMap.get(plan.priceId)
          : null;
      const annualPrice = plan.annualLookupKey
        ? pricesMap.get(plan.annualLookupKey)
        : plan.annualDiscountPriceId
          ? pricesMap.get(plan.annualDiscountPriceId)
          : null;

      // Extraire le nom du produit si product est un objet Product (non deleted)
      const productName = monthlyPrice?.product
        && typeof monthlyPrice.product === 'object'
        && 'name' in monthlyPrice.product
        ? monthlyPrice.product.name
        : null;
      const productDescription = monthlyPrice?.product
        && typeof monthlyPrice.product === 'object'
        && 'description' in monthlyPrice.product
        ? monthlyPrice.product.description
        : null;

      return {
        ...plan,
        name: productName || plan.name,
        displayName: productName ? productName.charAt(0).toUpperCase() + productName.slice(1) : plan.displayName,
        description: productDescription || plan.description,
        // Mettre à jour les IDs Stripe
        priceId: monthlyPrice?.id || plan.priceId || null,
        annualDiscountPriceId: annualPrice?.id || plan.annualDiscountPriceId || null,
        // Mettre à jour les prix
        price: monthlyPrice?.unit_amount ? monthlyPrice.unit_amount / 100 : plan.price,
        annualPrice: annualPrice?.unit_amount ? annualPrice.unit_amount / 100 : plan.annualPrice,
        // Mettre à jour la devise si disponible
        currency: monthlyPrice?.currency || plan.currency,
        // Mettre à jour l'intervalle si disponible
        interval: monthlyPrice?.recurring?.interval || plan.interval,
      };
    });

    return {
      plans: enrichedPlans as StripePlan[],
      timestamp: new Date().toISOString(),
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des prix:", error);
    return {
      error: "Impossible de récupérer les prix",
      plans: PLANS as StripePlan[] // Fallback sur les prix statiques
    };
  }
};