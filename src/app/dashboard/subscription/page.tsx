import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CancelSubscriptionBtn } from "@/lib/stripe/components/cancel-subscription-btn";
import { getActiveSubscription } from "@/lib/stripe/stripe-server";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import React from "react";

export default async function SubscriptionPage() {
  const { success, data: subscriptions } = await getActiveSubscription();

  // Récupérer l'abonnement actif (s'il existe)
  const activeSubscription = subscriptions?.find((sub) => sub.status === "active" || sub.status === "trialing");

  // Déterminer le statut et le badge de l'abonnement
  const getSubscriptionBadge = (status: string) => {
    const badges: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline" | null | undefined; label: string }
    > = {
      active: { variant: "default", label: "Actif" },
      trialing: { variant: "secondary", label: "Essai gratuit" },
      canceled: { variant: "destructive", label: "Annulé" },
      past_due: { variant: "destructive", label: "Paiement en retard" },
      incomplete: { variant: "secondary", label: "Incomplet" },
    };
    return badges[status] || { variant: "secondary", label: status };
  };

  if (!success) {
    return (
        <div>
            <p>Une erreur est survenue lors de la récupération des informations d&apos;abonnement.</p>
        </div>
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion de l&apos;abonnement</CardTitle>
        <CardDescription>Gérez votre plan, vos factures et votre moyen de paiement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeSubscription ? (
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold capitalize">Plan {activeSubscription.plan}</h3>
                  <Badge variant={getSubscriptionBadge(activeSubscription.status).variant}>
                    {getSubscriptionBadge(activeSubscription.status).label}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  {/* Statut */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Statut:</span>
                    <span className="font-medium">{activeSubscription.status}</span>
                  </div>

                  {/* Période d'essai */}
                  {activeSubscription.status === "trialing" && activeSubscription.trialEnd && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Fin de l&apos;essai:</span>
                      <span className="font-medium">{formatDate(activeSubscription.trialEnd)}</span>
                    </div>
                  )}

                  {/* Période d'abonnement */}
                  {activeSubscription.periodStart && activeSubscription.periodEnd && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Période actuelle:</span>
                      <span className="font-medium">
                        {formatDate(activeSubscription.periodStart)} - {formatDate(activeSubscription.periodEnd)}
                      </span>
                    </div>
                  )}

                  {/* Annulation programmée */}
                  {activeSubscription.cancelAtPeriodEnd && (
                    <div className="mt-3 rounded-md bg-yellow-50 p-3 dark:bg-yellow-900/20">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ Votre abonnement sera annulé le {formatDate(activeSubscription.periodEnd || null)}
                      </p>
                    </div>
                  )}

                  {/* Nombre de sièges */}
                  {activeSubscription.seats && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Sièges:</span>
                      <span className="font-medium">{activeSubscription.seats}</span>
                    </div>
                  )}

                  {/* ID Stripe */}
                  {activeSubscription.stripeSubscriptionId && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">ID Stripe:</span>
                      <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {activeSubscription.stripeSubscriptionId}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard/pricing">Changer de plan</Link>
              </Button>
              {!activeSubscription.cancelAtPeriodEnd && <CancelSubscriptionBtn />}
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 text-lg font-semibold">Plan Gratuit</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Vous utilisez actuellement le plan gratuit.</p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/pricing">Passer à un plan premium</Link>
            </Button>
          </div>
        )}

        {/* Tous les abonnements (historique) */}
        {subscriptions && subscriptions.length > 1 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">Historique des abonnements</h4>
            <div className="space-y-2">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium capitalize">{sub.plan}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(sub.periodStart || null)} - {formatDate(sub.periodEnd || null)}
                    </p>
                  </div>
                  <Badge variant={getSubscriptionBadge(sub.status).variant}>
                    {getSubscriptionBadge(sub.status).label}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
