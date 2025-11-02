// Export des composants communs avec Tailwind CSS
export * from "./components";

// Export des utilitaires
export * from "./helpers/email-renderer";

// Export des templates
export * from "./auth";
export * from "./subscription";
export * from "./trial";
export * from "./payment";
export * from "./admin";
export * from "./engagement";

/**
 * Configuration globale des emails avec Tailwind CSS
 */
export const EMAIL_TEMPLATES_CONFIG = {
  // Délais d'expiration
  VERIFICATION_EXPIRES_HOURS: 24,
  RESET_PASSWORD_EXPIRES_HOURS: 1,
  
  // URLs de base
  VERIFICATION_ROUTE: "/auth/verify-email",
  RESET_PASSWORD_ROUTE: "/auth/reset-password",
  DASHBOARD_ROUTE: "/dashboard",
  BILLING_ROUTE: "/dashboard/billing",
  
  // Classes Tailwind pour cohérence
  COLORS: {
    // Couleurs principales
    brand: {
      bg: "bg-blue-500",
      bgHover: "bg-blue-600",
      text: "text-blue-600",
      bgLight: "bg-blue-50",
      border: "border-blue-500",
    },
    // États
    success: {
      bg: "bg-green-500",
      text: "text-green-600", 
      bgLight: "bg-green-50",
      border: "border-green-500",
    },
    warning: {
      bg: "bg-yellow-500",
      text: "text-yellow-600",
      bgLight: "bg-yellow-50", 
      border: "border-yellow-500",
    },
    danger: {
      bg: "bg-red-500",
      text: "text-red-600",
      bgLight: "bg-red-50",
      border: "border-red-500",
    },
    // Texte
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600", 
      light: "text-gray-500",
      white: "text-white",
    },
    // Arrière-plans
    background: {
      primary: "bg-white",
      secondary: "bg-gray-50",
      muted: "bg-gray-100",
    },
  },
  
  // Espacements standardisés
  SPACING: {
    small: "p-4",
    medium: "p-6", 
    large: "p-8",
    xl: "p-12",
  },
  
  // Typographie
  TYPOGRAPHY: {
    heading: {
      h1: "text-3xl font-semibold text-gray-900",
      h2: "text-2xl font-semibold text-gray-900",
      h3: "text-xl font-semibold text-gray-900",
      h4: "text-lg font-semibold text-gray-900",
    },
    text: {
      body: "text-base text-gray-600 leading-relaxed",
      small: "text-sm text-gray-500",
      large: "text-lg text-gray-600",
    },
  },
} as const;