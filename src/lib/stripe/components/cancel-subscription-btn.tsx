import { Button } from "@/components/ui/button";
import React from "react";
import { useStripeSubscribe } from "../stripe-client";

export const CancelSubscriptionBtn = () => {
    const { cancelSubscription } = useStripeSubscribe();
  return (
    <Button
      variant="destructive"
      onClick={async () => await cancelSubscription()}
    >
      {"Annuler l'abonnement"}
    </Button>
  );
};
