import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface FeedbackRequestProps extends UserEmailProps {
  timeSinceSignup: string;
  userActivity?: {
    loginCount: number;
    featuresUsed: string[];
    lastActiveDate: string;
  };
  feedbackType: "onboarding" | "feature_usage" | "satisfaction" | "churn_prevention" | "general";
  surveyUrl?: string;
  incentive?: {
    type: "discount" | "credit" | "gift" | "none";
    amount?: string;
    description: string;
  };
  specificQuestions?: string[];
  estimatedTime?: number; // minutes
  testimonialRequest?: boolean;
  productRoadmapUrl?: string;
}

export default function FeedbackRequest({
  userName,
  timeSinceSignup,
  userActivity,
  feedbackType,
  surveyUrl,
  incentive,
  specificQuestions,
  estimatedTime = 3,
  testimonialRequest = false,
  productRoadmapUrl,
  companyName = "Votre App",
}: FeedbackRequestProps) {
  const preview = `Votre avis nous intéresse ! Partagez votre expérience avec ${companyName}`;

  const getFeedbackTypeContent = () => {
    switch (feedbackType) {
      case "onboarding":
        return {
          title: "Comment s'est passée votre prise en main ?",
          description: "Vous utilisez notre plateforme depuis quelques jours maintenant. Nous aimerions savoir comment s'est déroulée votre découverte de nos fonctionnalités.",
          emoji: "🚀"
        };
      case "feature_usage":
        return {
          title: "Que pensez-vous de nos fonctionnalités ?",
          description: "Votre utilisation active de notre plateforme nous montre votre engagement. Aidez-nous à comprendre ce qui fonctionne bien et ce qui pourrait être amélioré.",
          emoji: "⚡"
        };
      case "satisfaction":
        return {
          title: "Êtes-vous satisfait de votre expérience ?",
          description: "Votre satisfaction est notre priorité. Dites-nous ce que vous pensez de notre service et comment nous pouvons mieux vous servir.",
          emoji: "😊"
        };
      case "churn_prevention":
        return {
          title: "Nous avons remarqué votre absence...",
          description: "Vous semblez moins actif récemment. Aidez-nous à comprendre s'il y a quelque chose que nous pouvons améliorer pour mieux répondre à vos besoins.",
          emoji: "💭"
        };
      case "general":
      default:
        return {
          title: "Votre avis compte pour nous !",
          description: "En tant qu'utilisateur fidèle, votre retour est précieux pour nous aider à améliorer constamment notre service.",
          emoji: "💬"
        };
    }
  };

  const content = getFeedbackTypeContent();

  const getIncentiveText = () => {
    if (!incentive || incentive.type === "none") return null;
    
    const icons = {
      discount: "💰",
      credit: "💳", 
      gift: "🎁"
    };

    return `${icons[incentive.type]} ${incentive.description}`;
  };

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

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📊 Votre Activité</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Membre depuis :</strong> {timeSinceSignup}
        </EmailText>
        {userActivity && (
          <>
            <EmailText size="small" color="default" margin="small">
              <strong>Connexions :</strong> {userActivity.loginCount} fois
            </EmailText>
            <EmailText size="small" color="default" margin="small">
              <strong>Dernière activité :</strong> {userActivity.lastActiveDate}
            </EmailText>
            {userActivity.featuresUsed.length > 0 && (
              <EmailText size="small" color="gray" margin="none">
                <strong>Fonctionnalités utilisées :</strong> {userActivity.featuresUsed.join(", ")}
              </EmailText>
            )}
          </>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      {specificQuestions && specificQuestions.length > 0 && (
        <>
          <EmailCard variant="default" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>❓ Questions Spécifiques</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              Nous serions particulièrement intéressés par votre avis sur :
            </EmailText>
            {specificQuestions.map((question, index) => (
              <EmailText key={index} size="small" color="default" margin="small">
                • {question}
              </EmailText>
            ))}
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="success" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>⏱️ Questionnaire Rapide</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Durée estimée :</strong> {estimatedTime} minutes seulement
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Questions :</strong> Simples et directes
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Impact :</strong> Vos réponses nous aident directement à améliorer le produit
        </EmailText>
      </EmailCard>

      {incentive && incentive.type !== "none" && (
        <>
          <EmailSpacer size="medium" />
          <EmailCard variant="warning" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>🎁 Remerciement</strong>
            </EmailText>
            <EmailText size="small" color="default" margin="none">
              Pour vous remercier de votre temps, vous recevrez : <strong>{getIncentiveText()}</strong>
            </EmailText>
          </EmailCard>
        </>
      )}

      <EmailSpacer size="medium" />

      <div className="text-center">
        {surveyUrl ? (
          <EmailButton 
            href={surveyUrl} 
            variant="primary" 
            size="large"
          >
            Donner mon avis ({estimatedTime} min)
          </EmailButton>
        ) : (
          <EmailButton 
            href={`mailto:${process.env.SUPPORT_EMAIL || 'feedback@example.com'}?subject=Feedback de ${userName}`}
            variant="primary" 
            size="large"
          >
            Envoyer mes commentaires
          </EmailButton>
        )}
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>💡 Votre Voix Compte</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Chaque retour que nous recevons est lu attentivement par notre équipe.
          Vos suggestions ont un impact direct sur :
          <br />
          • Le développement de nouvelles fonctionnalités
          <br />
          • L&apos;amélioration de l&apos;expérience utilisateur  
          <br />
          • La priorisation de notre roadmap produit
          <br />
          • La correction des problèmes identifiés
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      {testimonialRequest && (
        <>
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>🌟 Témoignage</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              Si vous êtes satisfait de notre service, nous serions honorés si vous 
              acceptiez de partager votre expérience publiquement. Cela nous aide 
              énormément à faire découvrir notre solution à d&apos;autres personnes.
            </EmailText>
          </EmailCard>
          <EmailSpacer size="medium" />
        </>
      )}

      {productRoadmapUrl && (
        <>
          <div className="text-center">
            <EmailButton 
              href={productRoadmapUrl} 
              variant="secondary" 
              size="medium"
            >
              Voir notre roadmap produit
            </EmailButton>
          </div>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🙏 Merci</strong>
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Merci de prendre le temps de nous aider à améliorer {companyName}. 
          Votre feedback est la base de notre amélioration continue.
          <br /><br />
          Si vous préférez ne plus recevoir ce type d&apos;email, vous pouvez 
          nous le faire savoir en répondant simplement à ce message.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Votre avis compte vraiment ! 💙
      </EmailText>
    </EmailLayout>
  );
};