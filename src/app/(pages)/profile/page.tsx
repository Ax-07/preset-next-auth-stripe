import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { CheckIcon, EditIcon } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl">Mon Profil</CardTitle>
        <div>
          <Link href="/profile/edit" className="flex items-center text-md text-muted-foreground">
            <EditIcon className="inline size-4 mr-2" />
            Modifier
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <div className="flex flex-col">
          <span className="text-muted-foreground">Nom:</span>
          <span>{user.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">
            Email: {user.emailVerified ? <CheckIcon className="inline size-4 ml-2 text-green-500" /> : null}
          </span>
          <span>{user.email}</span>
        </div>
      </CardContent>
    </Card>
  );
}
