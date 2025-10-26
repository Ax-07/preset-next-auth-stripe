import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/lib/auth/components/forms/reset-password-form";

export default async function ResetPasswordPage(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  if (!token) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Lien invalide</CardTitle>
          <CardDescription>
            Le lien de réinitialisation du mot de passe est invalide ou a expiré.
            Veuillez faire une nouvelle demande de réinitialisation.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Nouveau mot de passe</CardTitle>
        <CardDescription>
          Entrez votre nouveau mot de passe ci-dessous
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />
      </CardContent>
    </Card>
  );
}
