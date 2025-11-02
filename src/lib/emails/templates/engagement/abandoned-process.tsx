import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface AbandonedProcessProps extends UserEmailProps {
  processType: "signup" | "subscription" | "checkout" | "profile_completion" | "onboarding";
  abandonedAt: string;
  progress?: {
    completed: number;
    total: number;
    lastStep: string;
  };
  resumeUrl: string;
  incentive?: {
    type: "discount" | "credit" | "free_trial" | "none";
    amount?: string;
    description: string;
    expiresAt?: string;
  };
  urgency?: {
    timeLeft: string;
    reason: string;
  };
  alternativeAction?: {
    title: string;
    description: string;
    url: string;
  };
}

export default function AbandonedProcess({
  userName,
  userEmail,
  processType,
  abandonedAt,
  progress,
  resumeUrl,
  incentive,
  urgency,
  alternativeAction,
  companyName = "Votre App",
  logoUrl,
}: AbandonedProcessProps) {
  const preview = `Continuez là où vous vous êtes arrêté - ${companyName}`;

  const getProcessContent = () => {
    switch (processType) {
      case "signup":
        return {
          title: "Finalisez votre inscription",
          description: "Vous étiez à un clic de rejoindre notre communauté !",
          action: "Terminer l'inscription",
          emoji: "📝",
          benefits: [
            "Accès immédiat à votre compte",
            "Toutes les fonctionnalités incluses", 
            "Support client dédié"
          ]
        };
      case "subscription":
        return {
          title: "Votre abonnement vous attend",
          description: "Vous aviez commencé à souscrire à notre service premium.",
          action: "Finaliser l'abonnement",
          emoji: "💎",
          benefits: [
            "Fonctionnalités premium débloquées",
            "Support prioritaire",
            "Accès aux nouvelles fonctionnalités"
          ]
        };
      case "checkout":
        return {
          title: "Votre commande est en attente",
          description: "Quelques clics suffisent pour finaliser votre achat.",
          action: "Terminer la commande",
          emoji: "🛒",
          benefits: [
            "Paiement sécurisé",
            "Livraison rapide",
            "Garantie satisfaction"
          ]
        };
      case "profile_completion":
        return {
          title: "Complétez votre profil",
          description: "Un profil complet vous garantit une meilleure expérience.",
          action: "Finaliser le profil",
          emoji: "👤",
          benefits: [
            "Personnalisation de l'expérience",
            "Recommandations adaptées",
            "Fonctionnalités avancées"
          ]
        };
      case "onboarding":
        return {
          title: "Terminez votre configuration",
          description: "Vous étiez en train de configurer votre espace de travail.",
          action: "Continuer la configuration",
          emoji: "⚙️",
          benefits: [
            "Configuration optimale",
            "Gain de temps immédiat",
            "Utilisation simplifiée"
          ]
        };
      default:
        return {
          title: "Reprenez où vous vous êtes arrêté",
          description: "Vous aviez commencé quelque chose d'important.",
          action: "Continuer",
          emoji: "▶️",
          benefits: [
            "Sauvegarde de votre progression",
            "Processus simplifié",
            "Support disponible"
          ]
        };
    }
  };

  const content = getProcessContent();
  const progressPercentage = progress ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        {content.emoji} {content.title}
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default" align="center">
        {content.description}
      </EmailText>

      <EmailSpacer size="medium" />

      {progress && (
        <>
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>📊 Votre Progression</strong>
            </EmailText>
            <div className="bg-gray-200 rounded-full h-3 mb-3">
              <div 
                className="bg-blue-500 h-3 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <EmailText size="small" color="default" margin="small">
              <strong>Étapes complétées :</strong> {progress.completed}/{progress.total} ({progressPercentage}%)
            </EmailText>
            <EmailText size="small" color="default" margin="small">
              <strong>Dernière étape :</strong> {progress.lastStep}
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              <strong>Interrompu le :</strong> {abandonedAt}
            </EmailText>
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      {urgency && (
        <>
          <EmailCard variant="warning" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>⏰ Attention - Temps Limité</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="small">
              <strong>Temps restant :</strong> {urgency.timeLeft}
            </EmailText>
            <EmailText size="small" color="red" margin="none">
              <strong>Raison :</strong> {urgency.reason}
            </EmailText>
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      {incentive && incentive.type !== "none" && (
        <>
          <EmailCard variant="success" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>🎁 Offre Spéciale</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="small">
              Pour vous aider à franchir le pas : <strong>{incentive.description}</strong>
            </EmailText>
            {incentive.expiresAt && (
              <EmailText size="small" color="red" margin="none">
                <strong>⚠️ Expire le :</strong> {incentive.expiresAt}
              </EmailText>
            )}
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      <div className="text-center">
        <EmailButton 
          href={resumeUrl} 
          variant="primary" 
          size="large"
        >
          {content.action}
        </EmailButton>
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>✨ Ce qui vous attend</strong>
        </EmailText>
        {content.benefits.map((benefit, index) => (
          <EmailText key={index} size="small" color="gray" margin="small">
            ✅ {benefit}
          </EmailText>
        ))}
      </EmailCard>

      <EmailSpacer size="medium" />

      {alternativeAction && (
        <>
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>💡 {alternativeAction.title}</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              {alternativeAction.description}
            </EmailText>
          </EmailCard>
          <EmailSpacer size="small" />
          <div className="text-center">
            <EmailButton 
              href={alternativeAction.url} 
              variant="secondary" 
              size="medium"
            >
              {alternativeAction.title}
            </EmailButton>
          </div>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔒 Vos Données Sont Sécurisées</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          • Toute votre progression a été sauvegardée automatiquement
          <br />
          • Vos informations sont protégées et chiffrées
          <br />
          • Vous pouvez reprendre exactement où vous vous êtes arrêté
          <br />
          • Notre équipe support est disponible si vous avez des questions
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>❓ Besoin d'Aide ?</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Si vous rencontrez des difficultés ou avez des questions, notre équipe 
          support est là pour vous aider. Répondez simplement à cet email ou 
          contactez-nous via le chat en direct.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>⏭️ Que Se Passe-t-il Ensuite ?</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Cliquez sur le bouton ci-dessus pour reprendre exactement où vous vous 
          êtes arrêté. Le processus prendra moins de {processType === "signup" ? "2 minutes" : 
          processType === "profile_completion" ? "1 minute" : "3 minutes"} à terminer.
          <br /><br />
          Si vous ne souhaitez plus continuer, vous pouvez ignorer cet email.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Ne laissez pas vos efforts se perdre ! 💪
      </EmailText>
    </EmailLayout>
  );
};