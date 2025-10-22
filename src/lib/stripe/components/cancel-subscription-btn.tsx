"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { cancelSubscription } from "../stripe-server";

export const CancelSubscriptionBtn = () => {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        "use server";
        await cancelSubscription();
      }}
    >
{"Annuler l'abonnement"}
    </Button>
  );
};
