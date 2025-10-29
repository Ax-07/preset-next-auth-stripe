// Footer.tsx
import React from "react";
import Image from "next/image";
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
    { name: "Twitter", href: "https://twitter.com", icon: <FaXTwitter className="size-5"/> },
    { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram className="size-5"/> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin className="size-5"/> },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-16 py-32">
      <div className="grid grid-cols gap-8 lg:grid-cols-8">
        <div className="md:col-span-5 space-y-6">
          {/* <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start"> */}
            <Link href="/" className="flex items-center gap-2" aria-label="Home">
              <Image
                src={globalconfig.logo.src}
                className="size-8 bg-white"
                alt={globalconfig.logo.alt}
                width={32}
                height={32}
              />
              <span className="text-lg font-semibold">{globalconfig.siteName}</span>
            </Link>
            <p className="text-muted-foreground">{globalconfig.description}</p>
          {/* </div> */}
          <ul className="flex items-center space-x-4 text-muted-foreground">
            {socialLinks.map((link, idx) => (
              <li key={idx} className="flex items-center font-medium hover:text-primary">
                <Link href={link.href}>
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h3 className="mb-4 font-bold">{section.title}</h3>
            <ul className="space-y-4 text-muted-foreground">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx} className="font-medium hover:text-primary">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center lg:items-start">
        <p>© {currentYear} Copyright. All rights reserved.</p>
        <ul className="md:flex gap-4">
          <li className="underline hover:text-primary">
            <Link href="/politique-confidentialite" className="hover:underline">
              Politique de confidentialité
            </Link>
          </li>
          <li className="underline hover:text-primary">
            <Link href="/mentions-legales" className="hover:underline">
              Mentions légales
            </Link>
          </li>
          <li className="underline hover:text-primary">
            <Link href="/conditions-general-de-vente" className="hover:underline">
              Conditions générales de vente
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
