import { Section, Text, Link, Hr } from "@react-email/components";

interface EmailFooterProps {
  companyName: string;
  companyAddress?: string;
  unsubscribeUrl?: string;
  supportEmail?: string;
}

export default function EmailFooter({
  companyName,
  companyAddress = "123 Rue de la Tech, 75001 Paris, France",
  unsubscribeUrl,
  supportEmail = "support@example.com",
}: EmailFooterProps) {
  return (
    <Section className="bg-gray-50 px-10 py-8">
      <Hr className="border-gray-200 m-0 mb-8" />
      
      <Section className="text-center">
        <Text className="text-gray-600 text-sm leading-6 my-2">
          <strong>{companyName}</strong>
        </Text>
        
        <Text className="text-gray-600 text-sm leading-6 my-2">
          {companyAddress}
        </Text>
        
        <Text className="text-gray-600 text-sm leading-6 my-2">
          Des questions ? Contactez-nous à{" "}
          <Link 
            href={`mailto:${supportEmail}`} 
            className="text-blue-500 underline"
          >
            {supportEmail}
          </Link>
        </Text>
        
        {unsubscribeUrl && (
          <Text className="text-gray-600 text-sm leading-6 my-2">
            <Link href={unsubscribeUrl} className="text-blue-500 underline">
              Se désabonner
            </Link>
            {" | "}
            <Link href="/privacy" className="text-blue-500 underline">
              Politique de confidentialité
            </Link>
            {" | "}
            <Link href="/terms" className="text-blue-500 underline">
              Conditions d&apos;utilisation
            </Link>
          </Text>
        )}
        
        <Text className="text-gray-400 text-xs leading-6 mt-4 mb-0">
          © {new Date().getFullYear()} {companyName}. Tous droits réservés.
        </Text>
      </Section>
    </Section>
  );
};