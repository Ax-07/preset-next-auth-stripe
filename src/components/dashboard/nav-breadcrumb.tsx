"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

// Mapping des chemins vers des labels personnalisés
const pathLabels: Record<string, string> = {
  dashboard: "Tableau de bord",
  profile: "Profil",
  settings: "Paramètres",
  billing: "Facturation",
  subscription: "Abonnement",
  // Ajoutez vos routes ici
};

export function NavBreadcrumb() {
  const pathname = usePathname();
  
  // Séparer le chemin en segments
  const segments = pathname.split("/").filter(Boolean);
  
  // Générer les breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;
    
    return {
      href,
      label,
      isLast,
    };
  });

  // Si on est sur la page d'accueil du dashboard
  if (segments.length === 1 && segments[0] === "dashboard") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Tableau de bord</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.href}>
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
