import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface SubscriptionUpdatedProps extends UserEmailProps {
  oldPlan: {
    name: string;
    price?: string;
  };
  newPlan: {
    name: string;
    price?: string;
  };
  changeType: "upgrade" | "downgrade" | "billing_change";
  effectiveDate: string;
  nextBillingDate?: string;
  billingPeriod?: "monthly" | "yearly";
  prorationAmount?: string;
  dashboardUrl?: string;
  invoiceUrl?: string;
  changes?: string[];
}

export default function SubscriptionUpdated({
  userName,
  oldPlan,
  newPlan,
  changeType,
  effectiveDate,
  nextBillingDate,
  billingPeriod = "monthly",
  prorationAmount,
  dashboardUrl,
  invoiceUrl,
  changes = [],
  companyName = "Votre App",
}: SubscriptionUpdatedProps) {
  const preview = `Votre abonnement a été mis à jour vers ${newPlan.name}`;
  const billingText = billingPeriod === "yearly" ? "annuel" : "mensuel";
  
  const getChangeTypeText = () => {
    switch (changeType) {
      case "upgrade":
        return { icon: "⬆️", text: "Mise à Niveau", color: "success" as const };
      case "downgrade":
        return { icon: "⬇️", text: "Changement de Plan", color: "warning" as const };
      case "billing_change":
        return { icon: "🔄", text: "Modification de Facturation", color: "info" as const };
      default:
        return { icon: "📝", text: "Modification", color: "default" as const };
    }
  };

  const changeInfo = getChangeTypeText();

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        {changeInfo.icon} Abonnement Mis à Jour
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Votre abonnement {companyName} a été mis à jour avec succès ! 
        Voici un résumé des modifications apportées à votre compte.
      </EmailText>

      <EmailCard variant={changeInfo.color} padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📋 Détails de la modification</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Type :</strong> {changeInfo.text}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Ancien plan :</strong> {oldPlan.name}
          {oldPlan.price && ` (${oldPlan.price})`}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Nouveau plan :</strong> {newPlan.name}
          {newPlan.price && ` (${newPlan.price})`}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Date d&apos;effet :</strong> {effectiveDate}
        </EmailText>
      </EmailCard>

      {changes.length > 0 && (
        <>
          <EmailSpacer size="medium" />
          <EmailHeading level={3} color="default">
            🔄 Modifications Apportées
          </EmailHeading>
          <EmailCard variant="info" padding="medium">
            {changes.map((change, index) => (
              <EmailText key={index} size="small" color="default" margin="small">
                • {change}
              </EmailText>
            ))}
          </EmailCard>
        </>
      )}

      {prorationAmount && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>💰 Ajustement de Facturation</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              {prorationAmount.startsWith('-') ? (
                <>Un crédit de <strong>{prorationAmount.replace('-', '')}</strong> 
                a été appliqué à votre compte pour la période non utilisée.</>
              ) : (
                <>Un montant de <strong>{prorationAmount}</strong> 
                a été facturé pour la différence de plan.</>
              )}
            </EmailText>
          </EmailCard>
        </>
      )}

      {nextBillingDate && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📅 Prochaine Facturation</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Votre prochain paiement ({newPlan.price} {billingText}) 
              sera effectué le <strong>{nextBillingDate}</strong>.
            </EmailText>
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
              Voir mon tableau de bord
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
            Voir la facture
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>ℹ️ Informations Importantes</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          • Les modifications prennent effet immédiatement
          <br />
          • Votre accès aux nouvelles fonctionnalités est automatique
          <br />
          • Vous pouvez modifier votre plan à tout moment
          <br />
          • Notre support reste disponible pour toute question
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        {changeType === "upgrade" ? 
          "Merci de nous faire confiance pour accompagner votre croissance ! 🚀" :
          "Merci de rester avec nous ! Nous sommes là pour vous accompagner. 💙"
        }
      </EmailText>
    </EmailLayout>
  );
};