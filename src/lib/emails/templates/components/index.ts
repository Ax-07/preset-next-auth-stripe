// Composants communs pour les emails React Email avec Tailwind CSS
export { default as EmailLayout } from "./email-layout";
export { default as EmailHeader } from "./email-header";
export { default as EmailFooter } from "./email-footer";
export { default as EmailButton } from "./email-button";
export { default as EmailCard } from "./email-card";
export { default as EmailHeading } from "./email-heading";
export { default as EmailText } from "./email-text";
export { default as EmailSpacer } from "./email-spacer";

// Types communs
export interface EmailProps {
  companyName?: string;
  logoUrl?: string;
  supportEmail?: string;
  companyAddress?: string;
  baseUrl?: string;
}

export interface UserEmailProps extends EmailProps {
  userName: string;
  userEmail: string;
}

export interface SubscriptionEmailProps extends UserEmailProps {
  planName: string;
  planPrice?: string;
  billingPeriod?: "monthly" | "yearly";
  nextBillingDate?: string;
  subscriptionId?: string;
}

// Couleurs Tailwind pour cohérence
export const EMAIL_COLORS = {
  primary: {
    50: "bg-blue-50",
    500: "bg-blue-500", 
    600: "bg-blue-600",
    text: "text-blue-600",
  },
  success: {
    50: "bg-green-50",
    500: "bg-green-500",
    600: "bg-green-600", 
    text: "text-green-600",
  },
  warning: {
    50: "bg-yellow-50",
    500: "bg-yellow-500",
    600: "bg-yellow-600",
    text: "text-yellow-600",
  },
  danger: {
    50: "bg-red-50",
    500: "bg-red-500",
    600: "bg-red-600",
    text: "text-red-600",
  },
  gray: {
    50: "bg-gray-50",
    100: "bg-gray-100",
    200: "bg-gray-200",
    500: "text-gray-500",
    600: "text-gray-600",
    900: "text-gray-900",
  },
} as const;