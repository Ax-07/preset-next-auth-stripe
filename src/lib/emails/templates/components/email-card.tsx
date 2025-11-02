import { Section } from "@react-email/components";
import { ReactNode } from "react";

interface EmailCardProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  padding?: "small" | "medium" | "large";
}

export default function EmailCard({
  children,
  variant = "default",
  padding = "medium",
}: EmailCardProps) {
  const baseClasses = "rounded-lg border my-4";
  
  const variantClasses = {
    default: "border-gray-200 bg-white",
    success: "border-green-500 bg-green-50",
    warning: "border-yellow-500 bg-yellow-50",
    danger: "border-red-500 bg-red-50",
    info: "border-blue-500 bg-blue-50",
  };
  
  const paddingClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]}`;

  return <Section className={cardClasses}>{children}</Section>;
};