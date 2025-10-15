/**
 * API Route pour récupérer les informations de prix depuis Stripe
 * GET /api/pricing
 */

import { NextResponse } from "next/server";
import { stripeClient } from "@/lib/stripe/stripe";
import { PLANS } from "@/lib/stripe/stripe-plan";

export async function GET() {
  try {
    // Récupérer tous les price IDs depuis PLANS
    const priceIds = PLANS
      .filter(plan => plan.priceId !== null)
      .flatMap(plan => [
        plan.priceId,
        plan.annualDiscountPriceId
      ])
      .filter((id) => id !== null && id !== undefined) as string[];

    if (priceIds.length === 0) {
      return NextResponse.json({ plans: PLANS });
    }

    // Récupérer les prix depuis Stripe
    const pricePromises = priceIds.map(async (priceId) => {
      try {
        const price = await stripeClient.prices.retrieve(priceId, {
          expand: ['product']
        });
        return { id: priceId, data: price };
      } catch (error) {
        console.error(`Erreur lors de la récupération du prix ${priceId}:`, error);
        return { id: priceId, data: null };
      }
    });

    const pricesResults = await Promise.all(pricePromises);
    const pricesMap = new Map(
      pricesResults
        .filter(p => p.data !== null)
        .map(p => [p.id, p.data])
    );

    // Enrichir les plans avec les données Stripe
    const enrichedPlans = PLANS.map(plan => {
      if (!plan.priceId) {
        return { ...plan, stripeData: null };
      }

      const monthlyPrice = pricesMap.get(plan.priceId);
      const annualPrice = plan.annualDiscountPriceId 
        ? pricesMap.get(plan.annualDiscountPriceId)
        : null;

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
