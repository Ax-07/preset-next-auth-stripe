'use client';

import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Home, 
  RefreshCw, 
  Bug, 
  Mail, 
  ArrowLeft,
  Info,
  Shield,
  Clock
} from 'lucide-react';

// 🎯 PERSONNALISEZ VOS ACTIONS DE RÉCUPÉRATION ICI
const recoveryActions = [
  {
    title: "Actualiser la page",
    description: "Parfois, une simple actualisation résout le problème",
    action: "refresh",
    icon: <RefreshCw className="h-5 w-5" />,
    primary: true
  },
  {
    title: "Retour à l'accueil",
    description: "Repartir sur de bonnes bases",
    action: "home",
    icon: <Home className="h-5 w-5" />,
    primary: false
  },
  {
    title: "Page précédente",
    description: "Revenir à la page d'où vous venez",
    action: "back",
    icon: <ArrowLeft className="h-5 w-5" />,
    primary: false
  }
];

// 🎯 PERSONNALISEZ VOS INFORMATIONS DE SUPPORT ICI
const supportInfo = {
  email: "support@votreentreprise.com",
  hours: "Lun-Ven, 9h-18h",
  response: "< 2h en moyenne"
};

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  
  useEffect(() => {
    // Log l'erreur dans votre service de monitoring (ex: Sentry, LogRocket, etc.)
    console.error('Erreur capturée par error.tsx:', error);
    
    // 🎯 AJOUTEZ ICI VOTRE SERVICE DE MONITORING
    // Exemple avec Sentry :
    // Sentry.captureException(error);
    
    // Exemple avec LogRocket :
    // LogRocket.captureException(error);
  }, [error]);

  const handleAction = (action: string) => {
    switch (action) {
      case 'refresh':
        reset();
        break;
      case 'home':
        window.location.href = '/';
        break;
      case 'back':
        window.history.back();
        break;
      default:
        break;
    }
  };

  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorCode = error.digest || 'UNKNOWN_ERROR';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-red-50/20 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Error Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground">
            Oups ! Une erreur s'est produite
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Nous nous excusons pour ce désagrément. Notre équipe a été automatiquement notifiée.
          </p>
        </div>

        {/* Error Details in Development */}
        {isDevelopment && (
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Détails de l'erreur (Mode développement)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong>Message:</strong> {error.message}
                </div>
                {error.digest && (
                  <div className="text-sm">
                    <strong>ID:</strong> {error.digest}
                  </div>
                )}
                {error.stack && (
                  <details className="text-xs">
                    <summary className="cursor-pointer font-medium">Stack trace</summary>
                    <pre className="mt-2 p-3 bg-red-100 rounded overflow-auto text-xs">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recovery Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Que pouvez-vous faire ?</CardTitle>
            <CardDescription>
              Essayez une de ces actions pour continuer votre navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {recoveryActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.primary ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => handleAction(action.action)}
                >
                  {action.icon}
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs opacity-75">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Information */}
        <div className="grid gap-4 md:grid-cols-2">
          
          {/* What Happened */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4" />
                Que s'est-il passé ?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Une erreur inattendue s'est produite lors du traitement de votre demande.
              </p>
              <p>
                Notre équipe technique a été automatiquement notifiée et travaille à résoudre le problème.
              </p>
              <div className="pt-2 text-xs text-muted-foreground">
                Code d'erreur: {errorCode}
              </div>
            </CardContent>
          </Card>

          {/* What We're Doing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Ce que nous faisons
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Erreur automatiquement reportée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Équipe technique notifiée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Analyse en cours</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Contact */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Besoin d'aide supplémentaire ?</CardTitle>
            <CardDescription>
              Notre équipe support est là pour vous aider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{supportInfo.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">Horaires</div>
                    <div className="text-muted-foreground">{supportInfo.hours}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">Réponse</div>
                    <div className="text-muted-foreground">{supportInfo.response}</div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/support">
                  Contacter le support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>
            Si le problème persiste, veuillez inclure le code d'erreur <code className="bg-muted px-1 rounded">{errorCode}</code> dans votre message.
          </p>
          <p>
            Horodatage: {new Date().toLocaleString('fr-FR')}
          </p>
        </div>

      </div>
    </div>
  );
}