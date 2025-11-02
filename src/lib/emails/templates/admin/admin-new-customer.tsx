import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface AdminNewCustomerProps extends UserEmailProps {
  registeredAt: string;
  planName?: string;
  planPrice?: string;
  trialDays?: number;
  referralSource?: string;
  signupMethod: "email" | "google" | "github" | "apple" | "other";
  ipAddress?: string;
  country?: string;
  isFirstPayingCustomer?: boolean;
  customerDashboardUrl?: string;
  customerSupportUrl?: string;
  subscriptionDetails?: {
    subscriptionId: string;
    billingInterval: "monthly" | "yearly";
    nextBillingDate?: string;
    amount: string;
  };
  userStats?: {
    totalCustomers: number;
    thisMonth: number;
    conversionRate?: number;
  };
}

export default function AdminNewCustomer({
  userName,
  userEmail,
  registeredAt,
  planName,
  planPrice,
  trialDays,
  referralSource,
  signupMethod,
  ipAddress,
  country,
  isFirstPayingCustomer = false,
  customerDashboardUrl,
  customerSupportUrl,
  subscriptionDetails,
  userStats,
  companyName = "Votre App",
  logoUrl,
}: AdminNewCustomerProps) {
  const preview = `Nouveau client : ${userName} - ${planName || 'Inscription gratuite'}`;

  const getSignupMethodText = () => {
    switch (signupMethod) {
      case "email":
        return "📧 Email/Mot de passe";
      case "google":
        return "🔴 Google OAuth";
      case "github":
        return "⚫ GitHub OAuth";
      case "apple":
        return "🍎 Apple ID";
      case "other":
      default:
        return "🔐 Autre méthode";
    }
  };

  const isPaidPlan = planName && planPrice;
  const isTrialUser = trialDays && trialDays > 0;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        {isFirstPayingCustomer ? "🎉" : "👋"} Nouveau Client !
      </EmailHeading>

      {isFirstPayingCustomer && (
        <>
          <EmailCard variant="success" padding="medium">
            <EmailText size="large" color="default" align="center" margin="none">
              🎊 <strong>PREMIER CLIENT PAYANT !</strong> 🎊
            </EmailText>
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>👤 Nouveau Client</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Nom :</strong> {userName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Email :</strong> {userEmail}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Inscription :</strong> {registeredAt}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Méthode :</strong> {getSignupMethodText()}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant={isPaidPlan ? "success" : isTrialUser ? "warning" : "default"} padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>
            {isPaidPlan ? "💰 Plan Payant" : isTrialUser ? "⏱️ Essai Gratuit" : "🆓 Plan Gratuit"}
          </strong>
        </EmailText>
        {planName && (
          <EmailText size="small" color="default" margin="small">
            <strong>Plan :</strong> {planName}
          </EmailText>
        )}
        {planPrice && (
          <EmailText size="small" color="default" margin="small">
            <strong>Prix :</strong> {planPrice}
          </EmailText>
        )}
        {isTrialUser && (
          <EmailText size="small" color="default" margin="small">
            <strong>Durée d'essai :</strong> {trialDays} jours
          </EmailText>
        )}
        {subscriptionDetails && (
          <>
            <EmailText size="small" color="gray" margin="small">
              <strong>ID Abonnement :</strong> {subscriptionDetails.subscriptionId}
            </EmailText>
            <EmailText size="small" color="gray" margin="small">
              <strong>Facturation :</strong> {subscriptionDetails.billingInterval === "monthly" ? "Mensuelle" : "Annuelle"}
            </EmailText>
            {subscriptionDetails.nextBillingDate && (
              <EmailText size="small" color="gray" margin="none">
                <strong>Prochaine facture :</strong> {subscriptionDetails.nextBillingDate}
              </EmailText>
            )}
          </>
        )}
      </EmailCard>

      {(referralSource || ipAddress || country) && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="default" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📊 Informations d'Acquisition</strong>
            </EmailText>
            {referralSource && (
              <EmailText size="small" color="gray" margin="small">
                <strong>Source :</strong> {referralSource}
              </EmailText>
            )}
            {country && (
              <EmailText size="small" color="gray" margin="small">
                <strong>Pays :</strong> {country}
              </EmailText>
            )}
            {ipAddress && (
              <EmailText size="small" color="gray" margin="none">
                <strong>IP :</strong> {ipAddress}
              </EmailText>
            )}
          </EmailCard>
        </>
      )}

      {userStats && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📈 Statistiques</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="small">
              <strong>Total clients :</strong> {userStats.totalCustomers}
            </EmailText>
            <EmailText size="small" color="default" margin="small">
              <strong>Ce mois :</strong> {userStats.thisMonth}
            </EmailText>
            {userStats.conversionRate && (
              <EmailText size="small" color="gray" margin="none">
                <strong>Taux de conversion :</strong> {userStats.conversionRate}%
              </EmailText>
            )}
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <div className="text-center">
        {customerDashboardUrl && (
          <>
            <EmailButton 
              href={customerDashboardUrl} 
              variant="primary" 
              size="large"
            >
              Voir le Profil Client
            </EmailButton>
            <EmailSpacer size="small" />
          </>
        )}
        
        {customerSupportUrl && (
          <EmailButton 
            href={customerSupportUrl} 
            variant="secondary" 
            size="medium"
          >
            Contacter le Client
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🎯 Actions Recommandées</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          {isPaidPlan && "• Envoyer un email de bienvenue personnalisé"}
          {isTrialUser && "• Programmer un suivi pour encourager la conversion"}
          {!isPaidPlan && !isTrialUser && "• Proposer un essai ou une offre spéciale"}
          <br />
          • Ajouter aux segments de marketing appropriés
          <br />
          • Vérifier la configuration du compte client
          <br />
          • Programmer un onboarding personnalisé
          {isFirstPayingCustomer && (
            <>
              <br />
              • 🎉 <strong>Célébrer le premier client payant avec l'équipe !</strong>
            </>
          )}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📝 Notes Importantes</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          • Ce client vient de s'inscrire et mérite une attention particulière
          <br />
          • Surveiller son engagement dans les premiers jours
          <br />
          • Répondre rapidement à ses éventuelles questions
          <br />
          • Analyser son parcours pour optimiser l'expérience d'autres clients
          {isPaidPlan && (
            <>
              <br />
              • ⚠️ Client payant - priorité élevée pour le support
            </>
          )}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Notification automatique de nouveau client - {companyName}
      </EmailText>
    </EmailLayout>
  );
};