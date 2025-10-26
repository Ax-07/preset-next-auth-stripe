/**
 * Centralisation des messages d'erreur et de succès pour l'authentification
 */

export const AUTH_MESSAGES = {
  // Messages de succès
  success: {
    signIn: "Connexion réussie !",
    signUp: "Compte créé avec succès ! Veuillez vérifier votre email.",
    signOut: "Déconnexion réussie",
    passwordReset: "Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.",
    passwordChanged: "Mot de passe modifié avec succès !",
    emailChanged: "Email modifié avec succès ! Veuillez vérifier votre nouvelle adresse email.",
    passwordResetEmailSent: "Email de réinitialisation du mot de passe envoyé avec succès",
    verificationEmailSent: "Email de vérification envoyé avec succès",
    profileUpdated: "Mise à jour effectuée avec succès",
    accountDeleted: "Compte supprimé avec succès",
    emailVerified: "Votre adresse email a été vérifiée avec succès",
  },

  // Messages d'erreur
  error: {
    signIn: "Erreur lors de la connexion",
    signUp: "Erreur lors de l'inscription",
    passwordReset: "Erreur lors de la réinitialisation du mot de passe",
    passwordChange: "Erreur lors de la modification du mot de passe",
    emailChange: "Erreur lors de la modification de l'email",
    passwordResetEmail: "Erreur lors de l'envoi de l'email de réinitialisation du mot de passe",
    verificationEmail: "Erreur lors de l'envoi de l'email de vérification",
    profileUpdate: "Erreur lors de la mise à jour de l'utilisateur",
    accountDelete: "Erreur lors de la suppression du compte",
    emailVerification: "Erreur lors de la vérification de l'email",
    invalidToken: "Le lien est invalide ou a expiré",
    emailNotVerified: "Veuillez vérifier votre email avant de vous connecter",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    generic: "Une erreur est survenue. Veuillez réessayer.",
  },

  // Messages de validation
  validation: {
    nameMin: "Le nom doit contenir au moins 2 caractères",
    nameMax: "Le nom ne peut pas dépasser 100 caractères",
    emailInvalid: "Email invalide",
    emailRequired: "L'email est requis",
    passwordMin: "Le mot de passe doit contenir au moins 8 caractères",
    passwordMax: "Le mot de passe ne peut pas dépasser 100 caractères",
    passwordRequired: "Le mot de passe est requis",
    passwordMismatch: "Les mots de passe ne correspondent pas",
  },

  // Messages d'information
  info: {
    checkEmail: "Veuillez vérifier votre boîte de réception et suivre les instructions.",
    checkSpam: "Si vous n'avez pas reçu l'email, vérifiez votre dossier spam.",
    linkExpired: "Le lien de vérification est invalide ou a expiré.",
  },

  // Confirmations
  confirm: {
    deleteAccount: "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
  },
} as const;

/**
 * Formate un message d'erreur avec le détail de l'erreur
 */
export function formatErrorMessage(baseMessage: string, error?: string | Error): string {
  const errorDetail = typeof error === 'string' ? error : error?.message;
  return errorDetail ? `${baseMessage}: ${errorDetail}` : baseMessage;
}

/**
 * Codes d'erreur spécifiques Better Auth
 */
export const AUTH_ERROR_CODES = {
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
} as const;

/**
 * Mappe les codes d'erreur Better Auth vers des messages français
 */
export function getErrorMessage(errorCode?: string, defaultMessage?: string): string {
  const errorMessages: Record<string, string> = {
    [AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED]: AUTH_MESSAGES.error.emailNotVerified,
    [AUTH_ERROR_CODES.INVALID_CREDENTIALS]: "Email ou mot de passe incorrect",
    [AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS]: "Cet email est déjà utilisé",
    [AUTH_ERROR_CODES.INVALID_TOKEN]: AUTH_MESSAGES.error.invalidToken,
    [AUTH_ERROR_CODES.TOKEN_EXPIRED]: "Le lien a expiré. Veuillez en demander un nouveau.",
    [AUTH_ERROR_CODES.USER_NOT_FOUND]: "Utilisateur introuvable",
  };

  return errorCode && errorMessages[errorCode] 
    ? errorMessages[errorCode] 
    : defaultMessage || AUTH_MESSAGES.error.generic;
}
