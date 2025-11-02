import { Section, Img, Text } from "@react-email/components";

interface EmailHeaderProps {
  companyName: string;
  logoUrl?: string;
}

export default function EmailHeader({
  companyName,
  logoUrl,
}: EmailHeaderProps) {
  return (
    <Section className="bg-white border-b border-gray-200 px-10 py-6">
      <Section className="text-center">
        {logoUrl ? (
          <Img
            src={logoUrl}
            width="120"
            height="40"
            alt={companyName}
            className="mx-auto"
          />
        ) : (
          <Text className="text-gray-900 text-2xl font-semibold m-0 text-center">
            {companyName}
          </Text>
        )}
      </Section>
    </Section>
  );
};