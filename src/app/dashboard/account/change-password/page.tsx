import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { ChangePasswordForm } from "@/lib/auth/components/forms/change-password-form";
import { redirect } from "next/navigation";

export default async function ChangePasswordPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Changer le mot de passe</h1>
        <p className="text-muted-foreground mt-2">
          Modifiez votre mot de passe pour sécuriser votre compte
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouveau mot de passe</CardTitle>
          <CardDescription>
            Entrez votre mot de passe actuel et choisissez un nouveau mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
