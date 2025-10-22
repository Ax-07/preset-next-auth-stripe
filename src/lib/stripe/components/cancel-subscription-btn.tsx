"use client";

import React from "react";
import { cancelSubscription } from "../stripe-server";
import { Button } from "@/components/ui/button";

export const CancelSubscriptionBtn = () => {
  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription();
      // Vous pouvez ajouter un toast/notification ici si besoin
      window.location.reload(); // Recharger pour voir les changements
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
      // Vous pouvez ajouter une gestion d'erreur ici
    }
  };

  return (
    <Button onClick={handleCancelSubscription}>
      {"Annuler l'abonnement"}
    </Button>
  );
};
