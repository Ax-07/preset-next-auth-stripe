import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Bell, Palette, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import Link from "next/link";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="w-full space-y-6 px-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold">Mon Compte</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>

        {/* Onglet Profil */}
        <TabsContent value="profile" className="space-y-4">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>
                Vos informations de profil et votre photo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Photo de profil</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG ou GIF. 1 Mo maximum.
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Changer
                </Button>
              </div>

              {/* Nom */}
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nom complet</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/account/edit">Modifier</Link>
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Adresse email
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {user.emailVerified ? (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Vérifié
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Non vérifié
                    </Badge>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/account/change-email">Modifier</Link>
                  </Button>
                </div>
                {!user.emailVerified && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    ⚠️ Veuillez vérifier votre adresse email. Consultez votre boîte de réception.
                  </p>
                )}
              </div>

              {/* Informations de compte */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Compte créé le</span>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dernière modification</span>
                  <span className="font-medium">
                    {new Date(user.updatedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Sécurité */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité du compte
              </CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mot de passe</p>
                  <p className="text-sm text-muted-foreground">
                    Modifiez votre mot de passe pour sécuriser votre compte
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/account/change-password">Changer</Link>
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">Authentification à deux facteurs</p>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Activer
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">Sessions actives</p>
                  <p className="text-sm text-muted-foreground">
                    Gérez les appareils connectés à votre compte
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Voir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Zone dangereuse */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Zone dangereuse
              </CardTitle>
              <CardDescription>
                Actions irréversibles sur votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Supprimer mon compte</p>
                  <p className="text-sm text-muted-foreground">
                    Cette action est définitive et supprimera toutes vos données
                  </p>
                </div>
                <Button variant="destructive" asChild>
                  <Link href="/dashboard/account/delete">Supprimer</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Préférences */}
        <TabsContent value="preferences" className="space-y-4">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications par email</p>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des emails pour les mises à jour importantes
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Configurer
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-muted-foreground">
                    Recevoir les actualités et nouveautés
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Configurer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Apparence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thème</p>
                  <p className="text-sm text-muted-foreground">
                    Choisissez entre le mode clair et sombre
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Système
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">Langue</p>
                  <p className="text-sm text-muted-foreground">
                    Langue d'affichage de l'interface
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Français
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
