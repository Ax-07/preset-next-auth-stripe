# 📧 Système d'Email Complet - React Email + Better Auth + Stripe

> **Système d'email professionnel et complet** avec 18 templates React Email, helpers d'intégration Better Auth, et composants réutilisables.

## 🎯 Vue d'ensemble

Ce système fournit une solution complète pour tous vos besoins d'emails dans une application SaaS moderne :

- ✅ **18 templates d'email** professionnels et responsives
- ✅ **Helpers d'intégration** pour Better Auth et Stripe
- ✅ **Composants réutilisables** avec Tailwind CSS
- ✅ **TypeScript** avec types stricts
- ✅ **Documentation complète** et exemples

## 📁 Structure du Projet

```
emails/
├── templates/
│   ├── auth/                    # Authentification
│   │   ├── EmailVerification.tsx
│   │   ├── PasswordReset.tsx
│   │   ├── WelcomeEmail.tsx
│   │   └── AccountDeleted.tsx
│   ├── subscription/           # Abonnements
│   │   ├── SubscriptionWelcome.tsx
│   │   ├── SubscriptionCancelled.tsx
│   │   ├── SubscriptionUpdated.tsx
│   │   └── SubscriptionDeleted.tsx
│   ├── trial/                  # Essais gratuits
│   │   ├── TrialStarted.tsx
│   │   ├── TrialEndingSoon.tsx
│   │   ├── TrialEnding.tsx
│   │   └── TrialExpired.tsx
│   ├── payment/               # Paiements
│   │   ├── PaymentFailed.tsx
│   │   └── InvoicePaid.tsx
│   ├── admin/                 # Administration
│   │   ├── ContactForm.tsx
│   │   └── AdminNewCustomer.tsx
│   ├── engagement/            # Engagement utilisateur
│   │   ├── FeedbackRequest.tsx
│   │   └── AbandonedProcess.tsx
│   ├── components/            # Composants réutilisables
│   │   ├── EmailLayout.tsx
│   │   ├── EmailHeader.tsx
│   │   ├── EmailButton.tsx
│   │   ├── EmailFooter.tsx
│   │   ├── EmailSection.tsx
│   │   ├── EmailDivider.tsx
│   │   ├── EmailFeature.tsx
│   │   └── EmailBadge.tsx
│   └── utils/                 # Utilitaires et helpers
│       ├── email-renderer.ts
│       ├── email-helpers.ts
│       ├── email-helpers-extended.ts
│       └── index.ts
├── examples/                  # Exemples d'intégration
│   ├── better-auth-guide.ts
│   ├── email-test-cases.ts
│   └── nodemailer-setup.ts
└── docs/
    └── EMAIL_WORKFLOWS.md     # Documentation complète
```

## 🚀 Installation et Configuration

### 1. Dépendances

```bash
npm install @react-email/render @react-email/components react
npm install -D @react-email/tailwind
```

### 2. Variables d'environnement

```env
# Configuration email
EMAIL_USER=noreply@votreapp.com
COMPANY_NAME=Votre App
SUPPORT_EMAIL=support@votreapp.com
NEXT_PUBLIC_APP_URL=https://votreapp.com
LOGO_URL=https://votreapp.com/logo.png
COMPANY_ADDRESS=123 Rue de la Tech, 75001 Paris, France

# Better Auth
BETTER_AUTH_SECRET=votre-secret-better-auth
BETTER_AUTH_URL=https://votreapp.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Configuration Tailwind CSS pour React Email

```js
// tailwind.config.js
module.exports = {
  content: [
    './emails/**/*.{js,ts,jsx,tsx}',
    // ... autres paths
  ],
  // ... reste de la config
}
```

## 📮 Utilisation Rapide

### Import des helpers

```typescript
import { 
  createWelcomeEmail,
  createPaymentFailedEmail,
  createTrialEndingSoonEmail,
  createContactFormEmail 
} from './emails/templates/utils';
```

### Exemples d'utilisation

#### 1. Email de bienvenue

```typescript
const welcomeEmail = await createWelcomeEmail({
  user: { name: "Jean Dupont", email: "jean@example.com" },
  signupMethod: "email",
  registrationDate: "2024-01-15",
  isEmailVerified: true
});

await sendEmail(welcomeEmail);
```

#### 2. Email d'échec de paiement

```typescript
const failureEmail = await createPaymentFailedEmail({
  user: { name: "Jean Dupont", email: "jean@example.com" },
  payment: {
    amount: "29,99€",
    failureDate: "2024-01-15",
    attemptNumber: 1,
  },
  plan: { name: "Pro Plan" }
});

await sendEmail(failureEmail);
```

#### 3. Email d'essai qui expire

```typescript
const trialEmail = await createTrialEndingSoonEmail({
  user: { name: "Jean Dupont", email: "jean@example.com" },
  plan: { name: "Premium", price: "49,99€" },
  trial: { endDate: "2024-01-20", daysRemaining: 3 },
  discount: { percentage: 20, validUntil: "2024-01-30" }
});

