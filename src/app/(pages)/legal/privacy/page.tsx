import React from 'react';

export default async function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-8">{"Politique de Confidentialité"}</h1>
                
                <p className="text-sm text-muted-foreground mb-8">
                    {`Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"1. Introduction"}</h2>
                    <p className="mb-4">
                        {`Nous prenons votre vie privée très au sérieux. Cette politique de confidentialité explique quelles 
                        informations nous collectons, comment nous les utilisons, les partageons et les protégeons.`}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"2. Informations que nous collectons"}</h2>

                    <h3 className="text-xl font-semibold mb-3 mt-6">{"2.1 Informations que vous nous fournissez"}</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>{"Informations de compte :"}</strong>{" nom, adresse email, mot de passe (haché)"}</li>
                        <li><strong>{"Informations de paiement :"}</strong>{ " traitées de manière sécurisée par Stripe (nous ne stockons pas vos informations de carte bancaire)"}</li>
                        <li><strong>{"Informations de profil :"}</strong>{" photo de profil, préférences"}</li>
                        <li><strong>{"Communications :"}</strong>{" messages que vous nous envoyez"}</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-3 mt-6">{"2.2 Informations collectées automatiquement"}</h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>{"Données d'utilisation :"}</strong>{" pages visitées, fonctionnalités utilisées, temps passé"}</li>
                        <li><strong>{"Données techniques :"}</strong>{" adresse IP, type de navigateur, système d'exploitation"}</li>
                        <li><strong>{"Cookies :"}</strong>{" voir notre section sur les cookies ci-dessous"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"3. Comment nous utilisons vos informations"}</h2>
                    <p className="mb-4">{"Nous utilisons vos informations pour :"}</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>{"Fournir, maintenir et améliorer notre service"}</li>
                        <li>{"Traiter vos transactions et gérer vos abonnements"}</li>
                        <li>{"Vous envoyer des notifications importantes concernant le service"}</li>
                        <li>{"Répondre à vos demandes et vous fournir un support client"}</li>
                        <li>{"Protéger contre les fraudes et les abus"}</li>
                        <li>{"Analyser l'utilisation du service pour l'améliorer"}</li>
                        <li>{"Vous envoyer des communications marketing (avec votre consentement)"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"4. Partage de vos informations"}</h2>
                    <p className="mb-4">{"Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos informations avec :"}</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>{"Prestataires de services :"}</strong>{" Stripe (paiements), services d'hébergement, services d'email"}</li>
                        <li><strong>{"Exigences légales :"}</strong>{" si requis par la loi ou pour protéger nos droits"}</li>
                        <li><strong>{"Transfert d'entreprise :"}</strong>{" en cas de fusion, acquisition ou vente d'actifs"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"5. Cookies et technologies similaires"}</h2>
                    <p className="mb-4">
                        {"Nous utilisons des cookies et des technologies similaires pour :"}
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>{"Cookies essentiels :"}</strong>{" nécessaires au fonctionnement du service"}</li>
                        <li><strong>{"Cookies d'authentification :"}</strong>{" pour maintenir votre session"}</li>
                        <li><strong>{"Cookies de préférences :"}</strong>{" pour mémoriser vos paramètres"}</li>
                        <li><strong>{"Cookies analytiques :"}</strong>{" pour comprendre comment vous utilisez le service"}</li>
                    </ul>
                    <p className="mb-4">
                        {"Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"6. Sécurité de vos données"}</h2>
                    <p className="mb-4">
                        {`Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
                        vos informations personnelles, notamment :`}
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>{"Chiffrement SSL/TLS pour les transmissions de données"}</li>
                        <li>{"Hachage des mots de passe avec bcrypt"}</li>
                        <li>{"Contrôles d'accès stricts aux données"}</li>
                        <li>{"Surveillance et audits de sécurité réguliers"}</li>
                        <li>{"Sauvegarde régulière des données"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"7. Conservation des données"}</h2>
                    <p className="mb-4">
                        {"Nous conservons vos informations personnelles aussi longtemps que nécessaire pour :"}
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>{"Fournir le service (tant que votre compte est actif)"}</li>
                        <li>{"Respecter nos obligations légales"}</li>
                        <li>{"Résoudre les litiges"}</li>
                        <li>{"Faire respecter nos accords"}</li>
                    </ul>
                    <p className="mb-4">
                        {`Après suppression de votre compte, nous conservons certaines informations pour respecter nos obligations 
                        légales (notamment fiscales) pendant 3 ans.`}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"8. Vos droits (RGPD)"}</h2>
                    <p className="mb-4">{"Conformément au RGPD, vous avez le droit de :"}</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>{"Accès :"}</strong>{" obtenir une copie de vos données personnelles"}</li>
                        <li><strong>{"Rectification :"}</strong>{" corriger les données inexactes"}</li>
                        <li><strong>{"Suppression :"}</strong>{" demander la suppression de vos données"}</li>
                        <li><strong>{"Limitation :"}</strong>{" limiter le traitement de vos données"}</li>
                        <li><strong>{"Portabilité :"}</strong>{" recevoir vos données dans un format structuré"}</li>
                        <li><strong>{"Opposition :"}</strong>{" vous opposer au traitement de vos données"}</li>
                        <li><strong>{"Retrait du consentement :"}</strong>{" retirer votre consentement à tout moment"}</li>
                    </ul>
                    <p className="mb-4">
                        {"Pour exercer ces droits, contactez-nous à : privacy@votre-domaine.com"}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"9. Transferts internationaux de données"}</h2>
                    <p className="mb-4">
                        {`Vos données peuvent être transférées et traitées dans des pays autres que votre pays de résidence. 
                        Nous nous assurons que ces transferts sont effectués conformément aux lois applicables sur la protection 
                        des données.`}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"10. Données des mineurs"}</h2>
                    <p className="mb-4">
                        {`Notre service n'est pas destiné aux personnes de moins de 16 ans. Nous ne collectons pas sciemment 
                        d'informations personnelles auprès de mineurs. Si vous êtes parent et que vous découvrez que votre 
                        enfant nous a fourni des informations, contactez-nous.`}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"11. Modifications de cette politique"}</h2>
                    <p className="mb-4">
                        {`Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons de 
                        tout changement important en publiant la nouvelle politique sur cette page et en mettant à jour la date 
                        de "dernière mise à jour".`}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"12. Contact"}</h2>
                    <p className="mb-4">
                        {`Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                        contactez notre Délégué à la Protection des Données :`}
                    </p>
                    <ul className="list-none mb-4 space-y-2">
                        <li><strong>{"Email :"}</strong>{" privacy@votre-domaine.com"}</li>
                        <li><strong>{"Adresse :"}</strong>{" [Votre adresse]"}</li>
                    </ul>
                    <p className="mb-4">
                        {`Vous avez également le droit de déposer une plainte auprès de votre autorité de protection des données 
                        locale (CNIL en France).`}
                    </p>
                </section>
            </div>
        </div>
    );
};
