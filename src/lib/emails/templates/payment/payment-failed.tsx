import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface PaymentFailedProps extends UserEmailProps {
  planName: string;
  amount: string;
  failureReason?: string;
  retryUrl?: string;
  updatePaymentUrl?: string;
  nextRetryDate?: string;
  invoiceUrl?: string;
}

export default function PaymentFailed({
  userName,
  userEmail,
  planName,
  amount,
  failureReason,
  retryUrl,
  updatePaymentUrl,
  nextRetryDate,
  invoiceUrl,
  companyName = "Votre App",
  logoUrl,
}: PaymentFailedProps) {
  const preview = `Échec du paiement pour ${planName} - Action requise`;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="red">
        ⚠️ Problème de Paiement
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Nous avons rencontré un problème lors du traitement de votre paiement 
        pour votre abonnement <strong>{planName}</strong>. Votre accès reste 
        actif pour le moment, mais nous devons résoudre ce problème rapidement.
      </EmailText>

      <EmailCard variant="danger" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Plan :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Montant :</strong> {amount}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
        {failureReason && (
          <EmailText size="small" color="red" margin="none">
            <strong>Raison :</strong> {failureReason}
          </EmailText>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailHeading level={3} color="default">
        Actions possibles :
      </EmailHeading>

      <div className="text-center">
        {retryUrl && (
          <>
            <EmailButton 
              href={retryUrl} 
              variant="primary" 
              size="large"
            >
              Réessayer le paiement
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {updatePaymentUrl && (
          <>
            <EmailButton 
              href={updatePaymentUrl} 
              variant="secondary" 
              size="medium"
            >
              Mettre à jour ma carte
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}

        {invoiceUrl && (
          <EmailButton 
            href={invoiceUrl} 
            variant="secondary" 
            size="small"
          >
            Voir la facture
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔔 Important</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          {nextRetryDate ? (
            <>Nous réessaierons automatiquement le {nextRetryDate}. 
            Si le problème persiste, votre abonnement pourrait être suspendu.</>
          ) : (
            <>Si ce problème n'est pas résolu sous 7 jours, votre abonnement 
            pourrait être suspendu et vous perdrez l'accès aux fonctionnalités premium.</>
          )}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💡 Causes communes :</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          • Carte expirée ou bloquée
          <br />
          • Fonds insuffisants
          <br />
          • Problème avec votre banque
          <br />
          • Informations de facturation incorrectes
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Besoin d'aide ? Contactez notre support, nous sommes là pour vous aider.
      </EmailText>
    </EmailLayout>
  );
};