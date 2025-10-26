import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResendVerificationForm } from "@/lib/auth/components/forms/resend-verification-form";

export default function ResendVerificationPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Renvoyer le lien de vérification</CardTitle>
        <CardDescription>
          Entrez votre adresse email pour recevoir un nouveau lien de vérification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResendVerificationForm />
      </CardContent>
    </Card>
  );
}
