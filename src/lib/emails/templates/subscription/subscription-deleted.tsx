import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface SubscriptionDeletedProps extends UserEmailProps {
  planName: string;
  deletedDate: string;
  reason?: "payment_failed" | "cancelled_by_user" | "admin_action" | "other";
  lastPaymentDate?: string;
  dataRetentionDate?: string;
  reactivateUrl?: string;
  exportDataUrl?: string;
  refundInfo?: {
    amount: string;
    processingDays: number;
  };
}

export const SubscriptionDeleted = ({
  userName,
  userEmail,
  planName,
  deletedDate,
  reason = "other",
  lastPaymentDate,
  dataRetentionDate,
  reactivateUrl,
  exportDataUrl,
  refundInfo,
  companyName = "Votre App",
  logoUrl,
}: SubscriptionDeletedProps) => {
  const preview = `Votre abonnement ${planName} a été supprimé définitivement`;

  const getReasonText = () => {
    switch (reason) {
      case "payment_failed":
        return "suite à des problèmes de paiement répétés";
      case "cancelled_by_user":
        return "comme demandé";
      case "admin_action":
        return "par notre équipe administrative";
      default:
        return "";
    }
  };

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        📋 Abonnement Supprimé Définitivement
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Nous vous confirmons que votre abonnement <strong>{planName}</strong> a été 
        supprimé définitivement de nos systèmes le {deletedDate}
        {getReasonText() && ` ${getReasonText()}`}.
      </EmailText>

      <EmailCard variant="danger" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📋 Détails de la suppression</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan supprimé :</strong> {planName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Date de suppression :</strong> {deletedDate}
        </EmailText>
        {lastPaymentDate && (
          <EmailText size="small" color="default" margin="small">
            <strong>Dernier paiement :</strong> {lastPaymentDate}
          </EmailText>
        )}
        <EmailText size="small" color="gray" margin="none">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
      </EmailCard>

      {refundInfo && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>💰 Remboursement</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Un remboursement de <strong>{refundInfo.amount}</strong> sera traité 
              et apparaîtra sur votre compte sous {refundInfo.processingDays} jours ouvrés.
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>⚠️ Actions Importantes</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Votre accès aux fonctionnalités premium est définitivement coupé
          <br />
          • Vos données seront supprimées {dataRetentionDate ? `le ${dataRetentionDate}` : 'dans 7 jours'}
          <br />
          • Cette action ne peut pas être annulée automatiquement
          <br />
          • Pour vous réabonner, vous devrez créer un nouveau compte
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
              Exporter mes données (urgent)
            </EmailButton>
            <EmailSpacer size="small" />
            <EmailText size="small" color="red" align="center">
              ⚠️ Lien d'export valide uniquement jusqu'au {dataRetentionDate}
            </EmailText>
            <EmailSpacer size="small" />
          </>
        )}
        
        {reactivateUrl && (
          <EmailButton 
            href={reactivateUrl} 
            variant="secondary" 
            size="medium"
          >
            Créer un nouveau compte
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📞 Besoin d'Aide ?</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Si cette suppression vous semble incorrecte ou si vous avez des questions :
          <br />
          • Contactez immédiatement notre support
          <br />
          • Mentionnez ce numéro de référence : {userEmail}-{deletedDate}
          <br />
          • Nous examinerons votre cas en priorité
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🙏 Merci</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Merci d'avoir utilisé {companyName}. Bien que cette suppression marque 
          la fin de notre collaboration, nous gardons un excellent souvenir 
          du temps passé ensemble.
          <br /><br />
          Nous serions ravis de vous accueillir à nouveau si vous souhaitez 
          revenir dans le futur.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Au revoir et bonne continuation ! 👋
      </EmailText>
    </EmailLayout>
  );
};