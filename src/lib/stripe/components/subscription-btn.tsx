"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { subscribe } from "../stripe-server";
import toast from "react-hot-toast";

interface SubscriptionBtnProps {
  plan: string;
}

export const SubscriptionBtn = ({ plan }: SubscriptionBtnProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      console.log("🔄 Souscription au plan:", plan);
      const result = await subscribe(plan);
      
      console.log("✅ Résultat de la souscription:", result);
      
      // Vérifier si on a une URL de redirection (checkout Stripe)
      if (result?.url) {
        console.log("🔗 Redirection vers Stripe Checkout:", result.url);
        // Rediriger vers la page de paiement Stripe
        window.location.href = result.url;
      } else {
        // Si pas d'URL, afficher un message de succès
        console.log("✅ Abonnement mis à jour avec succès");
        toast.success("Abonnement mis à jour avec succès !");
        // Recharger après un court délai
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'abonnement:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
    // Note: pas de finally ici car on redirige
  };

  return (
    <Button 
      className="w-full" 
      variant="outline" 
      disabled={isLoading} 
      onClick={handleSubscribe}
    >
      {isLoading ? "Redirection..." : "S'abonner"}
    </Button>
  );
};
