import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface TrialExpiredProps extends UserEmailProps {
  planName: string;
  expiredDate: string;
  fullPrice: string;
  billingPeriod?: "monthly" | "yearly";
  reactivateUrl?: string;
  specialOffer?: {
    discount: number;
    validUntil: string;
    code?: string;
  };
  dataRetentionDays?: number;
}

export const TrialExpired = ({
  userName,
  planName,
  expiredDate,
  fullPrice,
  billingPeriod = "monthly",
  reactivateUrl,
  specialOffer,
  dataRetentionDays = 30,
  companyName = "Votre App",
  ...props
}: TrialExpiredProps) => {
  const preview = `Votre essai ${planName} a expiré - Offre spéciale à l&apos;intérieur`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        📋 Votre Période d&apos;Essai a Expiré
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Votre période d&apos;essai gratuite pour <strong>{planName}</strong> a expiré 
        le {expiredDate}. Bien que vous n&apos;ayez plus accès aux fonctionnalités premium, 
        vos données restent en sécurité et nous espérons vous revoir bientôt !
      </EmailText>

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📋 Statut de votre compte</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan :</strong> {planName} (expiré)
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Date d&apos;expiration :</strong> {expiredDate}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Données conservées jusqu&apos;au :</strong> {dataRetentionDays} jours après expiration
        </EmailText>
      </EmailCard>

      {specialOffer && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>🎁 Offre Spéciale de Retour !</strong>
            </EmailText>
            <EmailText size="small" color="green" margin="small">
              Profitez de <strong>{specialOffer.discount}% de réduction</strong> 
              sur votre premier mois si vous vous réabonnez avant le {specialOffer.validUntil} !
            </EmailText>
            {specialOffer.code && (
              <EmailText size="small" color="blue" margin="none">
                <strong>Code promo :</strong> {specialOffer.code}
              </EmailText>
            )}
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💾 Ce qui se passe maintenant</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Accès aux fonctionnalités premium suspendu
          <br />
          • Vos données sont sauvegardées pendant {dataRetentionDays} jours
          <br />
          • Vous pouvez réactiver votre compte à tout moment
          <br />
          • Aucun paiement ne sera effectué automatiquement
          <br />
          • Support disponible pour toute question
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <div className="text-center">
        {reactivateUrl && (
          <>
            <EmailButton 
              href={reactivateUrl} 
              variant="primary" 
              size="large"
            >
              {specialOffer ? `Réactiver avec ${specialOffer.discount}% de réduction` : "Réactiver mon compte"}
            </EmailButton>
            <EmailSpacer size="small" />
            <EmailText size="small" color="gray" align="center">
              Prix normal : {fullPrice} ({billingText})
            </EmailText>
          </>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>❓ Questions Fréquentes</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Puis-je récupérer mes données ?</strong>
          <br />
          Oui, vos données sont conservées et seront restaurées dès votre réabonnement.
          <br /><br />
          <strong>Y a-t-il des frais pour réactiver ?</strong>
          <br />
          Non, aucun frais supplémentaire. Vous payez simplement votre abonnement.
          <br /><br />
          <strong>Que se passe-t-il après {dataRetentionDays} jours ?</strong>
          <br />
          Vos données seront supprimées définitivement pour respecter votre vie privée.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Nous espérons vous revoir bientôt chez {companyName} ! 💙
        <br />
        Votre compte nous manque déjà.
      </EmailText>
    </EmailLayout>
  );
};