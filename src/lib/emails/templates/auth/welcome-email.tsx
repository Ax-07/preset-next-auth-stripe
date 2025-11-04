import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface WelcomeEmailProps extends UserEmailProps {
  registrationDate: string;
  signupMethod: "email" | "google" | "github" | "apple" | "other";
  isEmailVerified?: boolean;
  dashboardUrl?: string;
  supportUrl?: string;
  unsubscribeUrl?: string;
  companyName?: string;
}

export const WelcomeEmail = ({
  userName,
  userEmail,
  registrationDate,
  signupMethod,
  isEmailVerified = true,
  dashboardUrl,
  supportUrl,
  unsubscribeUrl,
  companyName = "Votre App",
}: WelcomeEmailProps) => {
  const preview = `Bienvenue dans ${companyName}. Votre compte est prêt.`;

  const signupMethodLabel =
    signupMethod === "email"  ? "Email et mot de passe" :
    signupMethod === "google" ? "Google" :
    signupMethod === "github" ? "GitHub" :
    signupMethod === "apple"  ? "Apple ID" :
                                "Autre";

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center">
        Bienvenue dans {companyName}
      </EmailHeading>

      <EmailText align="center">
        Bonjour <strong>{userName}</strong>, votre compte a été créé avec succès.
      </EmailText>

      <EmailSpacer size="small" />

      <EmailText>
        <strong>Nom :</strong> {userName}<br />
        <strong>Email :</strong> {userEmail}<br />
        <strong>Date d&apos;inscription :</strong> {registrationDate}<br />
        <strong>Méthode :</strong> {signupMethodLabel}<br />
        <strong>Statut email :</strong> {isEmailVerified ? "Vérifié" : "À vérifier"}
      </EmailText>

      {dashboardUrl && (
        <>
          <EmailSpacer size="medium" />
          <div style={{ textAlign: "center" }}>
            <EmailButton href={dashboardUrl} variant="primary" size="large">
              Accéder à mon compte
            </EmailButton>
          </div>
        </>
      )}

      {supportUrl && (
        <>
          <EmailSpacer size="medium" />
          <EmailText align="center">
            Une question ? Notre équipe peut vous aider :
          </EmailText>
          <div style={{ textAlign: "center" }}>
            <EmailButton href={supportUrl} variant="secondary" size="medium">
              Contacter le support
            </EmailButton>
          </div>
        </>
      )}

      <EmailSpacer size="small" />
      <EmailText align="center" color="light">
        Merci d&apos;avoir choisi {companyName}.
      </EmailText>

      {unsubscribeUrl && (
        <>
          <EmailSpacer size="small" />
          <EmailText align="center" color="light">
            Vous recevez cet email suite à la création de votre compte.<br />
            <a href={unsubscribeUrl}>Se désabonner des emails marketing</a>
          </EmailText>
        </>
      )}
    </EmailLayout>
  );
};
