import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Quote,
  Star,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Building,
  MapPin,
  Calendar,
  Target,
  Zap,
  BarChart3,
  DollarSign,
  Clock,
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS TÉMOIGNAGES ICI
const testimonials = [
  {
    id: 1,
    quote:
      "Grâce à cette solution, nous avons pu réduire notre temps de traitement de 60% et améliorer significativement la satisfaction de nos clients. Un investissement qui s'est rentabilisé en moins de 3 mois.",
    author: {
      name: "Marie Dubois",
      role: "Directrice Opérations",
      company: "TechFlow Solutions",
      avatar: "/images/customers/marie-dubois.jpg",
    },
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    quote:
      "L'interface intuitive et les fonctionnalités avancées nous ont permis de digitaliser complètement nos processus. Notre équipe a gagné en efficacité et nos clients sont ravis.",
    author: {
      name: "Pierre Martin",
      role: "CEO",
      company: "InnovateCorp",
      avatar: "/images/customers/pierre-martin.jpg",
    },
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    quote:
      "Le support client est exceptionnel et la plateforme répond parfaitement à nos besoins. Nous recommandons vivement cette solution à toute entreprise cherchant à optimiser ses opérations.",
    author: {
      name: "Sarah Johnson",
      role: "Responsable IT",
      company: "GlobalTech Inc.",
      avatar: "/images/customers/sarah-johnson.jpg",
    },
    rating: 5,
    featured: false,
  },
];

// 🎯 PERSONNALISEZ VOS CAS CLIENTS DÉTAILLÉS ICI
const caseStudies = [
  {
    id: 1,
    title: "TechFlow Solutions augmente sa productivité de 60%",
    company: "TechFlow Solutions",
    industry: "Services IT",
    size: "150 employés",
    location: "Paris, France",
    duration: "3 mois",
    challenge: "Processus manuels chronophages et erreurs fréquentes dans la gestion des projets clients",
    solution: "Automatisation complète des workflows et centralisation des données clients",
    results: [
      { metric: "Productivité", value: "+60%", description: "Augmentation de la productivité globale" },
      { metric: "Temps de traitement", value: "-75%", description: "Réduction du temps de traitement des demandes" },
      { metric: "Satisfaction client", value: "95%", description: "Taux de satisfaction client" },
      { metric: "ROI", value: "300%", description: "Retour sur investissement en 3 mois" },
    ],
    testimonial: "Cette solution a transformé notre façon de travailler. Nous ne pouvons plus nous en passer !",
    author: {
      name: "Marie Dubois",
      role: "Directrice Opérations",
    },
    tags: ["Automatisation", "Productivité", "ROI"],
    image: "/images/case-studies/techflow-solutions.jpg",
  },
  {
    id: 2,
    title: "InnovateCorp digitalise ses processus en 6 semaines",
    company: "InnovateCorp",
    industry: "Manufacturing",
    size: "500 employés",
    location: "Lyon, France",
    duration: "6 semaines",
    challenge: "Processus papier obsolètes et manque de visibilité sur les opérations",
    solution: "Digitalisation complète avec tableaux de bord en temps réel",
    results: [
      { metric: "Efficacité", value: "+45%", description: "Amélioration de l'efficacité opérationnelle" },
      { metric: "Erreurs", value: "-80%", description: "Réduction des erreurs de saisie" },
      { metric: "Visibilité", value: "100%", description: "Visibilité temps réel sur toutes les opérations" },
      { metric: "Coûts", value: "-25%", description: "Réduction des coûts opérationnels" },
    ],
    testimonial: "La transformation digitale n'a jamais été aussi simple. Résultats immédiats et équipe accompagnée.",
    author: {
      name: "Pierre Martin",
      role: "CEO",
    },
    tags: ["Digitalisation", "Manufacturing", "Visibilité"],
    image: "/images/case-studies/innovatecorp.jpg",
  },
  {
    id: 3,
    title: "GlobalTech Inc. optimise sa gestion client",
    company: "GlobalTech Inc.",
    industry: "Services financiers",
    size: "1000+ employés",
    location: "Marseille, France",
    duration: "2 mois",
    challenge: "Gestion client dispersée et manque de coordination entre équipes",
    solution: "Centralisation des données et workflows collaboratifs automatisés",
    results: [
      { metric: "Réactivité", value: "+70%", description: "Amélioration du temps de réponse client" },
      { metric: "Collaboration", value: "+55%", description: "Meilleure collaboration inter-équipes" },
      { metric: "Rétention", value: "92%", description: "Taux de rétention client" },
      { metric: "NPS", value: "+40", description: "Amélioration du Net Promoter Score" },
    ],
    testimonial:
      "Nos clients remarquent immédiatement la différence. Notre service client n'a jamais été aussi performant.",
    author: {
      name: "Sarah Johnson",
      role: "Responsable IT",
    },
    tags: ["CRM", "Collaboration", "Rétention"],
    image: "/images/case-studies/globaltech.jpg",
  },
];

