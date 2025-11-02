import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface TrialStartedProps extends UserEmailProps {
  planName: string;
  trialDays: number;
  trialEndDate: string;
  dashboardUrl?: string;
  features?: string[];
  upgradeUrl?: string;
  trialPrice?: string;
  fullPrice?: string;
}

export default function TrialStarted({
  userName,
  userEmail,
  planName,
  trialDays,
  trialEndDate,
  dashboardUrl,
  features = [],
  upgradeUrl,
  trialPrice = "Gratuit",
  fullPrice,
  companyName = "Votre App",
  logoUrl,
}: TrialStartedProps) {
  const preview = `Votre essai gratuit de ${trialDays} jours a commencé !`;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="blue">
        🚀 Essai Gratuit Activé !
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Félicitations ! Votre période d'essai gratuite de <strong>{trialDays} jours</strong> 
        pour <strong>{planName}</strong> vient de commencer. Profitez de toutes les 
        fonctionnalités premium sans aucun engagement !
      </EmailText>

      <EmailCard variant="success" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Plan d'essai :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Durée :</strong> {trialDays} jours
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Prix pendant l'essai :</strong> {trialPrice}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Fin de l'essai :</strong> {trialEndDate}
        </EmailText>
        {fullPrice && (
          <EmailText size="small" color="gray" margin="none">
            <strong>Prix après l'essai :</strong> {fullPrice}
          </EmailText>
        )}
      </EmailCard>

      {features.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="default">
            🎯 Fonctionnalités à découvrir :
          </EmailHeading>
          <EmailCard variant="info" padding="medium">
            {features.map((feature, index) => (
              <EmailText key={index} size="small" color="default" margin="small">
                ✨ {feature}
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
              Commencer l'exploration
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {upgradeUrl && (
          <EmailButton 
            href={upgradeUrl} 
            variant="secondary" 
            size="medium"
          >
            Voir les options d'abonnement
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>⏰ Important à retenir</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Votre essai se termine automatiquement le <strong>{trialEndDate}</strong>
          <br />
          • Aucun paiement ne sera effectué pendant l'essai
          <br />
          • Vous pouvez annuler à tout moment sans frais
          <br />
          • Nous vous préviendrons 3 jours avant la fin
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💡 Conseils pour profiter de votre essai</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          1. Explorez toutes les fonctionnalités premium
          <br />
          2. Testez avec vos données réelles
          <br />
          3. Contactez le support si vous avez des questions
          <br />
          4. Configurez vos préférences dès maintenant
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Profitez pleinement de votre essai gratuit ! 🌟
        <br />
        Notre équipe est là pour vous accompagner.
      </EmailText>
    </EmailLayout>
  );
};