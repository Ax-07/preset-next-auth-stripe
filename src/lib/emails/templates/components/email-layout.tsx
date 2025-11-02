import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Tailwind,
  pixelBasedPreset,
} from "@react-email/components";
import { ReactNode } from "react";
import EmailHeader from "./email-header";
import EmailFooter from "./email-footer";

interface EmailLayoutProps {
  children: ReactNode;
  preview: string;
  companyName?: string;
}

export default function EmailLayout({ children, preview, companyName = "Votre App" }: EmailLayoutProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg mx-auto my-10 p-0 w-full max-w-[600px]">
            <EmailHeader companyName={companyName} />
            <Section className="px-10 py-8">{children}</Section>
            <EmailFooter companyName={companyName} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
