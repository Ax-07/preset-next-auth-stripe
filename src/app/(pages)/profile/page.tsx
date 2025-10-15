import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { CheckIcon, EditIcon, CreditCard } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl">Mon Profil</CardTitle>
          <div>
            <Link href="/profile/edit" className="flex items-center text-md text-muted-foreground">
              <EditIcon className="inline size-4 mr-2" />
              Modifier
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Nom:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">
              Email: {user.emailVerified ? <CheckIcon className="inline size-4 ml-2 text-green-500" /> : null}
            </span>
            <span>{user.email}</span>
          </div>
        </CardContent>
      </Card>

      {/* Lien vers la gestion d'abonnement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Abonnement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Gérez votre abonnement, consultez vos factures et mettez à jour votre moyen de paiement.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="default">
              <Link href="/dashboard" className="flex items-center gap-2">
                <CreditCard className="size-4" />
                Gérer mon abonnement
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">
                Voir les plans
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
