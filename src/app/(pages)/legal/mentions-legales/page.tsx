import React from 'react';
import { Header } from "@/components/layout/header";
import { MainLayout } from "@/components/layout/main";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Scale,
  Shield,
  FileText,
  Mail,
  Globe,
  Calendar,
  Building,
  User,
  Database,
  Cookie,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS INFORMATIONS LÉGALES ICI
const legalInfo = {
  company: {
    name: "Votre Entreprise SAS",
    address: "123 Rue de la Technologie",
    postalCode: "75001",
    city: "Paris",
    country: "France",
    siret: "12345678901234",
    tva: "FR12345678901",
    capital: "10 000 €",
    rcs: "Paris B 123 456 789"
  },
  contact: {
    email: "contact@votreentreprise.com",
    phone: "+33 1 23 45 67 89",
    website: "https://www.votreentreprise.com"
  },
  hosting: {
    provider: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, USA"
  },
  director: {
    name: "Prénom NOM",
    role: "Directeur de la publication"
  },
  lastUpdate: "27 octobre 2024"
};

// 🎯 PERSONNALISEZ VOS SECTIONS LÉGALES ICI
const legalSections = [
  {
    id: "editeur",
    title: "Informations sur l'éditeur",
    icon: <Building className="h-5 w-5" />,
    content: [
      {
        subtitle: "Dénomination sociale",
        text: legalInfo.company.name
      },
      {
        subtitle: "Forme juridique",
        text: "Société par Actions Simplifiée (SAS)"
      },
      {
        subtitle: "Capital social",
        text: legalInfo.company.capital
      },
      {
        subtitle: "Siège social",
        text: `${legalInfo.company.address}, ${legalInfo.company.postalCode} ${legalInfo.company.city}, ${legalInfo.company.country}`
      },
      {
        subtitle: "SIRET",
        text: legalInfo.company.siret
      },
      {
        subtitle: "N° TVA intracommunautaire",
        text: legalInfo.company.tva
      },
      {
        subtitle: "RCS",
        text: legalInfo.company.rcs
      }
    ]
  },
  {
    id: "contact",
    title: "Contact",
    icon: <Mail className="h-5 w-5" />,
    content: [
      {
        subtitle: "Email",
        text: legalInfo.contact.email
      },
      {
        subtitle: "Téléphone",
        text: legalInfo.contact.phone
      },
      {
        subtitle: "Site web",
        text: legalInfo.contact.website
      }
    ]
  },
  {
    id: "directeur",
    title: "Direction de la publication",
    icon: <User className="h-5 w-5" />,
    content: [
      {
        subtitle: "Directeur de la publication",
        text: `${legalInfo.director.name}, ${legalInfo.director.role}`
      },
      {
        subtitle: "Contact",
        text: legalInfo.contact.email
      }
    ]
  },
  {
    id: "hebergement",
    title: "Hébergement",
    icon: <Globe className="h-5 w-5" />,
    content: [
      {
        subtitle: "Hébergeur",
        text: legalInfo.hosting.provider
      },
      {
        subtitle: "Adresse de l'hébergeur",
        text: legalInfo.hosting.address
      }
    ]
  }
];

// 🎯 PERSONNALISEZ VOS CONDITIONS D'UTILISATION ICI
const usageConditions = [
  {
    title: "Acceptation des conditions",
    content: "L'utilisation du site web implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment."
  },
  {
    title: "Description du service",
    content: "Notre plateforme SaaS fournit des outils et services de gestion d'entreprise. L'accès au service nécessite la création d'un compte utilisateur."
  },
  {
    title: "Responsabilités de l'utilisateur",
    content: "L'utilisateur s'engage à utiliser le service conformément à sa destination, dans le respect de la législation en vigueur et des droits des tiers."
  },
  {
    title: "Protection des données",
    content: "Nous collectons et traitons vos données personnelles conformément à notre politique de confidentialité et au Règlement Général sur la Protection des Données (RGPD)."
  },
  {
    title: "Propriété intellectuelle",
    content: "L'ensemble des contenus présents sur le site (textes, images, codes, etc.) sont protégés par le droit de la propriété intellectuelle."
  },
  {
    title: "Limitation de responsabilité",
    content: "Nous nous efforçons de maintenir accessible le site 24h/24 et 7j/7, néanmoins nous ne pouvons être tenus responsables d'interruptions du service."
  }
];

