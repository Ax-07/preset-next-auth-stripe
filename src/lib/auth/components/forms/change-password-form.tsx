"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldGroup } from "@/components/ui/field";
import { useProfile } from "@/lib/auth/auth-client";
import { AUTH_MESSAGES } from "@/lib/auth/auth-messages";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  password: z.string().min(8, AUTH_MESSAGES.validation.passwordMin),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: AUTH_MESSAGES.validation.passwordMismatch,
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

export const ChangePasswordForm = () => {
  const router = useRouter();
  const { changePassword } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setError(null);
      setSuccess(false);

      // Appel à l'API de changement de mot de passe
      const result = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.password,
      });

      if (result.error) {
        setError(result.error.message || "Une erreur est survenue");
        return;
      }

      setSuccess(true);
      form.reset();

      // Rediriger après 2 secondes
      setTimeout(() => {
        router.push("/dashboard/account");
      }, 2000);
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
              Mot de passe changé avec succès ! Redirection en cours...
            </AlertDescription>
          </Alert>
        )}

        <FormField
          name="currentPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Entrez votre mot de passe actuel" 
                  autoComplete="current-password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Entrez votre nouveau mot de passe" 
                  autoComplete="new-password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Confirmez votre nouveau mot de passe" 
                  autoComplete="new-password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FieldGroup>
          <Field>
            <Button type="submit" disabled={form.formState.isSubmitting || success}>
              {form.formState.isSubmitting ? "Modification..." : "Changer le mot de passe"}
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
