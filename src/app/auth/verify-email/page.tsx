import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function VerifyEmailPage(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const hasError = Boolean(searchParams?.error);

  if (hasError) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="text-destructive" />
            {"Lien invalide"}
          </CardTitle>
          <CardDescription>
            {"Le lien de vérification est invalide ou a expiré. Veuillez demander un nouveau lien de vérification."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/auth/resend-verification">{"Renvoyer le lien de vérification"}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle2 />
          {"Email vérifié !"}
        </CardTitle>
        <CardDescription>
          {"Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href="/auth/signin">{"Se connecter"}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
