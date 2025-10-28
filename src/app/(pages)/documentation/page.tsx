"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  BookOpen,
  Code,
  Zap,
  Settings,
  Shield,
  Globe,
  Download,
  ExternalLink,
  ArrowRight,
  Clock,
  Terminal,
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS SECTIONS DE DOCUMENTATION ICI
const docSections = [
  {
    id: "getting-started",
    title: "Démarrage rapide",
    description: "Commencez en quelques minutes avec nos guides step-by-step",
    icon: <Zap className="h-8 w-8" />,
    badge: "Essentiel",
    articles: [
      {
        title: "Installation et configuration",
        description: "Guide complet pour installer et configurer votre compte",
        readTime: "5 min",
        difficulty: "Débutant"
      },
      {
        title: "Premier projet",
        description: "Créez votre premier projet en suivant ce tutoriel",
        readTime: "10 min", 
        difficulty: "Débutant"
      },
      {
        title: "Configuration de base",
        description: "Paramétrez votre environnement pour une utilisation optimale",
        readTime: "8 min",
        difficulty: "Débutant"
      }
    ]
  },
  {
    id: "api-reference",
    title: "Référence API",
    description: "Documentation complète de notre API REST et webhooks",
    icon: <Code className="h-8 w-8" />,
    badge: "Développeurs",
    articles: [
      {
        title: "Authentification API",
        description: "Gérez l'authentification et les clés API",
        readTime: "7 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "Endpoints principaux",
        description: "Liste complète des endpoints disponibles",
        readTime: "15 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "Webhooks",
        description: "Configurez et utilisez les webhooks pour vos intégrations",
        readTime: "12 min",
        difficulty: "Avancé"
      },
      {
        title: "Codes d'erreur",
        description: "Gestion des erreurs et codes de retour",
        readTime: "6 min",
        difficulty: "Intermédiaire"
      }
    ]
  },
  {
    id: "features",
    title: "Guide des fonctionnalités",
    description: "Explorez toutes les fonctionnalités en détail",
    icon: <Settings className="h-8 w-8" />,
    badge: null,
    articles: [
      {
        title: "Tableau de bord",
        description: "Personnalisez et utilisez efficacement votre dashboard",
        readTime: "8 min",
        difficulty: "Débutant"
      },
      {
        title: "Gestion des utilisateurs",
        description: "Invitez et gérez les membres de votre équipe",
        readTime: "10 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "Rapports et analytics",
        description: "Générez et interprétez vos rapports",
        readTime: "12 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "Intégrations tierces",
        description: "Connectez vos outils favoris à notre plateforme",
        readTime: "15 min",
        difficulty: "Avancé"
      }
    ]
  },
  {
    id: "security",
    title: "Sécurité & Conformité",
    description: "Bonnes pratiques de sécurité et conformité RGPD",
    icon: <Shield className="h-8 w-8" />,
    badge: "Important",
    articles: [
      {
        title: "Sécurité des données",
        description: "Comment nous protégeons vos données sensibles",
        readTime: "6 min",
        difficulty: "Débutant"
      },
      {
        title: "Conformité RGPD",
        description: "Notre approche de la protection des données personnelles",
        readTime: "9 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "Authentification à deux facteurs",
        description: "Activez la 2FA pour renforcer la sécurité",
        readTime: "5 min",
        difficulty: "Débutant"
      }
    ]
  },
  {
    id: "integrations",
    title: "Intégrations",
    description: "Connectez notre solution à vos outils existants",
    icon: <Globe className="h-8 w-8" />,
    badge: null,
    articles: [
      {
        title: "Slack",
        description: "Recevez des notifications directement dans Slack",
        readTime: "7 min",
        difficulty: "Débutant"
      },
      {
        title: "Zapier",
        description: "Automatisez vos workflows avec Zapier",
        readTime: "10 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "CRM (Salesforce, HubSpot)",
        description: "Synchronisez vos données avec votre CRM",
        readTime: "12 min",
        difficulty: "Avancé"
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Dépannage",
    description: "Solutions aux problèmes les plus courants",
    icon: <Settings className="h-8 w-8" />,
    badge: null,
    articles: [
      {
        title: "Problèmes de connexion",
        description: "Résolvez les problèmes d'authentification",
        readTime: "5 min",
        difficulty: "Débutant"
      },
      {
        title: "Erreurs d'importation",
        description: "Corrigez les erreurs lors de l'import de données",
        readTime: "8 min",
        difficulty: "Intermédiaire"
      },
      {
        title: "Performance lente",
        description: "Optimisez les performances de votre compte",
        readTime: "10 min",
        difficulty: "Intermédiaire"
      }
    ]
  }
];

// 🎯 PERSONNALISEZ VOS RESSOURCES RAPIDES ICI
const quickResources = [
  {
    title: "SDK JavaScript",
    description: "Bibliothèque officielle pour intégrer notre API",
    icon: <Code className="h-6 w-6" />,
    link: "#",
    type: "download"
  },
  {
    title: "Collection Postman",
    description: "Testez notre API avec cette collection prête à l'emploi",
    icon: <Download className="h-6 w-6" />,
    link: "#",
    type: "download"
  },
  {
    title: "Exemples de code",
    description: "Repo GitHub avec des exemples dans différents langages",
    icon: <Terminal className="h-6 w-6" />,
    link: "#",
    type: "external"
  },
  {
    title: "API Status",
    description: "Vérifiez l'état de nos services en temps réel",
    icon: <Globe className="h-6 w-6" />,
    link: "#",
    type: "external"
  }
];

// 🎯 PERSONNALISEZ VOS ARTICLES POPULAIRES ICI
const popularArticles = [
  {
    title: "Comment démarrer en 5 minutes",
    description: "Le guide ultime pour configurer votre premier projet",
    views: "12k vues",
    category: "Démarrage",
    readTime: "5 min"
  },
  {
    title: "Intégration avec Slack",
    description: "Recevez des notifications en temps réel",
    views: "8.5k vues", 
    category: "Intégrations",
    readTime: "7 min"
  },
  {
    title: "API Authentication Guide",
    description: "Sécurisez vos appels API correctement",
    views: "6.2k vues",
    category: "API",
    readTime: "8 min"
  }
];

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSections = docSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.articles.some(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Débutant": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Intermédiaire": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Avancé": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              {"Documentation"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {"Tout ce que vous devez savoir pour "}
              <span className="text-primary">{"réussir"}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {"Guides complets, références API, tutoriels et exemples pour tirer le meilleur parti de notre plateforme."}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                className="pl-10 h-12 text-lg"
                placeholder="Rechercher dans la documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Quick Resources */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">
              {"Ressources rapides"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {quickResources.map((resource, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center text-primary text-sm">
                        {resource.type === "download" ? "Télécharger" : "Voir"}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {"Articles populaires"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {"Les guides les plus consultés par notre communauté."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {popularArticles.map((article, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.views}</span>
                    <div className="flex items-center text-primary">
                      {"Lire l'article"}
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {"Documentation complète"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {"Explorez nos guides détaillés organisés par thématique."}
              </p>
            </div>

            {searchTerm && (
              <div className="mb-8">
                <p className="text-muted-foreground">
                  {filteredSections.length} section(s) trouvée(s) pour "{searchTerm}"
                </p>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              {filteredSections.map((section) => (
                <Card key={section.id} className="p-6">
                  <CardHeader className="p-0 mb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {section.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {section.description}
                          </CardDescription>
                        </div>
                      </div>
                      {section.badge && (
                        <Badge variant="outline" className="ml-2">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="space-y-3">
                      {section.articles.map((article, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium group-hover:text-primary transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {article.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                                {article.difficulty}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSections.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {`Aucun résultat trouvé pour "${searchTerm}"`}
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  {"Voir toute la documentation"}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {"Besoin d'aide supplémentaire ?"}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {"Notre équipe support est là pour vous accompagner dans votre réussite."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/support">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {"Contacter le support"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  {"Demander une démo"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};