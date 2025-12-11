"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FcGoogle } from "react-icons/fc";
import { useAuthentification } from "@/lib/auth/auth-client";
import { AUTH_MESSAGES } from "@/lib/auth/auth-messages";

const signupFormSchema = z.object({
  name: z.string().min(2, AUTH_MESSAGES.validation.nameMin).max(100, AUTH_MESSAGES.validation.nameMax).nonempty(),
  email: z
    .email(AUTH_MESSAGES.validation.emailInvalid)
    .min(1, AUTH_MESSAGES.validation.emailRequired)
    .nonempty(),
  password: z
    .string()
    .min(8, AUTH_MESSAGES.validation.passwordMin)
    .max(100, AUTH_MESSAGES.validation.passwordMax)
    .nonempty(),
  confirmPassword: z
    .string()
    .min(8, AUTH_MESSAGES.validation.passwordMin)
    .max(100, AUTH_MESSAGES.validation.passwordMax)
    .nonempty(),
});

export const SignupForm = () => {
  const { signUpWithCredential } = useAuthentification();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange", // <- au lieu de "onBlur"
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isValidForm = form.formState.isValid;

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    // Vérification de la correspondance des mots de passe
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", { message: AUTH_MESSAGES.validation.passwordMismatch });
      return;
    }
    await signUpWithCredential(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Nom"}</FormLabel>
              <FormControl>
                <Input placeholder="" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Email"}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" autoComplete="email" {...field} required />
              </FormControl>
              <FormDescription>{"Nous ne partagerons jamais votre e-mail."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Mot de passe"}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" autoComplete="new-password" {...field} />
              </FormControl>
              <FormDescription>{"Votre mot de passe doit comporter au moins 8 caractères."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Confirmer le mot de passe"}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" autoComplete="new-password" {...field} />
              </FormControl>
              <FormDescription>{"Confirmez votre mot de passe."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FieldGroup>
          <Field>
            <Button type="submit" disabled={isSubmitting || !isValidForm}>
              {isSubmitting ? "Création en cours..." : "Créer un compte"}
            </Button>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              <FcGoogle className="mr-2 inline-block" />
              {"S'inscrire avec Google"}
            </Button>
            <FieldDescription className="px-6 text-center">
              {"Vous avez déjà un compte ?"} <a href="/auth/signin">Se connecter</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
