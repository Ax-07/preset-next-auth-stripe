"use client";

import React, { useState } from "react";
import { restoreSubscription } from "../stripe-server";
import { Button } from "@/components/ui/button";

export const RestoreSubscriptionBtn = () => {
  const [loading, setLoading] = useState(false);

  const handleRestoreSubscription = async () => {
    setLoading(true);
    try {
      const result = await restoreSubscription();

      console.log("📋 Résultat brut de restoreSubscription:", result);
      console.log("📋 Type de résultat:", typeof result);
      console.log("📋 Clés disponibles:", result && typeof result === "object" ? Object.keys(result) : "non-object");

      // Better Auth retourne une URL vers le Customer Portal Stripe
      if (result && typeof result === "object" && "url" in result) {
        const url = result.url as string;
        console.log("✅ URL trouvée, redirection vers:", url);

        // Vérifier que l'URL est valide
        if (url && url.startsWith("http")) {
          console.log("🚀 Redirection immédiate vers le Customer Portal");
          window.location.href = url;
        } else {
          console.error("❌ URL invalide:", url);
          alert("Erreur : URL de redirection invalide");
          setLoading(false);
        }
      } else {
        console.warn("⚠️ Aucune URL retournée dans la réponse");
        console.warn("📦 Contenu de la réponse:", JSON.stringify(result, null, 2));

        // Peut-être que l'annulation a été faite directement sans redirection
        alert("L'abonnement a été restauré. Actualisation de la page...");
        window.location.reload();
      }
    } catch (error) {
      console.error("❌ Erreur lors de la restauration:", error);
      console.error("📦 Détails de l'erreur:", JSON.stringify(error, null, 2));
      alert("Erreur lors de la restauration de l'abonnement. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleRestoreSubscription} disabled={loading} variant="default">
      {loading ? "Chargement..." : "Restaurer l'abonnement"}
    </Button>
  );
};
