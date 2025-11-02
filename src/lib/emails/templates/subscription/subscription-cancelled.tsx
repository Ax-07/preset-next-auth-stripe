import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface SubscriptionCancelledProps extends UserEmailProps {
  planName: string;
  cancelledDate: string;
  accessEndDate: string;
  refundAmount?: string;
  refundDate?: string;
  reason?: string;
  reactivateUrl?: string;
  exportDataUrl?: string;
  feedbackUrl?: string;
}

export default function SubscriptionCancelled({
  userName,
  userEmail,
  planName,
  cancelledDate,
  accessEndDate,
  refundAmount,
  refundDate,
  reason,
  reactivateUrl,
  exportDataUrl,
  feedbackUrl,
  companyName = "Votre App",
}: SubscriptionCancelledProps) {
  const preview = `Votre abonnement ${planName} a été annulé`;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        📋 Abonnement Annulé
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Nous confirmons que votre abonnement <strong>{planName}</strong> a été 
        annulé comme demandé. Nous sommes désolés de vous voir partir.
      </EmailText>

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Plan annulé :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Date d&apos;annulation :</strong> {cancelledDate}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Accès jusqu&apos;au :</strong> {accessEndDate}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
      </EmailCard>

      {refundAmount && refundDate && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>💰 Remboursement</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Un remboursement de <strong>{refundAmount}</strong> sera traité 
              et apparaîtra sur votre compte sous 5-10 jours ouvrés.
              <br />
              Date de traitement : {refundDate}
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔄 Que se passe-t-il maintenant ?</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Vous gardez l&apos;accès complet jusqu&apos;au <strong>{accessEndDate}</strong>
          <br />
          • Aucun prélèvement automatique ne sera effectué
          <br />
          • Vos données sont conservées pendant 30 jours
          <br />
          • Vous pouvez vous réabonner à tout moment
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <div className="text-center">
        {exportDataUrl && (
          <>
            <EmailButton 
              href={exportDataUrl} 
              variant="primary" 
              size="large"
            >
              Exporter mes données
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {reactivateUrl && (
          <>
            <EmailButton 
              href={reactivateUrl} 
              variant="secondary" 
              size="medium"
            >
              Réactiver mon abonnement
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}

        {feedbackUrl && (
          <EmailButton 
            href={feedbackUrl} 
            variant="secondary" 
            size="small"
          >
            Donner mon avis
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      {reason && (
        <>
          <EmailCard variant="default" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📝 Raison de l&apos;annulation</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              {reason}
            </EmailText>
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💬 Vous nous manquerez !</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Merci d&apos;avoir fait confiance à {companyName}. Nous espérons vous revoir bientôt !
          <br /><br />
          Si vous avez des questions ou si nous pouvons faire quelque chose pour 
          améliorer votre expérience, n&apos;hésitez pas à nous contacter.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Votre avis nous importe. Merci pour le temps passé avec nous ! 🙏
      </EmailText>
    </EmailLayout>
  );
};