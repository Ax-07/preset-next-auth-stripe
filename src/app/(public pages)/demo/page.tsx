import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Monitor,
  Smartphone,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Settings,
  Shield,
  Globe,
  Headphones,
  Star,
  Video,
  Download,
  BookOpen,
  Award,
} from "lucide-react";

// 🎯 PERSONNALISEZ VOS OPTIONS DE DÉMO ICI
const demoOptions = [
  {
    id: "live",
    title: "Démo en direct",
    description: "Échangez avec un expert qui vous présente la solution en temps réel",
    duration: "30 minutes",
    icon: <Video className="h-6 w-6" />,
    features: [
      "Présentation personnalisée",
      "Questions & réponses en direct",
      "Démonstration sur vos cas d'usage",
      "Conseils d'expert gratuits",
    ],
    cta: "Réserver un créneau",
    popular: true,
  },
  {
    id: "interactive",
    title: "Démo interactive",
    description: "Explorez la plateforme par vous-même avec un environnement de test",
    duration: "Libre",
    icon: <Monitor className="h-6 w-6" />,
    features: ["Accès immédiat", "Données de démonstration", "Toutes les fonctionnalités", "Guides intégrés"],
    cta: "Accéder maintenant",
    popular: false,
  },
  {
    id: "video",
    title: "Vidéo de démonstration",
    description: "Regardez une présentation complète de 15 minutes de la solution",
    duration: "15 minutes",
    icon: <Play className="h-6 w-6" />,
    features: ["Vue d'ensemble complète", "Cas d'usage concrets", "Témoignages clients", "Téléchargeable"],
    cta: "Regarder la vidéo",
    popular: false,
  },
];

// 🎯 PERSONNALISEZ VOS FONCTIONNALITÉS DÉMO ICI
const demoFeatures = [
  {
    category: "Gestion",
    icon: <Settings className="h-5 w-5" />,
    features: ["Tableau de bord intuitif", "Gestion des utilisateurs", "Configuration avancée", "Automatisations"],
  },
  {
    category: "Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    features: ["Rapports en temps réel", "Métriques personnalisées", "Export de données", "Prédictions IA"],
  },
  {
    category: "Collaboration",
    icon: <Users className="h-5 w-5" />,
    features: [
      "Espaces de travail partagés",
      "Communication intégrée",
      "Gestion des permissions",
      "Historique des actions",
    ],
  },
  {
    category: "Sécurité",
    icon: <Shield className="h-5 w-5" />,
    features: ["Chiffrement bout en bout", "Authentification 2FA", "Conformité RGPD", "Audit trails"],
  },
];

// 🎯 PERSONNALISEZ VOS CRÉNEAUX DISPONIBLES ICI
const availableSlots = [
  { date: "Aujourd'hui", times: ["14:00", "16:30"] },
  { date: "Demain", times: ["09:00", "11:00", "14:00", "16:00"] },
  { date: "Mercredi", times: ["09:30", "11:30", "15:00"] },
  { date: "Jeudi", times: ["10:00", "14:30", "16:30"] },
  { date: "Vendredi", times: ["09:00", "11:00", "15:30"] },
];

// 🎯 PERSONNALISEZ VOS TÉMOIGNAGES DÉMO ICI
const demoTestimonials = [
  {
    quote:
      "La démo m'a immédiatement convaincu. En 30 minutes, j'ai pu voir exactement comment la solution répondait à nos besoins.",
    author: "Thomas Leroux",
    role: "Directeur IT",
    company: "TechnoSoft",
  },
  {
    quote:
      "Présentation claire et professionnelle. L'expert a su répondre à toutes nos questions techniques complexes.",
    author: "Julie Moreau",
    role: "Chef de projet",
    company: "InnovateNow",
  },
];

