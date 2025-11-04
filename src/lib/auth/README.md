# ⚙️ Better Auth & Stripe Hooks Documentation

Documentation complète des hooks **Better Auth** et **Better Auth + Stripe**, incluant leurs déclencheurs, conditions, cas d’utilisation et actions typiques.

> ✅ Cette référence couvre à la fois le **cycle d’authentification** et la **gestion des abonnements Stripe**.

## ⚙️ Architecture & Cycle de vie – Vue DevOps

───────────────────────────────────────────────────────────────
👤  UTILISATEUR
   ↳ actions : inscription, connexion, abonnement, annulation
       │
       ▼
🔐  BETTER AUTH (Core)
   ↳ gère : Authentification, sessions, sécurité, rate limit
   ↳ déclenche : hooks `user.*`, `session.*`, `emailVerification.*`
       │
       ▼
🗄️  PRISMA (Base de données)
   ↳ tables principales : `User`, `Session`, `Subscription`
   ↳ interactions :
        • INSERT lors de la création (signup, abonnement)
        • UPDATE lors des mises à jour (plan, statut, email)
        • DELETE lors de la suppression (compte, abonnement)
       │
       ▼
💳  STRIPE (Facturation & Abonnement)
   ↳ gère : plans, paiements, essais, annulations
   ↳ envoie des webhooks :
        • `checkout.session.completed`
        • `customer.subscription.*`
        • `invoice.payment_*`
   ↳ déclenche : `onSubscription*`, `onTrial*`, `onEvent`
       │
       ▼
📨  EMAIL SERVICE
   ↳ envoi automatique :
        • Vérification email
        • Bienvenue / Abonnement / Essai / Annulation
        • Mot de passe oublié / Suppression de compte
───────────────────────────────────────────────────────────────

📦  Résumé du flux :
   User → Better Auth → Prisma ↔ Stripe → Emails → User

🧭  Exemple typique :
   1️⃣  User s’inscrit → Better Auth crée `User`
   2️⃣  Stripe crée `Customer` + `Subscription`
   3️⃣  Prisma sauvegarde l’abonnement
   4️⃣  Better Auth envoie email de bienvenue
   5️⃣  Stripe envoie webhooks → hooks mis à jour
   6️⃣  Prisma synchronise le statut (`active`, `canceled`, etc.)
───────────────────────────────────────────────────────────────

---

## 🧩 Better Auth Core – Compte & Session

| Hook                 | Déclenchement                         | Condition de déclenchement                  | Cas d’utilisation                                                   | Exemple d’action                                   |
|----------------------|---------------------------------------|---------------------------------------------|---------------------------------------------------------------------|----------------------------------------------------|
| `user.create.before` | Avant la création d’un utilisateur    | L’utilisateur s’inscrit via email ou OAuth  | Ajouter des champs custom ou valider les données avant insertion    | Ajouter un champ `role: "user"`                    |
| `user.create.after`  | Après création d’un utilisateur       | L’utilisateur vient d’être ajouté à la base | Envoyer un email de bienvenue ou initialiser des données par défaut | Envoyer un “Bienvenue sur notre plateforme”        |
| `user.update.before` | Avant la mise à jour d’un utilisateur | Un champ du profil est modifié              | Vérifier ou normaliser les données                                  | Mettre à jour `updatedAt`                          |
| `user.update.after`  | Après mise à jour                     | Données utilisateur sauvegardées            | Suivi d’activité ou synchronisation CRM                             | Log “profil modifié”                               |
| `user.delete.before` | Avant suppression du compte           | L’utilisateur demande la suppression        | Nettoyer données liées : abonnements, fichiers, etc.                | Supprimer les abonnements Stripe avant suppression |
| `user.delete.after`  | Après suppression du compte           | Suppression réussie                         | Notification / conformité RGPD                                      | Envoyer un email “Votre compte a été supprimé”     |
| `session.create`     | Création d’une session                | L’utilisateur se connecte                   | Tracking d’authentification / analytics                             | Log connexion réussie                              |
| `session.delete`     | Suppression de session                | Déconnexion ou expiration                   | Nettoyage de session ou tracking logout                             | Supprimer tokens / cookies                         |

