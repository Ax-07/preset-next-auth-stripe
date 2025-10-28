import React from 'react';
import { Header } from "@/components/layout/header";
import { MainLayout } from "@/components/layout/main";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Heart, 
  Zap,
  Globe,
  Award,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS VALEURS D'ENTREPRISE ICI
const values = [
  {
    title: "Innovation",
    description: "Nous repoussons constamment les limites de ce qui est possible pour offrir des solutions avant-gardistes.",
    icon: <Zap className="h-8 w-8" />
  },
  {
    title: "Transparence",
    description: "Une communication claire et honnête avec nos clients, partenaires et équipe est au cœur de tout ce que nous faisons.",
    icon: <Heart className="h-8 w-8" />
  },
  {
    title: "Excellence",
    description: "Nous nous efforçons d'atteindre l'excellence dans chaque détail, de l'expérience utilisateur au support client.",
    icon: <Award className="h-8 w-8" />
  },
  {
    title: "Impact",
    description: "Notre mission est de créer un impact positif et mesurable pour nos clients et leur business.",
    icon: <Target className="h-8 w-8" />
  }
];

// 🎯 PERSONNALISEZ VOTRE ÉQUIPE ICI
const team = [
  {
    name: "Jean Dupont",
    role: "CEO & Fondateur",
    description: "10+ ans d'expérience dans le développement de produits SaaS. Passionné par l'innovation et l'excellence opérationnelle.",
    image: "/images/team/ceo.jpg", // Remplacez par vos vraies photos
    social: {
      linkedin: "#",
      twitter: "#",
      email: "jean@votre-entreprise.com"
    }
  },
  {
    name: "Marie Martin",
    role: "CTO",
    description: "Experte en architecture logicielle et en sécurité. Elle supervise le développement technique de notre plateforme.",
    image: "/images/team/cto.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "marie@votre-entreprise.com"
    }
  },
  {
    name: "Paul Bernard",
    role: "Head of Product",
    description: "Spécialiste en UX/UI et en développement produit. Il s'assure que notre solution répond parfaitement aux besoins utilisateurs.",
    image: "/images/team/product.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "paul@votre-entreprise.com"
    }
  },
  {
    name: "Sophie Leroy",
    role: "Head of Customer Success",
    description: "Dédiée à la réussite de nos clients. Elle accompagne chaque entreprise dans l'adoption et l'optimisation de notre solution.",
    image: "/images/team/customer-success.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sophie@votre-entreprise.com"
    }
  }
];

// 🎯 PERSONNALISEZ VOS STATISTIQUES ICI
const stats = [
  { label: "Clients satisfaits", value: "500+" },
  { label: "Pays", value: "25+" },
  { label: "Années d'expérience", value: "5+" },
  { label: "Uptime", value: "99.9%" }
];

export default async function AboutPage() {
  return (
    <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              {"À propos de nous"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {"Nous révolutionnons "}
              <span className="text-primary">{"votre façon de travailler"}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {"Depuis 2019, nous développons des solutions innovantes qui permettent aux entreprises de gagner en efficacité, de réduire leurs coûts et d'accélérer leur croissance."}
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                {"Parlons de votre projet"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{"Notre Mission"}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {`Nous croyons que la technologie doit simplifier la vie des entrepreneurs et des équipes, 
                  pas la compliquer. C'est pourquoi nous développons des outils intuitifs, puissants et 
                  accessibles qui permettent à chacun de se concentrer sur ce qui compte vraiment : 
                  faire grandir son business.`}
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  {`Notre vision est de démocratiser l'accès aux outils de classe enterprise pour toutes 
                  les entreprises, quelle que soit leur taille, et de les accompagner dans leur 
                  transformation digitale.`}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{"Innovation"}</Badge>
                  <Badge variant="secondary">{"Simplicité"}</Badge>
                  <Badge variant="secondary">{"Performance"}</Badge>
                  <Badge variant="secondary">{"Support"}</Badge>
                </div>
              </div>
              
              {/* Image placeholder */}
              <Card className="aspect-video flex items-center justify-center bg-muted/30">
                <div className="text-center text-muted-foreground">
                  <Globe className="h-16 w-16 mx-auto mb-4" />
                  <p>{"Image de l'équipe ou du bureau"}</p>
                  <p className="text-sm">{"Remplacez par votre photo d'équipe"}</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {"Nos Valeurs"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {"Les principes qui guident chacune de nos décisions et actions au quotidien."}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {"Quelques chiffres"}
              </h2>
              <p className="text-xl text-muted-foreground">
                {"Notre impact en quelques statistiques clés"}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {"Notre Équipe"}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {"Les experts passionnés qui donnent vie à notre vision chaque jour."}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center">
                  {/* Photo placeholder */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Social links */}
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {"Prêt à nous rejoindre ?"}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {"Découvrez comment notre solution peut transformer votre entreprise."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  {"Essai gratuit"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">{"Nous contacter"}</Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};