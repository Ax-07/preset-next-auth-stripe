import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search,
  MessageCircle,
  ArrowRight,
  CreditCard,
  Users,
  Shield,
  Zap,
  Settings,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

// 🎯 PERSONNALISEZ VOS QUESTIONS/RÉPONSES ICI
const faqCategories = [
  {
    id: "general",
    title: "Questions générales",
    icon: <HelpCircle className="h-6 w-6" />,
    questions: [
      {
        question: `Qu'est-ce que [Nom de votre SaaS] ?`,
        answer: `[Nom de votre SaaS] est une plateforme qui permet de [décrivez votre proposition de valeur principale]. Nous aidons les entreprises à [problème résolu] grâce à [votre solution unique]. Notre mission est de simplifier [domaine d'activité] pour que vous puissiez vous concentrer sur l'essentiel : faire grandir votre business.`
      },
      {
        question: `Qui peut utiliser [Nom de votre SaaS] ?`,
        answer: `Notre solution s'adresse à [votre audience cible : PME, grandes entreprises, freelances, etc.] dans les secteurs [secteurs principaux]. Que vous soyez une startup en croissance ou une entreprise établie, notre plateforme s'adapte à vos besoins et évolue avec votre business.`
      },
      {
        question: `Existe-t-il une version mobile ?`,
        answer: `Oui ! Notre plateforme est entièrement responsive et fonctionne parfaitement sur tous les appareils (ordinateur, tablette, smartphone). Nous proposons également des applications mobiles natives pour iOS et Android disponibles sur les stores officiels.`
      },
      {
        question: `Vos données sont-elles sécurisées ?`,
        answer: `La sécurité est notre priorité absolue. Nous utilisons un chiffrement SSL/TLS 256 bits, nos serveurs sont hébergés dans des data centers certifiés SOC 2, et nous respectons le RGPD. Toutes vos données sont sauvegardées quotidiennement et stockées dans des centres de données sécurisés.`
      }
    ]
  },
  {
    id: "getting-started",
    title: "Prise en main",
    icon: <Zap className="h-6 w-6" />,
    questions: [
      {
        question: `Comment créer mon compte ?`,
        answer: `C'est très simple ! Cliquez sur 'Essai gratuit' en haut de la page, renseignez votre email et créez un mot de passe. Vous recevrez un email de confirmation pour activer votre compte. L'inscription prend moins de 2 minutes et vous donne accès immédiat à toutes les fonctionnalités de base.`
      },
      {
        question: `Y a-t-il une période d'essai gratuite ?`,
        answer: `Oui ! Nous offrons 14 jours d'essai gratuit sur tous nos plans, sans engagement et sans demande de carte bancaire. Vous aurez accès à toutes les fonctionnalités premium pour tester notre solution en conditions réelles.`
      },
      {
        question: `Comment importer mes données existantes ?`,
        answer: `Nous proposons plusieurs méthodes d'import : fichiers CSV/Excel, connexion API avec vos outils actuels, ou migration assistée par notre équipe pour les gros volumes. Notre équipe support peut vous accompagner gratuitement dans cette étape cruciale.`
      },
      {
        question: `Proposez-vous une formation à l'utilisation ?`,
        answer: `Absolument ! Nous offrons des webinaires gratuits chaque semaine, une documentation complète avec tutoriels vidéo, et la possibilité de programmer une session de formation personnalisée avec notre équipe Customer Success.`
      }
    ]
  },
  {
    id: "pricing",
    title: "Tarifs & Facturation",
    icon: <CreditCard className="h-6 w-6" />,
    questions: [
      {
        question: `Quels sont vos tarifs ?`,
        answer: `Nous proposons plusieurs plans adaptés à vos besoins : Starter (gratuit jusqu'à X utilisateurs), Pro (X€/mois), et Enterprise (sur devis). Tous nos plans incluent le support client et les mises à jour. Consultez notre page tarifs pour les détails complets.`
      },
      {
        question: `Puis-je changer de plan à tout moment ?`,
        answer: `Oui ! Vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre tableau de bord. Les changements prennent effet immédiatement et la facturation est ajustée au prorata. Aucune pénalité pour les changements de plan.`
      },
      {
        question: `Quels modes de paiement acceptez-vous ?`,
        answer: `Nous acceptons toutes les cartes bancaires principales (Visa, Mastercard, American Express), les virements SEPA pour les entreprises européennes, et PayPal. Tous les paiements sont sécurisés via Stripe, leader mondial du paiement en ligne.`
      },
      {
        question: `Puis-je annuler mon abonnement ?`,
        answer: `Bien sûr ! Vous pouvez annuler votre abonnement à tout moment sans préavis depuis votre compte. Votre accès reste actif jusqu'à la fin de votre période de facturation, et aucuns frais supplémentaires ne vous seront facturés.`
      },
      {
        question: `Proposez-vous des remises pour les associations ?`,
        answer: `Oui ! Nous offrons des tarifs préférentiels aux associations, ONG, écoles et startups. Contactez notre équipe commerciale avec vos justificatifs pour bénéficier d'une remise pouvant aller jusqu'à 50%.`
      }
    ]
  },
  {
    id: "features",
    title: "Fonctionnalités",
    icon: <Settings className="h-6 w-6" />,
    questions: [
      {
        question: `Quelles sont les principales fonctionnalités ?`,
        answer: `Notre plateforme inclut [listez 4-5 fonctionnalités principales], des tableaux de bord en temps réel, des rapports automatisés, et plus de X intégrations avec vos outils favoris. Découvrez toutes nos fonctionnalités sur notre page dédiée.`
      },
      {
        question: "Proposez-vous des integrations ?",
        answer: "Oui ! Nous nous integrons avec plus de X outils populaires : CRM (Salesforce, HubSpot), comptabilite (QuickBooks, Xero), communication (Slack, Teams), et bien d'autres. Notre API REST permet egalement des integrations sur mesure."
      },
      {
        question: `Puis-je personnaliser l'interface ?`,
        answer: `Absolument ! Vous pouvez personnaliser votre tableau de bord, créer des vues personnalisées, configurer vos notifications, et même ajouter votre logo et couleurs de marque sur les plans Business et Enterprise.`
      },
      {
        question: `Y a-t-il des limites d'utilisation ?`,
        answer: `Les limites dépendent de votre plan : le plan Starter inclut X [unité de mesure], le plan Pro jusqu'à Y, et Enterprise offre un usage illimité. Consultez notre page tarifs pour les détails spécifiques à chaque plan.`
      }
    ]
  },
  {
    id: "account",
    title: "Gestion de compte",
    icon: <Users className="h-6 w-6" />,
    questions: [
      {
        question: `Comment inviter des membres dans mon équipe ?`,
        answer: `Rendez-vous dans Paramètres > Équipe, cliquez sur 'Inviter un membre', saisissez l'email et choisissez les permissions. La personne recevra une invitation par email pour rejoindre votre espace de travail.`
      },
      {
        question: `Comment gérer les permissions utilisateurs ?`,
        answer: `Nous proposons plusieurs niveaux d'accès : Administrateur (accès complet), Éditeur (lecture/écriture), et Lecteur (lecture seule). Vous pouvez modifier les permissions de chaque membre depuis la section Équipe de vos paramètres.`
      },
      {
        question: `Puis-je récupérer mes données si je résilie ?`,
        answer: `Oui ! Vous pouvez exporter toutes vos données aux formats CSV, PDF ou via notre API avant de résilier. Nous conservons vos données 30 jours après résiliation pour vous permettre de les récupérer si nécessaire.`
      },
      {
        question: `Comment modifier mes informations de facturation ?`,
        answer: `Allez dans Paramètres > Facturation pour mettre à jour votre carte bancaire, adresse de facturation, ou informations d'entreprise. Les modifications sont prises en compte immédiatement pour votre prochaine facturation.`
      }
    ]
  },
  {
    id: "support",
    title: "Support & Assistance",
    icon: <Shield className="h-6 w-6" />,
    questions: [
      {
        question: `Comment obtenir de l'aide ?`,
        answer: `Plusieurs options s'offrent à vous : chat en direct (réponse < 5 min), email support@votre-entreprise.com (< 4h), documentation complète, ou rendez-vous téléphonique avec notre équipe. Notre support est disponible en français du lundi au vendredi de 9h à 18h.`
      },
      {
        question: `Proposez-vous un support en français ?`,
        answer: `Oui ! Notre équipe support est francophone et notre plateforme est entièrement traduite en français. Nous comprenons les spécificités du marché français et adaptons nos conseils à vos besoins locaux.`
      },
      {
        question: `Y a-t-il des coûts cachés ?`,
        answer: `Aucun coût caché ! Le prix affiché inclut toutes les fonctionnalités du plan, le support client, les mises à jour, et l'hébergement sécurisé. Les seuls frais additionnels possibles sont les options premium clairement listées sur notre page tarifs.`
      },
      {
        question: `Que se passe-t-il en cas de panne ?`,
        answer: `Nous garantissons 99.9% d'uptime. En cas de problème, notre équipe technique intervient immédiatement et vous êtes informés via notre page de statut. Notre infrastructure redondante minimise les risques d'interruption de service.`
      }
    ]
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              {"Questions fréquentes"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {`Toutes les réponses à `}
              <span className="text-primary">{`vos questions`}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {`Vous avez une question ? Vous trouverez probablement la réponse ici. 
              Sinon, notre équipe support est là pour vous aider.`}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                className="pl-10 h-12 text-lg"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        {!searchTerm && (
          <section className="py-12 bg-muted/30">
            <div className="container max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-12">
                Parcourir par catégorie
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {faqCategories.map((category) => (
                  <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.questions.length} question{category.questions.length > 1 ? 's' : ''}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto">
            {searchTerm && (
              <div className="mb-8">
                <p className="text-muted-foreground">
                  {`${filteredCategories.reduce((total, cat) => total + cat.questions.length, 0)} résultat(s) pour "${searchTerm}"`}
                </p>
              </div>
            )}

            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>

                  <Accordion type="multiple" className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.id}-${index}`}
                        className="border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-semibold">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {`Aucun résultat trouvé pour "${searchTerm}"`}
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Voir toutes les questions
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {`Vous ne trouvez pas votre réponse ?`}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {`Notre équipe support est là pour vous aider rapidement et efficacement.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/support">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contacter le support
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Nous écrire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  );
};