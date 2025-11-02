import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface InvoicePaidProps extends UserEmailProps {
  invoiceNumber: string;
  paidAmount: string;
  planName: string;
  paymentDate?: string;
  paymentMethod?: string;
  billingPeriod?: "monthly" | "yearly";
  nextBillingDate?: string;
  invoiceUrl?: string;
  receiptUrl?: string;
}

export default function InvoicePaid({
  userName,
  userEmail,
  invoiceNumber,
  paidAmount,
  planName,
  paymentDate,
  paymentMethod,
  billingPeriod = "monthly",
  nextBillingDate,
  invoiceUrl,
  receiptUrl,
  companyName = "Votre App",
  logoUrl,
}: InvoicePaidProps) {
  const preview = `Paiement confirmé - Facture ${invoiceNumber}`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="green">
        ✅ Paiement Confirmé
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Votre paiement a été traité avec succès ! Merci pour votre confiance 
        et votre fidélité à <strong>{companyName}</strong>.
      </EmailText>

      <EmailCard variant="success" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Facture :</strong> #{invoiceNumber}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Montant payé :</strong> {paidAmount}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan :</strong> {planName} ({billingText})
        </EmailText>
        {paymentDate && (
          <EmailText size="small" color="default" margin="small">
            <strong>Date de paiement :</strong> {paymentDate}
          </EmailText>
        )}
        {paymentMethod && (
          <EmailText size="small" color="gray" margin="none">
            <strong>Méthode :</strong> {paymentMethod}
          </EmailText>
        )}
      </EmailCard>

      {nextBillingDate && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📅 Prochain prélèvement</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              Votre prochain paiement sera effectué le <strong>{nextBillingDate}</strong>.
              <br />
              Vous recevrez un rappel par email 3 jours avant.
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <div className="text-center">
        {receiptUrl && (
          <>
            <EmailButton 
              href={receiptUrl} 
              variant="primary" 
              size="large"
            >
              Télécharger le reçu
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {invoiceUrl && (
          <EmailButton 
            href={invoiceUrl} 
            variant="secondary" 
            size="medium"
          >
            Voir la facture détaillée
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📋 Détails de facturation</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          • Votre abonnement reste actif
          <br />
          • Accès complet à toutes les fonctionnalités
          <br />
          • Support prioritaire inclus
          <br />
          • Reçu disponible pour vos déclarations
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Conservez ce reçu pour vos archives comptables.
        <br />
        Merci de faire confiance à {companyName} ! 💙
      </EmailText>
    </EmailLayout>
  );
};