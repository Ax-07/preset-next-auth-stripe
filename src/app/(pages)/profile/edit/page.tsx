import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { EditProfileForm } from "@/lib/auth/components/edit-profile-form";
import { unauthorized } from "next/navigation";

export default async function EditProfilePage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Modifier le profil</CardTitle>
        <CardDescription>Entrez vos informations ci-dessous pour mettre à jour votre profil</CardDescription>
      </CardHeader>
      <CardContent>
        <EditProfileForm user={user} />
      </CardContent>
    </Card>
  );
}