---

## 💳 Stripe Hooks – Abonnement (`subscription`)

| Hook | Événement Stripe | Condition de déclenchement | Cas d’utilisation | Email typique |
|------|------------------|-----------------------------|------------------|----------------|
| `onSubscriptionComplete` | `checkout.session.completed`, `customer.subscription.created` | Création d’un nouvel abonnement (`status = trialing` ou `active`) | Démarrage d’un abonnement ou d’un essai gratuit | 🎉 “Bienvenue dans votre abonnement” |
| `onSubscriptionUpdate` | `customer.subscription.updated` | Modification du plan, statut, ou `cancel_at_period_end` | Upgrade / downgrade / annulation programmée | 🔄 “Votre abonnement a été mis à jour” / ⚠️ “Annulation programmée” |
| `onSubscriptionCancel` | `customer.subscription.deleted` ou `updated` (`status = canceled`) | Annulation effective de l’abonnement (fin d’accès) | Fin d’accès ou résiliation volontaire | ❌ “Votre abonnement est annulé” |
| `onSubscriptionDeleted` | `customer.subscription.deleted` | Suppression définitive Stripe / cleanup base | Nettoyage complet post-suppression | 🗑️ “Votre abonnement a été supprimé” |

---

## 🧪 Stripe Hooks – Période d’essai (`freeTrial`)

| Hook              | Événement Stripe                                             | Condition de déclenchement                                   | Cas d’utilisation                                         | Email typique                        |
|-------------------|--------------------------------------------------------------|--------------------------------------------------------------|-----------------------------------------------------------|--------------------------------------|
| `onTrialStart`    | `customer.subscription.created`                              | `status = trialing` et un `trial_end` défini                 | Début d’un essai gratuit après Checkout                   | 🚀 “Votre essai commence aujourd’hui” |
| `onTrialEnd`      | `invoice.payment_succeeded`, `customer.subscription.updated` | Fin de l’essai, paiement réussi, passage `trialing → active` | Conversion automatique d’un essai en abonnement payant    | 💳 “Votre abonnement démarre”       |
| `onTrialExpired`  | `customer.subscription.deleted`, `invoice.payment_failed`    | Fin d’essai sans conversion (pas de paiement)                | L’utilisateur n’a pas souscrit après l’essai              | ⏳ “Votre essai est terminé”         |
| *(via `onEvent`)* | `customer.subscription.trial_will_end`                       | Fin d’essai proche (`trial_end < 3 jours`)                   | Prévenir avant la fin de l’essai / relancer la conversion | 📬 “Votre essai se termine bientôt” |

---

## 💰 Stripe Hooks – Facturation (`onEvent`)

| Hook              | Événement Stripe                       | Condition de déclenchement                             | Cas d’utilisation                           | Email typique                           |
|-------------------|----------------------------------------|--------------------------------------------------------|---------------------------------------------|-----------------------------------------|
| *(via `onEvent`)* | `invoice.payment_succeeded`            | Paiement d’une facture réussi (initiale ou récurrente) | Confirmation de paiement ou renouvellement  | ✅ “Paiement confirmé”                  |
| *(via `onEvent`)* | `invoice.payment_failed`               | Paiement échoué (CB expirée, solde insuffisant)        | Avertir et inviter à mettre à jour la carte | ⚠️ “Problème avec votre paiement”      |
| *(via `onEvent`)* | `invoice.upcoming`                     | Facture à venir (`upcoming` dans < 7 jours)            | Prévenir d’un prochain prélèvement          | 🔔 “Prochain prélèvement prévu le…”    |
| *(via `onEvent`)* | `customer.subscription.trial_will_end` | Fin d’essai proche                                     | Relance marketing avant expiration          | ⏰ “Votre essai se termine dans X jours” |

