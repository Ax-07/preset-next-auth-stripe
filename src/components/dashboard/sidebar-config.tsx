import { 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Crown,
  Home,
  Sparkles,
  HelpCircle,
  GalleryVerticalEnd
} from "lucide-react";

// Configuration de la navigation de la sidebar
export const data = {
  teams: [
    {
      name: "Mon Application",
      logo: GalleryVerticalEnd,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Mon Compte",
      url: "/dashboard/account",
      icon: User,
      items: [
        {
          title: "Profil",
          url: "/dashboard/account",
        },
        {
          title: "Modifier",
          url: "/dashboard/account/edit",
        },
      ],
    },
    {
      title: "Abonnement",
      url: "/dashboard/subscription",
      icon: Crown,
      items: [
        {
          title: "Mon abonnement",
          url: "/dashboard/subscription",
        },
        {
          title: "Tarifs",
          url: "/dashboard/pricing",
        },
      ],
    },
    {
      title: "Facturation",
      url: "/dashboard/billing",
      icon: CreditCard,
      items: [],
    },
  ],
  projects: [
    {
      name: "Accueil",
      url: "/",
      icon: Home,
    },
    {
      name: "Fonctionnalités",
      url: "/features",
      icon: Sparkles,
    },
    {
      name: "Aide",
      url: "/contact",
      icon: HelpCircle,
    },
  ],
}