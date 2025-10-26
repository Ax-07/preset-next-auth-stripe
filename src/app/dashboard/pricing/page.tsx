// app/dashboard/pricing/page.tsx

import PricingClient from "@/lib/stripe/components/pricing";
import { getStripePlans } from "@/lib/stripe/stripe-server";
import { getUser } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function DashboardPricingPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Choisir un plan</h1>
        <p className="text-muted-foreground mt-2">
          Sélectionnez le plan qui correspond le mieux à vos besoins
        </p>
      </div>
      <PricingClient plans={plans} />
    </div>
  );
}
