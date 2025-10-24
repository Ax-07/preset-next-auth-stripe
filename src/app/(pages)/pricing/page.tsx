// app/(pages)/pricing/page.tsx

import PricingClient from "@/components/pages/pricing-client";
import { getStripePlans } from "@/lib/stripe/stripe-server";

export default async function PricingPage() {
  // Récupérer les plans directement depuis le serveur
  const result = await getStripePlans();
  const plans = result.plans || [];
  const error = result.error;

  if (error) {
    console.error("Erreur lors du chargement des prix:", error);
  }

  // Si aucun plan n'est disponible, afficher un message d'erreur
  if (!plans || plans.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Impossible de charger les tarifs. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }

  // Passer les données au composant client pour l'interactivité
  return <PricingClient plans={plans} />;
}
