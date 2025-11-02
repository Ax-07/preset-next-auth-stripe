import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface AccountDeletedProps extends UserEmailProps {
  deletedDate: string;
  reason?: "user_request" | "admin_action" | "gdpr_request" | "inactivity";
  deletionReference?: string;
  dataExportUrl?: string;
  dataRetentionDays?: number;
  reactivateDeadline?: string;
  reactivateUrl?: string;
  hadActiveSubscription?: boolean;
  refundInfo?: {
    amount: string;
    processingDays: number;
  };
}

export const AccountDeleted = ({
  userName,
  userEmail,
  deletedDate,
  reason = "user_request",
  deletionReference,
  dataExportUrl,
  dataRetentionDays = 30,
  reactivateDeadline,
  reactivateUrl,
  hadActiveSubscription = false,
  refundInfo,
  companyName = "Votre App",
}: AccountDeletedProps) => {
  const preview = `Votre compte ${companyName} a été supprimé définitivement`;

  const getReasonText = () => {
    switch (reason) {
      case "user_request":
        return "Comme demandé";
      case "admin_action":
        return "Suite à une décision administrative";
      case "gdpr_request":
        return "Suite à votre demande RGPD";
      case "inactivity":
        return "Pour cause d&apos;inactivité prolongée";
      default:
        return "";
    }
  };

  const canReactivate = reason === "user_request" && reactivateUrl && reactivateDeadline;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        🗑️ Compte Supprimé Définitivement
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Au revoir <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        {getReasonText()}, votre compte {companyName} a été supprimé définitivement 
        de nos systèmes le <strong>{deletedDate}</strong>.
      </EmailText>

      <EmailCard variant="danger" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔴 Suppression Confirmée</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Date :</strong> {deletedDate}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Motif :</strong> {getReasonText()}
        </EmailText>
        {deletionReference && (
          <EmailText size="small" color="gray" margin="none">
            <strong>Référence :</strong> {deletionReference}
          </EmailText>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📋 Que s&apos;est-il passé ?</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Votre compte utilisateur a été définitivement supprimé
          <br />
          • Toutes vos données personnelles ont été effacées
          <br />
          • Votre historique d&apos;activité n&apos;est plus accessible
          <br />
          {hadActiveSubscription && "• Votre abonnement actif a été résilié"}
          <br />
          • Cette adresse email ne peut plus être utilisée pour se connecter
        </EmailText>
      </EmailCard>

      {hadActiveSubscription && refundInfo && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>💰 Remboursement</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Suite à la suppression de votre compte avec abonnement actif, 
              un remboursement prorata de <strong>{refundInfo.amount}</strong> 
              sera traité et apparaîtra sur votre compte sous {refundInfo.processingDays} jours ouvrés.
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      {dataExportUrl && (
        <>
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📦 Export de Données (Urgent)</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Vous avez encore <strong>{dataRetentionDays} jours</strong> pour télécharger 
              une copie de vos données avant leur suppression définitive de nos sauvegardes.
            </EmailText>
          </EmailCard>
          <EmailSpacer size="small" />
          <div className="text-center">
            <EmailButton 
              href={dataExportUrl} 
              variant="primary" 
              size="large"
            >
              Télécharger mes données
            </EmailButton>
            <EmailSpacer size="small" />
            <EmailText size="small" color="red" align="center">
              ⚠️ Lien valide jusqu&apos;au {new Date(Date.now() + dataRetentionDays * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR")}
            </EmailText>
          </div>
          <EmailSpacer size="medium" />
        </>
      )}

      {canReactivate && (
        <>
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>🔄 Possibilité de Réactivation</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Vous avez changé d&apos;avis ? Vous pouvez encore réactiver votre compte 
              jusqu&apos;au <strong>{reactivateDeadline}</strong>. Après cette date, 
              la suppression sera définitive.
            </EmailText>
          </EmailCard>
          <EmailSpacer size="small" />
          <div className="text-center">
            <EmailButton 
              href={reactivateUrl} 
              variant="secondary" 
              size="large"
            >
              Réactiver mon compte
            </EmailButton>
            <EmailSpacer size="small" />
            <EmailText size="small" color="green" align="center">
              ✅ Réactivation possible jusqu&apos;au {reactivateDeadline}
            </EmailText>
          </div>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📞 Support & Questions</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Si vous avez des questions sur cette suppression ou si vous pensez 
          qu&apos;il s&apos;agit d&apos;une erreur :
          <br />
          • Contactez immédiatement notre support
          <br />
          • Mentionnez la référence : {deletionReference || userEmail}
          <br />
          • Nous examinerons votre demande en priorité
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🙏 Merci</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Merci d&apos;avoir fait partie de la communauté {companyName}. 
          Nous sommes tristes de vous voir partir et nous gardons un excellent 
          souvenir du temps que vous avez passé avec nous.
          <br /><br />
          Si vous souhaitez revenir un jour, nous serons ravis de vous accueillir 
          à nouveau avec un nouveau compte.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Au revoir et bonne continuation dans vos projets ! 👋
      </EmailText>

      {reason === "gdpr_request" && (
        <>
          <EmailSpacer size="small" />
          <EmailText size="small" color="light" align="center">
            Conformément au RGPD, toutes vos données personnelles ont été supprimées.
          </EmailText>
        </>
      )}
    </EmailLayout>
  );
};