"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { PLANS } from "./stripe-plan";
import { stripeClient } from "./stripe";
import type Stripe from "stripe";

export const subscribe = async (plan: string, successUrl: string, cancelUrl: string) => {
  const result = await auth.api.upgradeSubscription({
    headers: await headers(),
    body: {
      plan,
      successUrl,
      cancelUrl,
    },
  });

  return result;
};

export const getStripePlans = async () => {
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
      return { plans: PLANS };
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
        displayName: productName 
          ? productName.charAt(0).toUpperCase() + productName.slice(1) 
          : plan.displayName,
        description: productDescription || plan.description,
        // Mettre à jour les IDs Stripe
        priceId: monthlyPrice?.id || plan.priceId || null,
        annualDiscountPriceId: annualPrice?.id || plan.annualDiscountPriceId || null,
        // Mettre à jour les prix
        price: monthlyPrice?.unit_amount 
          ? monthlyPrice.unit_amount / 100 
          : plan.price,
        annualPrice: annualPrice?.unit_amount 
          ? annualPrice.unit_amount / 100 
          : plan.annualPrice,
        // Mettre à jour la devise si disponible
        currency: monthlyPrice?.currency || plan.currency,
        // Mettre à jour l'intervalle si disponible
        interval: monthlyPrice?.recurring?.interval || plan.interval,
      };
    });

    return { 
      plans: enrichedPlans,
      timestamp: new Date().toISOString(),
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des prix:", error);
    return { 
      error: "Impossible de récupérer les prix",
      plans: PLANS // Fallback sur les prix statiques
    };
  }
};

export const cancelSubscription = async (referenceId: string, subscriptionId: string) => {
const data = await auth.api.cancelSubscription({
    body: {
        referenceId,
        subscriptionId,
        returnUrl: '/account', // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return data;
};

export const activeSubscription = async () => {
  try {
    const subscriptions = await auth.api.listActiveSubscriptions({ headers: await headers() });
    return { success: true, data: subscriptions };
  } catch (error) {
    console.error("Error fetching active subscriptions:", error);
    return { success: false, error };
  }
};