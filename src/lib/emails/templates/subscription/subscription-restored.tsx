import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface SubscriptionRestoredProps extends UserEmailProps {
  planName: string;
  restoredDate: string;
  nextBillingDate: string;
  nextBillingAmount: string;
  billingPeriod?: "monthly" | "yearly";
  wasDowngraded?: boolean;
  previousCancellationDate?: string;
  dashboardUrl?: string;
  billingUrl?: string;
  supportUrl?: string;
  features?: string[];
}

export default function SubscriptionRestored({
  userName,
  userEmail,
  planName,
  restoredDate,
  nextBillingDate,
  nextBillingAmount,
  billingPeriod = "monthly",
  wasDowngraded = false,
  previousCancellationDate,
  dashboardUrl,
  billingUrl,
  supportUrl,
  features = [],
  companyName = "Votre App",
}: SubscriptionRestoredProps) {
  const preview = `Votre abonnement ${planName} a été restauré avec succès`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="green">
        🎉 Abonnement Restauré !
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bon retour parmi nous, <strong>{userName}</strong> !
      </EmailText>

      <EmailText color="default">
        Excellente nouvelle ! Votre abonnement <strong>{planName}</strong> a été 
        restauré avec succès. Nous sommes ravis de vous retrouver !
      </EmailText>

      <EmailCard variant="success" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>✅ Détails de la restauration</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan restauré :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Date de restauration :</strong> {restoredDate}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Prochain prélèvement :</strong> {nextBillingDate}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Montant :</strong> {nextBillingAmount} ({billingText})
        </EmailText>
      </EmailCard>

      {previousCancellationDate && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📅 Historique</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              Votre abonnement avait été annulé le <strong>{previousCancellationDate}</strong>.
              <br />
              Toutes vos données et paramètres ont été conservés et sont maintenant à nouveau disponibles.
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🚀 Que se passe-t-il maintenant ?</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Vous avez immédiatement accès à toutes les fonctionnalités {planName}
          <br />
          • Votre facturation {billingText}e reprend le {nextBillingDate}
          <br />
          • Toutes vos données et paramètres sont intacts
          <br />
          • Vous pouvez gérer votre abonnement à tout moment
          {wasDowngraded && (
            <>
              <br />
              • Certaines fonctionnalités premium ont pu être ajustées selon votre nouveau plan
            </>
          )}
        </EmailText>
      </EmailCard>

      {features.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="default">
            🌟 Fonctionnalités à nouveau disponibles
          </EmailHeading>
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="none">
              {features.map((feature, index) => (
                `• ${feature}${index < features.length - 1 ? '\n' : ''}`
              )).join('')}
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <div className="text-center">
        {dashboardUrl && (
          <>
            <EmailButton 
              href={dashboardUrl} 
              variant="primary" 
              size="large"
            >
              Accéder à mon tableau de bord
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {billingUrl && (
          <>
            <EmailButton 
              href={billingUrl} 
              variant="secondary" 
              size="medium"
            >
              Gérer ma facturation
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}

        {supportUrl && (
          <EmailButton 
            href={supportUrl} 
            variant="secondary" 
            size="small"
          >
            Contacter le support
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💡 Rappel important</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Votre prochain prélèvement aura lieu le <strong>{nextBillingDate}</strong> 
          pour un montant de <strong>{nextBillingAmount}</strong>.
          <br /><br />
          Vous pouvez modifier ou annuler votre abonnement à tout moment depuis 
          votre espace de gestion de la facturation.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🙏 Merci de votre confiance</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Nous sommes heureux de vous accueillir à nouveau dans {companyName}. 
          Votre soutien nous aide à continuer d&apos;améliorer nos services.
          <br /><br />
          Si vous avez des questions ou besoin d&apos;aide pour reprendre vos habitudes, 
          notre équipe support est là pour vous accompagner.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Bon retour parmi nous ! Nous sommes ravis de vous retrouver 🎉
        <br />
        L&apos;équipe {companyName}
      </EmailText>
    </EmailLayout>
  );
};