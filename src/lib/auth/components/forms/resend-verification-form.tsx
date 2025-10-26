"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { AUTH_MESSAGES } from "@/lib/auth/auth-messages";
import { useAuthentification } from "../../auth-client";

const resendVerificationFormSchema = z.object({
  email: z.email(AUTH_MESSAGES.validation.emailInvalid).min(1, AUTH_MESSAGES.validation.emailRequired),
});

export const ResendVerificationForm = () => {
  const { resendVerificationEmail } = useAuthentification();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof resendVerificationFormSchema>>({
    resolver: zodResolver(resendVerificationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resendVerificationFormSchema>) => {
    const success = await resendVerificationEmail(data.email);
    if (success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <p className="text-sm text-muted-foreground">
          Un nouveau lien de vérification a été envoyé à votre adresse email.
          Veuillez vérifier votre boîte de réception.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="votre.email@exemple.com" 
                  autoComplete="email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FieldGroup>
          <Field>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Envoi en cours..." : "Renvoyer le lien"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
