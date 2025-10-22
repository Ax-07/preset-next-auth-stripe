"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { cancelSubscription } from "../stripe-server";
import { useStripeSubscribe } from "../stripe-client";
import { Loader2 } from "lucide-react";

export const CancelSubscriptionBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cancelSubscription: cancelSubClient } = useStripeSubscribe();

  const handleCancel = async () => {
    if (!confirm("Êtes-vous sûr de vouloir annuler votre abonnement ?")) {
      return;
    }

    setIsLoading(true);
    try {
      await cancelSubClient();
      // La redirection sera gérée automatiquement par Better Auth
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
      alert("Une erreur est survenue lors de l'annulation de l'abonnement.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleCancel}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Annulation en cours...
        </>
      ) : (
        "Annuler l'abonnement"
      )}
    </Button>
  );
};
