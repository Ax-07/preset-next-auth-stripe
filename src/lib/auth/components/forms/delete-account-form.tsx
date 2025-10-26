"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useProfile } from "@/lib/auth/auth-client";
import { User } from "better-auth";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const deleteAccountFormSchema = z.object({
  confirmation: z.string().refine((val) => val === "SUPPRIMER", {
    message: "Vous devez taper 'SUPPRIMER' pour confirmer",
  }),
});

export const DeleteAccountForm = ({ user }: { user: User }) => {
  const { removeProfile } = useProfile();
  const form = useForm<z.infer<typeof deleteAccountFormSchema>>({
    resolver: zodResolver(deleteAccountFormSchema),
    defaultValues: {
      confirmation: "",
    },
  });

  const onSubmit = async () => {
    await removeProfile();
  };

  return (
    <div className="space-y-4">
      <div className="border border-destructive bg-destructive/10 rounded-lg p-4">
        <div className="flex gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <div className="flex-1">
            <h3 className="font-semibold text-destructive mb-2">Attention !</h3>
            <p className="text-sm text-muted-foreground">
              La suppression de votre compte entraînera la perte définitive de :
            </p>
            <ul className="list-disc list-inside mt-2 ml-2 text-sm text-muted-foreground">
              <li>Vos informations personnelles</li>
              <li>Votre historique</li>
              <li>Toutes vos données associées</li>
            </ul>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Compte à supprimer : <strong>{user.email}</strong>
            </p>
          </div>

          <FormField
            control={form.control}
            name="confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tapez SUPPRIMER"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Pour confirmer, tapez <strong>SUPPRIMER</strong> en majuscules
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-end">
            <Link href="/dashboard/account">
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </Link>
            <Button type="submit" variant="destructive">
              Supprimer définitivement
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
