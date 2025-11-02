"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { PLANS } from "./stripe-plan";
import { stripeClient } from "./stripe";
import type Stripe from "stripe";
import type { StripePlan } from "@/lib/stripe/types/stripe";
import { prisma } from "../database/prisma.client";

// Déterminer l'URL de base en fonction de l'environnement
const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  || process.env.BETTER_AUTH_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/**
 * Souscrit un utilisateur à un plan donné.
 * @param plan (nom du plan)
 * @returns Object contenant l'URL de checkout Stripe ou les données de l'abonnement
 */
export const subscribe = async (plan: string) => {
  try {
    console.log("🔄 Début de la souscription au plan:", plan);


    console.log("🌐 Base URL utilisée:", baseUrl);

    // Récupérer les abonnements actifs de l'utilisateur
    const subscriptions = await auth.api.listActiveSubscriptions({
      headers: await headers()
    });

    console.log("📋 Abonnements existants:", subscriptions);

    const subscriptionId = subscriptions[0]?.id;

    // Préparer le payload pour Better Auth
    const payload: Parameters<typeof auth.api.upgradeSubscription>[0]['body'] = {
      plan,
      successUrl: `${baseUrl}/dashboard/subscription`,
      cancelUrl: `${baseUrl}/pricing`,
      disableRedirect: true, // Important : ne pas rediriger automatiquement
    };

    // Si l'utilisateur a déjà un abonnement, l'inclure pour upgrade/downgrade
    if (subscriptionId) {
      console.log("🔄 Mise à jour de l'abonnement existant:", subscriptionId);
      payload.subscriptionId = subscriptionId;
    } else {
      console.log("✨ Création d'un nouvel abonnement");
    }

    // Appeler l'API Better Auth pour créer la session de checkout
    const result = await auth.api.upgradeSubscription({
      headers: await headers(),
      body: payload,
    });

    console.log("✅ Résultat de l'API:", result);

    return result;
  } catch (error) {
    console.error("❌ Erreur dans subscribe():", error);
    throw error;
  }
};

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

/**
 * Annule l'abonnement actif de l'utilisateur.
 * @returns Données de l'annulation
 */
/**
 * Annule l'abonnement actif de l'utilisateur.
 * Crée une session du Customer Portal Stripe pour permettre l'annulation.
 * @returns URL vers le Customer Portal Stripe
 */
