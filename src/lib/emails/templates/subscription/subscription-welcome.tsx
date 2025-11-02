import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  SubscriptionEmailProps,
} from "../components";

interface SubscriptionWelcomeProps extends SubscriptionEmailProps {
  dashboardUrl?: string;
  billingUrl?: string;
  nextBillingAmount?: string;
  features?: string[];
}

export default function SubscriptionWelcome({
  userName,
  userEmail,
  planName,
  planPrice,
  billingPeriod = "monthly",
  nextBillingDate,
  nextBillingAmount,
  dashboardUrl,
  billingUrl,
  features = [],
  companyName = "Votre App",
}: SubscriptionWelcomeProps) {
  const preview = `Bienvenue dans ${planName} ! Votre abonnement est maintenant actif.`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        🎉 Bienvenue dans {planName} !
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Félicitations ! Votre abonnement <strong>{planName}</strong> est maintenant actif. 
        Vous avez désormais accès à toutes les fonctionnalités premium de {companyName}.
      </EmailText>

      <EmailCard variant="success" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Plan :</strong> {planName}
        </EmailText>
        {planPrice && (
          <EmailText size="small" color="default" margin="small">
            <strong>Prix :</strong> {planPrice} ({billingText})
          </EmailText>
        )}
        <EmailText size="small" color="default" margin="small">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
        {nextBillingDate && (
          <EmailText size="small" color="gray" margin="none">
            <strong>Prochain prélèvement :</strong> {nextBillingDate}
            {nextBillingAmount && ` - ${nextBillingAmount}`}
          </EmailText>
        )}
      </EmailCard>

      {features.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="default">
            Vos nouvelles fonctionnalités :
          </EmailHeading>
          <EmailCard variant="info" padding="medium">
            {features.map((feature, index) => (
              <EmailText key={index} size="small" color="default" margin="small">
                ✅ {feature}
              </EmailText>
            ))}
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
              Accéder au tableau de bord
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {billingUrl && (
          <EmailButton 
            href={billingUrl} 
            variant="secondary" 
            size="medium"
          >
            Gérer mon abonnement
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🤝 Besoin d&apos;aide ?</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Notre équipe support est là pour vous accompagner. N&apos;hésitez pas à nous contacter 
          si vous avez des questions sur votre abonnement ou nos fonctionnalités.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Vous recevez cet email car vous venez de souscrire à {planName}.
        <br />
        Merci de votre confiance ! 🚀
      </EmailText>
    </EmailLayout>
  );
};