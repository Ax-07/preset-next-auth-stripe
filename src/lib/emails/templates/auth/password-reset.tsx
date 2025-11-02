import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface PasswordResetProps extends UserEmailProps {
  resetUrl: string;
  expiresInHours?: number;
  requestedAt?: string;
}

export default function PasswordReset({
  userName,
  userEmail,
  resetUrl,
  expiresInHours = 1,
  requestedAt,
  companyName = "Votre App",
  logoUrl,
}: PasswordResetProps) {
  const preview = `Réinitialisez votre mot de passe pour ${companyName}`;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        Réinitialisation de mot de passe
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong>,
      </EmailText>

      <EmailText color="default">
        Vous avez demandé à réinitialiser votre mot de passe pour votre compte 
        <strong>{companyName}</strong>. Cliquez sur le bouton ci-dessous pour 
        créer un nouveau mot de passe.
      </EmailText>

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Compte :</strong> {userEmail}
        </EmailText>
        {requestedAt && (
          <EmailText size="small" color="gray" margin="none">
            <strong>Demande effectuée :</strong> {requestedAt}
          </EmailText>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      <div className="text-center">
        <EmailButton 
          href={resetUrl} 
          variant="primary" 
          size="large"
        >
          Réinitialiser mon mot de passe
        </EmailButton>
      </div>

      <EmailSpacer size="medium" />

      <EmailCard variant="danger" padding="medium">
        <EmailText size="small" color="red" margin="small">
          <strong>⚠️ Important</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          Ce lien de réinitialisation expirera dans <strong>{expiresInHours} heure{expiresInHours > 1 ? 's' : ''}</strong>.
          <br />
          Si vous n'avez pas demandé cette réinitialisation, ignorez cet email ou contactez notre support.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailCard variant="default" padding="small">
        <EmailText size="small" color="gray" margin="none">
          <strong>Problème avec le bouton ?</strong>
          <br />
          Copiez et collez ce lien dans votre navigateur :
          <br />
          <a href={resetUrl} className="text-blue-500 underline break-all">
            {resetUrl}
          </a>
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Pour votre sécurité, ce lien ne peut être utilisé qu'une seule fois.
      </EmailText>
    </EmailLayout>
  );
};