await sendEmail(trialEmail);
```

## 🔗 Intégration Better Auth

```typescript
import { betterAuth } from "better-auth";
import { createVerificationEmail, createPasswordResetEmail } from './emails/templates/utils';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      const emailData = await createPasswordResetEmail({
        user: { name: user.name, email: user.email },
        url,
        expiresInHours: 1,
      });
      await sendEmail(emailData);
    },
  },
  // ... autres configurations
});
```

## 💳 Intégration Stripe Webhooks

```typescript
export async function handleStripeWebhook(event: any) {
  switch (event.type) {
    case 'customer.subscription.created':
      const user = await getUserByStripeCustomerId(event.data.object.customer);
      const welcomeEmail = await createWelcomeEmail({
        user: { name: user.name, email: user.email },
        signupMethod: "email",
        registrationDate: new Date().toLocaleDateString('fr-FR'),
      });
      await sendEmail(welcomeEmail);
      break;
      
    case 'invoice.payment_failed':
      // ... logique d'échec de paiement
      break;
  }
}
```

## 🎨 Templates Disponibles

### 📝 Authentification (4 templates)
- **EmailVerification** - Vérification d'email
- **PasswordReset** - Reset de mot de passe  
- **WelcomeEmail** - Email de bienvenue
- **AccountDeleted** - Suppression de compte

### 💼 Abonnements (4 templates)
- **SubscriptionWelcome** - Bienvenue abonné
- **SubscriptionCancelled** - Annulation
- **SubscriptionUpdated** - Mise à jour
- **SubscriptionDeleted** - Suppression

### 🆓 Essais gratuits (4 templates)
- **TrialStarted** - Début d'essai
- **TrialEndingSoon** - Fin proche
- **TrialEnding** - Dernier jour
- **TrialExpired** - Essai expiré

### 💳 Paiements (2 templates)
- **PaymentFailed** - Échec de paiement
- **InvoicePaid** - Facture payée

### 👥 Administration (2 templates)
- **ContactForm** - Formulaire de contact
- **AdminNewCustomer** - Nouveau client

### 🎯 Engagement (2 templates)
- **FeedbackRequest** - Demande de feedback
- **AbandonedProcess** - Processus abandonné

## 🛠 Helpers Disponibles

### Helpers de base (Better Auth)
- `createVerificationEmail()`
- `createPasswordResetEmail()`
- `createSubscriptionWelcomeEmail()`

### Helpers étendus (Tous les templates)
- `createWelcomeEmail()`
- `createAccountDeletedEmail()`
- `createSubscriptionCancelledEmail()`
- `createSubscriptionUpdatedEmail()`
- `createTrialStartedEmail()`
- `createPaymentFailedEmail()`
- `createFeedbackRequestEmail()`
- ... et 9 autres

## 🎨 Composants Réutilisables

```typescript
import { EmailLayout, EmailButton, EmailSection } from './emails/templates/components';

// Utilisation dans vos templates personnalisés
<EmailLayout logoUrl={logoUrl} companyName={companyName}>
  <EmailSection>
    <EmailButton href="/dashboard" variant="primary">
      Accéder au dashboard
    </EmailButton>
  </EmailSection>
</EmailLayout>
```

## 📬 Configuration Service d'Email

### Avec Nodemailer
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(emailData: any) {
  await transporter.sendMail(emailData);
}
```

### Avec Resend
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(emailData: any) {
  await resend.emails.send(emailData);
}
```

## 🧪 Tests et Développement

### Prévisualisation des emails
```bash
npx react-email dev
```

### Tests automatisés
```typescript
import { render } from '@react-email/render';
import { WelcomeEmail } from './emails/templates/auth';

test('WelcomeEmail renders correctly', async () => {
  const html = await render(WelcomeEmail({
    userName: "Test User",
    userEmail: "test@example.com",
    // ... autres props
  }));
  
  expect(html).toContain("Bienvenue");
});
```

## 📊 Métriques et Analytics

Le système inclut des UTM parameters et des pixels de tracking :

```typescript
// Tracking automatique des clics
const emailData = await createWelcomeEmail({
  // ... data
  trackingParams: {
    campaign: "welcome_series",
    source: "email",
    medium: "automation"
  }
});
```

## 🔧 Customisation

### Personnaliser les styles
```typescript
// Modifier EMAIL_CONFIG dans email-renderer.ts
export const EMAIL_CONFIG = {
  DEFAULT_FROM: "votre-email@example.com",
  COMPANY_NAME: "Votre Entreprise",
  // ... autres configs
};
```

### Créer un template personnalisé
```typescript
import { EmailLayout } from '../components';

interface CustomEmailProps {
  userName: string;
  customData: string;
}

export default function CustomEmail({ userName, customData }: CustomEmailProps) {
  return (
    <EmailLayout>
      <h1>Bonjour {userName}</h1>
      <p>{customData}</p>
    </EmailLayout>
  );
}
```

## 📈 Bonnes Pratiques

1. **Utilisez les types TypeScript** pour éviter les erreurs
2. **Testez vos emails** sur différents clients
3. **Personnalisez les variables d'environnement** selon vos besoins
4. **Surveillez les métriques** d'ouverture et de clic
5. **Respectez les réglementations** (RGPD, CAN-SPAM)

## 🆘 Support et Contribution

Pour des questions ou contributions :
1. Consultez la [documentation complète](./docs/EMAIL_WORKFLOWS.md)
2. Voir les [exemples d'intégration](./examples/)
3. Ouvrir une issue sur le repository

## 📄 Licence

Ce système d'email est fourni sous licence MIT. Libre d'utilisation pour vos projets commerciaux et personnels.

---

**🎉 Félicitations !** Vous avez maintenant un système d'email professionnel et complet pour votre application SaaS. Plus de 18 templates prêts à l'emploi avec une intégration seamless à Better Auth et Stripe !
