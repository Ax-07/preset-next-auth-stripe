import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ForgetPasswordPage(props: { searchParams: Promise<Record<string, string>>}) {
    const searchParams = await props.searchParams;
    const email = searchParams.email;
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Email envoyé !</CardTitle>
        <CardDescription>
          Nous avons envoyé un email à <strong>{email}</strong> avec un lien pour réinitialiser votre mot de passe. 
          Veuillez vérifier votre boîte de réception et suivre les instructions.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
