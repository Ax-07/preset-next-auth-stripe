import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  Globe, 
  Smartphone,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS FONCTIONNALITÉS ICI
const features = [
  {
    id: "feature-1",
    title: "Fonctionnalité 1",
    description: "Description de votre première fonctionnalité principale. Expliquez comment elle résout un problème spécifique de vos utilisateurs.",
    icon: <Zap className="h-8 w-8" />,
    benefits: [
      "Avantage concret 1",
      "Avantage concret 2", 
      "Avantage concret 3"
    ]
  },
  {
    id: "feature-2",
    title: "Fonctionnalité 2",
    description: "Description de votre deuxième fonctionnalité. Mettez en avant la valeur unique qu'elle apporte à vos clients.",
    icon: <BarChart3 className="h-8 w-8" />,
    benefits: [
      "Bénéfice important 1",
      "Bénéfice important 2",
      "Bénéfice important 3"
    ]
  },
  {
    id: "feature-3", 
    title: "Fonctionnalité 3",
    description: "Votre troisième fonctionnalité clé. Décrivez comment elle améliore l'expérience utilisateur ou augmente la productivité.",
    icon: <Users className="h-8 w-8" />,
    benefits: [
      "Amélioration 1",
      "Amélioration 2",
      "Amélioration 3"
    ]
  },
  {
    id: "feature-4",
    title: "Fonctionnalité 4", 
    description: "Une fonctionnalité supplémentaire qui différencie votre produit de la concurrence. Expliquez son impact.",
    icon: <Shield className="h-8 w-8" />,
    benefits: [
      "Différenciation 1",
      "Différenciation 2",
      "Différenciation 3"
    ]
  },
  {
    id: "feature-5",
    title: "Fonctionnalité 5",
    description: "Dernière fonctionnalité majeure qui complète votre offre. Montrez pourquoi elle est essentielle.",
    icon: <Globe className="h-8 w-8" />,
    benefits: [
      "Valeur ajoutée 1",
      "Valeur ajoutée 2", 
      "Valeur ajoutée 3"
    ]
  },
  {
    id: "feature-6",
    title: "Fonctionnalité 6",
    description: "Une fonctionnalité bonus qui ravira vos utilisateurs. Décrivez comment elle simplifie leur quotidien.",
    icon: <Sparkles className="h-8 w-8" />,
    benefits: [
      "Simplification 1",
      "Simplification 2",
      "Simplification 3"
    ]
  }
];

// 🎯 PERSONNALISEZ VOS FONCTIONNALITÉS SECONDAIRES ICI
const additionalFeatures = [
  { title: "Interface intuitive", icon: <Smartphone className="h-5 w-5" /> },
  { title: "Tableaux de bord", icon: <BarChart3 className="h-5 w-5" /> },
  { title: "Notifications temps réel", icon: <Clock className="h-5 w-5" /> },
  { title: "API robuste", icon: <Globe className="h-5 w-5" /> },
  { title: "Sécurité avancée", icon: <Shield className="h-5 w-5" /> },
  { title: "Support 24/7", icon: <Target className="h-5 w-5" /> }
];

export default async function FeaturesPage() {
  return (
    <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Fonctionnalités
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Tout ce dont vous avez besoin{" "}
              <span className="text-primary">en un seul endroit</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Découvrez comment notre plateforme révolutionne votre façon de travailler 
              avec des fonctionnalités pensées pour votre succès.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Fonctionnalités principales
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Des outils puissants conçus pour transformer votre productivité
              </p>
            </div>

            <div className="grid gap-12 lg:gap-16">
              {features.map((feature, index) => (
                <div key={feature.id} className={`grid gap-8 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Contenu */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {feature.icon}
                      </div>
                      <Badge variant="secondary">
                        Fonctionnalité {index + 1}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline">
                      En savoir plus
                    </Button>
                  </div>

                  {/* Image placeholder */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <Card className="aspect-video flex items-center justify-center bg-muted/30">
                      <div className="text-center text-muted-foreground">
                        <div className="mb-2 mx-auto w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <p className="text-sm">{`Image de ${feature.title}`}</p>
                        <p className="text-xs">{`Remplacez par une capture d'écran`}</p>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Et bien plus encore...
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Des fonctionnalités additionnelles pour une expérience complète
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à découvrir toutes ces fonctionnalités ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Commencez votre essai gratuit et explorez tout ce que nous avons à offrir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Essai gratuit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">Voir les tarifs</Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};
