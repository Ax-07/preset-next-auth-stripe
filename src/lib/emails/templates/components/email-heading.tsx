import { Heading } from "@react-email/components";
import { ReactNode } from "react";

interface EmailHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  align?: "left" | "center" | "right";
  color?: "default" | "gray" | "blue" | "green" | "red";
  margin?: "none" | "small" | "medium" | "large";
}

export default function EmailHeading({
  children,
  level = 1,
  align = "left",
  color = "default",
  margin = "medium",
}: EmailHeadingProps) {
  const baseClasses = "font-semibold leading-tight";
  
  const levelClasses = {
    1: "text-3xl",
    2: "text-2xl", 
    3: "text-xl",
    4: "text-lg",
  };
  
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  
  const colorClasses = {
    default: "text-gray-900",
    gray: "text-gray-600",
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  };
  
  const marginClasses = {
    none: "m-0",
    small: "mt-0 mb-2",
    medium: "mt-0 mb-4",
    large: "mt-0 mb-6",
  };

  const headingClasses = `${baseClasses} ${levelClasses[level]} ${alignClasses[align]} ${colorClasses[color]} ${marginClasses[margin]}`;

  return (
    <Heading as={`h${level}` as const} className={headingClasses}>
      {children}
    </Heading>
  );
};