---

## 📦 Résumé des transitions clés

| Étape                    | Hook principal          | Statut Stripe                   | Condition                                  | Cas d’utilisation                        | Email typique             |
|--------------------------|-------------------------|---------------------------------|--------------------------------------------|------------------------------------------|---------------------------|
| Début d’essai            | `onTrialStart`          | `trialing`                      | `trial_end` futur défini                   | L’utilisateur commence un essai gratuit  | 🚀 “Essai commencé”      |
| Fin d’essai (conversion) | `onTrialEnd`            | `active`                        | Paiement réussi après essai                | Passage en plan payant                   | 💳 “Abonnement activé”   |
| Fin d’essai (expiration) | `onTrialExpired`        | `canceled / incomplete_expired` | Fin d’essai sans paiement                  | L’utilisateur quitte à la fin de l’essai | ⏳ “Essai expiré”         |
| Annulation programmée    | `onSubscriptionUpdate`  | `cancel_at_period_end = true`   | L’utilisateur a demandé la résiliation     | Prévenir de la fin d’accès prochaine     | ⚠️ “Annulation programmée” |
| Annulation effective     | `onSubscriptionCancel`  | `canceled`                      | Fin de période atteinte                    | Accès coupé                              | ❌ “Accès terminé”        |
| Suppression manuelle     | `onSubscriptionDeleted` | —                               | Abonnement supprimé manuellement / cleanup | Maintenance ou suppression compte        | 🗑️ “Abonnement supprimé” |

---

## 🔐 Cycle d’authentification – Vue d’ensemble

| Étape                    | Endpoint / Hook                                                                        | Condition de déclenchement            | Cas d’utilisation                 | Effet / Sortie                             |
|--------------------------|----------------------------------------------------------------------------------------|---------------------------------------|-----------------------------------|--------------------------------------------|
| **Inscription (email)**  | `POST /api/auth/sign-up/email`                                                         | Formulaire envoyé (`email + mdp`)     | Créer un compte local             | Création user → `user.create.*`            |
| **Envoi vérif. email**   | `emailVerification.sendVerificationEmail`                                              | `sendOnSignUp = true`                 | Envoyer lien de vérification      | Email avec URL signée                      |
| **Vérification email**   | `GET /api/auth/verify-email?token=...` → `emailVerification.afterEmailVerification`    | Lien cliqué + token valide            | Valider l’adresse                 | `emailVerified = true`, email de bienvenue |
| **Connexion (email)**    | `POST /api/auth/sign-in/email` → `session.create`                                      | Identifiants valides et email vérifié | Connexion utilisateur             | Cookie de session                          |
| **Connexion (Google)**   | `GET /api/auth/sign-in/google` → `session.create` (+ `user.create.after` si 1ère fois) | Auth Google validée                   | Onboarding rapide (email vérifié) | Session + email bienvenue                  |
| **Mot de passe oublié**  | `POST /api/auth/forget-password` → `emailAndPassword.sendResetPassword`                | Email existant                        | Récupération de compte            | Email reset avec lien sécurisé             |
| **Réinit. mot de passe** | `POST /api/auth/reset-password?token=...` → `emailAndPassword.onPasswordReset`         | Token valide + nouveau MDP            | Réinitialisation sécurisée        | MDP mis à jour                             |
| **Lecture session**      | `GET /api/auth/get-session`                                                            | Cookie de session présent             | Lecture côté client/serveur       | Retourne `user + exp`                      |
| **Déconnexion**          | `POST /api/auth/sign-out` → `session.delete`                                           | Bouton “Se déconnecter”               | Fermer session                    | Cookie supprimé                            |
| **Suppression compte**   | `auth.deleteUser` → `user.delete.before/after`                                         | Utilisateur authentifié               | Droit à l’oubli / RGPD            | Suppression user + cleanup complet         |

---

## 👤 Inscription & Vérification Email

