// =========================
// /data/legalContent.ts
// =========================
export type Link = { label: string; href: string };
export type SubSection = { subtitle: string; bullets?: string[] };
export type Section = {
  id: string;
  title: string;
  content?: string[];
  bullets?: string[];
  subSections?: SubSection[];
  links?: Link[];
};

export const meta = {
  version: "1.0.0",
  locale: "fr-FR",
  jurisdiction: "FR",
  updatedAt: "2025-10-26", // ISO
  placeholders: {
    company: "[ACME SAS]",
    rcsCity: "[Ville]",
    siren: "[SIREN]",
    address: "[Adresse complète]",
    domain: "[domaine.com]",
    cityCourt: "[Ville du siège]",
    domainCookie: ".[votre-domaine].app", // pour lister les cookies côté app
  },
};

export const legalContent = {
  privacy: {
    slug: "privacy",
    title: "Politique de confidentialité",
    lastUpdated: meta.updatedAt,
    intro: [
      "Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits.",
      "Le service est destiné à un public professionnel (B2B).",
    ],
    sections: [
      {
        id: "controller",
        title: "1. Qui sommes-nous ?",
        content: [
          `Le responsable du traitement est ${meta.placeholders.company}, immatriculée au RCS de ${meta.placeholders.rcsCity} sous le n° ${meta.placeholders.siren}, sise ${meta.placeholders.address}.`,
          `Contact : privacy@${meta.placeholders.domain}`,
        ],
      },
      {
        id: "data-collected",
        title: "2. Données traitées",
        subSections: [
          {
            subtitle: "2.1 Données que vous nous communiquez",
            bullets: [
              "Compte : nom, prénom, société, fonction, email, mot de passe (haché).",
              `Facturation : coordonnées et historique de paiements (traités par Stripe ; aucune carte n'est stockée par ${meta.placeholders.company}).`,
              "Support : contenus des échanges (tickets, emails).",
              "Profil (optionnel) : photo, préférences.",
            ],
          },
          {
            subtitle: "2.2 Données collectées automatiquement",
            bullets: [
              "Usage : pages et fonctionnalités utilisées, horodatages, logs.",
              "Techniques : adresse IP, identifiants d’appareil, navigateur, système d’exploitation.",
              "Cookies et traceurs : voir la Politique Cookies.",
            ],
          },
        ],
      },
      {
        id: "purposes-legal-bases",
        title: "3. Finalités et bases légales",
        bullets: [
          "Fourniture du service SaaS (exécution du contrat).",
          "Facturation et comptabilité (obligation légale).",
          "Sécurité, prévention de la fraude, journalisation (intérêt légitime).",
          "Amélioration produit et statistiques (intérêt légitime ou consentement si cookies analytiques).",
          "Prospection B2B par email (intérêt légitime, avec droit d’opposition simple).",
          "Communications marketing (consentement lorsque requis).",
        ],
      },
      {
        id: "recipients",
        title: "4. Destinataires et sous-traitants",
        content: [
          "Nous partageons les données uniquement avec des prestataires agissant pour notre compte.",
        ],
        bullets: [
          "Hébergement : Vercel Inc. (CDN/Edge).",
          "Paiements : Stripe Payments Europe, Ltd.",
          "Email SMTP : Google (smtp.gmail.com) via Nodemailer (transactionnel).",
          "Analytique : Google Analytics 4 (activé uniquement avec consentement).",
        ],
        links: [{ label: "Liste à jour des sous-traitants", href: "/subprocessors" }],
      },
      {
        id: "cookies",
        title: "5. Cookies et traceurs",
        content: [
          "Nous utilisons des cookies essentiels (authentification, sécurité) et, sous réserve de votre consentement, des cookies de mesure d’audience et marketing.",
          "Le consentement peut être donné et retiré via notre CMP à tout moment, aussi facilement que donné.",
        ],
        links: [{ label: "Politique Cookies", href: "/cookies" }],
      },
      {
        id: "retention",
        title: "6. Durées de conservation",
        bullets: [
          "Compte client : durée du contrat puis 3 ans à compter de la fin de la relation.",
          "Factures et pièces comptables : 10 ans.",
          "Logs de sécurité : 6 à 12 mois (proportionné aux finalités).",
          "Prospection B2B : 3 ans à compter du dernier contact émanant du prospect.",
        ],
      },
      {
        id: "security",
        title: "7. Sécurité",
        bullets: [
          "Chiffrement TLS en transit ; chiffrement au repos si disponible.",
          "Mots de passe hachés (bcrypt/argon2), MFA recommandé pour l’admin.",
          "Sauvegardes régulières et tests de restauration.",
          "Gestion des vulnérabilités et plan de réponse aux incidents (notification sous 72h si nécessaire).",
        ],
      },
      {
        id: "transfers",
        title: "8. Transferts hors UE",
        content: [
          "Pour tout transfert en dehors de l’UE/EEE, nous utilisons un mécanisme conforme (SCC, décision d’adéquation ou garanties appropriées).",
          "Des informations détaillées sont disponibles sur demande.",
        ],
      },
      {
        id: "rights",
        title: "9. Vos droits",
        content: [
          "Droits : accès, rectification, effacement, limitation, opposition, portabilité, directives post-mortem.",
          `Exercice : privacy@${meta.placeholders.domain} ou via /dsar (pièce d'identité possible en cas de doute raisonnable).`,
          "Réclamation : auprès de la CNIL (cnil.fr) si vous estimez que vos droits ne sont pas respectés.",
        ],
        links: [{ label: "Formulaire DSAR", href: "/dsar" }],
      },
      { id: "minors", title: "10. Mineurs", content: ["Le service est destiné aux professionnels et non aux personnes de moins de 16 ans."] },
      { id: "changes", title: "11. Modifications", content: ["Nous pouvons modifier la présente politique. La nouvelle version s’applique dès sa mise en ligne et sera notifiée si les changements sont substantiels."] },
      {
        id: "contact",
        title: "12. Contact",
        bullets: [
          `Email : privacy@${meta.placeholders.domain}`,
          `Adresse : ${meta.placeholders.address}`,
          "DPO (le cas échéant) : [Nom / contact]",
        ],
      },
    ] as Section[],
  },

  terms: {
    slug: "terms",
    title: "Conditions Générales d’Utilisation",
    lastUpdated: meta.updatedAt,
    sections: [
      {
        id: "purpose-accept",
        title: "1. Objet et acceptation",
        content: [
          `Les présentes CGU définissent les conditions d'accès et d'utilisation du service SaaS [Nom du service] édité par ${meta.placeholders.company}.`,
          "En créant un compte, le Client accepte sans réserve les CGU.",
        ],
      },
      {
        id: "definitions",
        title: "2. Définitions",
        content: [
          "« Client » : personne morale agissant à des fins professionnelles.",
          "« Utilisateur » : personne physique habilitée par le Client.",
          "« Service » : la solution logicielle en ligne décrite à l’article 3.",
          "« Données Client » : données importées, générées ou traitées pour le compte du Client.",
        ],
      },
      {
        id: "service",
        title: "3. Description du service",
        content: [
          "[Décrire les fonctionnalités principales, environnements supportés, prérequis techniques, limitations connues].",
          "Le Prestataire peut faire évoluer le Service sans altérer les fonctionnalités essentielles.",
        ],
      },
      {
        id: "account-security",
        title: "4. Création de compte et sécurité",
        bullets: [
          "Exactitude des informations fournies et confidentialité des identifiants.",
          "Respect des habilitations et usage conforme par les Utilisateurs.",
          "MFA recommandé pour l’administration.",
        ],
      },
      {
        id: "aup",
        title: "5. Utilisation acceptable",
        bullets: [
          "Pas d’usage contraire aux lois, aux droits des tiers, à l’ordre public.",
          "Interdiction d’entraver le Service (scan, surcharge, contournement des sécurités).",
          "Pas de contenus illicites, malveillants ou violant la propriété intellectuelle.",
        ],
      },
      {
        id: "pricing-billing",
        title: "6. Prix, facturation et paiements",
        bullets: [
          "Abonnements mensuels/annuels. Prix exprimés HT, TVA en sus.",
          "Paiements sécurisés via Stripe. Factures disponibles en ligne.",
          "Retard de paiement : pénalités au taux [taux contractuel ou 3× taux légal] et indemnité forfaitaire de 40 € (C. com. L441-10).",
          "Évolution des prix avec préavis de 30 jours ; possibilité de résilier avant prise d’effet.",
        ],
      },
      {
        id: "sla",
        title: "7. Niveaux de service et support",
        content: [
          "Sauf stipulation contraire au SLA, disponibilité cible : [ex. 99,9 %] / mois calendaire.",
          "Support via [canal/horaires]. Maintenances planifiées notifiées avec préavis raisonnable.",
        ],
        links: [{ label: "SLA", href: "/sla" }],
      },
      {
        id: "ip",
        title: "8. Propriété intellectuelle",
        content: [
          "Le Prestataire conserve tous droits sur le Service, logiciels, marques et contenus.",
          "Licence d’usage non exclusive, non transférable, pour la durée du contrat et les besoins internes du Client.",
        ],
      },
      {
        id: "client-data",
        title: "9. Données Client",
        bullets: [
          "Le Client reste propriétaire des Données Client.",
          "Le Prestataire agit en qualité de sous-traitant RGPD ; un DPA fait partie intégrante du contrat.",
          "Le Client garantit disposer des droits et bases légales nécessaires.",
        ],
        links: [{ label: "Accord de Traitement des Données (DPA)", href: "/dpa" }],
      },
      {
        id: "confidentiality",
        title: "10. Confidentialité",
        content: [
          "Chaque partie préserve la confidentialité des informations de l’autre, pendant le contrat et [x] ans après sa fin, sauf obligation légale ou demande d’une autorité.",
        ],
      },
      {
        id: "liability",
        title: "11. Garanties – responsabilité",
        bullets: [
          "Service fourni « en l’état » ; absence de garantie d’exhaustivité ou d’erreur.",
          "Plafond de responsabilité total et cumulé : 12 mois de redevances payées à la date du fait générateur.",
          "Exclusions : pertes de chance, perte de profit, perte de données (sauf manquement grave), dommages indirects.",
        ],
      },
      {
        id: "term-termination",
        title: "12. Durée – résiliation",
        bullets: [
          "Prise d’effet à la création du compte pour la durée de l’abonnement choisi, renouvelable par tacite reconduction.",
          "Résiliation en cas de manquement grave non réparé sous 30 jours après mise en demeure.",
          "Résiliation pour convenance : possible à tout moment avec effet à l’échéance en cours (sauf stipulation contraire).",
        ],
      },
      {
        id: "reversibility",
        title: "13. Réversibilité des données",
        content: [
          "À la fin du contrat, sur demande formulée avant ou dans les 30 jours suivant l’échéance, export des Données Client en format standard (ex. CSV/JSON).",
          "Sauf obligation légale, suppression sécurisée dans un délai de [x] jours.",
        ],
      },
      {
        id: "subprocessors",
        title: "14. Sous-traitance et transfert",
        content: [
          "Sous-traitants possibles pour l’hébergement, la maintenance et le support ; liste tenue à jour en ligne.",
        ],
        links: [{ label: "Liste des sous-traitants", href: "/subprocessors" }],
      },
      {
        id: "force-majeure",
        title: "15. Force majeure",
        content: [
          "Aucune partie n’est responsable en cas de force majeure au sens du droit français, sous réserve d’information sans délai et de mesures pour en limiter les effets.",
        ],
      },
      {
        id: "changes",
        title: "16. Modifications des CGU",
        content: [
          "En cas de changement substantiel, un préavis d’au moins 30 jours est communiqué. La poursuite de l’utilisation vaut acceptation.",
        ],
      },
      {
        id: "law-jurisdiction",
        title: "17. Droit applicable – juridiction",
        content: [
          `Droit français. Compétence exclusive des tribunaux de ${meta.placeholders.cityCourt}, nonobstant pluralité de défendeurs ou appel en garantie.`,
        ],
      },
      {
        id: "contact",
        title: "18. Contact",
        bullets: [
          `Email : contact@${meta.placeholders.domain}`,
          `Adresse : ${meta.placeholders.address}`,
          "Mentions légales : /legal",
        ],
        links: [{ label: "Mentions légales", href: "/legal" }],
      },
    ] as Section[],
  },

  cookies: {
    slug: "cookies",
    title: "Politique de cookies",
    lastUpdated: meta.updatedAt,
    intro: [
      "Cette politique explique comment nous utilisons les cookies et technologies similaires (balises, SDK, stockage local) sur notre service.",
      "Certains cookies sont strictement nécessaires. Les autres (mesure d’audience, marketing) ne sont déposés qu’avec votre consentement.",
    ],
    legal: {
      references: [
        "Directive ePrivacy et réglementation française",
        "RGPD (base légale : consentement ou intérêt légitime lorsque applicable)",
      ],
      principles: [
        "Transparence : description claire des finalités et des tiers.",
        "Choix : possibilité d’accepter/refuser par finalité, sans biais.",
        "Preuve du consentement : journalisation (horodatage, version, préférences).",
        "Retrait : possibilité de retirer ou modifier le choix à tout moment.",
      ],
    },
    consent: {
      mechanism: "CMP (Consent Management Platform) compatible TCF/équivalent",
      actions: ["Accepter tout", "Refuser tout", "Personnaliser par finalité", "Modifier mon choix (lien persistant en pied de page)"],
      changePreferencesLink: { label: "Modifier mes préférences cookies", href: "#open-cmp" },
    },
    categories: [
      {
        key: "necessary",
        title: "Cookies strictement nécessaires",
        description:
          "Indispensables au fonctionnement du site (authentification, sécurité, préférences essentielles, prévention de fraude). Ces cookies ne nécessitent pas de consentement.",
        examples: [
          { name: "__Host-session", purpose: "Session sécurisée (SameSite=Strict)", duration: "Session" },
          { name: "__cf_bm", purpose: "Protection anti-bot/CDN", duration: "30 minutes" },
        ],
      },
      {
        key: "authentication",
        title: "Cookies d’authentification",
        description:
          "Maintien de votre session et gestion des accès. Déposés uniquement lors de la connexion à l’espace client.",
        examples: [{ name: "auth_token", purpose: "Session utilisateur", duration: "Session" }],
      },
      {
        key: "preferences",
        title: "Préférences",
        description:
          "Mémorisation de paramètres non essentiels (langue, thème). Soumis à consentement si non strictement nécessaires.",
        examples: [{ name: "ui_lang", purpose: "Langue de l’interface", duration: "6 mois" }],
      },
      {
        key: "analytics",
        title: "Mesure d’audience",
        description:
          "Analyse d’usage pour améliorer le service. Déposés avec votre consentement. Google Analytics 4 est utilisé ; aucune collecte n’a lieu sans votre accord.",
        examples: [
          { name: "_ga", purpose: "Identifiant client (GA4)", duration: "13 mois" },
          { name: "_gid", purpose: "Distinction des utilisateurs (GA4)", duration: "24 heures" },
          { name: "_ga_XXXXXXXX", purpose: "État de session/visites (GA4)", duration: "13 mois" },
        ],
        notes: [
          "GA4 ne stocke pas l’adresse IP mais reste soumis au consentement en Europe.",
          "Le refus doit être aussi simple que l’acceptation ; aucun chargement GA avant consentement.",
        ],
      },
      {
        key: "marketing",
        title: "Marketing / publicité",
        description:
          "Mesure publicitaire et reciblage. Non utilisés par défaut en B2B ; si activés, requièrent un consentement explicite.",
        examples: [{ name: "_fbp", purpose: "Facebook Ads / reciblage", duration: "3 mois" }],
      },
    ],
    storage: {
      description:
        "Nous pouvons aussi utiliser le stockage local du navigateur (localStorage, sessionStorage) pour des finalités équivalentes aux cookies.",
      examples: [
        { key: "theme", type: "localStorage", purpose: "Préférence de thème", duration: "Jusqu’à suppression par l’utilisateur" },
        { key: "recentOrg", type: "sessionStorage", purpose: "Dernière organisation sélectionnée", duration: "Session" },
      ],
    },
    manage: {
      howTo: [
        "Vous pouvez gérer vos préférences à tout moment via le module de consentement (bouton en pied de page).",
        "Vous pouvez également supprimer les cookies via les paramètres de votre navigateur.",
        "Si vous activez Do-Not-Track dans votre navigateur, nous tenterons de le respecter lorsqu’il est techniquement possible.",
      ],
      browserHelpLinks: [
        { label: "Chrome", href: "https://support.google.com/chrome/answer/95647" },
        { label: "Firefox", href: "https://support.mozilla.org/fr/kb/activer-desactiver-cookies" },
        { label: "Safari", href: "https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" },
        { label: "Edge", href: "https://support.microsoft.com/fr-fr/microsoft-edge" },
      ],
    },
    providers: [
      {
        name: "Hébergement & CDN",
        provider: "Vercel Inc.",
        domain: "vercel.com",
        purpose: "Hébergement, CDN, Edge, optimisation de performance",
        policy: "https://vercel.com/legal/privacy-policy",
        dpa: "https://vercel.com/legal/dpa",
      },
      {
        name: "Paiements",
        provider: "Stripe Payments Europe, Ltd.",
        domain: "stripe.com",
        purpose: "Traitement du paiement, facturation",
        policy: "https://stripe.com/fr/privacy",
        dpa: "https://stripe.com/legal/data-processing",
      },
      {
        name: "Analytics",
        provider: "Google Ireland Limited",
        domain: "google-analytics.com",
        purpose: "Mesure d’audience (GA4)",
        policy: "https://policies.google.com/privacy",
        dpa: "https://business.safety.google/adsprocessorterms/",
      },
      {
        name: "Email SMTP",
        provider: "Google Ireland Limited",
        domain: "smtp.gmail.com",
        purpose: "Envoi d’emails transactionnels via Gmail SMTP (Nodemailer)",
        policy: "https://policies.google.com/privacy",
        dpa: "https://workspace.google.com/terms/dpa_terms.html",
      },
      {
        name: "Auth (OAuth)",
        provider: "Google Ireland Limited",
        domain: "accounts.google.com",
        purpose: "Connexion via Google (OAuth 2.0)",
        policy: "https://policies.google.com/privacy",
      },
    ],
    cookieListSchema: ["name", "domain", "purpose", "duration", "type", "category", "provider", "policy"],
    cookieList: [
      {
        name: "__Host-session",
        domain: meta.placeholders.domainCookie,
        purpose: "Session sécurisée de l’utilisateur (httpOnly, SameSite=Strict, Secure)",
        duration: "Session",
        type: "HTTP",
        category: "necessary",
        provider: meta.placeholders.company,
      },
      {
        name: "__vercel_no_cache",
        domain: meta.placeholders.domainCookie,
        purpose: "Contrôle du cache pour la cohérence de rendu",
        duration: "Session",
        type: "HTTP",
        category: "necessary",
        provider: "Vercel",
      },
      {
        name: "__stripe_mid",
        domain: ".stripe.com",
        purpose: "Prévention de fraude / session Stripe",
        duration: "1 an",
        type: "HTTP",
        category: "necessary",
        provider: "Stripe",
        policy: "https://stripe.com/fr/privacy",
      },
      {
        name: "__stripe_sid",
        domain: ".stripe.com",
        purpose: "Prévention de fraude / session Stripe",
        duration: "30 minutes",
        type: "HTTP",
        category: "necessary",
        provider: "Stripe",
        policy: "https://stripe.com/fr/privacy",
      },
      {
        name: "_ga",
        domain: meta.placeholders.domainCookie,
        purpose: "Identifiant client pour statistiques (GA4)",
        duration: "13 mois",
        type: "HTTP",
        category: "analytics",
        provider: "Google Analytics",
        policy: "https://policies.google.com/privacy",
      },
      {
        name: "_gid",
        domain: meta.placeholders.domainCookie,
        purpose: "Distinction des utilisateurs pour statistiques (GA4)",
        duration: "24 heures",
        type: "HTTP",
        category: "analytics",
        provider: "Google Analytics",
        policy: "https://policies.google.com/privacy",
      },
      {
        name: "_ga_XXXXXXXX",
        domain: meta.placeholders.domainCookie,
        purpose: "Stocke l’état de la session/visites (GA4, propriété)",
        duration: "13 mois",
        type: "HTTP",
        category: "analytics",
        provider: "Google Analytics",
        policy: "https://policies.google.com/privacy",
      },
      {
        name: "cookies OAuth Google",
        domain: "accounts.google.com",
        purpose: "Sécurisation et établissement de la session OAuth",
        duration: "Selon Google",
        type: "HTTP",
        category: "necessary",
        provider: "Google",
        policy: "https://policies.google.com/privacy",
      },
    ],
    complianceNotes: [
      "Le refus doit être aussi simple que l’acceptation (pas de dark patterns).",
      "Pas de traceurs non essentiels avant consentement (pas d’auto-déclenchement d’analytics/ads).",
      "Conservez une preuve du consentement (id visiteur, version CMP, timestamp, préférences).",
      "Affichez la bannière au premier accès puis à chaque changement de finalité/tiers, et redemandez après [6–12] mois.",
    ],
  },
};