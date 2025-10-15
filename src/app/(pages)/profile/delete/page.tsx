import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { DeleteAccountForm } from "@/lib/auth/components/delete-account-form";
import { unauthorized } from "next/navigation";

export default async function DeleteAccountPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="w-full max-w-md border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Supprimer mon compte</CardTitle>
        <CardDescription>
          Cette action est irréversible. Toutes vos données seront définitivement supprimées.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteAccountForm user={user} />
      </CardContent>
    </Card>
  );
}
