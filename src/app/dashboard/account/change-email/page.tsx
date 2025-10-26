import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { ChangeEmailForm } from "@/lib/auth/components/forms/change-email-form";
import { redirect } from "next/navigation";

export default async function ChangeEmailPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{"Changer l'adresse email"}</h1>
        <p className="text-muted-foreground mt-2">
          {"Modifiez votre adresse email. Un email de vérification sera envoyé."}
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{"Nouvelle adresse email"}</CardTitle>
          <CardDescription>
            {"Vous recevrez un email de vérification à votre nouvelle adresse"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangeEmailForm currentEmail={user.email} />
        </CardContent>
      </Card>
    </div>
  );
}