// 🎯 PERSONNALISEZ VOS STATISTIQUES CLIENTS ICI
const customerStats = [
  { label: "Clients satisfaits", value: "500+", icon: <Users className="h-6 w-6" /> },
  { label: "Pays", value: "25+", icon: <MapPin className="h-6 w-6" /> },
  { label: "ROI moyen", value: "280%", icon: <TrendingUp className="h-6 w-6" /> },
  { label: "Taux de satisfaction", value: "96%", icon: <Award className="h-6 w-6" /> },
];

// 🎯 PERSONNALISEZ VOS LOGOS CLIENTS ICI (optionnel)
const clientLogos = [
  { name: "TechFlow Solutions", logo: "/images/logos/techflow.svg" },
  { name: "InnovateCorp", logo: "/images/logos/innovate.svg" },
  { name: "GlobalTech Inc.", logo: "/images/logos/globaltech.svg" },
  { name: "DataPro", logo: "/images/logos/datapro.svg" },
  { name: "CloudFirst", logo: "/images/logos/cloudfirst.svg" },
  { name: "NextGen", logo: "/images/logos/nextgen.svg" },
];

export default function CustomersPage() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ));
  };

  const getResultIcon = (metric: string) => {
    switch (metric.toLowerCase()) {
      case "productivité":
      case "efficacité":
        return <TrendingUp className="h-5 w-5" />;
      case "roi":
      case "coûts":
        return <DollarSign className="h-5 w-5" />;
      case "temps de traitement":
      case "réactivité":
        return <Clock className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            {"Cas clients"}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {"Nos clients témoignent de "}
            <span className="text-primary">{"leur succès"}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {
              "Découvrez comment nos clients transforment leur business et atteignent leurs objectifs grâce à notre solution. Des résultats concrets, des histoires inspirantes."
            }
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              {"Parler à un expert"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Customer Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {customerStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      {testimonials.find((t) => t.featured) && (
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">{"Ce que disent nos clients"}</h2>

            {testimonials
              .filter((t) => t.featured)
              .map((testimonial) => (
                <Card key={testimonial.id} className="p-8 relative">
                  <Quote className="h-12 w-12 text-primary/20 absolute top-4 left-4" />
                  <div className="relative z-10">
                    <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                      {`"${testimonial.quote}"`}
                    </blockquote>

                    <div className="flex items-center justify-center gap-1 mb-6">{renderStars(testimonial.rating)}</div>

                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{testimonial.author.name}</div>
                        <div className="text-muted-foreground">{testimonial.author.role}</div>
                        <div className="text-sm text-primary font-medium">{testimonial.author.company}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </section>
      )}

      {/* Case Studies */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{"Études de cas détaillées"}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {"Plongez dans les détails de nos success stories les plus marquantes."}
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={study.id} className="overflow-hidden">
                <div className={`grid gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                  {/* Content */}
                  <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{study.title}</h3>

                    {/* Company Info */}
                    <div className="grid gap-2 md:grid-cols-2 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>{study.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{study.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{study.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Implémentation en {study.duration}</span>
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4 text-red-500" />
                          {"Défi"}
                        </h4>
                        <p className="text-muted-foreground text-sm">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-blue-500" />
                          {"Solution"}
                        </h4>
                        <p className="text-muted-foreground text-sm">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="grid gap-3 md:grid-cols-2 mb-6">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                          <div className="text-green-500 mt-0.5">{getResultIcon(result.metric)}</div>
                          <div>
                            <div className="font-bold text-green-600">{result.value}</div>
                            <div className="text-xs text-muted-foreground">{result.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                      {`"${study.testimonial}"`}
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-medium">{study.author.name}</div>
                      <div className="text-muted-foreground">
                        {study.author.role}, {study.company}
                      </div>
                    </div>
                  </div>

                  {/* Image placeholder */}
                  <div
                    className={`aspect-video bg-muted flex items-center justify-center ${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    <div className="text-center text-muted-foreground">
                      <Building className="h-16 w-16 mx-auto mb-4" />
                      <p className="font-medium">{study.company}</p>
                      <p className="text-sm">{"Image de l'entreprise"}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{"Tous nos témoignages"}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {"La parole à nos clients satisfaits à travers le monde."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => !t.featured)
              .map((testimonial) => (
                <Card key={testimonial.id} className="p-6">
                  <div className="flex items-center gap-1 mb-4">{renderStars(testimonial.rating)}</div>

                  <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                    {`"${testimonial.quote}"`}
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.author.role}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.author.company}</div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">{"Ils nous font confiance"}</h2>
            <p className="text-muted-foreground">{"Rejoignez plus de 500 entreprises qui utilisent notre solution"}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            {clientLogos.map((client, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-center text-muted-foreground">
                  <Building className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-xs font-medium">{client.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{"Prêt à rejoindre nos clients satisfaits ?"}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {"Commencez votre transformation dès aujourd'hui et obtenez des résultats similaires."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                {"Essai gratuit"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">{"Voir une démo"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
