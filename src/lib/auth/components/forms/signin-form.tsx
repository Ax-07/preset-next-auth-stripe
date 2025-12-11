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
import Link from "next/link";
import { AUTH_MESSAGES } from "@/lib/auth/auth-messages";

const signinFormSchema = z.object({
  email: z.email(AUTH_MESSAGES.validation.emailInvalid).min(1, AUTH_MESSAGES.validation.emailRequired).nonempty(),
  password: z.string().min(8, AUTH_MESSAGES.validation.passwordMin).max(100, AUTH_MESSAGES.validation.passwordMax).nonempty(),
});

export const SigninForm = () => {
  const { signInWithCredential, signInWithProvider } = useAuthentification()
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

    const isSubmitting = form.formState.isSubmitting;
  const isValidForm = form.formState.isValid;

  const onSubmit = async (data: z.infer<typeof signinFormSchema>) => {
    console.log(data);
    signInWithCredential(data)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Email"}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" autoComplete="email" {...field} required/>
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
              <FormLabel>{"Mot de passe"}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" autoComplete="new-password" {...field} required/>
              </FormControl>
              <FormDescription><Link href="/auth/forget-password">{"Mot de passe oublié ?"}</Link></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FieldGroup>
          <Field>
            <Button type="submit" disabled={isSubmitting || !isValidForm}>Se connecter</Button>
            <Button variant="outline" type="button" onClick={() => signInWithProvider("google")}>
              <FcGoogle className="mr-2 inline-block" />
              {"Se connecter avec Google"}
            </Button>
            <FieldDescription className="px-6 text-center">
              {"Vous n'avez pas de compte ?"} <a href="/auth/signup">Inscrivez-vous</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
