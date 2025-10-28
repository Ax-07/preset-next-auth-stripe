import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Mail, 
  FileText, 
  Video,
  Clock,
  Search,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Zap,
  Book,
  Users,
  HelpCircle,
  Phone,
  Globe
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS CANAUX DE SUPPORT ICI
const supportChannels = [
  {
    title: "Chat en direct",
    description: "Obtenez une réponse immédiate de notre équipe support",
    icon: <MessageCircle className="h-8 w-8" />,
    availability: "Lun-Ven 9h-18h",
    responseTime: "< 5 minutes",
    action: "Démarrer le chat",
    link: "#", // Remplacez par votre lien de chat
    badge: "Recommandé"
  },
  {
    title: "Email Support",
    description: "Envoyez-nous votre question détaillée par email",
    icon: <Mail className="h-8 w-8" />,
    availability: "24h/24, 7j/7",
    responseTime: "< 4 heures",
    action: "Envoyer un email",
    link: "mailto:support@votre-entreprise.com",
    badge: null
  },
  {
    title: "Rendez-vous téléphonique",
    description: "Planifiez un appel avec un expert produit",
    icon: <Phone className="h-8 w-8" />,
    availability: "Sur rendez-vous",
    responseTime: "Sous 24h",
    action: "Réserver un créneau",
    link: "#", // Remplacez par votre lien Calendly
    badge: null
  }
];

// 🎯 PERSONNALISEZ VOS RESSOURCES D'AIDE ICI
const helpResources = [
  {
    title: "Documentation",
    description: "Guides détaillés et références API complètes",
    icon: <Book className="h-6 w-6" />,
    link: "/documentation"
  },
  {
    title: "Tutoriels vidéo",
    description: "Apprenez à utiliser toutes les fonctionnalités en vidéo",
    icon: <Video className="h-6 w-6" />,
    link: "#" // Remplacez par votre chaîne YouTube/Vimeo
  },
  {
    title: "FAQ",
    description: "Réponses aux questions les plus fréquentes",
    icon: <HelpCircle className="h-6 w-6" />,
    link: "/faq"
  },
  {
    title: "Communauté",
    description: "Échangez avec d'autres utilisateurs et notre équipe",
    icon: <Users className="h-6 w-6" />,
    link: "#" // Remplacez par votre forum/Discord/Slack
  },
  {
    title: "Status Page",
    description: "Vérifiez l'état de nos services en temps réel",
    icon: <Globe className="h-6 w-6" />,
    link: "#" // Remplacez par votre page de statut
  },
  {
    title: "Changelog",
    description: "Découvrez les dernières nouveautés et améliorations",
    icon: <Zap className="h-6 w-6" />,
    link: "#" // Remplacez par votre changelog
  }
];

// 🎯 PERSONNALISEZ VOS ARTICLES POPULAIRES ICI
const popularArticles = [
  {
    title: "Comment commencer : Guide de démarrage rapide",
    description: "Tout ce que vous devez savoir pour bien débuter avec notre plateforme",
    category: "Démarrage",
    readTime: "5 min"
  },
  {
    title: "Gestion des utilisateurs et des permissions",
    description: "Apprenez à gérer votre équipe et configurer les accès",
    category: "Gestion",
    readTime: "8 min"
  },
  {
    title: "Intégrations disponibles et configuration",
    description: "Connectez notre solution à vos outils existants",
    category: "Intégrations",
    readTime: "10 min"
  },
  {
    title: "Facturation et gestion des abonnements",
    description: "Tout savoir sur la facturation et les changements de plan",
    category: "Facturation",
    readTime: "6 min"
  },
  {
    title: "Sécurité et conformité des données",
    description: "Nos mesures de sécurité et certifications",
    category: "Sécurité",
    readTime: "7 min"
  },
  {
    title: "Résolution des problèmes courants",
    description: "Solutions aux problèmes les plus fréquemment rencontrés",
    category: "Dépannage",
    readTime: "12 min"
  }
];

export default async function SupportPage() {
  return (
    <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              {`Centre d'aide`}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Comment pouvons-nous{" "}
              <span className="text-primary">vous aider ?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Notre équipe support est là pour vous accompagner. Trouvez rapidement 
              des réponses ou contactez-nous directement.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                className="pl-10 h-12 text-lg"
                placeholder="Rechercher dans la documentation..."
                type="search"
              />
              <Button className="absolute right-1 top-1 bottom-1">
                Rechercher
              </Button>
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Contactez notre équipe
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {`Choisissez le canal qui vous convient le mieux pour obtenir de l'aide rapidement.`}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="relative p-6 text-center hover:shadow-lg transition-shadow">
                  {channel.badge && (
                    <Badge className="absolute top-4 right-4" variant="default">
                      {channel.badge}
                    </Badge>
                  )}
                  
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4">
                    {channel.icon}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3">{channel.title}</h3>
                  <p className="text-muted-foreground mb-4">{channel.description}</p>
                  
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{channel.availability}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Réponse {channel.responseTime}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link href={channel.link}>
                      {channel.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {`Ressources d'aide`}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explorez nos ressources pour trouver des réponses immédiates à vos questions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {helpResources.map((resource, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow group">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {resource.description}
                      </p>
                      <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                        <Link href={resource.link} className="flex items-center gap-1">
                          Accéder
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Articles populaires
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {`Les guides les plus consultés par notre communauté d'utilisateurs.`}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popularArticles.map((article, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center text-primary text-sm font-medium">
                    {`Lire l'article`}
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link href="/documentation">
                  Voir toute la documentation
                  <FileText className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-xl text-muted-foreground">
                Envoyez-nous un message et nous vous répondrons rapidement.
              </p>
            </div>

            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nom complet
                    </label>
                    <Input placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="votre@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sujet
                  </label>
                  <Input placeholder="De quoi avez-vous besoin d'aide ?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Décrivez votre problème ou votre question en détail..." 
                    rows={6}
                  />
                </div>
                
                <Button size="lg" className="w-full">
                  Envoyer le message
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>
        </section>
    </>
  );
};