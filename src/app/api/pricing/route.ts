/**
 * API Route pour récupérer les informations de prix depuis Stripe
 * GET /api/pricing
 */

import { NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe/stripe";
import { PLANS } from "@/lib/stripe/stripe-plan";

export async function GET() {
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
      return NextResponse.json({ plans: PLANS });
    }

    // Résoudre chaque référence en Price Stripe
    const pricePromises = refs.map(async (ref) => {
      try {
        if (ref.type === "lookup") {
          const list = await stripeClient.prices.list({ lookup_keys: [ref.key], expand: ['data.product'] });
          const price = list.data?.[0] || null;
          return { ref: ref.key, data: price };
        } else {
          const price = await stripeClient.prices.retrieve(ref.key, { expand: ['product'] });
          return { ref: ref.key, data: price };
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération du prix (${ref.type}=${ref.key}):`, error);
        return { ref: ref.key, data: null };
      }
    });

    const pricesResults = await Promise.all(pricePromises);
    const pricesMap = new Map(pricesResults
      .filter(p => p.data !== null)
      .map(p => [p.ref, p.data]));

    // Enrichir les plans avec les données Stripe
    const enrichedPlans = PLANS.map(plan => {
      if (!plan.priceId) {
        return { ...plan, stripeData: null };
      }

      const monthlyPrice = plan.priceLookupKey
        ? pricesMap.get(plan.priceLookupKey)
        : plan.priceId ? pricesMap.get(plan.priceId) : null;
      const annualPrice = plan.annualLookupKey
        ? pricesMap.get(plan.annualLookupKey)
        : plan.annualDiscountPriceId ? pricesMap.get(plan.annualDiscountPriceId) : null;

      return {
        ...plan,
        stripeData: {
          monthly: monthlyPrice ? {
            amount: monthlyPrice.unit_amount ? monthlyPrice.unit_amount / 100 : 0,
            currency: monthlyPrice.currency,
            interval: monthlyPrice.recurring?.interval,
            intervalCount: monthlyPrice.recurring?.interval_count,
          } : null,
          annual: annualPrice ? {
            amount: annualPrice.unit_amount ? annualPrice.unit_amount / 100 : 0,
            currency: annualPrice.currency,
            interval: annualPrice.recurring?.interval,
            intervalCount: annualPrice.recurring?.interval_count,
          } : null,
        }
      };
    });

    return NextResponse.json({ 
      plans: enrichedPlans,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des prix:", error);
    return NextResponse.json(
      { 
        error: "Impossible de récupérer les prix",
        plans: PLANS // Fallback sur les prix statiques
      },
      { status: 500 }
    );
  }
}
