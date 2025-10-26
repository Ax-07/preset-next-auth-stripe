import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInvoices } from "@/lib/stripe/stripe-server";
import { Invoice } from "@/lib/stripe/types/stripe";
import { formatDate } from "@/utils/formatDate";
import { FileText, ExternalLink, Download, Link } from "lucide-react";
import React from "react";

export default async function BillingPage() {
  const { success, data } = await getUserInvoices(20);
  const invoices = success ? (data as Invoice[]) : [];

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mes Factures
          </CardTitle>
          <CardDescription>Consultez et téléchargez vos factures</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="space-y-4">
              {/* Liste des factures */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {invoices.map((invoice) => {
                  const getInvoiceStatusBadge = (status: string | null) => {
                    const badges: Record<
                      string,
                      { variant: "default" | "secondary" | "destructive" | "outline" | null | undefined; label: string }
                    > = {
                      paid: { variant: "default", label: "Payée" },
                      open: { variant: "secondary", label: "En attente" },
                      draft: { variant: "secondary", label: "Brouillon" },
                      void: { variant: "destructive", label: "Annulée" },
                      uncollectible: { variant: "destructive", label: "Impayée" },
                    };
                    return badges[status || "open"] || { variant: "secondary", label: status || "inconnu" };
                  };

                  const statusBadge = getInvoiceStatusBadge(invoice.status);

                  return (
                    <div
                      key={invoice.id}
                      className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{invoice.number || `Facture ${invoice.id.slice(-8)}`}</h4>
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <p>Date: {formatDate(invoice.created)}</p>
                          {invoice.periodStart && invoice.periodEnd && (
                            <p>
                              Période: {formatDate(invoice.periodStart)} - {formatDate(invoice.periodEnd)}
                            </p>
                          )}
                          {invoice.description && <p className="text-xs">{invoice.description}</p>}
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {invoice.total.toFixed(2)} {invoice.currency.toUpperCase()}
                          </p>
                          {invoice.amountDue > 0 && invoice.status !== "paid" && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                              Dû: {invoice.amountDue.toFixed(2)} {invoice.currency.toUpperCase()}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {invoice.hostedInvoiceUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={invoice.hostedInvoiceUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Voir
                              </a>
                            </Button>
                          )}
                          {invoice.invoicePdf && (
                            <Button variant="default" size="sm" asChild>
                              <a href={invoice.invoicePdf} target="_blank" rel="noopener noreferrer" download>
                                <Download className="mr-1 h-3 w-3" />
                                PDF
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message si plus de factures disponibles */}
              {invoices.length >= 20 && (
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    ℹ️ Vous voyez les 20 dernières factures. Pour consulter l&apos;historique complet, contactez le
                    support.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">Aucune facture</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Vous n&apos;avez pas encore de factures. Elles apparaîtront ici après votre premier paiement.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/pricing">Voir les plans</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
  );
};
