import { Button } from "@react-email/components";
import { ReactNode } from "react";

interface EmailButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

export default function EmailButton({
  href,
  children,
  variant = "primary",
  size = "medium",
}: EmailButtonProps) {
  const baseClasses = "rounded-md border-none cursor-pointer inline-block font-semibold text-center no-underline";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-100 text-gray-700 border border-gray-300",
    danger: "bg-red-500 text-white",
  };
  
  const sizeClasses = {
    small: "text-sm py-2 px-4",
    medium: "text-base py-3 px-6",
    large: "text-lg py-4 px-8",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <Button href={href} className={buttonClasses}>
      {children}
    </Button>
  );
};