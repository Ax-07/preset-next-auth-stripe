'use client';

import { useState, useEffect } from 'react';

interface UseCSRFReturn {
  csrfToken: string | null;
  isLoading: boolean;
  error: string | null;
  refreshToken: () => Promise<void>;
}

/**
 * Hook personnalisé pour gérer les tokens CSRF côté client
 * 
 * @example
 * ```tsx
 * const { csrfToken, isLoading, error } = useCSRF();
 * 
 * // Utiliser le token dans une requête
 * const response = await fetch('/api/contact', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'X-CSRF-Token': csrfToken,
 *   },
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export function useCSRF(): UseCSRFReturn {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Important pour envoyer les cookies
      });

      if (!response.ok) {
        throw new Error('Échec de récupération du token CSRF');
      }

      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      console.error('❌ Erreur lors de la récupération du token CSRF:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return {
    csrfToken,
    isLoading,
    error,
    refreshToken: fetchToken,
  };
}

/**
 * Helper function pour ajouter le token CSRF aux headers d'une requête
 * 
 * @example
 * ```tsx
 * const { csrfToken } = useCSRF();
 * 
 * const headers = withCSRFToken(csrfToken, {
 *   'Content-Type': 'application/json',
 * });
 * 
 * await fetch('/api/contact', {
 *   method: 'POST',
 *   headers,
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export function withCSRFToken(
  csrfToken: string | null,
  headers: HeadersInit = {}
): HeadersInit {
  if (!csrfToken) {
    console.warn('⚠️ Token CSRF manquant');
    return headers;
  }

  return {
    ...headers,
    'X-CSRF-Token': csrfToken,
  };
}
