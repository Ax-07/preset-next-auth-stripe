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
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { CancelSubscriptionDialogBtn } from "@/lib/stripe/components";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in");
    }
  }, [session, isPending, router]);

  // Gérer les paramètres d'URL (redirection après paiement, etc.)
  useEffect(() => {
    const tab = searchParams.get("tab");
    const subscriptionStatus = searchParams.get("subscription");
    const changedStatus = searchParams.get("changed");
    const success = searchParams.get("success");

    // Changer d'onglet si spécifié
    if (tab && ["overview", "profile", "subscription", "settings"].includes(tab)) {
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
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
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
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Plan actuel</p>
                    <p className="font-medium">Gratuit</p>
                    <Badge variant="secondary" className="mt-1">Actif</Badge>
                  </div>
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
                  <CancelSubscriptionDialogBtn />
                </div>
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