| Élément                                                          | Déclenchement      | Condition             | Cas d’utilisation     | Action typique                             |
|------------------------------------------------------------------|--------------------|-----------------------|-----------------------|--------------------------------------------|
| `POST /sign-up/email`                                            | Formulaire soumis  | Email + MDP valides   | Créer un compte       | Renvoie user (non vérifié)                 |
| `user.create.before`                                             | Avant insertion DB | Toujours              | Normaliser données    | Ajouter `role: "user"`                     |
| `user.create.after`                                              | Après insertion    | Toujours              | Post-création         | Email de bienvenue (si OAuth)              |
| `emailVerification.sendVerificationEmail`                        | Automatique        | `sendOnSignUp = true` | Envoi du lien         | Email de vérification                      |
| `GET /verify-email` → `emailVerification.afterEmailVerification` | Lien cliqué        | Token valide          | Finaliser inscription | `emailVerified = true`, email de bienvenue |

---

## 🔑 Connexion (Email & Google)

| Élément               | Déclenchement | Condition              | Cas d’utilisation    | Action typique                                      |
|-----------------------|---------------|------------------------|----------------------|-----------------------------------------------------|
| `POST /sign-in/email` | Soumission    | Email vérifié + MDP OK | Connexion classique  | `session.create`                                    |
| `GET /sign-in/google` | OAuth         | Consentement Google OK | Connexion via Google | `session.create` (+ `user.create.after` si nouveau) |
| `session.create`      | Session créée | Auth OK                | Audit / analytics    | Log connexion                                       |
| `GET /get-session`    | Lecture       | Cookie présent         | SSR / garde de route | Retourne la session                                 |
| `POST /sign-out`      | Clic logout   | Session ouverte        | Quitter              | `session.delete`                                    |

---

## 🔒 Mot de passe oublié & Réinitialisation

| Élément                          | Déclenchement       | Condition                 | Cas d’utilisation      | Action typique                                         |
|----------------------------------|---------------------|---------------------------|------------------------|--------------------------------------------------------|
| `POST /forget-password`          | Formulaire “oublié” | Email existe              | Récupération de compte | `emailAndPassword.sendResetPassword` (email avec lien) |
| `POST /reset-password?token=...` | Envoi nouveau MDP   | Token valide & non expiré | Sécurité               | `emailAndPassword.onPasswordReset`                     |

**Bonnes pratiques :**

- Ne jamais révéler si un email existe (“Si un compte existe, un lien a été envoyé…”).  
- Expiration rapide des tokens (≤ 1h).  
- Invalider les sessions après réinitialisation de mot de passe.

---

## 🗑️ Suppression du compte (RGPD)

| Élément              | Déclenchement               | Condition   | Cas d’utilisation | Action typique                                                            |
|----------------------|-----------------------------|-------------|-------------------|---------------------------------------------------------------------------|
| `auth.deleteUser`    | Clic “Supprimer mon compte” | Authentifié | Droit à l’oubli   | `user.delete.before` (cleanup) → `user.delete.after` (email confirmation) |
| `user.delete.before` | Avant suppression           | Toujours    | Nettoyage lié     | Supprimer abonnements, fichiers, logs                                     |
| `user.delete.after`  | Après suppression           | Toujours    | Notification      | Email “Votre compte a été supprimé”                                       |

---

## 🧠 Bonnes pratiques générales

- ✅ Centraliser la logique d’**emailing** (templates cohérents, ton pro).  
- ✅ Loguer les événements importants (`after` hooks, paiements, webhooks).  
- ✅ Ne jamais faire de **redirect** depuis un **webhook Stripe** → répondre avec `200 OK`.  
- ✅ En **production**, utiliser `rateLimit.storage = "database"`.  
- ✅ Monitorer les webhooks Stripe (ex : retry, idempotence).  

---

## 🕒 Parcours utilisateur (Better Auth + Stripe) – Version texte

