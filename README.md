# 🚀 Next.js Preset - Authentication & Stripe Integration

Un preset Next.js complet et prêt à l'emploi avec authentification (Better-Auth), gestion de base de données (Prisma), intégration de paiement (Stripe à venir), et une interface moderne (Tailwind CSS + shadcn/ui).

## ⚡ Démarrage Ultra-Rapide

```bash
# 1. Cloner et installer
git clone https://github.com/Ax-07/preset-next-auth-stripe.git
cd preset-next-auth-stripe/preset_next_auth_stripe
pnpm install

# 2. Configurer .env (voir docs/ENVIRONMENT_VARIABLES.md)
cp .env.example .env
# Éditez .env avec vos valeurs

# 3. Initialiser la base de données
pnpm prisma-generate
pnpm prisma-migrate

# 4. Lancer l'application
pnpm dev
```

**Variables d'environnement requises :**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Better Auth

BETTER_AUTH_URL=http://localhost:3000 # Base URL de votre application (optionnel)
BETTER_AUTH_SECRET="votre_secret_genere_ici" # Générez avec: openssl rand -base64 32

AUTH_GITHUB_ID="votre client_id_github"
AUTH_GITHUB_SECRET="votre client_secret_github"

GOOGLE_CLIENT_ID="votre client_id_google"
GOOGLE_CLIENT_SECRET="votre client_secret_google"

AUTH_TRUST_HOST=true

# NEXT_PUBLIC_APP_URL="https://<your-app>.vercel.app/"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

