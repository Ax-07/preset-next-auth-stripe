"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/src/stores/cart.store";
import { fetchClientSecret } from "../stripe.checkout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

/**
 * Composant pour afficher le paiement intégré de Stripe.
 * Utilise le provider EmbeddedCheckoutProvider pour gérer le contexte de Stripe.
 */
export function EmbeddedCheckoutComponent() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const items = useCartStore.getState().items;

  useEffect(() => {
    fetchClientSecret(items).then(setClientSecret);
  }, []);

  if (!clientSecret) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
