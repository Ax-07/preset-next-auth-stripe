import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  // 🎯 ICI : Remplacer par vos vraies métriques métier
  // Exemples selon le type de SaaS :
  // - E-commerce : CA, commandes, produits vendus
  // - SaaS B2B : Utilisateurs actifs, projets, API calls
  // - Marketing : Leads, conversions, ROI
  // - Contenu : Articles publiés, vues, engagement
  
  const metrics = {
    totalRevenue: 45231.89,
    revenueChange: +20.1,
    activeUsers: 2350,
    usersChange: +15.3,
    totalProjects: 12,
    projectsChange: +2,
    avgEngagement: 89.4,
    engagementChange: +5.2,
  };

  return (
    <div className="w-full space-y-6 px-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenue, {user.name} 👋
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/account">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Mon Compte
          </Link>
        </Button>
      </div>

      {/* 📊 Métriques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Métrique 1 - Revenus */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenus Totaux
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {metrics.revenueChange > 0 ? (
                <>
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+{metrics.revenueChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-500">{metrics.revenueChange}%</span>
                </>
              )}
              <span className="ml-1">vs mois dernier</span>
            </p>
          </CardContent>
        </Card>

        {/* Métrique 2 - Utilisateurs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilisateurs Actifs
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.activeUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">+{metrics.usersChange}%</span>
              <span className="ml-1">vs mois dernier</span>
            </p>
          </CardContent>
        </Card>

        {/* Métrique 3 - Projets/Éléments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projets Actifs
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.totalProjects}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">+{metrics.projectsChange}</span>
              <span className="ml-1">ce mois-ci</span>
            </p>
          </CardContent>
        </Card>

        {/* Métrique 4 - Engagement/Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taux d'Engagement
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.avgEngagement}%
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">+{metrics.engagementChange}%</span>
              <span className="ml-1">vs mois dernier</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 📈 Section principale - Données métier */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Graphique/Tableau principal */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d'ensemble de l'activité</CardTitle>
            <CardDescription>
              Évolution de vos métriques sur les 30 derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 🎯 ICI : Intégrer votre graphique (Recharts, Chart.js, etc.) */}
            <div className="flex items-center justify-center h-[350px] border-2 border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium">Graphique d'activité</p>
                <p className="text-xs mt-1">
                  Intégrez ici votre graphique de données métier
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  (Recharts, Chart.js, Victory, etc.)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activité récente / Liste des éléments */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>
              Vos dernières actions et événements
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 🎯 ICI : Liste de vos derniers éléments métier */}
            <div className="space-y-4">
              {/* Exemple d'élément d'activité */}
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {item}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Élément métier #{item}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Action effectuée il y a {item}h
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🎯 Section secondaire - Autres données importantes */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tâches à faire</CardTitle>
            <CardDescription>
              Actions recommandées pour optimiser votre utilisation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">Compléter votre profil</span>
              <Button size="sm" variant="outline">Faire</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">Inviter des membres</span>
              <Button size="sm" variant="outline">Faire</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm">Configurer les intégrations</span>
              <Button size="sm" variant="outline">Faire</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Raccourcis</CardTitle>
            <CardDescription>
              Accédez rapidement à vos outils
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="#">
                <Activity className="mr-2 h-4 w-4" />
                Créer un nouveau projet
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="#">
                <Users className="mr-2 h-4 w-4" />
                Gérer l'équipe
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/dashboard/subscription">
                <TrendingUp className="mr-2 h-4 w-4" />
                Améliorer mon plan
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


