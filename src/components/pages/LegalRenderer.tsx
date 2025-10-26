// src/components/pages/LegalRenderer.tsx
"use client";
import React from "react";
import { legalContent } from "@/data/legal-content";

type LegalPageProps = { slug: keyof typeof legalContent };

export function LegalRenderer({ slug }: LegalPageProps) {
  const page = legalContent[slug] as any;
  if (!page) return <div>Page non trouvée</div>;

  const lastUpdated = new Date(page.lastUpdated).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">Dernière mise à jour : {lastUpdated}</p>

      {page.intro?.map((p: string, i: number) => (
        <p key={i}>{p}</p>
      ))}

      {page.sections?.map((section: any) => (
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

          {section.subSections?.map((sub: any, j: number) => (
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
              {section.links.map((l: any, idx: number) => (
                <a key={idx} href={l.href} className="text-blue-600 hover:underline mr-4">
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      {/* Section spécifique aux cookies (tableau) */}
      {slug === "cookies" && page.cookieList?.length ? (
        <>
          <h2>Prestataires</h2>
          <ul className="list-disc pl-6">
            {page.providers.map((p: any, i: number) => (
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
                  {page.cookieListSchema.map((h: string) => (
                    <th key={h} className="text-left py-2 pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.cookieList.map((c: any, i: number) => (
                  <tr key={i} className="border-t">
                    {page.cookieListSchema.map((h: string) => (
                      <td key={h} className="py-2 pr-4">
                        {c[h] ?? "-"}
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