export default function DemoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            {"Démonstration"}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {"Découvrez notre solution "}
            <span className="text-primary">{"en action"}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {`Choisissez votre format préféré pour explorer toutes les possibilités 
              de notre plateforme. Démo personnalisée, test gratuit ou présentation vidéo.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Video className="mr-2 h-4 w-4" />
              {"Réserver une démo"}
            </Button>
            <Button size="lg" variant="outline">
              <Monitor className="mr-2 h-4 w-4" />
              {"Tester gratuitement"}
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Options */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{"Choisissez votre type de démonstration"}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {`Nous proposons plusieurs formats pour que vous puissiez découvrir 
                notre solution de la manière qui vous convient le mieux.`}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {demoOptions.map((option) => (
              <Card key={option.id} className={`relative ${option.popular ? "ring-2 ring-primary" : ""}`}>
                {option.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">{"Populaire"}</Badge>
                )}

                <CardHeader className="text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4 mx-auto">
                    {option.icon}
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-base">{option.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{option.duration}</span>
                  </div>

                  <div className="space-y-3">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant={option.popular ? "default" : "outline"}>
                    {option.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{"Ce que vous découvrirez"}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {"Un aperçu complet de toutes les fonctionnalités qui feront la différence pour votre entreprise."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {demoFeatures.map((category, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{category.icon}</div>
                  <h3 className="font-semibold">{category.category}</h3>
                </div>

                <div className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Booking */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{"Réservez votre démo personnalisée"}</h2>
            <p className="text-xl text-muted-foreground">
              {"Échangez avec un expert en 30 minutes et obtenez toutes les réponses à vos questions."}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Booking Form */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{"Informations de contact"}</CardTitle>
                <CardDescription>{"Nous vous contacterons pour confirmer votre créneau"}</CardDescription>
              </CardHeader>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">{"Prénom *"}</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{"Nom *"}</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{"Email professionnel *"}</Label>
                  <Input id="email" type="email" placeholder="votre.email@entreprise.com" />
                </div>

                <div>
                  <Label htmlFor="company">{"Entreprise *"}</Label>
                  <Input id="company" placeholder="Nom de votre entreprise" />
                </div>

                <div>
                  <Label htmlFor="role">{"Votre rôle"}</Label>
                  <Input id="role" placeholder="ex: Directeur IT, Chef de projet..." />
                </div>

                <div>
                  <Label htmlFor="teamSize">{"Taille de l'équipe"}</Label>
                  <Input id="teamSize" placeholder="ex: 10-50 employés" />
                </div>

                <div>
                  <Label htmlFor="needs">{"Quels sont vos besoins principaux ?"}</Label>
                  <Textarea
                    id="needs"
                    placeholder="Décrivez brièvement vos défis actuels et ce que vous recherchez..."
                    rows={3}
                  />
                </div>

                <Button className="w-full" size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  {"Réserver ma démo gratuite"}
                </Button>
              </div>
            </Card>

            {/* Available Slots */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{"Créneaux disponibles"}</CardTitle>
                  <CardDescription>{"Sélectionnez le moment qui vous convient le mieux"}</CardDescription>
                </CardHeader>

                <div className="space-y-4">
                  {availableSlots.map((slot, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="font-medium mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {slot.date}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {slot.times.map((time, timeIndex) => (
                          <Button key={timeIndex} variant="outline" size="sm" className="text-xs">
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* What to Expect */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>{"À quoi s'attendre ?"}</CardTitle>
                </CardHeader>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded text-primary mt-0.5">
                      <Video className="h-3 w-3" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{"Présentation personnalisée"}</div>
                      <div className="text-muted-foreground">{"Adaptée à vos besoins spécifiques"}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded text-primary mt-0.5">
                      <Users className="h-3 w-3" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{"Questions & réponses"}</div>
                      <div className="text-muted-foreground">{"Toute votre équipe peut participer"}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded text-primary mt-0.5">
                      <Globe className="h-3 w-3" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{"Démo en ligne"}</div>
                      <div className="text-muted-foreground">{"Depuis votre bureau, aucun déplacement"}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded text-primary mt-0.5">
                      <Download className="h-3 w-3" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{"Ressources incluses"}</div>
                      <div className="text-muted-foreground">{"Documentation et guides gratuits"}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{"Ou testez immédiatement"}</h2>
            <p className="text-xl text-muted-foreground">
              {"Accès instantané à notre environnement de démonstration interactif"}
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">
                    <Zap className="h-3 w-3 mr-1" />
                    {"Accès immédiat"}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold mb-4">{"Environnement de test complet"}</h3>

                <p className="text-muted-foreground mb-6">
                  {`Explorez toutes les fonctionnalités avec des données de démonstration réalistes. Aucune installation requise, tout se passe dans votre navigateur.`}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{"Toutes les fonctionnalités débloquées"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{"Données de démonstration pré-chargées"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{"Guides intégrés et tooltips"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{"Support chat en direct"}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1">
                    <Monitor className="mr-2 h-4 w-4" />
                    {"Lancer la démo"}
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <Smartphone className="mr-2 h-4 w-4" />
                    {"Version mobile"}
                  </Button>
                </div>
              </div>

              {/* Demo Preview */}
              <div className="relative">
                <div className="aspect-video bg-white rounded-lg shadow-lg border flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Monitor className="h-16 w-16 mx-auto mb-4" />
                    <p className="font-medium">{"Aperçu de l'interface"}</p>
                    <p className="text-sm">{"Démo interactive disponible"}</p>
                  </div>
                </div>

                {/* Floating features */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Analytics"}</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Collaboration"}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Demo Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{"Ils ont testé, ils ont adopté"}</h2>
            <p className="text-xl text-muted-foreground">
              {"Découvrez ce que nos prospects pensent de nos démonstrations"}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {demoTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                  {`"${testimonial.quote}"`}
                </blockquote>

                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{"Ressources complémentaires"}</h2>
            <p className="text-xl text-muted-foreground">{"Pour approfondir votre découverte de notre solution"}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{"Documentation"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Guides détaillés et API"}</p>
              <Button variant="outline" size="sm" className="w-full">
                {"Explorer"}
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Cas clients</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Success stories détaillées"}</p>
              <Button variant="outline" size="sm" className="w-full">
                {"Découvrir"}
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{"Livre blanc"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Guide des meilleures pratiques"}</p>
              <Button variant="outline" size="sm" className="w-full">
                {"Télécharger"}
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <Headphones className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{"Support"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Aide et assistance"}</p>
              <Button variant="outline" size="sm" className="w-full">
                {"Contacter"}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{"Prêt à voir la différence ?"}</h2>
          <p className="text-xl opacity-90 mb-8">
            {
              "Choisissez votre format préféré et découvrez comment notre solution peut transformer votre entreprise dès aujourd'hui."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="mr-2 h-4 w-4" />
              {"Réserver une démo"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Play className="mr-2 h-4 w-4" />
              {"Démo interactive"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
