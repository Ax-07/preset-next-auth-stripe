"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldGroup } from "@/components/ui/field";
import { useProfile } from "@/lib/auth/auth-client";
import { AUTH_MESSAGES } from "@/lib/auth/auth-messages";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const changeEmailFormSchema = z.object({
  newEmail: z.string().email(AUTH_MESSAGES.validation.emailInvalid),
});

type ChangeEmailFormData = z.infer<typeof changeEmailFormSchema>;

export const ChangeEmailForm = ({ currentEmail }: { currentEmail: string }) => {
  const router = useRouter();
  const { changeEmail } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const onSubmit = async (data: ChangeEmailFormData) => {
    try {
      setError(null);
      setSuccess(false);

      // Vérifier que le nouvel email est différent
      if (data.newEmail === currentEmail) {
        setError("Le nouvel email doit être différent de l'email actuel");
        return;
      }

      // Appel à l'API de changement d'email
      const result = await changeEmail({
        newEmail: data.newEmail,
        password: "", // Better Auth gère l'authentification via la session
      });

      if (result?.error) {
        setError(result.error.message || "Une erreur est survenue");
        return;
      }

      setSuccess(true);
      form.reset();

      // Rediriger après 3 secondes
      setTimeout(() => {
        router.push("/dashboard/account");
      }, 3000);
    } catch (err) {
      setError("Une erreur inattendue est survenue");
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Email changé avec succès ! Un email de vérification a été envoyé à votre nouvelle adresse. 
              Redirection en cours...
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Email actuel :</strong> {currentEmail}
          </p>
        </div>

        <FormField
          name="newEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouvelle adresse email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="nouvelle@email.com" 
                  autoComplete="email"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Un email de vérification sera envoyé à cette adresse
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FieldGroup>
          <Field>
            <Button type="submit" disabled={form.formState.isSubmitting || success}>
              {form.formState.isSubmitting ? "Modification..." : "Changer l'email"}
            </Button>
            <Link href="/dashboard/account" className={buttonVariants({ variant: "outline" })}>
              Annuler
            </Link>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
