import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface TrialEndingSoonProps extends UserEmailProps {
  planName: string;
  daysRemaining: number;
  trialEndDate: string;
  fullPrice: string;
  billingPeriod?: "monthly" | "yearly";
  upgradeUrl?: string;
  cancelUrl?: string;
  featuresUsed?: string[];
  discount?: {
    percentage: number;
    validUntil: string;
  };
}

export default function TrialEndingSoon({
  userName,
  userEmail,
  planName,
  daysRemaining,
  trialEndDate,
  fullPrice,
  billingPeriod = "monthly",
  upgradeUrl,
  cancelUrl,
  featuresUsed = [],
  discount,
  companyName = "Votre App",
}: TrialEndingSoonProps) {
  const preview = `Plus que ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} d'essai gratuit`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        ⏰ Votre essai se termine bientôt
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Votre période d&apos;essai gratuite pour <strong>{planName}</strong> se termine 
        dans <strong>{daysRemaining} jour{daysRemaining > 1 ? 's' : ''}</strong>. 
        Nous espérons que vous avez apprécié découvrir toutes nos fonctionnalités !
      </EmailText>

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Fin de l&apos;essai :</strong> {trialEndDate}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Prix après l&apos;essai :</strong> {fullPrice} ({billingText})
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
      </EmailCard>

      {featuresUsed.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="green">
            🎯 Fonctionnalités que vous avez utilisées :
          </EmailHeading>
          <EmailCard variant="success" padding="medium">
            {featuresUsed.map((feature, index) => (
              <EmailText key={index} size="small" color="default" margin="small">
                ✅ {feature}
              </EmailText>
            ))}
          </EmailCard>
        </>
      )}

      {discount && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>🎉 Offre Spéciale !</strong>
            </EmailText>
            <EmailText size="small" color="blue" margin="none">
              Profitez de <strong>{discount.percentage}% de réduction</strong> 
              si vous vous abonnez avant le {discount.validUntil} !
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <div className="text-center">
        {upgradeUrl && (
          <>
            <EmailButton 
              href={upgradeUrl} 
              variant="primary" 
              size="large"
            >
              {discount ? `Continuer avec ${discount.percentage}% de réduction` : 'Continuer avec ' + planName}
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {cancelUrl && (
          <EmailButton 
            href={cancelUrl} 
            variant="secondary" 
            size="medium"
          >
            Annuler mon essai
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>❓ Questions fréquentes</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Que se passe-t-il si je ne fais rien ?</strong>
          <br />
          Votre essai se terminera automatiquement et aucun paiement ne sera effectué.
          <br /><br />
          <strong>Puis-je changer d&apos;avis plus tard ?</strong>
          <br />
          Bien sûr ! Vous pourrez vous réabonner à tout moment.
          <br /><br />
          <strong>Mes données seront-elles conservées ?</strong>
          <br />
          Vos données sont sauvegardées pendant 30 jours après la fin de l&apos;essai.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Merci d&apos;avoir testé {companyName} ! 
        <br />
        Une question ? Notre support est là pour vous aider.
      </EmailText>
    </EmailLayout>
  );
};