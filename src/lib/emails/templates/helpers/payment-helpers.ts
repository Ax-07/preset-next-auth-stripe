import { prepareEmailData, EMAIL_CONFIG } from "./email-renderer";
import { PaymentFailed, InvoicePaid } from "../payment";

/**
 * HELPERS POUR LES PAIEMENTS
 * 
 * Ces helpers génèrent des emails liés aux paiements :
 * - Échec de paiement
 * - Facture payée
 * - Rappels de paiement
 */

/**
 * Helper pour générer l'email d'échec de paiement
 */
export async function createPaymentFailedEmail(data: {
  user: { name: string; email: string };
  payment: {
    amount: string;
    failureDate?: string;
    attemptNumber?: number;
    failureReason?: string;
    nextRetryDate?: string;
  };
  plan: { name: string };
}) {
  const emailComponent = PaymentFailed({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    amount: data.payment.amount,
    failureReason: data.payment.failureReason,
    nextRetryDate: data.payment.nextRetryDate,
    updatePaymentUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing/payment-method`,
    retryUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/billing/retry`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `⚠️ Problème avec votre paiement - ${EMAIL_CONFIG.COMPANY_NAME}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de facture payée
 */
export async function createInvoicePaidEmail(data: {
  user: { name: string; email: string };
  invoice: {
    amount: string;
    paidDate: string;
    invoiceNumber: string;
    downloadUrl?: string;
  };
  plan: { name: string };
  nextBilling?: {
    date: string;
    amount: string;
  };
}) {
  const emailComponent = InvoicePaid({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    planName: data.plan.name,
    paidAmount: data.invoice.amount,
    paymentDate: data.invoice.paidDate,
    invoiceNumber: data.invoice.invoiceNumber,
    invoiceUrl: data.invoice.downloadUrl,
    nextBillingDate: data.nextBilling?.date,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `✅ Paiement confirmé - Facture ${data.invoice.invoiceNumber}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Types pour les paiements
 */
export interface PaymentUser {
  name: string;
  email: string;
  id?: string;
}

export interface PaymentData {
  amount: string;
  failureDate?: string;
  paidDate?: string;
  attemptNumber?: number;
  nextAttemptDate?: string;
  failureReason?: string;
  nextRetryDate?: string;
}

export interface InvoiceData {
  amount: string;
  paidDate: string;
  invoiceNumber: string;
  downloadUrl?: string;
}

export interface NextBillingData {
  date: string;
  amount: string;
}