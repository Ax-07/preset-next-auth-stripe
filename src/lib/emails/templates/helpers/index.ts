// Export tous les helpers d'email organisés par catégorie

// AUTHENTIFICATION - Helpers pour l'auth, verification, etc.
export {
  createVerificationEmail,
  createPasswordResetEmail,
  createWelcomeEmail,
  createAccountDeletedEmail,
  // Types
  type AuthUser,
  type BetterAuthEmailData,
} from "./auth-helpers";

// ABONNEMENTS - Helpers pour la gestion des abonnements
export {
  createSubscriptionWelcomeEmail,
  createSubscriptionCancelledEmail,
  createSubscriptionUpdatedEmail,
  createSubscriptionDeletedEmail,
  // Types
  type SubscriptionUser,
  type PlanData,
  type SubscriptionData,
  type CancellationData,
} from "./subscription-helpers";

// ESSAIS GRATUITS - Helpers pour les périodes d'essai
export {
  createTrialStartedEmail,
  createTrialEndingSoonEmail,
  createTrialEndingEmail,
  createTrialExpiredEmail,
  // Types
  type TrialUser,
  type TrialData,
  type TrialDiscount,
  type SpecialOffer,
} from "./trial-helpers";

// PAIEMENTS - Helpers pour les transactions et factures
export {
  createPaymentFailedEmail,
  createInvoicePaidEmail,
  // Types
  type PaymentUser,
  type PaymentData,
  type InvoiceData,
  type NextBillingData,
} from "./payment-helpers";

// ADMINISTRATION - Helpers pour les emails admin
export {
  createContactFormEmail,
  createAdminNewCustomerEmail,
  // Types
  type AdminUser,
  type ContactFormData,
  type NewCustomerData,
} from "./admin-helpers";

// ENGAGEMENT - Helpers pour l'engagement utilisateur
export {
  createFeedbackRequestEmail,
  createAbandonedProcessEmail,
  // Types
  type EngagementUser,
  type FeedbackData,
  type AbandonedProcessData,
  type UserActivity,
  type ProcessProgress,
  type Incentive,
} from "./engagement-helpers";

// UTILITAIRES - Fonctions de base pour le rendu d'emails
export {
  renderEmail,
  prepareEmailData,
  EMAIL_CONFIG,
  type EmailRenderData,
} from "./email-renderer";

/**
 * GUIDE D'UTILISATION RAPIDE
 * ========================
 * 
 * Les helpers sont maintenant organisés par catégorie pour plus de clarté :
 * 
 * 📧 AUTHENTIFICATION
 * -------------------
 * import { createWelcomeEmail, createVerificationEmail } from './utils';
 * 
 * 💳 ABONNEMENTS
 * --------------
 * import { createSubscriptionWelcomeEmail } from './utils';
 * 
 * 🆓 ESSAIS GRATUITS
 * ------------------
 * import { createTrialStartedEmail } from './utils';
 * 
 * 💰 PAIEMENTS
 * ------------
 * import { createPaymentFailedEmail } from './utils';
 * 
 * 👥 ADMINISTRATION
 * ----------------
 * import { createContactFormEmail } from './utils';
 * 
 * 🎯 ENGAGEMENT
 * -------------
 * import { createFeedbackRequestEmail } from './utils';
 * 
 * 🔧 ENVOI D'EMAIL
 * ---------------
 * import { sendEmail } from '@/lib/emails/mail.service';
 * 
 * Consultez le README.md pour des exemples détaillés.
 */