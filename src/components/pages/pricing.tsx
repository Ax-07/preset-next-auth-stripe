// components/pages/pricing.tsx
"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { EnrichedPlan, usePricing } from "@/hooks/use-pricing";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// Composants optionnels - Décommentez pour les utiliser
// import { PricingFAQ, PricingComparison, PricingTestimonials } from "./pricing-features";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");

  // Utiliser le hook pour récupérer les prix depuis Stripe
  const {
    plans,
    loading: pricesLoading,
    error: pricesError,
    getPrice,
    getAnnualPrice,
    formatPrice,
    calculateAnnualSavings,
  } = usePricing();

  const handleSubscribe = async (plan: "basic" | "premium") => {
    setLoading(plan);
    console.log(`Souscription au plan: ${plan}`);
    try {
      const { data: subs } = await authClient.subscription.list();
      const existing = subs?.[0];

      // Pas encore abonné → Checkout
      const payload: Parameters<typeof authClient.subscription.upgrade>[0] = {
        plan,
        successUrl: `${window.location.origin}/dashboard?subscription=success`,
        cancelUrl: `${window.location.origin}/pricing`,
      };

      if (existing?.stripeSubscriptionId) {
        payload.subscriptionId = existing.stripeSubscriptionId; // seulement si présent
      }

      await authClient.subscription.upgrade(payload);
    } catch (error) {
      console.error("Erreur lors de la souscription:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      setLoading(null);
    }
  };

  // État de chargement des prix
  if (pricesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des tarifs...</p>
        </div>
      </div>
    );
  }

  // Erreur lors du chargement
  if (pricesError) {
    toast.error("Erreur lors du chargement des prix. Utilisation des prix par défaut.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge className="mb-4" variant="secondary">
            Tarification
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Choisissez le plan parfait pour vous
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Commencez gratuitement, puis passez à un plan payant pour débloquer plus de fonctionnalités.
          </p>
        </div>

        {/* Toggle Mensuel/Annuel */}
        <div className="mb-12 flex justify-center">
          <Tabs
            value={billingInterval}
            onValueChange={(v) => setBillingInterval(v as "monthly" | "annual")}
            className="w-fit"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Mensuel</TabsTrigger>
              <TabsTrigger value="annual">
                Annuel
                <Badge variant="secondary" className="ml-2 text-xs">
                  -17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Grille de prix */}
        <div className="grid gap-8 lg:grid-cols-2">
          {plans.map((plan: EnrichedPlan) => {
            const isLoading = loading === plan.name;
            const displayPrice = getPrice(plan, billingInterval);
            const totalAnnualPrice = getAnnualPrice(plan);
            const savings = calculateAnnualSavings(plan);

            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col transition-all hover:shadow-lg ${
                  plan.highlighted
                    ? "border-2 border-blue-600 shadow-xl dark:border-blue-500"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 px-4 py-1 text-white hover:bg-blue-700">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Le plus populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.displayName}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {formatPrice(displayPrice)}
                      </span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400">/mois</span>
                    </div>

                    {billingInterval === "annual" && totalAnnualPrice && (
                      <>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {formatPrice(totalAnnualPrice)} facturés annuellement
                        </p>
                        {savings > 0 && (
                          <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-500">
                            💰 Économisez {formatPrice(savings)} par an
                          </p>
                        )}
                      </>
                    )}

                    {plan.freeTrial && (
                      <Badge variant="secondary" className="mt-4">
                        Essai gratuit de {plan.freeTrial.days} jours
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {plan.name === "free" ? (
                    <Button className="w-full" variant="outline" asChild>
                      <a href="/auth/sign-up">Commencer gratuitement</a>
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      variant={plan.highlighted ? "default" : "outline"}
                      disabled={isLoading}
                      onClick={() => handleSubscribe(plan.name as "basic" | "premium")}
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Redirection...
                        </>
                      ) : (
                        `Choisir ${plan.displayName}`
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Section FAQ - Décommentez pour activer */}
        {/* <PricingFAQ /> */}

        {/* Section Comparaison - Décommentez pour activer */}
        {/* <PricingComparison /> */}

        {/* Section Témoignages - Décommentez pour activer */}
        {/* <PricingTestimonials /> */}

        {/* Contact */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Des questions ?{" "}
            <a href="/contact" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
