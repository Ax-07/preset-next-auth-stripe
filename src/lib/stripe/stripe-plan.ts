export const PLANS = [
    {
        name: "free" as const,
        displayName: "Gratuit",
        description: "Parfait pour démarrer",
        // IDs Stripe non utilisés pour le plan gratuit
        priceId: null,
        priceLookupKey: null,
        price: 0,
        currency: "EUR",
        interval: "month" as const,
        annualDiscountPriceId: null,
        annualLookupKey: null,
        annualPrice: undefined,
        freeTrial: null,
        features: [
            "Accès de base",
            "Support par email",
            "1 projet",
            "500 MB de stockage",
        ],
        highlighted: false,
    },
    {
        name: "basic" as const,
        displayName: "Basic",
        description: "Pour les professionnels",
        // Option B: Stripe = source de vérité via lookup keys
        priceId:  "",
        priceLookupKey: "basic_monthly", // définir ce lookup_key dans Stripe
        price: "", // Le montant sera récupéré dynamiquement depuis Stripe
        currency: "EUR",
        interval: "month" as const,
        annualDiscountPriceId: "",
        annualLookupKey: "basic_yearly", // définir ce lookup_key annuel dans Stripe (optionnel)
        annualPrice: "", // Le montant sera récupéré dynamiquement depuis Stripe
        freeTrial: {
            days: 0,
        },
        features: [
            "Tout du plan Gratuit",
            "10 projets",
            "10 GB de stockage",
            "Support prioritaire",
            "Analyses avancées",
            "API accès",
        ],
        highlighted: false,
    }
];

export type PlanName = typeof PLANS[number]["name"];

