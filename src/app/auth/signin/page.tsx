import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SigninForm } from "../../../lib/auth/signin-form";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>Entrez vos informations ci-dessous pour créer votre compte</CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
      </CardContent>
    </Card>
  );
}
