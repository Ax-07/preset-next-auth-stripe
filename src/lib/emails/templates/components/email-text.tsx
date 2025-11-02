import { Text } from "@react-email/components";
import { ReactNode } from "react";

interface EmailTextProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "gray" | "light" | "blue" | "green" | "red";
  align?: "left" | "center" | "right";
  margin?: "none" | "small" | "medium" | "large";
}

export default function EmailText({
  children,
  size = "medium",
  weight = "normal",
  color = "default",
  align = "left",
  margin = "medium",
}: EmailTextProps) {
  const baseClasses = "leading-relaxed";
  
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };
  
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  
  const colorClasses = {
    default: "text-gray-900",
    gray: "text-gray-600",
    light: "text-gray-500",
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  };
  
  const alignClasses = {
    left: "text-left",
    center: "text-center", 
    right: "text-right",
  };
  
  const marginClasses = {
    none: "m-0",
    small: "mt-0 mb-2",
    medium: "mt-0 mb-4",
    large: "mt-0 mb-6",
  };

  const textClasses = `${baseClasses} ${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${alignClasses[align]} ${marginClasses[margin]}`;

  return <Text className={textClasses}>{children}</Text>;
};