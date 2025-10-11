import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth/auth-server";
import { CheckIcon } from "lucide-react";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();

  if (!user) {
    return unauthorized();
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
              {user.emailVerified ? <CheckIcon className="inline size-4 ml-2 text-green-500" /> : null}
            </p>
        </CardContent>
      </Card>
  );
}
