import { Section } from "@react-email/components";

interface EmailSpacerProps {
  size?: "small" | "medium" | "large" | "xl";
}

export default function EmailSpacer({ size = "medium" }: EmailSpacerProps) {
  const sizeClasses = {
    small: "h-4",
    medium: "h-6",
    large: "h-8",
    xl: "h-12",
  };

  return <Section className={sizeClasses[size]} />;
};