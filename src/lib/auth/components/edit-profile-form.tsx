"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Field, FieldGroup } from "@/components/ui/field";
import { useProfile } from "@/lib/auth/auth-client";
import { User } from "better-auth";
import Link from "next/link";

const editProfileFormSchema = z.object({
  name: z.string().min(2).max(100),
  image: z.string().nullable(),
});

export const EditProfileForm = ({user}: {user: User}) => {
  const { updateProfile } = useProfile();
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: user.name,
      image: user.image,
    },
  });

  const onSubmit = async (data: z.infer<typeof editProfileFormSchema>) => {
    console.log(data);
    updateProfile(data);
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
                <Input type="text" placeholder="" autoComplete="name" {...field}/>
              </FormControl>
              <FormDescription>{"Nous ne partagerons jamais votre nom."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Image"}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" autoComplete="image" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormDescription>{"Nous ne partagerons jamais votre image."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FieldGroup>
          <Field>
            <Button type="submit">Mettre à jour</Button>
            <Link href="/profile" className={buttonVariants({ variant: "outline" })}>Annuler</Link>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
};