───────────────────────────────────────────────────────────────
🔐 AUTHENTIFICATION
───────────────────────────────────────────────────────────────
🧍  Inscription
     → L’utilisateur crée un compte via email ou OAuth (Google).
     → Déclenche `user.create.before` puis `user.create.after`.

📧  Vérification email
     → Email automatique envoyé : `emailVerification.sendVerificationEmail`
     → L’utilisateur clique sur le lien → `afterEmailVerification`
     → Le compte passe en `emailVerified = true`.

🔑  Connexion
     → Authentification via email/password ou OAuth.
     → Déclenche `session.create`.
     → Session active et cookie généré (JWT sécurisé).
───────────────────────────────────────────────────────────────

───────────────────────────────────────────────────────────────
💳 ABONNEMENT & PAIEMENT (Stripe)
───────────────────────────────────────────────────────────────
🚀  Début de période d’essai
     → `checkout.session.completed` → `onTrialStart`
     → Statut Stripe : `trialing`
     → Email “Essai commencé”.

💳  Conversion
     → `invoice.payment_succeeded` ou `subscription.updated`
     → Passage `trialing → active` → `onTrialEnd`
     → Email “Abonnement activé”.

🔁  Renouvellement automatique
     → Stripe génère une facture récurrente (`invoice.payment_succeeded`)
     → Email “Paiement confirmé” ou “Prochain prélèvement”.

⚠️  Annulation programmée
     → `cancel_at_period_end = true`
     → `onSubscriptionUpdate` déclenché
     → Email “Annulation programmée”.

❌  Annulation effective
     → Statut Stripe `canceled` → `onSubscriptionCancel`
     → Email “Abonnement annulé”.
───────────────────────────────────────────────────────────────

───────────────────────────────────────────────────────────────
🗑️  SUPPRESSION DU COMPTE (RGPD)
───────────────────────────────────────────────────────────────
🧾  L’utilisateur choisit “Supprimer mon compte”
     → `user.delete.before` : suppression des abonnements & données liées.
     → `user.delete.after` : envoi d’un email “Compte supprimé”.
     → Stripe : suppression client et subscriptions associées.
───────────────────────────────────────────────────────────────

📦  Résumé rapide :
    [Inscription] → [Vérification] → [Connexion] → [Essai]
         → [Abonnement actif] → [Renouvellements]
              → [Annulation] → [Suppression du compte]

───────────────────────────────────────────────────────────────

## 🧩 Cycle complet utilisateur (Better Auth + Stripe + Prisma)

───────────────────────────────────────────────────────────────
🔐  AUTHENTIFICATION & BASE DE DONNÉES
───────────────────────────────────────────────────────────────

🧍  INSCRIPTION (Email / OAuth)
 ├─ API : `POST /api/auth/sign-up/email` ou `GET /sign-in/google`
 ├─ Hooks :
 │    • `user.create.before` → prépare les données (ajout de `role`, `createdAt`)
 │    • `user.create.after`  → envoi email de bienvenue (si OAuth)
 ├─ Prisma :
 │    • `INSERT INTO User (...)`
 │    • Si Stripe activé → `stripeCustomerId` créé (Better Auth + Stripe plugin)
 └─ Email :
      → Envoi automatique du lien de vérification (`sendVerificationEmail`)

📧  VÉRIFICATION EMAIL
 ├─ API : `GET /api/auth/verify-email?token=...`
 ├─ Hooks :
 │    • `emailVerification.afterEmailVerification`
 ├─ Prisma :
 │    • `UPDATE User SET emailVerified = true`
 └─ Email :
      → “Bienvenue sur notre plateforme 🎉”

🔑  CONNEXION
 ├─ API : `POST /api/auth/sign-in/email`
 ├─ Hooks :
 │    • `session.create` → session persistée
 ├─ Prisma :
 │    • `INSERT INTO Session (userId, expiresAt, ...)`
 └─ Sortie :
      → Cookie / JWT de session valide pour les requêtes authentifiées
