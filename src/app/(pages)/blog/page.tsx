"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Users,
  Zap,
  BookOpen,
  Filter,
  Tag
} from "lucide-react";

// 🎯 PERSONNALISEZ VOS CATÉGORIES DE BLOG ICI
const blogCategories = [
  { id: "all", name: "Tous les articles", count: 24 },
  { id: "product", name: "Produit", count: 8 },
  { id: "tutorials", name: "Tutoriels", count: 6 },
  { id: "news", name: "Actualités", count: 5 },
  { id: "tips", name: "Astuces", count: 3 },
  { id: "case-studies", name: "Cas clients", count: 2 }
];

// 🎯 PERSONNALISEZ VOS ARTICLES DE BLOG ICI
const blogPosts = [
  {
    id: 1,
    title: "Comment optimiser votre onboarding client en 5 étapes",
    slug: "optimiser-onboarding-client-5-etapes",
    excerpt: "Découvrez les meilleures pratiques pour améliorer l'expérience d'accueil de vos nouveaux clients et réduire le churn dès les premiers jours.",
    content: "L'onboarding est crucial pour la rétention...", // Contenu complet
    author: {
      name: "Marie Dubois",
      avatar: "/images/authors/marie.jpg",
      role: "Product Manager"
    },
    publishedAt: "2024-10-20",
    readTime: "8 min",
    category: "product",
    tags: ["onboarding", "UX", "retention"],
    featured: true,
    image: "/images/blog/onboarding-optimization.jpg"
  },
  {
    id: 2,
    title: "Les 10 métriques SaaS essentielles à suivre en 2024",
    slug: "10-metriques-saas-essentielles-2024",
    excerpt: "Quelles sont les KPIs indispensables pour piloter votre croissance SaaS ? Notre guide complet des métriques qui comptent vraiment.",
    content: "Dans l'écosystème SaaS, mesurer c'est piloter...",
    author: {
      name: "Thomas Martin",
      avatar: "/images/authors/thomas.jpg", 
      role: "Growth Manager"
    },
    publishedAt: "2024-10-18",
    readTime: "12 min",
    category: "tutorials",
    tags: ["métriques", "analytics", "croissance"],
    featured: false,
    image: "/images/blog/saas-metrics.jpg"
  },
  {
    id: 3,
    title: "Nouvelle fonctionnalité : Rapports automatisés disponibles",
    slug: "nouvelle-fonctionnalite-rapports-automatises",
    excerpt: "Nous sommes ravis d'annoncer le lancement des rapports automatisés ! Gagnez du temps avec des insights générés automatiquement.",
    content: "Aujourd'hui marque une étape importante...",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/authors/sarah.jpg",
      role: "CEO"
    },
    publishedAt: "2024-10-15",
    readTime: "5 min",
    category: "news",
    tags: ["nouveautés", "rapports", "automatisation"],
    featured: false,
    image: "/images/blog/automated-reports.jpg"
  },
  {
    id: 4,
    title: "Intégration Slack : Configurez vos notifications en 3 minutes",
    slug: "integration-slack-configuration-rapide",
    excerpt: "Tutorial step-by-step pour connecter votre compte à Slack et recevoir des notifications en temps réel de votre activité.",
    content: "L'intégration Slack est l'une des plus demandées...",
    author: {
      name: "Pierre Lefebvre",
      avatar: "/images/authors/pierre.jpg",
      role: "Developer"
    },
    publishedAt: "2024-10-12",
    readTime: "6 min",
    category: "tutorials",
    tags: ["slack", "intégrations", "notifications"],
    featured: false,
    image: "/images/blog/slack-integration.jpg"
  },
  {
    id: 5,
    title: "Sécurité des données : Nos nouvelles certifications",
    slug: "securite-donnees-nouvelles-certifications",
    excerpt: "Nous avons obtenu les certifications SOC 2 et ISO 27001. Découvrez ce que cela signifie pour la sécurité de vos données.",
    content: "La sécurité est au cœur de nos préoccupations...",
    author: {
      name: "Alex Rivera",
      avatar: "/images/authors/alex.jpg",
      role: "Security Engineer"
    },
    publishedAt: "2024-10-10",
    readTime: "7 min",
    category: "news",
    tags: ["sécurité", "certifications", "conformité"],
    featured: false,
    image: "/images/blog/security-certifications.jpg"
  },
  {
    id: 6,
    title: "Comment TechCorp a augmenté sa productivité de 40%",
    slug: "techcorp-augmente-productivite-40-pourcent",
    excerpt: "Étude de cas : Découvrez comment TechCorp a transformé ses processus et multiplié sa croissance grâce à notre solution.",
    content: "TechCorp, startup de 50 employés...",
    author: {
      name: "Julie Chen",
      avatar: "/images/authors/julie.jpg",
      role: "Customer Success"
    },
    publishedAt: "2024-10-08",
    readTime: "10 min",
    category: "case-studies",
    tags: ["cas client", "productivité", "ROI"],
    featured: false,
    image: "/images/blog/techcorp-case-study.jpg"
  },
  {
    id: 7,
    title: "5 astuces pour maximiser votre dashboard",
    slug: "5-astuces-maximiser-dashboard",
    excerpt: "Optimisez votre tableau de bord avec ces conseils d'experts. Gagnez en visibilité et prenez de meilleures décisions.",
    content: "Un dashboard bien configuré peut faire toute la différence...",
    author: {
      name: "Marc Wilson",
      avatar: "/images/authors/marc.jpg",
      role: "UX Designer"
    },
    publishedAt: "2024-10-05",
    readTime: "4 min",
    category: "tips",
    tags: ["dashboard", "optimisation", "UX"],
    featured: false,
    image: "/images/blog/dashboard-tips.jpg"
  },
  {
    id: 8,
    title: "Roadmap 2024 : Ce qui vous attend cette année",
    slug: "roadmap-2024-nouveautes-prevues",
    excerpt: "Découvrez en exclusivité les fonctionnalités que nous préparons pour vous en 2024. Une année riche en innovations !",
    content: "2024 s'annonce comme une année exceptionnelle...",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/authors/sarah.jpg",
      role: "CEO"
    },
    publishedAt: "2024-10-01",
    readTime: "6 min",
    category: "news",
    tags: ["roadmap", "innovation", "fonctionnalités"],
    featured: false,
    image: "/images/blog/roadmap-2024.jpg"
  }
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Filtrer les articles
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Article mis en avant
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product': return <Zap className="h-4 w-4" />;
      case 'tutorials': return <BookOpen className="h-4 w-4" />;
      case 'news': return <TrendingUp className="h-4 w-4" />;
      case 'tips': return <Lightbulb className="h-4 w-4" />;
      case 'case-studies': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              {"Blog"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {"Actualités, conseils et "}
              <span className="text-primary">{"insights"}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {"Restez informé des dernières nouveautés, découvrez nos conseils d'experts et inspirez-vous des success stories de nos clients."}
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  className="pl-10"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {"Filtrer"}
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {blogCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {getCategoryIcon(category.id)}
                  {category.name}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && selectedCategory === 'all' && !searchTerm && (
          <section className="py-20">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {"Article à la une"}
                </h2>
              </div>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Image placeholder */}
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BookOpen className="h-16 w-16 mx-auto mb-4" />
                      <p>{"Image de l'article"}</p>
                      <p className="text-sm">{"Remplacez par votre image"}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="default">À la une</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(featuredPost.category)}
                        {blogCategories.find(cat => cat.id === featuredPost.category)?.name}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featuredPost.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Button variant="ghost" className="group-hover:text-primary">
                        {"Lire l'article"}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {searchTerm ? `Résultats de recherche` : `Derniers articles`}
              </h2>
              {searchTerm && (
                <p className="text-muted-foreground">
                  {`${filteredPosts.length} article(s) trouvé(s) pour "${searchTerm}"`}
                </p>
              )}
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    {/* Image placeholder */}
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BookOpen className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-xs">{"Image article"}</p>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          {getCategoryIcon(post.category)}
                          {blogCategories.find(cat => cat.id === post.category)?.name}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {`Aucun article trouvé ${searchTerm ? `pour "${searchTerm}"` : 'dans cette catégorie'}`}
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  {"Voir tous les articles"}
                </Button>
              </div>
            )}

            {/* Load More */}
            {regularPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  {"Charger plus d'articles"}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {"Ne ratez aucun article"}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {"Recevez nos derniers articles, conseils et actualités directement dans votre boîte mail."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Votre adresse email"
                type="email"
                className="flex-1"
              />
              <Button>
                {"S'abonner"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {"Pas de spam, désinscription possible à tout moment."}
            </p>
          </div>
        </section>
    </>
  );
};