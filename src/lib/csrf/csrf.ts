import { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * Génère un token CSRF sécurisé
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Vérifie la validité d'un token CSRF
 */
export function verifyCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) {
    return false;
  }
  
  // Comparaison sécurisée pour éviter les attaques par timing
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(storedToken));
}

/**
 * Middleware helper pour valider les tokens CSRF dans les autres routes
 */
export function validateCSRFToken(req: NextRequest): { isValid: boolean; error?: string } {
  try {
    // Récupérer le token depuis le header
    const headerToken = req.headers.get('X-CSRF-Token');
    
    // Récupérer le token stocké dans le cookie
    const cookieToken = req.cookies.get('csrf-token')?.value;
    
    if (!headerToken) {
      return { isValid: false, error: 'Token CSRF manquant dans le header' };
    }
    
    if (!cookieToken) {
      return { isValid: false, error: 'Token CSRF manquant dans le cookie' };
    }
    
    // Vérifier la correspondance des tokens
    const isValid = verifyCSRFToken(headerToken, cookieToken);
    
    if (!isValid) {
      return { isValid: false, error: 'Token CSRF invalide' };
    }
    
    return { isValid: true };
    
  } catch (error) {
    console.error('❌ Erreur lors de la validation CSRF:', error);
    return { isValid: false, error: 'Erreur interne lors de la validation CSRF' };
  }
}