export const cancelSubscription = async () => {
  const subscriptions = await auth.api.listActiveSubscriptions({ headers: await headers() });
  console.log("📋 Abonnements actifs:", subscriptions);

  if (!subscriptions || subscriptions.length === 0) {
    console.log("⚠️ Aucun abonnement actif trouvé pour l'utilisateur.");
    throw new Error("Aucun abonnement actif à annuler");
  }

  const subscriptionId = subscriptions[0].id;
  const stripeCustomerId = subscriptions[0].stripeCustomerId;

  console.log("🎯 ID de l'abonnement à annuler:", subscriptionId);
  console.log("👤 Stripe Customer ID:", stripeCustomerId);

  if (!subscriptionId || !stripeCustomerId) {
    console.error("❌ Données d'abonnement manquantes");
    throw new Error("Données d'abonnement invalides");
  }

  // MÉTHODE 1 : Via Better Auth (essayer d'abord)
  console.log("🔄 Tentative via Better Auth API...");
  console.log("🌐 URL de retour:", `${baseUrl}/dashboard/subscription`);

  try {
    const data = await auth.api.cancelSubscription({
      body: {
        subscriptionId,
        returnUrl: `${baseUrl}/dashboard/subscription`,
      },
      headers: await headers(),
    });

    console.log("✅ Résultat de l'API cancelSubscription:", JSON.stringify(data, null, 2));

    // Vérifier si une URL est retournée
    if (data && typeof data === 'object' && 'url' in data) {
      console.log("🔗 URL du Customer Portal (via Better Auth):", data.url);
      return data;
    } else {
      console.warn("⚠️ Better Auth n'a pas retourné d'URL. Passage à la méthode alternative...");
      throw new Error("No URL returned from Better Auth");
    }
  } catch (betterAuthError) {
    console.warn("⚠️ Erreur avec Better Auth, utilisation de l'API Stripe directement:", betterAuthError);

    // MÉTHODE 2 : Créer directement une session du Customer Portal via Stripe
    console.log("🔄 Création directe d'une session Customer Portal via Stripe...");

    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${baseUrl}/dashboard/subscription`,
    });

    console.log("✅ Session Customer Portal créée:", portalSession.id);
    console.log("🔗 URL du Customer Portal (via Stripe directement):", portalSession.url);

    return { url: portalSession.url };
  }
};

export const restoreSubscription = async () => {
  // Récupérer les abonnements actifs de l'utilisateur
  const subscriptions = await auth.api.listActiveSubscriptions({ headers: await headers() });
  console.log("📋 Abonnements actifs:", subscriptions);

  if (!subscriptions || subscriptions.length === 0) {
    console.log("⚠️ Aucun abonnement actif trouvé pour l'utilisateur.");
    throw new Error("Aucun abonnement actif à annuler");
  }

  const subscriptionId = subscriptions[0].id;
  const stripeCustomerId = subscriptions[0].stripeCustomerId;

  console.log("🎯 ID de l'abonnement à annuler:", subscriptionId);
  console.log("👤 Stripe Customer ID:", stripeCustomerId);

  if (!subscriptionId || !stripeCustomerId) {
    console.error("❌ Données d'abonnement manquantes");
    throw new Error("Données d'abonnement invalides");
  }

  try {
    const data = await auth.api.restoreSubscription({
      body: {
        subscriptionId,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    console.log("✅ Résultat de l'API restoreSubscription:", JSON.stringify(data, null, 2));

  } catch {
    console.warn("⚠️ Erreur avec Better Auth, restauration non supportée pour le moment.");
  }
};

/**
 * Récupère l'abonnement actif de l'utilisateur.
 * @returns Données de l'abonnement actif
 */
export const getActiveSubscription = async () => {
  try {
    const subscriptions = await auth.api.listActiveSubscriptions({ headers: await headers() }); console.log("Active subscriptions:", subscriptions);
    return { success: true, data: subscriptions };
  } catch (error) {
    console.error("Error fetching active subscriptions:", error);
    return { success: false, error };
  }
};

/**
 * Récupère les factures (invoices) de l'utilisateur.
 * @param limit - Nombre maximum de factures à récupérer (par défaut: 10)
 * @returns Liste des factures Stripe
 */
export const getUserInvoices = async (limit: number = 10) => {
  try {
    // Récupérer la session utilisateur
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { success: false, error: "Utilisateur non connecté" };
    }

    // Récupérer le customer ID Stripe depuis Better Auth
    const subscriptions = await auth.api.listActiveSubscriptions({ headers: await headers() });

    // Si l'utilisateur a des abonnements, récupérer le customer ID
    let customerId: string | null = null;

    if (subscriptions && subscriptions.length > 0 && subscriptions[0].stripeCustomerId) {
      customerId = subscriptions[0].stripeCustomerId;
    } else {
      // Sinon, chercher via l'email
      const customers = await stripeClient.customers.list({
        email: session.user.email,
        limit: 1,
      });
      customerId = customers.data[0]?.id || null;
    }

    if (!customerId) {
      console.log("ℹ️ Aucun customer Stripe trouvé pour cet utilisateur");
      return { success: true, data: [] };
    }

    // Récupérer les factures du customer
    const invoices = await stripeClient.invoices.list({
      customer: customerId,
      limit,
    });

    console.log(`📄 ${invoices.data.length} facture(s) récupérée(s) pour le customer ${customerId}`);

    // Formater les données pour faciliter l'utilisation
    const formattedInvoices = invoices.data.map(invoice => ({
      id: invoice.id, // ID de la facture
      number: invoice.number, // Numéro de la facture
      status: invoice.status, // Statut (draft, open, paid, uncollectible, void)
      total: invoice.total / 100, // Montant total (en €/$ pas en centimes)
      currency: invoice.currency, // Devise
      created: new Date(invoice.created * 1000), // Date de création
      dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null, // Date d'échéance
      hostedInvoiceUrl: invoice.hosted_invoice_url, // URL pour voir la facture
      invoicePdf: invoice.invoice_pdf, // URL pour télécharger le PDF
      periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null, // Début de la période facturée
      periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null, // Fin de la période facturée
      description: invoice.description, // Description de la facture
      amountDue: invoice.amount_due / 100, // Montant dû
      amountPaid: invoice.amount_paid / 100, // Montant payé
    }));

    return {
      success: true,
      data: formattedInvoices,
      hasMore: invoices.has_more,
    };
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des factures:", error);
    return { success: false, error };
  }
};

/**
 * Récupère l’utilisateur depuis les données Stripe / Better-Auth
 * @param opts 
 * @returns 
 */
export async function findUserForSubscription(
  opts: { referenceId?: string; stripeCustomerId?: string }
) {
  if (opts.referenceId) {
    return prisma.user.findUnique({ where: { id: opts.referenceId } });
  }
  if (opts.stripeCustomerId) {
    return prisma.user.findFirst({ where: { stripeCustomerId: opts.stripeCustomerId } });
  }
  return null;
}