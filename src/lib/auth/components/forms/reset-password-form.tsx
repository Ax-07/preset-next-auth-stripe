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

const resetPasswordFormSchema = z.object({
  password: z.string().min(8, AUTH_MESSAGES.validation.passwordMin),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: AUTH_MESSAGES.validation.passwordMismatch,
  path: ["confirmPassword"],
});

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const { resetUserPassword } = useProfile();
  
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      await resetUserPassword(token, data.password);
    } catch (error) {
      // Error is already handled by the hook
      console.error('Password reset error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormLabel>Confirmer le mot de passe</FormLabel>
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
            <Button type="submit" className="w-full">
              Réinitialiser le mot de passe
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
