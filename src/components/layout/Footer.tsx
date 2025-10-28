// Footer.tsx
import React from "react";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { navigationConfig } from "@/configs/navigation.config";
import { globalconfig } from "@/configs/global.config";

const Footer = () => {
  const sections = navigationConfig.navGroups.map((item) => ({
    title: item.title,
    links: item.subMenuItems.map((subItem) => ({
      name: subItem.title,
      href: subItem.link,
    })),
  }));

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com", icon: <FaXTwitter /> },
    { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin /> },
  ];

  const currentYear = new Date().getFullYear();

  return (
        <footer className="container px-16 py-32">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            <div className="col-span-2 mb-8 lg:mb-0 ">
              <div className="flex flex-col items-center justify-center gap-2 lg:items-start lg:justify-start">
              <Link href="/" className="flex items-center gap-2" aria-label="Home">
                <img
                  src={globalconfig.logo.src}
                  className="w-8 bg-white"
                  alt={globalconfig.logo.alt}
                />
                <span className="text-lg font-semibold">{globalconfig.siteName}</span>
              </Link>
              <p className="mt-4 font-bold">{globalconfig.description}</p>
              </div>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Social</h3>
              <ul className="space-y-4 text-muted-foreground">
                {socialLinks.map((link, idx) => (
                  <li key={idx} className="flex items-center font-medium hover:text-primary">
                    <a href={link.href} className="flex items-center gap-2">
                      {link.icon}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center lg:items-start">
            <p>© {currentYear} Copyright. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <a href="/politique-confidentialite" className="hover:underline">Politique de confidentialité</a>
              </li>
              <li className="underline hover:text-primary">
              <a href="/mentions-legales" className="hover:underline">Mentions légales</a>
              </li>
              <li className="underline hover:text-primary">
              <a href="/conditions-general-de-vente" className="hover:underline">Conditions générales de vente</a>
              </li>
            </ul>
          </div>
        </footer>
  );
};

export default Footer;
