import {
  EmailLayout,
  EmailHeading,
  EmailText,
  EmailButton,
  EmailCard,
  EmailSpacer,
  UserEmailProps,
} from "../components";

interface ContactFormProps {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  submittedAt: string;
  userAgent?: string;
  ipAddress?: string;
  userPlan?: "free" | "basic" | "premium" | "enterprise" | null;
  userId?: string;
  category?: "support" | "billing" | "feature" | "bug" | "other";
  priority?: "low" | "medium" | "high" | "urgent";
  replyToUrl?: string;
  ticketId?: string;
  companyName?: string;
  logoUrl?: string;
}

export default function ContactForm({
  userName,
  userEmail,
  subject,
  message,
  submittedAt,
  userAgent,
  ipAddress,
  userPlan,
  userId,
  category = "other",
  priority = "medium",
  replyToUrl,
  ticketId,
  companyName = "Votre App",
  logoUrl,
}: ContactFormProps) {
  const preview = `Nouveau message de contact de ${userName} - ${subject}`;

  const getPriorityColor = () => {
    switch (priority) {
      case "urgent":
        return "danger";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
      default:
        return "default";
    }
  };

  const getPriorityEmoji = () => {
    switch (priority) {
      case "urgent":
        return "🚨";
      case "high":
        return "⚠️";
      case "medium":
        return "📋";
      case "low":
      default:
        return "💬";
    }
  };

  const getCategoryText = () => {
    switch (category) {
      case "support":
        return "Support Technique";
      case "billing":
        return "Facturation";
      case "feature":
        return "Demande de Fonctionnalité";
      case "bug":
        return "Signalement de Bug";
      case "other":
      default:
        return "Général";
    }
  };

  const getPlanBadge = () => {
    if (!userPlan) return "👤 Non connecté";
    
    switch (userPlan) {
      case "free":
        return "🆓 Plan Gratuit";
      case "basic":
        return "⭐ Plan Basic";
      case "premium":
        return "✨ Plan Premium";
      case "enterprise":
        return "🏢 Plan Enterprise";
      default:
        return "👤 Utilisateur";
    }
  };

  return (
    <EmailLayout preview={preview} companyName={companyName}>
      <EmailHeading level={1} align="center" color="default">
        📧 Nouveau Message de Contact
      </EmailHeading>

      <EmailCard variant={getPriorityColor()} padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>{getPriorityEmoji()} Priorité : {priority.toUpperCase()}</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Catégorie :</strong> {getCategoryText()}
        </EmailText>
        {ticketId && (
          <EmailText size="small" color="gray" margin="none">
            <strong>Ticket :</strong> #{ticketId}
          </EmailText>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>👤 Informations Utilisateur</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Nom :</strong> {userName}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Email :</strong> {userEmail}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Plan :</strong> {getPlanBadge()}
        </EmailText>
        {userId && (
          <EmailText size="small" color="gray" margin="none">
            <strong>ID Utilisateur :</strong> {userId}
          </EmailText>
        )}
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="info" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>📨 Détails du Message</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Objet :</strong> {subject}
        </EmailText>
        <EmailText size="small" color="default" margin="small">
          <strong>Envoyé le :</strong> {submittedAt}
        </EmailText>
        <EmailText size="small" color="gray" margin="none">
          <strong>Catégorie :</strong> {getCategoryText()}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="default" padding="large">
        <EmailText size="small" color="default" margin="small">
          <strong>💬 Message</strong>
        </EmailText>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
          <EmailText size="small" color="default" margin="none">
            <span className="whitespace-pre-wrap break-words font-mono">
              {message}
            </span>
          </EmailText>
        </div>
      </EmailCard>

      <EmailSpacer size="medium" />

      {replyToUrl && (
        <>
          <div className="text-center">
            <EmailButton 
              href={replyToUrl} 
              variant="primary" 
              size="large"
            >
              Répondre au Message
            </EmailButton>
          </div>
          <EmailSpacer size="medium" />
        </>
      )}

      <EmailCard variant="default" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>🔧 Informations Techniques</strong>
        </EmailText>
        {userAgent && (
          <EmailText size="small" color="gray" margin="small">
            <strong>Navigateur :</strong> {userAgent}
          </EmailText>
        )}
        {ipAddress && (
          <EmailText size="small" color="gray" margin="small">
            <strong>Adresse IP :</strong> {ipAddress}
          </EmailText>
        )}
        <EmailText size="small" color="gray" margin="none">
          <strong>Reçu le :</strong> {submittedAt}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="medium" />

      <EmailCard variant="warning" padding="medium">
        <EmailText size="small" color="default" margin="small">
          <strong>⏰ Actions Recommandées</strong>
        </EmailText>
        <EmailText size="small" color="default" margin="none">
          {priority === "urgent" && "• Répondre dans l'heure"}
          {priority === "high" && "• Répondre dans les 4 heures"}
          {priority === "medium" && "• Répondre dans les 24 heures"}
          {priority === "low" && "• Répondre dans les 48 heures"}
          <br />
          • Vérifier le plan de l'utilisateur pour le niveau de support
          <br />
          • Examiner l'historique des tickets précédents
          <br />
          • Ajouter des étiquettes appropriées au ticket
          {category === "billing" && (
            <>
              <br />
              • ⚠️ Demande de facturation - vérifier les permissions d'accès
            </>
          )}
          {category === "bug" && (
            <>
              <br />
              • 🐛 Signalement de bug - transférer à l'équipe technique
            </>
          )}
        </EmailText>
      </EmailCard>

      <EmailSpacer size="small" />

      <EmailText size="small" color="light" align="center">
        Message reçu via le formulaire de contact de {companyName}
      </EmailText>
    </EmailLayout>
  );
};