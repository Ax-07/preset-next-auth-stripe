"use client";

import React, { useState } from "react";
import { cancelSubscription } from "../stripe-server";
import { Button } from "@/components/ui/button";

export const CancelSubscriptionBtn = () => {
  const [loading, setLoading] = useState(false);

  const handleCancelSubscription = async () => {
    if (!confirm("Êtes-vous sûr de vouloir annuler votre abonnement ?")) {
      return;
    }

    setLoading(true);
    try {
      const result = await cancelSubscription();
      
      console.log("📋 Résultat de l'annulation:", result);
      
      // Better Auth retourne une URL vers le Customer Portal Stripe
      if (result && typeof result === 'object' && 'url' in result) {
        console.log("🔗 Redirection vers le Customer Portal:", result.url);
        window.location.href = result.url as string;
      } else {
        console.log("⚠️ Aucune URL retournée - l'abonnement a peut-être déjà été annulé");
        window.location.reload(); // Recharger pour voir les changements
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'annulation:", error);
      alert("Erreur lors de l'annulation de l'abonnement. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCancelSubscription}
      disabled={loading}
      variant="destructive"
    >
      {loading ? "Chargement..." : "Annuler l'abonnement"}
    </Button>
  );
};
