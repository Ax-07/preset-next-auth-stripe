import { prepareEmailData, EMAIL_CONFIG } from "./email-renderer";
import { ContactForm, AdminNewCustomer } from "../admin";

/**
 * HELPERS POUR L'ADMINISTRATION
 * 
 * Ces helpers génèrent des emails destinés aux administrateurs :
 * - Formulaire de contact
 * - Notification nouveau client
 * - Alertes administratives
 */

/**
 * Helper pour générer l'email de formulaire de contact (admin)
 */
export async function createContactFormEmail(data: {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  submittedAt: string;
  category?: "support" | "billing" | "feature" | "bug" | "other";
  priority?: "low" | "medium" | "high" | "urgent";
  userPlan?: "free" | "basic" | "premium" | "enterprise" | null;
}) {
  const emailComponent = ContactForm({
    userName: data.userName,
    userEmail: data.userEmail,
    subject: data.subject,
    message: data.message,
    submittedAt: data.submittedAt,
    category: data.category || "other",
    priority: data.priority || "medium",
    userPlan: data.userPlan,
    replyToUrl: `${EMAIL_CONFIG.BASE_URL}/admin/support/reply`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: EMAIL_CONFIG.SUPPORT_EMAIL,
    subject: `📧 Nouveau message de contact: ${data.subject}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de nouveau client (admin)
 */
export async function createAdminNewCustomerEmail(data: {
  user: { name: string; email: string };
  registeredAt: string;
  signupMethod: "email" | "google" | "github" | "apple" | "other";
  plan?: { name: string; price?: string };
  isFirstPayingCustomer?: boolean;
}) {
  const emailComponent = AdminNewCustomer({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    registeredAt: data.registeredAt,
    planName: data.plan?.name,
    planPrice: data.plan?.price,
    signupMethod: data.signupMethod,
    isFirstPayingCustomer: data.isFirstPayingCustomer || false,
    customerDashboardUrl: `${EMAIL_CONFIG.BASE_URL}/admin/customers/${data.user.email}`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: EMAIL_CONFIG.SUPPORT_EMAIL,
    subject: data.isFirstPayingCustomer ? 
      "🎉 PREMIER CLIENT PAYANT !" : 
      `👋 Nouveau client: ${data.user.name}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Types pour l'administration
 */
export interface AdminUser {
  name: string;
  email: string;
  id?: string;
}

export interface ContactFormData {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  submittedAt: string;
  category?: "support" | "billing" | "feature" | "bug" | "other";
  priority?: "low" | "medium" | "high" | "urgent";
  userPlan?: "free" | "basic" | "premium" | "enterprise" | null;
}

export interface NewCustomerData {
  user: AdminUser;
  registeredAt: string;
  signupMethod: "email" | "google" | "github" | "apple" | "other";
  plan?: { name: string; price?: string };
  isFirstPayingCustomer?: boolean;
}