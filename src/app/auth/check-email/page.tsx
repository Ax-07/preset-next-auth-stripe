import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CheckEmailPage(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const email = searchParams.email;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="text-primary" />
          Vérifiez votre email
        </CardTitle>
        <CardDescription>
          {email ? (
            <>
              {`Nous avons envoyé un email de vérification à ${email}.
              Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.`}
            </>
          ) : (
            <>
              {`Un email de vérification a été envoyé à votre adresse.
              Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.`}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {`Si vous n'avez pas reçu l'email, vérifiez votre dossier spam ou demandez un nouveau lien.`}
        </p>
        <div className="flex flex-col gap-2">
          <Button asChild variant="default" className="w-full">
            <Link href="/auth/resend-verification">
              {`Renvoyer le lien de vérification`}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/signin">
              {`Retour à la connexion`}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
