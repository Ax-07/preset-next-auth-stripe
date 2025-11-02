// Templates d'authentification
export { default as EmailVerification } from "./email-verification";
export { default as PasswordReset } from "./password-reset";
export { AccountDeleted } from "./account-deleted";
export { WelcomeEmail } from "./welcome-email";

// Types pour les templates d'auth
export interface AuthEmailProps {
  userName: string;
  userEmail: string;
  companyName?: string;
  logoUrl?: string;
}

export interface VerificationEmailData extends AuthEmailProps {
  verificationUrl: string;
  expiresInHours?: number;
}

export interface PasswordResetEmailData extends AuthEmailProps {
  resetUrl: string;
  expiresInHours?: number;
  requestedAt?: string;
}