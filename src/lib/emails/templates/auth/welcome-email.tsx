import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface WelcomeEmailProps extends UserEmailProps {
  registrationDate: string;
  signupMethod: "email" | "google" | "github" | "apple" | "other";
  isEmailVerified?: boolean;
  dashboardUrl?: string;
  profileUrl?: string;
  supportUrl?: string;
  unsubscribeUrl?: string;
  features?: {
    name: string;
    description: string;
    icon?: string;
  }[];
  nextSteps?: {
    title: string;
    description: string;
    actionUrl?: string;
    actionText?: string;
  }[];
}

export const WelcomeEmail = ({
  userName,
  userEmail,
  registrationDate,
  signupMethod,
  isEmailVerified = true,
  dashboardUrl,
  profileUrl,
  supportUrl,
  unsubscribeUrl,
  features,
  nextSteps,
  companyName = "Votre App",
  logoUrl,
}: WelcomeEmailProps) => {
  const preview = `Bienvenue dans ${companyName} ! Votre compte a été créé avec succès.`;

  const getSignupMethodText = () => {
    switch (signupMethod) {
      case "email":
        return "📧 Email et mot de passe";
      case "google":
        return "🔴 Google";
      case "github":
        return "⚫ GitHub";
      case "apple":
        return "🍎 Apple ID";
      case "other":
      default:
        return "🔐 Autre méthode";
    }
  };

  const defaultFeatures = [
    {
      name: "Tableau de bord",
      description: "Accédez à votre espace personnel avec toutes vos informations",
      icon: "📊"
    },
    {
      name: "Profil personnalisé",
      description: "Configurez votre profil selon vos préférences",
      icon: "👤"
    },
    {
      name: "Support 24/7",
      description: "Notre équipe est là pour vous aider à tout moment",
      icon: "🆘"
    }
  ];

  const defaultNextSteps = [
    {
      title: "Complétez votre profil",
      description: "Ajoutez vos informations personnelles pour une expérience optimale",
      actionUrl: profileUrl,
      actionText: "Modifier mon profil"
    },
    {
      title: "Explorez le tableau de bord",
      description: "Découvrez toutes les fonctionnalités disponibles",
      actionUrl: dashboardUrl,
      actionText: "Voir le tableau de bord"
    },
    {
      title: "Contactez le support",
      description: "Des questions ? Notre équipe est là pour vous aider",
      actionUrl: supportUrl,
      actionText: "Obtenir de l'aide"
    }
  ];

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <div className="text-center">
        <EmailHeading level={1} align="center" color="default">
          🎉 Bienvenue dans {companyName} !
        </EmailHeading>
        
        <EmailText size="large" align="center" color="gray">
          Bonjour <strong>{userName}</strong>,
        </EmailText>
        
        <EmailText align="center" color="default">
          Félicitations ! Votre compte a été créé avec succès. 
          Nous sommes ravis de vous accueillir dans notre communauté.
        </EmailText>
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="success" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>✅ Inscription Confirmée</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Nom :</strong> {userName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Email :</strong> {userEmail}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Date d'inscription :</strong> {registrationDate}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Méthode :</strong> {getSignupMethodText()}
        </EmailText>
        {isEmailVerified ? (
          <EmailText size="small" color="green" margin="none">
            <strong>✅ Email vérifié</strong>
          </EmailText>
        ) : (
          <EmailText size="small" color="red" margin="none">
            <strong>⚠️ Email en attente de vérification</strong>
          </EmailText>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      {dashboardUrl && (
        <>
          <div className="text-center">
            <EmailButton 
              href={dashboardUrl} 
              variant="primary" 
              size="large"
            >
              Accéder à mon compte
            </EmailButton>
          </div>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🚀 Que faire maintenant ?</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          Votre compte est prêt à être utilisé ! Voici quelques suggestions pour bien commencer :
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      {(nextSteps || defaultNextSteps).map((step, index) => (
        <div key={index}>
          <EmailCard variant="default" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>{index + 1}. {step.title}</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="small">
              {step.description}
            </EmailText>
            {step.actionUrl && step.actionText && (
              <div className="text-center">
                <EmailButton 
                  href={step.actionUrl} 
                  variant="secondary" 
                  size="medium"
                >
                  {step.actionText}
                </EmailButton>
              </div>
            )}
          </EmailCard>
          <EmailSpacer size="small" />
        </div>
      ))}

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>✨ Fonctionnalités Disponibles</strong>
        </EmailText>
        {(features || defaultFeatures).map((feature, index) => (
          <EmailText key={index} size="small" color="gray" margin="small">
            {feature.icon} <strong>{feature.name} :</strong> {feature.description}
          </EmailText>
        ))}
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔒 Sécurité de votre compte</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          • Gardez vos identifiants confidentiels
          <br />
          • Utilisez un mot de passe fort et unique
          <br />
          • Contactez-nous immédiatement en cas d'activité suspecte
          <br />
          • Ne partagez jamais vos informations de connexion
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      {supportUrl && (
        <>
          <EmailCard variant="info" padding="medium">
            <EmailText size="small" color="default" margin="small">
              <strong>💬 Besoin d'aide ?</strong>
            </EmailText>
            <EmailText size="small" color="gray" margin="none">
              Notre équipe support est disponible 24h/7j pour répondre à toutes vos questions.
              N'hésitez pas à nous contacter !
            </EmailText>
          </EmailCard>
          <EmailSpacer size="small" />
          <div className="text-center">
            <EmailButton 
              href={supportUrl} 
              variant="secondary" 
              size="medium"
            >
              Contacter le Support
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
          Merci de nous avoir fait confiance en choisissant {companyName}. 
          Nous nous engageons à vous offrir la meilleure expérience possible.
          <br /><br />
          Si vous avez des questions ou des suggestions, n'hésitez pas à nous en faire part.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Bienvenue à bord ! 🚀
      </EmailText>

      {unsubscribeUrl && (
        <>
          <EmailSpacer size="small" />
          <EmailText size="small" color="light" align="center">
            Vous recevez cet email car vous venez de créer un compte.
            <br />
            <a href={unsubscribeUrl} className="text-gray-400 underline">
              Se désabonner des emails marketing
            </a>
          </EmailText>
        </>
      )}
    </EmailLayout>
  );
};