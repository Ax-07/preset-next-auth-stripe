import { NextRequest, NextResponse } from 'next/server';
import { validateCSRFToken } from '@/lib/csrf/csrf';
import { z } from 'zod';

// Schéma de validation pour le formulaire de contact
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

/**
 * POST /api/contact
 * Envoie un message via le formulaire de contact
 * 
 * Protection CSRF activée - Nécessite un token CSRF valide
 */
export async function POST(req: NextRequest) {
  try {
    // 🛡️ Validation du token CSRF
    const csrfValidation = validateCSRFToken(req);
    if (!csrfValidation.isValid) {
      return NextResponse.json(
        {
          error: 'CSRF Validation Failed',
          message: csrfValidation.error || 'Token CSRF invalide',
        },
        { status: 403 }
      );
    }

    // Récupérer les données du formulaire
    const body = await req.json();

    // Valider les données avec Zod
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Données du formulaire invalides',
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // TODO: Implémenter l'envoi d'email avec Nodemailer
    // Exemple :
    // await sendContactEmail({ name, email, subject, message });

    console.log('📧 Message de contact reçu:', { name, email, subject });

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur lors du traitement du formulaire de contact:', error);
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Une erreur est survenue lors de l\'envoi du message',
      },
      { status: 500 }
    );
  }
}
