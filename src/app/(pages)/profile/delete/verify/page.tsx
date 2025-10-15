import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DeleteVerifyPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-center">Compte supprimé</CardTitle>
        <CardDescription className="text-center">
          Votre compte a été supprimé avec succès.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Toutes vos données ont été définitivement supprimées de nos serveurs.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          Nous sommes désolés de vous voir partir. N'hésitez pas à revenir quand vous le souhaitez.
        </p>
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
