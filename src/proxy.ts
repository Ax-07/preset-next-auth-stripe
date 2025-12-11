import { NextResponse } from "next/server";

// Cette fonction middleware sera appelée pour chaque requête
export function proxy() {
  // Better Auth gère déjà le rate limiting sur /api/auth/*
  // Vous n'avez donc rien à faire ici pour l'authentification
  
  // Si vous avez besoin de logique supplémentaire, ajoutez-la ici
  // Exemple : redirection, headers personnalisés, etc.
  
  return NextResponse.next();
}

// Configuration optionnelle
export const config = {
  // Matcher pour spécifier sur quelles routes le middleware s'applique
  // Exemple : éviter le middleware sur les routes API de Better Auth
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Better Auth routes - déjà protégées)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};