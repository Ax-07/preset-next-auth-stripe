// components/pages/pricing-client.tsx
"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Sparkles } from "lucide-react";
import { SubscriptionBtn } from "@/lib/stripe/components/subscription-btn";

// Type pour les plans (correspond au retour de getStripePlans)
interface Plan {
  name: string;
  displayName: string;
  description: string;
  priceId: string | null;
  price: number;
  currency: string;
  interval: string;
  annualDiscountPriceId?: string | null;
  annualPrice?: number;
  freeTrial?: { days: number } | null;
  features: readonly string[];
  highlighted: boolean;
}

interface PricingClientProps {
  plans: Plan[];
}

export default function PricingClient({ plans }: PricingClientProps) {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");

  /**
   * Obtient le prix en fonction de l'intervalle
   */
  const getPrice = (plan: Plan, interval: "monthly" | "annual" = "monthly") => {
    return interval === "annual" && plan.annualPrice 
      ? plan.annualPrice / 12 
      : plan.price;
  };

  /**
   * Obtient le prix annuel total
   */
  const getAnnualPrice = (plan: Plan) => {
    return plan.annualPrice;
  };

  /**
   * Formate un prix pour l'affichage
   */
  const formatPrice = (amount: number | undefined, currency: string = "EUR") => {
    if (amount === undefined) return "N/A";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount);
  };

  /**
   * Calcule l'économie réalisée avec le plan annuel
   */
  const calculateAnnualSavings = (plan: Plan) => {
    const monthlyTotal = plan.price * 12;
    const annualPrice = getAnnualPrice(plan);
    
    if (!annualPrice) return 0;
    
    return monthlyTotal - annualPrice;
  };

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
          {plans.map((plan) => {
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
                        {formatPrice(displayPrice, plan.currency)}
                      </span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400">/mois</span>
                    </div>

                    {billingInterval === "annual" && totalAnnualPrice && (
                      <>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {formatPrice(totalAnnualPrice, plan.currency)} facturés annuellement
                        </p>
                        {savings > 0 && (
                          <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-500">
                            💰 Économisez {formatPrice(savings, plan.currency)} par an
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
                    <SubscriptionBtn plan={plan.name} />
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

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
