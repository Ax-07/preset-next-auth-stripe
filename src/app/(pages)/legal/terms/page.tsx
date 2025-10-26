import React from 'react';

export default async function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-8">{"Conditions Générales d'Utilisation"}</h1>
                
                <p className="text-sm text-muted-foreground mb-8">
                    {`Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"1. Acceptation des conditions"}</h2>
                    <p className="mb-4">
                        {"En accédant et en utilisant ce service, vous acceptez d'être lié par les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"2. Description du service"}</h2>
                    <p className="mb-4">
                        {"Notre plateforme fournit [décrire votre service SaaS]. Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"3. Compte utilisateur"}</h2>
                    <p className="mb-4">
                        {"Pour utiliser certaines fonctionnalités du service, vous devez créer un compte. Vous êtes responsable de :"}
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>{"Maintenir la confidentialité de vos identifiants de connexion"}</li>
                        <li>{"Toutes les activités effectuées sous votre compte"}</li>
                        <li>{"Nous informer immédiatement de toute utilisation non autorisée"}</li>
                        <li>{"Fournir des informations exactes et à jour"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"4. Utilisation acceptable"}</h2>
                    <p className="mb-4">Vous vous engagez à ne pas :</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>{"Violer toute loi ou réglementation applicable"}</li>
                        <li>{"Enfreindre les droits de propriété intellectuelle d'autrui"}</li>
                        <li>{"Transmettre du contenu illégal, offensant ou malveillant"}</li>
                        <li>{"Tenter d'accéder de manière non autorisée au service"}</li>
                        <li>{"Interférer avec le bon fonctionnement du service"}</li>
                        <li>{"Utiliser le service à des fins frauduleuses"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"5. Abonnements et paiements"}</h2>
                    <p className="mb-4">
                        {"Les abonnements sont facturés de manière récurrente selon la période choisie (mensuelle ou annuelle)."}
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>{"Les paiements sont traités de manière sécurisée via Stripe"}</li>
                        <li>{"Vous pouvez annuler votre abonnement à tout moment"}</li>
                        <li>{"Les remboursements sont soumis à notre politique de remboursement"}</li>
                        <li>{"Nous nous réservons le droit de modifier nos tarifs avec un préavis de 30 jours"}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"6. Propriété intellectuelle"}</h2>
                    <p className="mb-4">
                        {"Le service et son contenu original, ses fonctionnalités et ses fonctionnalités restent la propriété exclusive de l'entreprise et de ses concédants de licence. Le service est protégé par le droit d'auteur, les marques déposées et d'autres lois."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"7. Limitation de responsabilité"}</h2>
                    <p className="mb-4">
                        {"Dans toute la mesure permise par la loi applicable, nous ne serons en aucun cas responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris, sans limitation, la perte de profits, de données, d'utilisation, de bonne volonté ou d'autres pertes intangibles."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"8. Résiliation"}</h2>
                    <p className="mb-4">
                        {"Nous pouvons résilier ou suspendre votre compte et l'accès au service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez les présentes conditions."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"9. Modifications des conditions"}</h2>
                    <p className="mb-4">
                        {"Nous nous réservons le droit de modifier ou de remplacer ces conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"10. Loi applicable"}</h2>
                    <p className="mb-4">
                        {"Ces conditions sont régies et interprétées conformément aux lois de [Votre Pays/Juridiction], sans égard à ses dispositions en matière de conflit de lois."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{"11. Contact"}</h2>
                    <p className="mb-4">
                        {"Pour toute question concernant ces conditions, veuillez nous contacter à :"}
                    </p>
                    <ul className="list-none mb-4 space-y-2">
                        <li><strong>{"Email :"}</strong>{" contact@votre-domaine.com"}</li>
                        <li><strong>{"Adresse :"}</strong>{ " [Votre adresse]"}</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};
