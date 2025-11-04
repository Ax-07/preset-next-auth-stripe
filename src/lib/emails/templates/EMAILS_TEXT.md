# 💌 EMAILS_TEXT.md — Textes des emails (SaaS Better Auth + Stripe)

> Ce fichier regroupe **tous les textes** des emails envoyés par l’application, classés par catégorie.  
> Utilisez les variables entre `{{ }}` (ex. `{{user.name}}`, `{{billingPortalUrl}}`) dans votre moteur de templates.

---

## Sommaire

- [💌 EMAILS\_TEXT.md — Textes des emails (SaaS Better Auth + Stripe)](#-emails_textmd--textes-des-emails-saas-better-auth--stripe)
  - [Sommaire](#sommaire)
  - [AUTHENTIFICATION](#authentification)
    - [Email de vérification](#email-de-vérification)
    - [Bienvenue](#bienvenue)
    - [Réinitialisation du mot de passe](#réinitialisation-du-mot-de-passe)
    - [Compte supprimé](#compte-supprimé)
  - [PAIEMENT](#paiement)
    - [Facture payée](#facture-payée)
    - [Paiement échoué](#paiement-échoué)
  - [ABONNEMENT (SUBSCRIPTION)](#abonnement-subscription)
    - [Abonnement activé](#abonnement-activé)
    - [Abonnement mis à jour](#abonnement-mis-à-jour)
    - [Annulation programmée](#annulation-programmée)
    - [Abonnement annulé](#abonnement-annulé)
    - [Abonnement restauré](#abonnement-restauré)
  - [ESSAI GRATUIT (TRIAL)](#essai-gratuit-trial)
    - [Essai démarré](#essai-démarré)
    - [Essai se termine bientôt](#essai-se-termine-bientôt)
    - [Essai terminé](#essai-terminé)
    - [Essai converti (abonnement activé)](#essai-converti-abonnement-activé)
  - [ENGAGEMENT](#engagement)
    - [Processus abandonné](#processus-abandonné)
    - [Demande d’avis](#demande-davis)
  - [ADMIN](#admin)
    - [Nouveau client](#nouveau-client)
    - [Message du formulaire de contact](#message-du-formulaire-de-contact)
  - [Bonnes pratiques éditoriales](#bonnes-pratiques-éditoriales)
  - [Variables disponibles (exemples)](#variables-disponibles-exemples)

---

## AUTHENTIFICATION

### Email de vérification
**Fichier :** `auth/email-verification.tsx`  
**Sujet :** `Vérifiez votre adresse email pour activer votre compte`

**Corps :**
```
Bonjour {{user.name}},

Merci de rejoindre {{appName}} !
Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :

👉 Confirmer mon email : {{url}}

Ce lien est valable pendant 24 heures.

À tout de suite sur {{appName}} 🚀
```

---

### Bienvenue
**Fichier :** `auth/welcome-email.tsx`  
**Sujet :** `Bienvenue sur {{appName}} 🎉`

**Corps :**
```
Bonjour {{user.name}},

Bienvenue sur {{appName}} !
Votre compte a bien été créé{{#if isEmailVerified}} et votre adresse est vérifiée{{/if}}.

Vous pouvez dès maintenant accéder à votre espace personnel et découvrir toutes les fonctionnalités disponibles.

👉 Accéder à mon tableau de bord : {{dashboardUrl}}

Merci de votre confiance,
L’équipe {{appName}}
```

---

### Réinitialisation du mot de passe
**Fichier :** `auth/password-reset.tsx`  
**Sujet :** `Réinitialisez votre mot de passe {{appName}}`

**Corps :**
```
Bonjour {{user.name}},

Vous avez demandé à réinitialiser votre mot de passe.
Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :

🔐 Réinitialiser mon mot de passe : {{url}}

Si vous n’êtes pas à l’origine de cette demande, ignorez simplement ce message.
Ce lien expirera dans 1 heure.

— L’équipe {{appName}}
```

---

### Compte supprimé
**Fichier :** `auth/account-deleted.tsx`  
**Sujet :** `Votre compte a été supprimé`

**Corps :**
```
Bonjour {{user.name}},

Votre compte {{appName}} a été supprimé le {{deletedDate}} conformément à votre demande.

Toutes vos données associées ont été effacées de manière sécurisée conformément à notre politique de confidentialité.

Nous sommes désolés de vous voir partir, mais vous serez toujours le bienvenu ❤️

— L’équipe {{appName}}
```

---

## PAIEMENT

### Facture payée
**Fichier :** `payment/invoice-paid.tsx`  
**Sujet :** `Paiement confirmé – Merci pour votre règlement 💳`

**Corps :**
```
Bonjour {{user.name}},

Nous avons bien reçu votre paiement pour le plan **{{plan.name}}**.

💰 Montant : {{invoice.amount}} €
📅 Date : {{invoice.date}}
🧾 Facture n° : {{invoice.number}}

Merci pour votre confiance et votre fidélité,
L’équipe {{appName}}
```

---

### Paiement échoué
**Fichier :** `payment/payment-failed.tsx`  
**Sujet :** `Problème lors du paiement de votre abonnement ⚠️`

**Corps :**
```
Bonjour {{user.name}},

Le dernier paiement pour votre abonnement **{{plan.name}}** n’a pas pu être effectué.
Montant : {{payment.amount}} €

Veuillez vérifier votre moyen de paiement pour éviter une interruption de service :
👉 Mettre à jour mon moyen de paiement : {{billingPortalUrl}}

Merci pour votre attention,
L’équipe {{appName}}
```

---

## ABONNEMENT (SUBSCRIPTION)

### Abonnement activé
**Fichier :** `subscription/subscription-welcome.tsx`  
**Sujet :** `Bienvenue dans votre abonnement {{plan.name}} 🎉`

**Corps :**
```
Bonjour {{user.name}},

Votre abonnement au plan **{{plan.name}}** est maintenant actif.
Merci pour votre confiance !

📅 Prochaine facturation : {{subscription.nextBillingDate}}
💰 Montant : {{subscription.nextBillingAmount}} € / {{subscription.billingPeriod}}

Vous pouvez gérer votre abonnement à tout moment :
👉 Gérer mon abonnement : {{billingPortalUrl}}

— L’équipe {{appName}}
```

---

### Abonnement mis à jour
**Fichier :** `subscription/subscription-updated.tsx`  
**Sujet :** `Votre abonnement a été mis à jour 🔄`

**Corps :**
```
Bonjour {{user.name}},

Votre abonnement vient d’être mis à jour.

🗓️ Nouveau plan : {{newPlan.name}}
💰 Ancien plan : {{oldPlan.name}}
📅 Effectif à partir du : {{effectiveDate}}

Merci de continuer l’aventure avec nous 🚀
```

---

### Annulation programmée
**Fichier :** `subscription/subscription-cancelled.tsx`  
**Sujet :** `Votre abonnement prendra fin le {{cancellation.accessEndDate}} ⚠️`

**Corps :**
```
Bonjour {{user.name}},

Nous confirmons que votre abonnement au plan **{{plan.name}}** sera annulé à la fin de la période actuelle.

📅 Accès jusqu’au : {{cancellation.accessEndDate}}
🕓 Annulé le : {{cancellation.date}}

Vous pouvez réactiver votre abonnement avant cette date pour éviter toute interruption :
👉 Gérer mon abonnement : {{billingPortalUrl}}

— L’équipe {{appName}}
```

---

### Abonnement annulé
**Fichier :** `subscription/subscription-deleted.tsx`  
**Sujet :** `Votre abonnement a été annulé ❌`

**Corps :**
```
Bonjour {{user.name}},

Votre abonnement au plan **{{plan.name}}** a été annulé le {{deletedDate}}.

Vous pouvez réactiver votre abonnement à tout moment :
👉 Réactiver mon abonnement : {{billingPortalUrl}}

Merci d’avoir utilisé {{appName}} 🙏
```

---

### Abonnement restauré
**Fichier :** `subscription/subscription-restored.tsx`  
**Sujet :** `Votre abonnement a été restauré ✅`

**Corps :**
```
Bonjour {{user.name}},

Bonne nouvelle ! Votre abonnement au plan **{{plan.name}}** a été restauré.

📅 Restauré le : {{restoration.date}}
💳 Prochaine facturation : {{restoration.nextBillingDate}}

Ravis de vous compter parmi nous 🎉
L’équipe {{appName}}
```

---

## ESSAI GRATUIT (TRIAL)

### Essai démarré
**Fichier :** `trial/trial-started.tsx`  
**Sujet :** `Votre essai gratuit a commencé 🚀`

**Corps :**
```
Bonjour {{user.name}},

Votre essai gratuit du plan **{{plan.name}}** vient de démarrer.

🗓️ Début : {{trial.startDate}}
🏁 Fin : {{trial.endDate}}
⏱️ Durée : {{trial.duration}} jours

Profitez dès maintenant de toutes les fonctionnalités premium.

— L’équipe {{appName}}
```

---

### Essai se termine bientôt
**Fichier :** `trial/trial-ending-soon.tsx`  
**Sujet :** `Votre essai {{plan.name}} se termine bientôt ⏳`

**Corps :**
```
Bonjour {{user.name}},

Votre essai gratuit du plan **{{plan.name}}** se termine le **{{trial.endDate}}**.
Il vous reste **{{trial.daysRemaining}} jours** pour en profiter.

💳 Activez votre abonnement dès maintenant pour conserver vos données :
👉 Passer au plan complet : {{billingUrl}}

Merci d’avoir testé {{appName}} !
```

---

### Essai terminé
**Fichier :** `trial/trial-expired.tsx`  
**Sujet :** `Votre essai gratuit est terminé`

**Corps :**
```
Bonjour {{user.name}},

Votre période d’essai pour le plan **{{plan.name}}** s’est terminée le {{trial.expiredDate}}.

Vous pouvez toujours activer votre abonnement pour retrouver vos projets et vos données :
👉 Réactiver mon abonnement : {{billingUrl}}

Merci d’avoir essayé {{appName}},
À très bientôt 👋
```

---

### Essai converti (abonnement activé)
**Fichier :** `trial/trial-ending.tsx`  
**Sujet :** `Merci ! Votre abonnement démarre 🎉`

**Corps :**
```
Bonjour {{user.name}},

Votre essai gratuit vient de se transformer en un abonnement actif au plan **{{plan.name}}**.
Votre premier paiement a bien été effectué.

📅 Prochaine facturation : {{subscription.nextBillingDate}}
💰 Montant : {{subscription.nextBillingAmount}} €

Merci de rester parmi nous,
L’équipe {{appName}}
```

---

## ENGAGEMENT

### Processus abandonné
**Fichier :** `engagement/abandoned-process.tsx`  
**Sujet :** `Vous n’avez pas terminé votre inscription 🚀`

**Corps :**
```
Bonjour {{user.name}},

Il semble que vous n’ayez pas finalisé votre inscription sur {{appName}}.

Revenez terminer votre configuration en quelques secondes pour profiter de toutes les fonctionnalités :
👉 Reprendre là où je m’étais arrêté : {{resumeUrl}}

Besoin d’aide ? Répondez simplement à cet email 💬
```

---

### Demande d’avis
**Fichier :** `engagement/feedback-request.tsx`  
**Sujet :** `Donnez-nous votre avis sur {{appName}} 🙏`

**Corps :**
```
Bonjour {{user.name}},

Merci d’utiliser {{appName}} ! Votre avis est précieux pour nous aider à améliorer le produit.

Prenez 30 secondes pour nous dire ce que vous en pensez :
👉 Donner mon avis : {{feedbackUrl}}

Merci d’avance,
L’équipe {{appName}}
```

---

## ADMIN

### Nouveau client
**Fichier :** `admin/admin-new-customer.tsx`  
**Sujet :** `🆕 Nouveau client inscrit : {{user.email}}`

**Corps :**
```
Nouvel utilisateur enregistré sur {{appName}} :

👤 Nom : {{user.name}}
📧 Email : {{user.email}}
📅 Date d’inscription : {{createdAt}}

Plan actuel : {{plan.name}}
Statut : {{subscription.status}}

— Notification automatique du système
```

---

### Message du formulaire de contact
**Fichier :** `admin/contact-form.tsx`  
**Sujet :** `📩 Nouveau message du formulaire de contact`

**Corps :**
```
📧 De : {{contact.name}} <{{contact.email}}>
📅 Reçu le : {{receivedDate}}

💬 Message :
{{contact.message}}

— Fin du message
```

---

## Bonnes pratiques éditoriales

- Ton **professionnel, clair et chaleureux** (style SaaS moderne).  
- **Un seul CTA** par email (ex. lien de vérification, portail de facturation).  
- Rappeler le **nom de la marque** `{{appName}}` dans chaque message.  
- Vérifier les variables dynamiques avant envoi : `{{user.name}}`, `{{plan.name}}`, `{{billingPortalUrl}}`, etc.  
- Ajouter, si nécessaire, une **section légale / footer** (adresse, lien de désinscription pour les emails marketing).

---

## Variables disponibles (exemples)

```
{{appName}}
{{dashboardUrl}}
{{billingUrl}}
{{billingPortalUrl}}

{{user.name}}
{{user.email}}

{{plan.name}}
{{plan.price}}

{{subscription.billingPeriod}}
{{subscription.nextBillingDate}}
{{subscription.nextBillingAmount}}

{{trial.startDate}}
{{trial.endDate}}
{{trial.duration}}
{{trial.daysRemaining}}
{{trial.expiredDate}}

{{invoice.amount}}
{{invoice.date}}
{{invoice.number}}

{{cancellation.date}}
{{cancellation.accessEndDate}}

{{deletedDate}}
{{restoration.date}}
{{restoration.nextBillingDate}}

{{resumeUrl}}
{{feedbackUrl}}
```
