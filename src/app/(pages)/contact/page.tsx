'use client';

import { useState, FormEvent } from 'react';
import { useCSRF, withCSRFToken } from '@/lib/csrf/use-csrf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { csrfToken, isLoading: csrfLoading } = useCSRF();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!csrfToken) {
      toast.error('Token CSRF manquant. Veuillez recharger la page.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: withCSRFToken(csrfToken, {
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Message envoyé avec succès !');
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error(data.message || 'Erreur lors de l\'envoi du message');
        if (data.details) {
          console.error('Détails de l\'erreur:', data.details);
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (csrfLoading) {
    return (
      <div className="container mx-auto max-w-2xl py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Chargement...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Contactez-nous</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour nous envoyer un message.
            Nous vous répondrons dans les plus brefs délais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Nom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Sujet */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                Sujet <span className="text-destructive">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Sujet de votre message"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Votre message..."
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows={6}
              />
            </div>

            {/* Bouton d'envoi */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !csrfToken}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </Button>

            {/* Indicateur de protection CSRF */}
            {csrfToken && (
              <p className="text-xs text-muted-foreground text-center">
                🛡️ Ce formulaire est protégé contre les attaques CSRF
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
