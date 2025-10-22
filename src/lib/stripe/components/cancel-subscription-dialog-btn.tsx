"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useStripeSubscribe } from "../stripe-client";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

export const CancelSubscriptionDialogBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [subscription, setSubscription] = useState<{
    limits: Record<string, number> | undefined;
    priceId: string | undefined;
    id: string;
    plan: string;
    stripeCustomerId?: string | undefined;
    stripeSubscriptionId?: string | undefined;
    status: string;
    periodEnd?: number;
    seats?: number | undefined;
  } | null>(null);
  const { cancelSubscription, getSubscriptionDetails } = useStripeSubscribe();

  useEffect(() => {
    if (isOpen) {
      loadSubscription();
    }
  }, [isOpen]);

  const loadSubscription = async () => {
    try {
      const { subscription: sub } = await getSubscriptionDetails();
      if (sub) {
        setSubscription({
          ...sub,
          periodEnd: sub.periodEnd instanceof Date ? sub.periodEnd.getTime() : sub.periodEnd
        });
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'abonnement:", error);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await cancelSubscription();
      setIsOpen(false);
      // La redirection sera gérée automatiquement par Better Auth
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
      alert("Une erreur est survenue lors de l'annulation de l'abonnement.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Annuler l&apos;abonnement</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Confirmer l&apos;annulation
          </DialogTitle>
          <DialogDescription>
            Cette action annulera votre abonnement actuel.
          </DialogDescription>
        </DialogHeader>

        {subscription && (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="space-y-2">
                <p>
                  <strong>Plan actuel :</strong> {subscription.plan}
                </p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span
                    className={
                      subscription.status === "active"
                        ? "text-green-600"
                        : subscription.status === "trialing"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }
                  >
                    {subscription.status}
                  </span>
                </p>
                {subscription.periodEnd && (
                  <p>
                    <strong>Fin de période :</strong>{" "}
                    {new Date(subscription.periodEnd).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
            </Card>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">Que se passe-t-il ensuite ?</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Votre abonnement restera actif jusqu&apos;à la fin de la période de facturation</li>
                <li>Vous ne serez pas facturé pour le prochain cycle</li>
                <li>Vous pourrez réactiver votre abonnement à tout moment</li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Conserver l&apos;abonnement
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Annulation...
              </>
            ) : (
              "Confirmer l'annulation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
