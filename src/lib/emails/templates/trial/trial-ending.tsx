import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface TrialEndingProps extends UserEmailProps {
  planName: string;
  trialEndDate: string;
  fullPrice: string;
  billingPeriod?: "monthly" | "yearly";
  upgradeUrl?: string;
  featuresUsed?: string[];
  usageStats?: {
    label: string;
    value: string;
  }[];
}

export const TrialEnding = ({
  userName,
  planName,
  trialEndDate,
  fullPrice,
  billingPeriod = "monthly",
  upgradeUrl,
  featuresUsed = [],
  usageStats = [],
  companyName = "Votre App",
}: TrialEndingProps) => {
  const preview = `Votre période d'essai ${planName} se termine aujourd'hui`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        ⏰ Fin de Votre Période d&apos;Essai
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Votre période d&apos;essai gratuite de <strong>{planName}</strong> se termine 
        aujourd&apos;hui ({trialEndDate}). Nous espérons que vous avez eu l&apos;occasion 
        de découvrir tout le potentiel de nos fonctionnalités !
      </EmailText>

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📊 Votre expérience d&apos;essai</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan testé :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Fin de l&apos;essai :</strong> {trialEndDate}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Prix pour continuer :</strong> {fullPrice} ({billingText})
        </EmailText>
      </EmailCard>

      {usageStats.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="default">
            📈 Votre Utilisation
          </EmailHeading>
          <EmailCard variant="success" padding="medium">
            {usageStats.map((stat, index) => (
              <EmailText key={index} size="small" color="default" margin="small">
                <strong>{stat.label} :</strong> {stat.value}
              </EmailText>
            ))}
          </EmailCard>
        </>
      )}

      {featuresUsed.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="green">
            ✨ Fonctionnalités Découvertes
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

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔄 Que se passe-t-il maintenant ?</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Votre accès aux fonctionnalités premium sera suspendu
          <br />
          • Vos données sont conservées pendant 30 jours
          <br />
          • Vous pouvez vous abonner à tout moment pour retrouver l&apos;accès
          <br />
          • Aucun paiement automatique ne sera effectué
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <div className="text-center">
        {upgradeUrl && (
          <EmailButton 
            href={upgradeUrl} 
            variant="primary" 
            size="large"
          >
            Continuer avec {planName}
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💝 Merci pour votre confiance !</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Nous espérons que cette période d&apos;essai vous a permis de découvrir 
          la valeur de {companyName}. Si vous décidez de continuer l&apos;aventure 
          avec nous, nous serons ravis de vous accompagner !
          <br /><br />
          Des questions ? Notre équipe support reste disponible pour vous aider.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Merci d&apos;avoir testé {companyName} ! 🙏
        <br />
        Vous pouvez vous réabonner à tout moment.
      </EmailText>
    </EmailLayout>
  );
};