import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  
  // 🔒 Headers de sécurité HTTP
  async headers() {
    return [
      {
        // Appliquer à toutes les routes
        source: '/(.*)',
        headers: [
          {
            // Protection contre le clickjacking
            // Empêche le site d'être affiché dans une iframe
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Empêche le navigateur de deviner le type MIME
            // Force l'utilisation du Content-Type déclaré
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Politique de référent - contrôle les informations envoyées
            // strict-origin-when-cross-origin : envoie l'origine uniquement en HTTPS cross-origin
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Protection XSS (Cross-Site Scripting)
            // Active le filtre XSS du navigateur
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // Contrôle des permissions des API du navigateur
            // Désactive l'accès aux API sensibles par défaut
            // Pour les activer, ajouter par exemple : camera=(self "https://example.com")
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            // Content Security Policy (CSP)
            // Définit les sources autorisées pour le contenu
            // ⚠️ À ajuster selon vos besoins (Google OAuth, CDN, etc.)
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'", // Par défaut, uniquement le même domaine
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com", // Scripts autorisés
              "style-src 'self' 'unsafe-inline'", // Styles autorisés (unsafe-inline pour Tailwind)
              "img-src 'self' data: https:", // Images (data: pour les base64, https: pour tous les HTTPS)
              "font-src 'self' data:", // Fonts
              "connect-src 'self' https://accounts.google.com", // Connexions AJAX/Fetch
              "frame-src 'self' https://accounts.google.com", // iframes autorisées (OAuth)
              "object-src 'none'", // Bloque les plugins (Flash, etc.)
              "base-uri 'self'", // Limite les URL de base
              "form-action 'self'", // Limite les soumissions de formulaires
              "frame-ancestors 'none'", // Empêche l'embedding (alternative à X-Frame-Options)
              "upgrade-insecure-requests", // Force HTTPS
            ].join('; '),
          },
          {
            // Strict Transport Security (HSTS)
            // Force HTTPS pendant 1 an, incluant les sous-domaines
            // ⚠️ Actif uniquement en production
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
