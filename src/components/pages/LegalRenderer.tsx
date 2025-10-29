// src/components/pages/LegalRenderer.tsx
import React from "react";
import { legalContent, Section, Link as LegalLink, meta } from "@/data/legal-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Scale,
  Shield,
  FileText,
  Mail,
  Globe,
  Calendar,
  Building,
  User,
  Cookie,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Types pour la structure des cookies
interface CookieProvider {
  name: string;
  provider: string;
  domain: string;
  purpose: string;
  policy?: string;
  dpa?: string;
}

interface CookieItem {
  name: string;
  domain: string;
  purpose: string;
  duration: string;
  type: string;
  category: string;
  provider: string;
  policy?: string;
}

interface CookiesPage {
  slug: string;
  title: string;
  lastUpdated: string;
  intro?: string[];
  sections?: Section[];
  providers: CookieProvider[];
  cookieListSchema: string[];
  cookieList: CookieItem[];
}

interface LegalPage {
  slug: string;
  title: string;
  lastUpdated: string;
  intro?: string[];
  sections?: Section[];
}

type LegalPageProps = { slug: keyof typeof legalContent };

const getIconForSection = (id: string) => {
  switch (id) {
    case "editeur":
      return <Building className="h-5 w-5" />;
    case "contact":
      return <Mail className="h-5 w-5" />;
    case "directeur":
      return <User className="h-5 w-5" />;
    case "hebergement":
      return <Globe className="h-5 w-5" />;
    case "conditions":
      return <Scale className="h-5 w-5" />;
    case "donnees":
      return <Shield className="h-5 w-5" />;
    case "cookies":
      return <Cookie className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

export function LegalRenderer({ slug }: LegalPageProps) {
  const page = legalContent[slug] as LegalPage | CookiesPage;
  if (!page) return <div>Page non trouvée</div>;

  const lastUpdated = new Date(page.lastUpdated).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Rendu spécialisé pour les mentions légales
  if (slug === "mentions") {
    return (
      <>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Informations légales
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Mentions{" "}
              <span className="text-primary">légales</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {page.intro?.join(" ")}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Dernière mise à jour : {lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation rapide */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Navigation rapide</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.sections?.slice(0, 4).map((section) => (
                <Link key={section.id} href={`#${section.id}`}>
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      {getIconForSection(section.id)}
                      <span className="font-medium">{section.title}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sections des mentions légales */}
        <div className="container max-w-4xl mx-auto space-y-12 py-20">
          {page.sections?.map((section) => (
            <section key={section.id} id={section.id} className={section.id === "conditions" || section.id === "donnees" || section.id === "cookies" ? "py-20 bg-muted/30" : ""}>
              <div className={section.id === "conditions" || section.id === "donnees" || section.id === "cookies" ? "container max-w-4xl mx-auto" : ""}>
                {(section.id === "conditions" || section.id === "donnees" || section.id === "cookies") && (
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                      {getIconForSection(section.id)}
                      {section.title}
                    </h2>
                    {section.content && (
                      <p className="text-xl text-muted-foreground">
                        {section.content.join(" ")}
                      </p>
                    )}
                  </div>
                )}

                {section.id === "conditions" || section.id === "donnees" || section.id === "cookies" ? (
                  <div className="space-y-6">
                    {section.subSections?.map((subSection, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {subSection.subtitle}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {subSection.bullets?.map((bullet, bulletIndex) => (
                            <p key={bulletIndex} className="text-muted-foreground leading-relaxed mb-2">
                              {bullet}
                            </p>
                          ))}
                        </CardContent>
                      </Card>
                    ))}

                    {section.id === "donnees" && (
                      <Card className="mt-8 border-orange-200 bg-orange-50/50">
                        <CardHeader>
                          <CardTitle className="text-orange-700 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Délégué à la Protection des Données (DPO)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-orange-700">
                            Pour toute question relative au traitement de vos données personnelles, 
                            vous pouvez contacter notre DPO à l&apos;adresse : <strong>{meta.placeholders.dpoEmail}</strong>
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {section.id === "cookies" && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Gestion des cookies</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            Vous pouvez gérer vos préférences de cookies via le bandeau de consentement 
                            ou dans les paramètres de votre navigateur.
                          </p>
                          <Button variant="outline">
                            Gérer mes préférences
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {getIconForSection(section.id)}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {section.subSections?.map((subSection, index) => (
                          <div key={index} className="grid gap-1 md:grid-cols-4">
                            <div className="font-medium text-muted-foreground">
                              {subSection.subtitle} :
                            </div>
                            <div className="md:col-span-3">
                              {subSection.bullets?.join(", ")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Contact légal */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Questions juridiques ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Notre équipe juridique est à votre disposition pour toute question 
              concernant nos mentions légales ou vos droits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={`mailto:${meta.placeholders.contactEmail}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support">
                  Support général
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Rendu standard pour les autres pages légales
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">Dernière mise à jour : {lastUpdated}</p>

      {page.intro?.map((p: string, i: number) => (
        <p key={i}>{p}</p>
      ))}

      {page.sections?.map((section: Section) => (
        <section key={section.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

          {section.content?.map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {section.bullets.map((bullet: string, idx: number) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          )}

          {section.subSections?.map((sub, j: number) => (
            <div key={j} className="mt-6">
              <h3 className="text-xl font-semibold mb-3">{sub.subtitle}</h3>
              {sub.bullets && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {sub.bullets.map((b: string, k: number) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {section.links?.length ? (
            <div className="mt-4">
              {section.links.map((l: LegalLink, idx: number) => (
                <a key={idx} href={l.href} className="text-blue-600 hover:underline mr-4">
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      {/* Section spécifique aux cookies (tableau) */}
      {slug === "cookies" && (page as CookiesPage).cookieList?.length ? (
        <>
          <h2>Prestataires</h2>
          <ul className="list-disc pl-6">
            {(page as CookiesPage).providers.map((p: CookieProvider, i: number) => (
              <li key={i}>
                <strong>{p.name}</strong> — {p.provider} ({p.domain}) — {p.purpose}
                {p.policy ? (
                  <>
                    {" "}— <a href={p.policy} target="_blank" rel="noreferrer">Politique</a>
                  </>
                ) : null}
              </li>
            ))}
          </ul>

          <h2>Liste des cookies</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {(page as CookiesPage).cookieListSchema.map((h: string) => (
                    <th key={h} className="text-left py-2 pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(page as CookiesPage).cookieList.map((c: CookieItem, i: number) => (
                  <tr key={i} className="border-t">
                    {(page as CookiesPage).cookieListSchema.map((h: string) => (
                      <td key={h} className="py-2 pr-4">
                        {c[h as keyof CookieItem] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}