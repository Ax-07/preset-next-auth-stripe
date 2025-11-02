import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface EmailVerificationProps extends UserEmailProps {
  verificationUrl: string;
  expiresInHours?: number;
}

export default function EmailVerification({
  userName,
  userEmail,
  verificationUrl,
  expiresInHours = 24,
  companyName = "Votre App",
  logoUrl,
}: EmailVerificationProps) {
  const preview = `Vérifiez votre adresse email pour ${companyName}`;

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        Vérifiez votre adresse email
      </EmailHeading>

      <EmailText size="large" align="center" color="gray">
        Bonjour <strong>{userName}</strong> !
      </EmailText>

      <EmailText color="default">
        Merci de vous être inscrit sur <strong>{companyName}</strong>. 
        Pour finaliser votre inscription et accéder à votre compte, 
        nous devons vérifier votre adresse email.
      </EmailText>

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>Adresse email :</strong> {userEmail}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          Cliquez sur le bouton ci-dessous pour confirmer cette adresse.
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <div className="text-center">
        <EmailButton 
          href={verificationUrl} 
          variant="primary" 
          size="large"
        >
          Vérifier mon email
        </EmailButton>
      </div>

      <EmailSpacer size="medium" />

      <EmailText size="small" color="light" align="center">
        Ce lien de vérification expirera dans {expiresInHours} heures.
        <br />
        Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.
      </EmailText>

      <EmailSpacer size="small" />

      <EmailCard variant="default" padding="small">
        <EmailText size="small" color="gray" margin="none">
          <strong>Problème avec le bouton ?</strong>
          <br />
          Copiez et collez ce lien dans votre navigateur :
          <br />
          <a href={verificationUrl} className="text-blue-500 underline break-all">
            {verificationUrl}
          </a>
        </EmailText>
      </EmailCard>
    </EmailLayout>
  );
};