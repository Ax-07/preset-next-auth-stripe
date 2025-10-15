// components/pages/pricing-features.tsx
/**
 * Composant optionnel pour afficher une section FAQ ou comparaison détaillée
 * À inclure dans la page pricing si souhaité
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const FEATURES_COMPARISON = [
  {
    category: "Projets",
    free: "1 projet",
    basic: "10 projets",
    premium: "Illimité",
  },
  {
    category: "Stockage",
    free: "500 MB",
    basic: "10 GB",
    premium: "100 GB",
  },
  {
    category: "Support",
    free: "Email",
    basic: "Prioritaire",
    premium: "24/7 Dédié",
  },
  {
    category: "Collaboration",
    free: false,
    basic: false,
    premium: true,
  },
  {
    category: "API Access",
    free: false,
    basic: true,
    premium: true,
  },
  {
    category: "Rapports personnalisés",
    free: false,
    basic: false,
    premium: true,
  },
];

export function PricingComparison() {
  return (
    <div className="mt-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Comparaison détaillée
      </h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Toutes les fonctionnalités en détail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-semibold">Fonctionnalité</th>
                  <th className="py-3 text-center font-semibold">Gratuit</th>
                  <th className="py-3 text-center font-semibold">Basic</th>
                  <th className="py-3 text-center font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES_COMPARISON.map((feature, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-4 text-gray-900 dark:text-white">{feature.category}</td>
                    <td className="py-4 text-center">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-400" />
                        )
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{feature.free}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {typeof feature.basic === "boolean" ? (
                        feature.basic ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-400" />
                        )
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{feature.basic}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-gray-400" />
                        )
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{feature.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// FAQ Component
const FAQ_ITEMS = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prendront effet immédiatement.",
  },
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer: "Vous bénéficiez de 90 jours d'essai gratuit sur les plans Basic et Premium. Vous ne serez pas facturé avant la fin de la période d'essai.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre dashboard. Vous continuerez à avoir accès jusqu'à la fin de votre période de facturation.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Nous acceptons toutes les cartes de crédit majeures (Visa, Mastercard, American Express) via Stripe.",
  },
];

export function PricingFAQ() {
  return (
    <div className="mt-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Questions fréquentes
      </h2>
      
      <div className="mx-auto max-w-3xl space-y-4">
        {FAQ_ITEMS.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg">{item.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Testimonials Component (optionnel)
const TESTIMONIALS = [
  {
    name: "Sophie Martin",
    role: "CEO, StartupXYZ",
    content: "Une solution parfaite pour notre équipe. Le support est excellent !",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  },
  {
    name: "Thomas Dubois",
    role: "Développeur Freelance",
    content: "Le plan Basic est exactement ce dont j'avais besoin pour mes projets.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
  },
];

export function PricingTestimonials() {
  return (
    <div className="mt-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Ce que disent nos clients
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
