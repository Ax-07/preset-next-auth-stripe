import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  FileCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Database,
  Network,
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS MESURES DE SÉCURITÉ ICI
const securityFeatures = [
  {
    category: "Chiffrement & Protection des données",
    icon: <Lock className="h-8 w-8" />,
    features: [
      {
        title: "Chiffrement SSL/TLS 256 bits",
        description: "Toutes les communications sont chiffrées avec les standards les plus élevés",
        status: "active",
      },
      {
        title: "Chiffrement des données au repos",
        description: "Vos données sont chiffrées dans nos bases de données avec AES-256",
        status: "active",
      },
      {
        title: "Chiffrement des sauvegardes",
        description: "Toutes les sauvegardes sont chiffrées et stockées de manière sécurisée",
        status: "active",
      },
      {
        title: "Hachage des mots de passe",
        description: "Utilisation de bcrypt avec salt pour protéger vos mots de passe",
        status: "active",
      },
    ],
  },
  {
    category: "Infrastructure & Hébergement",
    icon: <Server className="h-8 w-8" />,
    features: [
      {
        title: "Data centers certifiés SOC 2",
        description: "Hébergement dans des centres de données avec les plus hautes certifications",
        status: "active",
      },
      {
        title: "Redondance géographique",
        description: "Vos données sont répliquées dans plusieurs centres de données",
        status: "active",
      },
      {
        title: "Surveillance 24/7",
        description: "Monitoring continu de notre infrastructure par des experts",
        status: "active",
      },
      {
        title: "Sauvegardes automatiques",
        description: "Sauvegardes quotidiennes avec rétention de 30 jours",
        status: "active",
      },
    ],
  },
  {
    category: "Contrôle d'accès",
    icon: <Key className="h-8 w-8" />,
    features: [
      {
        title: "Authentification à deux facteurs",
        description: "2FA disponible via SMS, email ou applications d'authentification",
        status: "active",
      },
      {
        title: "Gestion des permissions",
        description: "Contrôle granulaire des accès par rôle et par fonctionnalité",
        status: "active",
      },
      {
        title: "Sessions sécurisées",
        description: "Expiration automatique et révocation des sessions suspectes",
        status: "active",
      },
      {
        title: "Authentification SSO",
        description: "Support des protocoles SAML et OAuth pour l'entreprise",
        status: "enterprise",
      },
    ],
  },
  {
    category: "Conformité & Audit",
    icon: <FileCheck className="h-8 w-8" />,
    features: [
      {
        title: "Conformité RGPD",
        description: "Respect complet du Règlement Général sur la Protection des Données",
        status: "active",
      },
      {
        title: "Logs d'audit",
        description: "Traçabilité complète de toutes les actions utilisateurs",
        status: "active",
      },
      {
        title: "Certification ISO 27001",
        description: "Processus de certification en cours pour 2024",
        status: "pending",
      },
      {
        title: "Rapports de sécurité",
        description: "Rapports détaillés sur l'activité et les incidents de sécurité",
        status: "enterprise",
      },
    ],
  },
];

// 🎯 PERSONNALISEZ VOS CERTIFICATIONS ICI
const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Certification de sécurité, disponibilité et confidentialité",
    status: "Certifié",
    year: "2023",
  },
  {
    name: "RGPD",
    description: "Conformité au Règlement Général sur la Protection des Données",
    status: "Conforme",
    year: "2023",
  },
  {
    name: "ISO 27001",
    description: "Standard international de gestion de la sécurité de l'information",
    status: "En cours",
    year: "2024",
  },
  {
    name: "HIPAA",
    description: "Conformité pour la protection des données de santé",
    status: "En cours",
    year: "2024",
  },
];

// 🎯 PERSONNALISEZ VOS POLITIQUES ICI
const securityPolicies = [
  {
    title: "Politique de confidentialité",
    description: "Comment nous collectons, utilisons et protégeons vos données personnelles",
    link: "/legal/privacy",
  },
  {
    title: "Conditions d'utilisation",
    description: "Règles et conditions d'utilisation de notre plateforme",
    link: "/legal/terms",
  },
  {
    title: "Politique de cookies",
    description: "Information sur l'utilisation des cookies sur notre site",
    link: "/cookies",
  },
  {
    title: "Rapport de transparence",
    description: "Données sur les demandes d'accès aux données des autorités",
    link: "#",
  },
];

// 🎯 PERSONNALISEZ VOS BONNES PRATIQUES ICI
const bestPractices = [
  {
    title: "Utilisez un mot de passe fort",
    description: "Minimum 12 caractères avec majuscules, minuscules, chiffres et symboles",
    icon: <Lock className="h-5 w-5" />,
  },
  {
    title: "Activez la 2FA",
    description: "Doublez la sécurité de votre compte avec l'authentification à deux facteurs",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Vérifiez les permissions",
    description: "Accordez uniquement les accès nécessaires à chaque membre de l'équipe",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Surveillez l'activité",
    description: "Consultez régulièrement les logs d'audit de votre compte",
    icon: <Eye className="h-5 w-5" />,
  },
  {
    title: "Mettez à jour vos informations",
    description: "Gardez vos coordonnées de contact à jour pour les alertes de sécurité",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    title: "Déconnectez-vous des appareils publics",
    description: "Toujours vous déconnecter après utilisation sur un appareil partagé",
    icon: <Network className="h-5 w-5" />,
  },
];

export default function SecurityPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Actif</Badge>;
      case "enterprise":
        return <Badge variant="outline">Enterprise</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">En cours</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Sécurité & Conformité
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Votre sécurité est <span className="text-primary">notre priorité</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nous mettons en œuvre les plus hauts standards de sécurité pour protéger vos données et respecter votre
            confidentialité. Découvrez nos mesures de protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#security-features">
                Voir nos mesures
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Sécurité en chiffres</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre engagement chiffré pour votre protection
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 text-center">
              <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime garanti</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 mb-4">
                <Lock className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">256</div>
              <p className="text-sm text-muted-foreground">Bits de chiffrement</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 mb-4">
                <Server className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Surveillance</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="inline-flex p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400 mb-4">
                <Database className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">30</div>
              <p className="text-sm text-muted-foreground">Jours de sauvegarde</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section id="security-features" className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nos mesures de sécurité</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protection multicouche pour une sécurité maximale de vos données
            </p>
          </div>

          <div className="space-y-12">
            {securityFeatures.map((category, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">{category.icon}</div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{feature.title}</h4>
                          {getStatusBadge(feature.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Certifications & Conformité</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nos certifications prouvent notre engagement pour la sécurité
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h3 className="font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <Badge variant={cert.status === "Certifié" || cert.status === "Conforme" ? "default" : "secondary"}>
                    {cert.status}
                  </Badge>
                  <span className="text-muted-foreground">{cert.year}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Bonnes pratiques de sécurité</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protégez votre compte en suivant ces recommandations essentielles
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">{practice.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{practice.title}</h3>
                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Policies */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Politiques de sécurité</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Consultez nos politiques détaillées pour en savoir plus
            </p>
          </div>

          <div className="space-y-4">
            {securityPolicies.map((policy, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{policy.title}</h3>
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={policy.link} className="flex items-center gap-1">
                      Consulter
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Des questions sur notre sécurité ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Notre équipe sécurité est disponible pour répondre à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Shield className="mr-2 h-4 w-4" />
                Nous contacter
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/support">
                {`Centre d'aide`}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
