// @/config/navigation.config.tsx
// Fichier de configuration de la navigation du site SaaS

import React from "react";
import {
  Zap,
  Info,
  Headphones,
  HelpCircle,
  Mail,
  FileText,
  Shield,
  PlayCircle,
  BookOpen,
  Award,
} from "lucide-react";

export const navigationConfig = {
  // Nom du site et logo
  siteName: "SaaSPreset",
  logo: {
    src: "/images/logo.png",
    alt: "SaaSPreset Logo",
  },
  // Menu de navigation
  navGroups: [
    {
      title: "Produit",
      subMenuItems: [
        {
          title: "Fonctionnalités",
          description: "Découvrez toutes les fonctionnalités de notre plateforme",
          icon: <Zap className="size-6" />,
          link: "/features",
        },
        {
          title: "Documentation",
          description: "Guides et API de développement",
          icon: <FileText className="size-6" />,
          link: "/documentation",
        },
        {
          title: "Sécurité",
          description: "Protection et conformité de vos données",
          icon: <Shield className="size-6" />,
          link: "/security",
        },
      ],
    },
    {
      title: "Ressources",
      subMenuItems: [
        {
          title: "Blog",
          description: "Actualités et conseils d'experts",
          icon: <BookOpen className="size-6" />,
          link: "/blog",
        },
        {
          title: "Cas clients",
          description: "Découvrez nos success stories",
          icon: <Award className="size-6" />,
          link: "/customers",
        },
        {
          title: "Démonstration",
          description: "Voir le produit en action",
          icon: <PlayCircle className="size-6" />,
          link: "/demo",
        },
      ],
    },
    {
      title: "Entreprise",
      subMenuItems: [
        {
          title: "À propos",
          description: "Notre mission et notre équipe",
          icon: <Info className="size-6" />,
          link: "/about",
        },
        {
          title: "Support",
          description: "Obtenez de l'aide quand vous en avez besoin",
          icon: <Headphones className="size-6" />,
          link: "/support",
        },
        {
          title: "FAQ",
          description: "Questions fréquemment posées",
          icon: <HelpCircle className="size-6" />,
          link: "/faq",
        },
        {
          title: "Contact",
          description: "Contactez notre équipe commerciale",
          icon: <Mail className="size-6" />,
          link: "/contact",
        },
      ],
    },
  ],
  // Liens directs de navigation (liens simples dans la navbar)
  navLinks: [
    {
      title: "Tarifs",
      link: "/pricing",
    },
  ],
  ctas: [
    {
      title: "Essai gratuit",
      link: "/auth/signup",
    },
    {
      title: "Connexion",
      link: "/auth/signin",
    },
  ]
};
