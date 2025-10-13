// app/pricing/page.tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function subscribe(plan: "basic" | "premium") {
    try {
      setLoading(plan);
      await authClient.subscription.upgrade({
        plan,                 // doit matcher subscription.plans[].name
        successUrl: "/dashboard",
        cancelUrl: "/pricing",
        // annual: true,       // si tu as un prix annuel
        // referenceId: "org_123", // si multi-tenant (abonnement d’org)
        // seats: 5,              // si plan par siège => quantity Stripe
      });
      // La fonction redirige l’utilisateur vers Stripe Checkout.
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="p-6">
      <button disabled={loading==="basic"} onClick={() => subscribe("basic")}>
        {loading==="basic" ? "Redirection…" : "Choisir Basic"}
      </button>
      <button disabled={loading==="premium"} onClick={() => subscribe("premium")}>
        {loading==="premium" ? "Redirection…" : "Choisir Premium"}
      </button>
    </main>
  );
}
