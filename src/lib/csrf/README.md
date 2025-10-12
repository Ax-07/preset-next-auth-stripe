# 🛡️ Bibliothèque CSRF

Cette bibliothèque fournit une protection CSRF (Cross-Site Request Forgery) pour les formulaires personnalisés de l'application.

## 📁 Fichiers

- **`csrf.ts`** - Logique serveur (génération, validation des tokens)
- **`use-csrf.ts`** - Hook React pour le côté client

## 🚀 Utilisation Rapide

### Côté Client (Composant React)

```typescript
'use client';

import { useCSRF, withCSRFToken } from '@/lib/csrf/use-csrf';

export default function MonFormulaire() {
  const { csrfToken, isLoading } = useCSRF();

  const handleSubmit = async (data) => {
    const response = await fetch('/api/mon-endpoint', {
      method: 'POST',
      headers: withCSRFToken(csrfToken, {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    });
  };

  if (isLoading) return <div>Chargement...</div>;

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

### Côté Serveur (Route API)

```typescript
import { validateCSRFToken } from '@/lib/csrf/csrf';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Valider le token CSRF
  const csrfValidation = validateCSRFToken(req);
  
  if (!csrfValidation.isValid) {
    return NextResponse.json(
      { error: csrfValidation.error },
      { status: 403 }
    );
  }

  // Traiter la requête sécurisée
  // ...
}
```

## 🔐 Comment ça fonctionne ?

1. **Génération** : Le serveur génère un token aléatoire (`crypto.randomBytes(32)`)
2. **Stockage** : Le token est stocké dans un cookie httpOnly sécurisé
3. **Envoi** : Le client envoie le token dans le header `X-CSRF-Token`
4. **Validation** : Le serveur compare les deux tokens avec `crypto.timingSafeEqual()`

## 📚 Documentation Complète

Consultez le [Guide Protection CSRF](../../docs/guide-csrf-protection.md) pour une documentation complète.

## ✅ Sécurité

- ✅ Cookies httpOnly (inaccessibles depuis JavaScript)
- ✅ SameSite=Strict (protection CSRF supplémentaire)
- ✅ Validation cryptographique sécurisée
- ✅ Tokens à usage unique
- ✅ Expiration automatique (24h)

## 🎯 Quand utiliser ?

**✅ Utiliser pour :**

- Formulaires de contact
- Formulaires de newsletter
- Routes API publiques avec actions sensibles

**❌ Pas nécessaire pour :**

- Routes Better-Auth (déjà protégées)
- Requêtes GET sans side-effects
- Routes protégées par authentification Better-Auth

## 🔗 Routes Associées

- `GET /api/csrf-token` - Génère et retourne un token CSRF
- `POST /api/contact` - Exemple de route protégée

## 💡 Exemple Complet

Voir le formulaire de contact : `src/app/(pages)/contact/page.tsx`