───────────────────────────────────────────────────────────────


───────────────────────────────────────────────────────────────
💳  ABONNEMENT & STRIPE
───────────────────────────────────────────────────────────────

🚀  DÉBUT D’ESSAI (Free Trial)
 ├─ Stripe : `customer.subscription.created` (`status = trialing`)
 ├─ Hooks :
 │    • `onTrialStart`
 ├─ Prisma :
 │    • `INSERT INTO Subscription (userId, stripeSubscriptionId, status='trialing')`
 └─ Email :
      → “Votre essai gratuit commence 🎁”

💳  CONVERSION EN ABONNEMENT ACTIF
 ├─ Stripe : `invoice.payment_succeeded` ou `subscription.updated`
 ├─ Hooks :
 │    • `onTrialEnd` (→ passage `trialing → active`)
 │    • `onSubscriptionComplete`
 ├─ Prisma :
 │    • `UPDATE Subscription SET status='active', periodStart, periodEnd`
 └─ Email :
      → “Votre abonnement est actif ✅”

🔁  RENOUVELLEMENT AUTOMATIQUE
 ├─ Stripe : `invoice.payment_succeeded`
 ├─ Hooks :
 │    • `onEvent`
 ├─ Prisma :
 │    • `UPDATE Subscription SET periodStart = now(), periodEnd = next_month`
 └─ Email :
      → “Paiement réussi – renouvellement confirmé 💳”

⚠️  ANNULATION PROGRAMMÉE
 ├─ Stripe : `customer.subscription.updated` (`cancel_at_period_end = true`)
 ├─ Hooks :
 │    • `onSubscriptionUpdate`
 ├─ Prisma :
 │    • `UPDATE Subscription SET cancelAtPeriodEnd = true`
 └─ Email :
      → “Votre abonnement sera annulé à la fin de la période ⚠️”

❌  ANNULATION EFFECTIVE
 ├─ Stripe : `customer.subscription.deleted` (`status = canceled`)
 ├─ Hooks :
 │    • `onSubscriptionCancel`
 ├─ Prisma :
 │    • `UPDATE Subscription SET status = 'canceled'`
 │    • `UPDATE User SET stripeSubscriptionId = null`
 └─ Email :
      → “Votre abonnement est maintenant annulé ❌”

🗑️  SUPPRESSION DÉFINITIVE
 ├─ Stripe : Suppression manuelle ou cleanup
 ├─ Hooks :
 │    • `onSubscriptionDeleted`
 ├─ Prisma :
 │    • `DELETE FROM Subscription WHERE stripeSubscriptionId = ...`
 └─ Email :
      → “Votre abonnement a été supprimé 🗑️”
───────────────────────────────────────────────────────────────

───────────────────────────────────────────────────────────────
⚙️  SUPPRESSION DU COMPTE (RGPD)
───────────────────────────────────────────────────────────────

🧾  SUPPRESSION UTILISATEUR
 ├─ API : `auth.deleteUser`
 ├─ Hooks :
 │    • `user.delete.before` → nettoyage des abonnements
 │    • `user.delete.after`  → confirmation & email
 ├─ Prisma :
 │    • `DELETE FROM Subscription WHERE userId = ...`
 │    • `DELETE FROM User WHERE id = ...`
 └─ Email :
      → “Votre compte a été supprimé conformément à votre demande 📬”
───────────────────────────────────────────────────────────────

📦  SYNTHÈSE RAPIDE
───────────────────────────────────────────────────────────────
User Flow :
   [Signup] → [Email Verification] → [Login]
      → [Trial Start] → [Active Subscription]
         → [Renewals] → [Cancel Scheduled] → [Canceled]
            → [Delete Account]

Database Flow :
   User ↔ Session ↔ Subscription (1:N)
   Toutes les écritures (INSERT / UPDATE / DELETE)
   passent par Prisma via Better Auth ou le Stripe Plugin.
───────────────────────────────────────────────────────────────