EMAIL_SERVICE="gmail"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_PASS="votre_app_password"
EMAIL_USER="votre_email@gmail.com"

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_1234567890abcdef"
STRIPE_SECRET_KEY="sk_test_1234567890abcdef"
STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdef"
```

🎉 **Votre application est prête sur [http://localhost:3000](http://localhost:3000) !**

**📚 Documentation complète : [`docs/README.md`](../docs/README.md)**

---

## ✨ Fonctionnalités

### 🔐 Authentification Complète

- ✅ Inscription par email/mot de passe avec validation
- ✅ Connexion locale sécurisée
- ✅ OAuth Google (configurable)
- ✅ Vérification d'email automatique
- ✅ Réinitialisation de mot de passe
- ✅ Renvoi d'email de vérification
- ✅ Protection des routes avec middleware
- ✅ Gestion des sessions sécurisées

### 💾 Base de Données

- ✅ PostgreSQL avec Prisma ORM
- ✅ 6 modèles prêts à l'emploi (User, Session, Account, Verification, Subscription, RateLimit)
- ✅ Migrations versionnées
- ✅ Type-safety complète avec TypeScript
- ✅ Client Prisma optimisé
- ✅ Prisma Studio pour la gestion visuelle

### 🎨 Interface Moderne

- ✅ Tailwind CSS v4 avec CSS Variables
- ✅ 20+ composants shadcn/ui accessibles
- ✅ Mode sombre/clair avec persistance
- ✅ Design responsive (mobile-first)
- ✅ Animations fluides
- ✅ Accessibilité (ARIA, keyboard navigation)
- ✅ Icons avec lucide-react

### 📧 Gestion des Emails

- ✅ Nodemailer configuré avec Gmail
- ✅ Templates React Email responsives
- ✅ Emails 
- ✅ Emails de réinitialisation de mot de passe
- ✅ Templates personnalisables

### 🛡️ Sécurité

- ✅ Rate limiting avec better-auth
  - 5 tentatives de connexion / 15 minutes
  - 3 emails de vérification / heure
  - 10 requêtes API / minute
- ✅ Validation des données avec Zod
- ✅ Protection CSRF
- ✅ Hashing sécurisé des mots de passe
- ✅ Headers de sécurité configurés

### 💳 Stripe

- ✅ Intégration complète avec Better-Auth
- ✅ Récupération des plans et prix depuis Stripe
- ✅ Gestion des abonnements
- ✅ Webhooks pour les événements Stripe
- ✅ Sécurisation des clés API

### 🚧 À Venir

- 🌐 Internationalisation (i18n)

## 📄 Pages Disponibles

### 🌐 Pages Publiques

- **Accueil** - [http://localhost:3000](http://localhost:3000) - Page d'accueil principale
- **Tarifs** - [http://localhost:3000/pricing](http://localhost:3000/pricing) - Plans et tarification
- **Fonctionnalités** - [http://localhost:3000/features](http://localhost:3000/features) - Présentation des fonctionnalités
- **À propos** - [http://localhost:3000/about](http://localhost:3000/about) - Informations sur l'entreprise
- **Contact** - [http://localhost:3000/contact](http://localhost:3000/contact) - Formulaire de contact
- **Support** - [http://localhost:3000/support](http://localhost:3000/support) - Centre d'aide
- **Sécurité** - [http://localhost:3000/security](http://localhost:3000/security) - Politique de sécurité
- **FAQ** - [http://localhost:3000/faq](http://localhost:3000/faq) - Questions fréquentes
- **Blog** - [http://localhost:3000/blog](http://localhost:3000/blog) - Articles et actualités
- **Clients** - [http://localhost:3000/customers](http://localhost:3000/customers) - Témoignages clients
- **Démo** - [http://localhost:3000/demo](http://localhost:3000/demo) - Démonstration du produit
- **Documentation** - [http://localhost:3000/documentation](http://localhost:3000/documentation) - Guide utilisateur

### 🔐 Pages d'Authentification

- **Connexion** - [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin) - Formulaire de connexion
- **Inscription** - [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup) - Création de compte
- **Vérification email** - [http://localhost:3000/auth/verify-email](http://localhost:3000/auth/verify-email) - Validation d'email
- **Vérification confirmée** - [http://localhost:3000/auth/check-email](http://localhost:3000/auth/check-email) - Notification d'envoi
- **Mot de passe oublié** - [http://localhost:3000/auth/forget-password](http://localhost:3000/auth/forget-password) - Demande de réinitialisation
- **Réinitialiser mot de passe** - [http://localhost:3000/auth/reset-password](http://localhost:3000/auth/reset-password) - Nouveau mot de passe
- **Renvoyer vérification** - [http://localhost:3000/auth/resend-verification](http://localhost:3000/auth/resend-verification) - Renvoi d'email
- **Vérification statut** - [http://localhost:3000/auth/verify](http://localhost:3000/auth/verify) - Page de confirmation

### 🏠 Dashboard (Pages Protégées)

- **Tableau de bord** - [http://localhost:3000/dashboard](http://localhost:3000/dashboard) - Vue d'ensemble
- **Mon compte** - [http://localhost:3000/dashboard/account](http://localhost:3000/dashboard/account) - Gestion du profil
- **Éditer profil** - [http://localhost:3000/dashboard/account/edit](http://localhost:3000/dashboard/account/edit) - Modification des infos
- **Changer email** - [http://localhost:3000/dashboard/account/change-email](http://localhost:3000/dashboard/account/change-email) - Nouveau email
- **Changer mot de passe** - [http://localhost:3000/dashboard/account/change-password](http://localhost:3000/dashboard/account/change-password) - Sécurité
- **Supprimer compte** - [http://localhost:3000/dashboard/account/delete](http://localhost:3000/dashboard/account/delete) - Suppression définitive

### 💳 Pages Stripe (Protégées)

- **Abonnements** - [http://localhost:3000/dashboard/subscription](http://localhost:3000/dashboard/subscription) - Gestion des plans
- **Facturation** - [http://localhost:3000/dashboard/billing](http://localhost:3000/dashboard/billing) - Historique des factures
- **Plans tarifaires** - [http://localhost:3000/dashboard/pricing](http://localhost:3000/dashboard/pricing) - Upgrade/downgrade

### ⚖️ Pages Légales

- **Politique de confidentialité** - [http://localhost:3000/privacy](http://localhost:3000/privacy) - RGPD et données
- **Conditions d'utilisation** - [http://localhost:3000/terms](http://localhost:3000/terms) - CGU
- **Mentions légales** - [http://localhost:3000/mentions-legales](http://localhost:3000/mentions-legales) - Informations légales
- **Politique des cookies** - [http://localhost:3000/cookies](http://localhost:3000/cookies) - Gestion des cookies

## 🛠️ Stack Technique

- **Framework:** Next.js 15 (App Router)
- **Langage:** TypeScript
- **Styling:** Tailwind CSS v4
- **Composants UI:** shadcn/ui
- **Base de données:** PostgreSQL + Prisma ORM
- **Authentification:** Better-Auth
- **Paiements:** Stripe
- **Email:** Nodemailer
- **Theme:** next-themes
- **Validation:** Zod
- **Formulaires:** React Hook Form

## 📋 Prérequis

- Node.js 22 ou supérieur
- pnpm 8+ (recommandé) ou npm 9+
- PostgreSQL (local ou cloud)
- Git
- Compte Stripe (pour les paiements)
- Compte Gmail (pour l'envoi d'emails)

## 🚀 Installation

1. **Cloner le projet**

```bash
git clone https://github.com/Ax-07/preset-next-auth-stripe.git
cd preset-next-auth-stripe/preset_next_auth_stripe
```

2. **Installer les dépendances**

```bash
pnpm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
# Format: postgresql://[user]:[password]@[host]:[port]/[database_name]
# Exemple local: postgresql://postgres:password@localhost:5432/myapp
# Exemple cloud: postgresql://user:pass@db.example.com:5432/dbname?sslmode=require

