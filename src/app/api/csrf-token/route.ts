import { NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/csrf/csrf';

/**
 * GET /api/csrf-token
 * Génère et retourne un token CSRF
 */
export async function GET() {
  try {
    // Générer un nouveau token CSRF
    const csrfToken = generateCSRFToken();
    
    // Configuration du cookie CSRF sécurisé
    const cookieOptions = {
      name: 'csrf-token',
      value: csrfToken,
      httpOnly: true, // Accessible uniquement côté serveur
      secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en production
      sameSite: 'strict' as const, // Protection CSRF supplémentaire
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    };

    const response = NextResponse.json(
      {
        csrfToken,
        message: 'Token CSRF généré avec succès'
      },
      { status: 200 }
    );

    // Définir le cookie dans la réponse
    response.cookies.set(cookieOptions);

    return response;

  } catch (error) {
    console.error('❌ Erreur lors de la génération du token CSRF:', error);
    
    return NextResponse.json(
      {
        error: 'Erreur lors de la génération du token CSRF',
        message: 'Impossible de générer le token de sécurité'
      },
      { status: 500 }
    );
  }
}