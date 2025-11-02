// @/config/global.config.tsx
// Fichier de configuration globale du site

interface Logo {
    src: string;
    alt: string;
}

interface GlobalConfig {
    siteName: string;
    description?: string;
    favicon?: string;
    logo: Logo;
}

export const globalconfig: GlobalConfig = {
    // Nom du site
    siteName: "Acme",
    // Description du site
    description: "Description de Acme",
    // Favicon du site
    favicon: "/images/favicon.ico",
    // Logo du site
    logo: {
        src: "/vercel.svg",
        alt: "", // Placeholder to avoid circular reference
    },
};

// Update the alt property after initialization to avoid circular reference
globalconfig.logo.alt = `logo de ${globalconfig.siteName}`;