# Better-Auth - Authentification
BETTER_AUTH_SECRET="votre_secret_genere_ici"
# ⚠️ IMPORTANT: Générez un secret sécurisé avec: openssl rand -base64 32
# Ce secret est utilisé pour signer les tokens et sessions
# Ne le partagez JAMAIS et utilisez un secret différent en production

BETTER_AUTH_URL="http://localhost:3000"
# URL de base de votre application
# Développement: http://localhost:3000
# Production: https://votre-domaine.com

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID="votre_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="votre_client_secret"
# 📝 Configuration Google OAuth:
# 1. Créez un projet sur https://console.cloud.google.com
# 2. Activez l'API Google+ 
# 3. Créez des identifiants OAuth 2.0
# 4. Ajoutez vos URIs de redirection autorisées:
#    - http://localhost:3000/api/auth/callback/google (dev)
#    - https://votre-domaine.com/api/auth/callback/google (prod)

# Nodemailer - Envoi d'emails
EMAIL_USER="votre.email@gmail.com"
EMAIL_PASSWORD="votre_app_password"
# 📧 Configuration Gmail:
# 1. Activez la vérification en 2 étapes sur votre compte Google
# 2. Générez un mot de passe d'application: https://myaccount.google.com/apppasswords
# 3. Utilisez ce mot de passe d'application (16 caractères sans espaces)
# ⚠️ N'utilisez PAS votre mot de passe Gmail principal!
# 
# Pour d'autres fournisseurs (Outlook, SMTP personnalisé), consultez:
# docs/guide-nodemailer.md

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
# Obtenez vos clés sur https://dashboard.stripe.com/apikeys
```

**Variables d'environnement requises:**

| Variable                 | Description                      | Obligatoire               |
|--------------------------|----------------------------------|---------------------------|
| `DATABASE_URL`           | URL de connexion PostgreSQL      | ✅ Oui                    |
| `BETTER_AUTH_SECRET`     | Secret pour signer les tokens    | ✅ Oui                    |
| `BETTER_AUTH_URL`        | URL de base de l'application     | ✅ Oui                    |
| `EMAIL_USER`             | Email pour l'envoi (Nodemailer)  | ✅ Oui                    |
| `EMAIL_PASSWORD`         | Mot de passe d'application email | ✅ Oui                    |
| `GOOGLE_CLIENT_ID`       | ID client Google OAuth           | ⚠️ Si OAuth Google activé |
| `GOOGLE_CLIENT_SECRET`   | Secret client Google OAuth       | ⚠️ Si OAuth Google activé |
| `STRIPE_SECRET_KEY`      | Clé secrète Stripe               | ✅ Oui                    |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe              | ❌ non                    |

4. **Configurer la base de données**

```bash
# Générer le client Prisma
pnpm prisma-generate

