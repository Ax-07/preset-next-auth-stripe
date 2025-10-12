import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyEmail } from "@/lib/auth/auth-server";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function VerifyEmailPage(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  if (!token) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="text-destructive" />
            Lien invalide
          </CardTitle>
          <CardDescription>
            Le lien de vérification est invalide ou a expiré.
            Veuillez demander un nouveau lien de vérification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/auth/resend-verification">
              Renvoyer le lien de vérification
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  try {
    const result = await verifyEmail(token);

    if (result.success) {
      return (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 />
              Email vérifié !
            </CardTitle>
            <CardDescription>
              Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                Se connecter
              </Link>
            </Button>
          </CardContent>
        </Card>
      );
    }
  } catch (error) {
    console.error("Error verifying email:", error);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <XCircle className="text-destructive" />
          Erreur de vérification
        </CardTitle>
        <CardDescription>
          Une erreur est survenue lors de la vérification de votre email. 
          Le lien est peut-être expiré ou invalide.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild className="w-full" variant="default">
          <Link href="/auth/resend-verification">
            Renvoyer le lien de vérification
          </Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link href="/auth/signin">
            Retour à la connexion
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
