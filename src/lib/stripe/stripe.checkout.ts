// @/src/lib/stripe/stripe.checkout.ts

import { CartItem } from "@/src/stores/cart.store";

/**
 *
 * @param items - Array d'items à acheter
 * @description Fonction pour gérer le processus de paiement avec Stripe.
 * Appelle l'API de checkout de Stripe (app/api/checkout/route.ts) et redirige l'utilisateur vers la page de paiement.
 */
export const handleCheckout = async (items: CartItem[]) => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) throw new Error("Erreur lors du paiement");

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url; // Redirige vers Stripe Checkout
    }
  } catch (error) {
    console.error("Erreur pendant le paiement :", error);
    alert("Erreur pendant le paiement.");
  }
};

/**
 * 
 * @param items - Array d'items à acheter
 * @description Fonction pour récupérer le client secret de Stripe.
 * Utilisée pour le mode de paiement intégré (Embedded Checkout).
 * Appelle l'API de checkout de Stripe (app/api/checkout/route.ts)
 * @returns 
 */
export const fetchClientSecret = async (items: CartItem[]) => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    return data.clientSecret;
  } catch (error) {
    console.error("Erreur lors de la récupération du client secret :", error);
    throw new Error("Erreur lors de la récupération du client secret");
  }
};