// 🎯 PERSONNALISEZ VOS INFORMATIONS RGPD ICI
const gdprInfo = [
  {
    title: "Finalités du traitement",
    content: "Vos données sont collectées pour la fourniture du service, l'amélioration de nos produits, et la communication commerciale (avec votre consentement)."
  },
  {
    title: "Base légale",
    content: "Le traitement est basé sur l'exécution du contrat, nos intérêts légitimes, et votre consentement pour les communications marketing."
  },
  {
    title: "Durée de conservation",
    content: "Vos données sont conservées pendant la durée de la relation contractuelle et jusqu'à 3 ans après la fin du contrat pour les obligations légales."
  },
  {
    title: "Vos droits",
    content: "Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité, de limitation du traitement et d'opposition."
  },
  {
    title: "Exercice de vos droits",
    content: `Pour exercer vos droits, contactez-nous à l'adresse : ${legalInfo.contact.email}`
  }
];

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Informations légales
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Mentions{" "}
              <span className="text-primary">légales</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {`Informations légales, conditions d'utilisation et politique de confidentialité de notre plateforme SaaS.`}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Dernière mise à jour : {legalInfo.lastUpdate}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation rapide */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Navigation rapide</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="#editeur">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-primary" />
                    <span className="font-medium">Éditeur</span>
                  </div>
                </Card>
              </Link>
              <Link href="#conditions">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Conditions</span>
                  </div>
                </Card>
              </Link>
              <Link href="#donnees">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="font-medium">Données</span>
                  </div>
                </Card>
              </Link>
              <Link href="#cookies">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Cookie className="h-5 w-5 text-primary" />
                    <span className="font-medium">Cookies</span>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Informations légales */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto space-y-12">
            {legalSections.map((section) => (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="grid gap-1 md:grid-cols-4">
                        <div className="font-medium text-muted-foreground">
                          {item.subtitle} :
                        </div>
                        <div className="md:col-span-3">
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conditions d'utilisation */}
        <section id="conditions" className="py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Scale className="h-8 w-8" />
                {`Conditions d'utilisation`}
              </h2>
              <p className="text-xl text-muted-foreground">
                {`Règles et conditions régissant l'utilisation de notre service`}
              </p>
            </div>

            <div className="space-y-8">
              {usageConditions.map((condition, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {index + 1}. {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {condition.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Protection des données */}
        <section id="donnees" className="py-20">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Shield className="h-8 w-8" />
                Protection des données (RGPD)
              </h2>
              <p className="text-xl text-muted-foreground">
                Notre engagement pour la protection de vos données personnelles
              </p>
            </div>

            <div className="space-y-6">
              {gdprInfo.map((info, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {info.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="text-orange-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Délégué à la Protection des Données (DPO)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700">
                  {`Pour toute question relative au traitement de vos données personnelles, vous pouvez contacter notre DPO à l'adresse :`} <strong>dpo@votreentreprise.com</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cookies */}
        <section id="cookies" className="py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Cookie className="h-8 w-8" />
                Politique des cookies
              </h2>
              <p className="text-xl text-muted-foreground">
                {`Information sur l'utilisation des cookies sur notre site`}
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{`Qu'est-ce qu'un cookie ?`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {`Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez notre site. Il nous permet d'améliorer votre expérience utilisateur et d'analyser l'utilisation du site.`}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Types de cookies utilisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Cookies essentiels</h4>
                      <p className="text-muted-foreground text-sm">
                        Nécessaires au fonctionnement du site (authentification, panier, préférences)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{`Cookies d'analyse`}</h4>
                      <p className="text-muted-foreground text-sm">
                        {`Nous aident à comprendre comment vous utilisez le site (Google Analytics)`}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cookies marketing</h4>
                      <p className="text-muted-foreground text-sm">
                        Utilisés pour personnaliser les publicités et mesurer leur efficacité
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gestion des cookies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Vous pouvez gérer vos préférences de cookies via le bandeau de consentement 
                    ou dans les paramètres de votre navigateur.
                  </p>
                  <Button variant="outline">
                    Gérer mes préférences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact légal */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Questions juridiques ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Notre équipe juridique est à votre disposition pour toute question 
              concernant nos mentions légales ou vos droits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={`mailto:${legalInfo.contact.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support">
                  Support général
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </MainLayout>
    </>
  );
};