# Appliquer les migrations
pnpm prisma-migrate

# (Optionnel) Visualiser la base de données
pnpm prisma-studio
```

5. **Lancer le serveur de développement**

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Configuration plan stripe

1. Créez un compte Stripe sur [https://stripe.com](https://stripe.com)
2. Créez des produits et plans d'abonnement
    - Dans le tableau de bord Stripe, cliquez sur "Catalogue de produits"
    - puis "Créez un nouveau produit"
    - Nommez votre produit (ex: "Abonnement Premium")
    - Choississez "Récurrent" comme type de prix ou "Ponctuel" selon vos besoins
    - Définissez le montant, la devise et la fréquence de facturation ("mensuel")
    - Pour ajouter une fréquence annuelle de facturation supplémentaire, cliquez sur "Autres options tarifaires"
    - Définissez le montant, la devise et la fréquence de facturation ("annuel")
    - Enregistrez le produit
    - Cliquez sur le produit créé pour voir les détails
    - Pour chaque tarif cliquez sur "..." -> "modifier le tarif"
    - Ajoutez une "Clé de recherche" (ex: "basic_monthly", "pro_annual")
    - Enregistrez les modifications
    - Dans le fichier `src/lib/stripe/stripe-plan.ts`, modifier la valeur de `priceLookupKey` et `annualLookupKey` avec les clés de recherche définies dans Stripe
    - L'application s'occupe de recuperer et de mettre a jour automatiquement les plans.

3. Configurez les webhooks Stripe pour gérer les événements d'abonnement.
    - Dans le tableau de bord Stripe, allez dans "Développeurs" -> "Webhooks"
    - Cliquez sur "Ajouter une destination"
    - Selectionnez les événements
      - `checkout.session.completed` (pour les nouveaux abonnements)
      - `customer.subscription.updated` (pour les mises à jour d'abonnement)
      - `customer.subscription.deleted` (pour les annulations d'abonnement)
      - 

4. Testez les paiements avec les cartes de test Stripe.
5. Passez en mode production en utilisant vos clés API live.

## 📁 Structure du Projet

```
preset_next_auth_stripe/
├── src/
│   ├── app/              # Pages et routes Next.js
│   │   ├── auth/         # Pages d'authentification
│   │   ├── api/          # Routes API
│   │   └── (pages)/      # Autres pages
│   ├── components/       # Composants React
│   │   ├── ui/           # Composants shadcn/ui
│   │   ├── layout/       # Composants de mise en page
│   │   └── auth/         # Composants d'authentification
│   └── lib/              # Utilitaires et configurations
│       ├── auth/         # Configuration Better-Auth
│       └── database/     # Client Prisma
├── prisma/               # Schéma et migrations Prisma
│   ├── schema.prisma     # Définition du schéma
│   └── migrations/       # Historique des migrations
├── public/               # Fichiers statiques
└── docs/                 # Documentation

```

## 🎯 Scripts Disponibles

```bash
# Développement
pnpm dev              # Démarrer le serveur de développement

# Build
pnpm build            # Créer un build de production
pnpm start            # Démarrer le serveur de production

# Prisma
pnpm prisma-generate  # Générer le client Prisma
pnpm prisma-migrate   # Créer et appliquer une migration
pnpm prisma-studio    # Ouvrir Prisma Studio
pnpm prisma-seed      # Insérer des données initiales

# Qualité du code
pnpm lint             # Vérifier le code avec ESLint
```

## 🚢 Déploiement

Le projet est optimisé pour le déploiement sur Vercel :

1. Pushez votre code sur GitHub
2. Importez le projet dans Vercel
3. Configurez les variables d'environnement
4. Déployez !

Voir le [guide de déploiement](../docs/guide_deployment.md) pour plus de détails.

## 📖 Documentations

Pour en savoir plus sur les technologies utilisées :

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better-Auth Documentation](https://better-auth.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Nodemailer Documentation](https://nodemailer.com)
- [Stripe Documentation](https://stripe.com/docs)

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé par [Ax-07](https://github.com/Ax-07)
