// Templates de paiement
export { default as PaymentFailed } from "./payment-failed";
export { default as InvoicePaid } from "./invoice-paid";

// Types pour les templates de paiement
export interface PaymentEmailProps {
  userName: string;
  userEmail: string;
  companyName?: string;
  logoUrl?: string;
}

export interface PaymentFailedEmailData extends PaymentEmailProps {
  planName: string;
  failedAmount: string;
  failureReason?: string;
  retryUrl?: string;
  updatePaymentUrl?: string;
  nextRetryDate?: string;
  invoiceUrl?: string;
}

export interface InvoicePaidEmailData extends PaymentEmailProps {
  invoiceNumber: string;
  paidAmount: string;
  planName: string;
  paymentDate?: string;
  paymentMethod?: string;
  billingPeriod?: "monthly" | "yearly";
  nextBillingDate?: string;
  invoiceUrl?: string;
  receiptUrl?: string;
}