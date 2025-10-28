"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  Search, 
  ArrowLeft, 
  HelpCircle, 
  Mail,
  FileQuestion,
  Compass,
  RefreshCw
} from 'lucide-react';

// 🎯 PERSONNALISEZ VOS LIENS UTILES ICI
const helpfulLinks = [
  {
    title: "Accueil",
    description: "Retour à la page d'accueil",
    href: "/",
    icon: <Home className="h-5 w-5" />
  },
  {
    title: "Fonctionnalités",
    description: "Découvrez notre solution",
    href: "/features",
    icon: <Compass className="h-5 w-5" />
  },
  {
    title: "Documentation",
    description: "Guides et ressources",
    href: "/documentation",
    icon: <FileQuestion className="h-5 w-5" />
  },
  {
    title: "Support",
    description: "Obtenez de l'aide",
    href: "/support",
    icon: <HelpCircle className="h-5 w-5" />
  }
];

// 🎯 PERSONNALISEZ VOS SUGGESTIONS ICI
const suggestions = [
  "Vérifiez l'URL pour d'éventuelles fautes de frappe",
  "Utilisez notre menu de navigation pour explorer le site",
  "Essayez notre fonction de recherche",
  "Consultez notre page d'aide si vous avez besoin d'assistance"
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Error Display */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-muted-foreground/30">
            404
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Page introuvable
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            {`Désolé, nous n'avons pas pu trouver la page que vous recherchez. Elle a peut-être été déplacée ou supprimée.`}
          </p>
        </div>

        {/* Illustration or Icon */}
        <div className="py-8">
          <div className="w-32 h-32 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
            <Search className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {`Retour à l'accueil`}
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" onClick={() => window.history.back()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Page précédente
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8">
          <h2 className="text-lg font-semibold mb-6 text-foreground">
            Liens utiles
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {helpfulLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border hover:border-primary/50 group">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {link.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {link.description}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="pt-4">
          <h3 className="text-base font-medium mb-4 text-foreground">
            Suggestions :
          </h3>
          
          <div className="text-left max-w-md mx-auto space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Option */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Vous ne trouvez toujours pas ce que vous cherchez ?
          </p>
          
          <Button variant="outline" asChild>
            <Link href="/support">
              <Mail className="mr-2 h-4 w-4" />
              Contactez notre support
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8 text-xs text-muted-foreground">
          <p>
            {`Code d'erreur: 404 - Page non trouvée`}
          </p>
        </div>

      </div>
    </div>
  );
}