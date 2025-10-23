/**
 * Dashboard avec onglets - Vue moderne et complète
 * Regroupe : Vue générale, Profil, Abonnement, Paramètres
 */

"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Settings,
  Check,
  Edit,
  Loader2,
  FileText,
  Download,
  ExternalLink
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { CancelSubscriptionBtn } from "@/lib/stripe/components/cancel-subscription-btn";
import { getActiveSubscription, getUserInvoices } from "@/lib/stripe/stripe-server";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in");
    }
  }, [session, isPending, router]);

  // Récupérer les abonnements de l'utilisateur via Server Action
  useEffect(() => {
    async function fetchSubscriptions() {
      if (!session) return;
      
      try {
        setLoadingSubscriptions(true);
        const result = await getActiveSubscription();
        
        if (result.success && result.data) {
          console.log("📋 Abonnements récupérés:", result.data);
          // result.data est déjà un tableau d'abonnements
          setSubscriptions(Array.isArray(result.data) ? result.data : [result.data]);
        } else {
          console.log("ℹ️ Aucun abonnement actif");
          setSubscriptions([]);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des abonnements:", error);
        toast.error("Impossible de charger les abonnements");
        setSubscriptions([]);
      } finally {
        setLoadingSubscriptions(false);
      }
    }

    fetchSubscriptions();
  }, [session]);
// Récupérer les 20 dernières factures de l'utilisateur
  useEffect(() => {
  async function fetchInvoices() {
    const { success, data } = await getUserInvoices(20); // 20 dernières factures
    if (success && data) {
      setInvoices(data);
      setLoadingInvoices(false);
    }
  }
  fetchInvoices();
}, []);

  // Gérer les paramètres d'URL (redirection après paiement, etc.)
  useEffect(() => {
    const tab = searchParams.get("tab");
    const subscriptionStatus = searchParams.get("subscription");
    const changedStatus = searchParams.get("changed");
    const success = searchParams.get("success");

    // Changer d'onglet si spécifié
    if (tab && ["overview", "profile", "subscription", "invoices", "settings"].includes(tab)) {
      setActiveTab(tab);
    }

    // Messages de succès
    if (subscriptionStatus === "success") {
      toast.success("Abonnement souscrit avec succès !");
      setActiveTab("subscription");
      router.replace("/dashboard?tab=subscription");
    }

    if (changedStatus === "success") {
      toast.success("Plan changé avec succès !");
      router.replace("/dashboard?tab=subscription");
    }

    if (success === "true") {
      toast.success("Opération réussie !");
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Récupérer l'abonnement actif (s'il existe)
  const activeSubscription = subscriptions.find(sub => 
    sub.status === 'active' || sub.status === 'trialing'
  );

  // Déterminer le statut et le badge de l'abonnement
  const getSubscriptionBadge = (status: string) => {
    const badges: Record<string, { variant: any; label: string }> = {
      'active': { variant: 'default', label: 'Actif' },
      'trialing': { variant: 'secondary', label: 'Essai gratuit' },
      'canceled': { variant: 'destructive', label: 'Annulé' },
      'past_due': { variant: 'destructive', label: 'Paiement en retard' },
      'incomplete': { variant: 'secondary', label: 'Incomplet' },
    };
    return badges[status] || { variant: 'secondary', label: status };
  };

  // Formater une date
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Bienvenue, {session.user?.name || session.user?.email}
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Vue générale</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Abonnement</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Factures</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </TabsTrigger>
          </TabsList>

          {/* Vue générale */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Carte Profil */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Mon Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nom</p>
                    <p className="font-medium">{session.user?.name || "Non défini"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{session.user?.email}</p>
                    {session.user?.emailVerified && (
                      <Badge variant="secondary" className="mt-1">
                        <Check className="mr-1 h-3 w-3" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("profile")}
                  >
                    Voir mon profil
                  </Button>
                </CardContent>
              </Card>

              {/* Carte Abonnement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Mon Abonnement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loadingSubscriptions ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  ) : activeSubscription ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Plan actuel</p>
                        <p className="font-medium capitalize">{activeSubscription.plan || 'Gratuit'}</p>
                        <Badge 
                          variant={getSubscriptionBadge(activeSubscription.status).variant} 
                          className="mt-1"
                        >
                          {getSubscriptionBadge(activeSubscription.status).label}
                        </Badge>
                      </div>
                      {activeSubscription.trialEnd && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Fin de l&apos;essai gratuit
                          </p>
                          <p className="text-sm font-medium">
                            {formatDate(activeSubscription.trialEnd)}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Plan actuel</p>
                      <p className="font-medium">Gratuit</p>
                      <Badge variant="secondary" className="mt-1">Actif</Badge>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Button 
                      className="w-full"
                      onClick={() => setActiveTab("subscription")}
                    >
                      Gérer mon abonnement
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link href="/pricing">Voir les plans</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Carte Actions rapides */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/contact">
                      Contactez-nous
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations de compte
                  </CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Nom complet
                    </label>
                    <p className="mt-1 text-lg font-medium">
                      {session.user?.name || "Non défini"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Adresse email
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-lg font-medium">{session.user?.email}</p>
                      {session.user?.emailVerified && (
                        <Badge variant="secondary">
                          <Check className="mr-1 h-3 w-3" />
                          Vérifié
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {!session.user?.emailVerified && (
                  <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Votre email n&apos;est pas vérifié. Vérifiez votre boîte de réception.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Abonnement */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion de l&apos;abonnement</CardTitle>
                <CardDescription>
                  Gérez votre plan, vos factures et votre moyen de paiement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingSubscriptions ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : activeSubscription ? (
                  <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold capitalize">
                            Plan {activeSubscription.plan}
                          </h3>
                          <Badge 
                            variant={getSubscriptionBadge(activeSubscription.status).variant}
                          >
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
                          {activeSubscription.status === 'trialing' && activeSubscription.trialEnd && (
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
                                ⚠️ Votre abonnement sera annulé le {formatDate(activeSubscription.periodEnd)}
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
                        <Link href="/pricing">
                          Changer de plan
                        </Link>
                      </Button>
                      {!activeSubscription.cancelAtPeriodEnd && (
                        <CancelSubscriptionBtn />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                    <h3 className="mb-2 text-lg font-semibold">Plan Gratuit</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Vous utilisez actuellement le plan gratuit.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/pricing">
                        Passer à un plan premium
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Tous les abonnements (historique) */}
                {subscriptions.length > 1 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-3">Historique des abonnements</h4>
                    <div className="space-y-2">
                      {subscriptions.map((sub, index) => (
                        <div 
                          key={sub.id} 
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="font-medium capitalize">{sub.plan}</p>
                            <p className="text-xs text-gray-500">
                              {formatDate(sub.periodStart)} - {formatDate(sub.periodEnd)}
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
          </TabsContent>

          {/* Factures */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Mes Factures
                </CardTitle>
                <CardDescription>
                  Consultez et téléchargez vos factures
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingInvoices ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : invoices.length > 0 ? (
                  <div className="space-y-4">
                    {/* Liste des factures */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {invoices.map((invoice) => {
                        const getInvoiceStatusBadge = (status: string) => {
                          const badges: Record<string, { variant: any; label: string }> = {
                            'paid': { variant: 'default', label: 'Payée' },
                            'open': { variant: 'secondary', label: 'En attente' },
                            'draft': { variant: 'secondary', label: 'Brouillon' },
                            'void': { variant: 'destructive', label: 'Annulée' },
                            'uncollectible': { variant: 'destructive', label: 'Impayée' },
                          };
                          return badges[status] || { variant: 'secondary', label: status };
                        };

                        const statusBadge = getInvoiceStatusBadge(invoice.status);

                        return (
                          <div 
                            key={invoice.id} 
                            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">
                                  {invoice.number || `Facture ${invoice.id.slice(-8)}`}
                                </h4>
                                <Badge variant={statusBadge.variant}>
                                  {statusBadge.label}
                                </Badge>
                              </div>
                              
                              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <p>
                                  Date: {formatDate(invoice.created)}
                                </p>
                                {invoice.periodStart && invoice.periodEnd && (
                                  <p>
                                    Période: {formatDate(invoice.periodStart)} - {formatDate(invoice.periodEnd)}
                                  </p>
                                )}
                                {invoice.description && (
                                  <p className="text-xs">{invoice.description}</p>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-start gap-2 sm:items-end">
                              <div className="text-right">
                                <p className="text-2xl font-bold">
                                  {invoice.total.toFixed(2)} {invoice.currency.toUpperCase()}
                                </p>
                                {invoice.amountDue > 0 && invoice.status !== 'paid' && (
                                  <p className="text-sm text-red-600 dark:text-red-400">
                                    Dû: {invoice.amountDue.toFixed(2)} {invoice.currency.toUpperCase()}
                                  </p>
                                )}
                              </div>

                              <div className="flex gap-2">
                                {invoice.hostedInvoiceUrl && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    asChild
                                  >
                                    <a 
                                      href={invoice.hostedInvoiceUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="mr-1 h-3 w-3" />
                                      Voir
                                    </a>
                                  </Button>
                                )}
                                {invoice.invoicePdf && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    asChild
                                  >
                                    <a 
                                      href={invoice.invoicePdf} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      download
                                    >
                                      <Download className="mr-1 h-3 w-3" />
                                      PDF
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Message si plus de factures disponibles */}
                    {invoices.length >= 20 && (
                      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          ℹ️ Vous voyez les 20 dernières factures. Pour consulter l&apos;historique complet, 
                          contactez le support.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold">Aucune facture</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Vous n&apos;avez pas encore de factures. Elles apparaîtront ici après votre premier paiement.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/pricing">
                        Voir les plans
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>
                  Gérez vos préférences et la sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Sécurité</h3>
                  <Button variant="outline">
                    Changer le mot de passe
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Préférences</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gérez vos préférences de notification et d&apos;affichage
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
