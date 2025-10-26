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

const forgetPasswordFormSchema = z.object({
  email: z.string().email(AUTH_MESSAGES.validation.emailInvalid).min(1, AUTH_MESSAGES.validation.emailRequired),
});

export const ForgetPasswordForm = () => {
    const { forgetUserPassword } = useProfile();
  const form = useForm<z.infer<typeof forgetPasswordFormSchema>>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgetPasswordFormSchema>) => {
    console.log(data);
    await forgetUserPassword(data.email);
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
                <Input type="email" placeholder="" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FieldGroup>
          <Field>
            <Button type="submit">Réinitialiser le mot de passe</Button>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
