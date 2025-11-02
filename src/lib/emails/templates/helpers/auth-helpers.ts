import { prepareEmailData, EMAIL_CONFIG } from "./email-renderer";
import { EmailVerification, PasswordReset, WelcomeEmail, AccountDeleted } from "../auth";

/**
 * HELPERS POUR L'AUTHENTIFICATION
 * 
 * Ces helpers génèrent des emails liés aux processus d'authentification :
 * - Vérification d'email
 * - Réinitialisation de mot de passe
 * - Email de bienvenue
 * - Suppression de compte
 */

/**
 * Helper pour générer l'email de vérification
 * Compatible avec Better Auth sendVerificationEmail callback
 */
export async function createVerificationEmail(data: {
  user: { name: string; email: string };
  url: string;
  expiresInHours?: number;
}) {
  const emailComponent = EmailVerification({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    verificationUrl: data.url,
    expiresInHours: data.expiresInHours || 24,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Vérifiez votre adresse email pour ${EMAIL_CONFIG.COMPANY_NAME}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de réinitialisation de mot de passe
 * Compatible avec Better Auth sendResetPassword callback
 */
export async function createPasswordResetEmail(data: {
  user: { name: string; email: string };
  url: string;
  expiresInHours?: number;
}) {
  const emailComponent = PasswordReset({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    resetUrl: data.url,
    expiresInHours: data.expiresInHours || 1,
    requestedAt: new Date().toLocaleString("fr-FR"),
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Réinitialisation de votre mot de passe - ${EMAIL_CONFIG.COMPANY_NAME}`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de bienvenue après inscription
 */
export async function createWelcomeEmail(data: {
  user: { name: string; email: string };
  signupMethod: "email" | "google" | "github" | "apple" | "other";
  registrationDate?: string;
  isEmailVerified?: boolean;
}) {
  const emailComponent = WelcomeEmail({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    registrationDate: data.registrationDate || new Date().toLocaleDateString('fr-FR'),
    signupMethod: data.signupMethod,
    isEmailVerified: data.isEmailVerified ?? true,
    dashboardUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard`,
    profileUrl: `${EMAIL_CONFIG.BASE_URL}/dashboard/profile`,
    supportUrl: `${EMAIL_CONFIG.BASE_URL}/support`,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Bienvenue dans ${EMAIL_CONFIG.COMPANY_NAME} ! 🎉`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Helper pour générer l'email de suppression de compte
 */
export async function createAccountDeletedEmail(data: {
  user: { name: string; email: string };
  deletedDate: string;
  reason?: "user_request" | "admin_action" | "gdpr_request" | "inactivity";
  deletionReference?: string;
}) {
  const emailComponent = AccountDeleted({
    userName: data.user.name || "Utilisateur",
    userEmail: data.user.email,
    deletedDate: data.deletedDate,
    reason: data.reason || "user_request",
    deletionReference: data.deletionReference,
    dataRetentionDays: 30,
    companyName: EMAIL_CONFIG.COMPANY_NAME,
    logoUrl: EMAIL_CONFIG.LOGO_URL,
  });

  return prepareEmailData(emailComponent, {
    to: data.user.email,
    subject: `Votre compte ${EMAIL_CONFIG.COMPANY_NAME} a été supprimé`,
    from: EMAIL_CONFIG.DEFAULT_FROM,
  });
}

/**
 * Types pour l'authentification
 */
export interface AuthUser {
  name: string;
  email: string;
  id?: string;
}

export interface BetterAuthEmailData {
  user: AuthUser;
  url: string;
}