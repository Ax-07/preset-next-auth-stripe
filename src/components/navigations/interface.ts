export interface NavbarProps {
    siteName: string;
    logo: {
        src: string;
        alt: string;
    };
    navItems: NavItem[];
    navLinks: NavLink[];
}

interface NavItem {
    title: string;
    subMenuItems: SubMenuItem[];
}

interface SubMenuItem {
    title: string;
    description: string;
    icon: {
        src: string;
        alt: string;
    };
    link: string;
}

interface NavLink {
    title: string;
    link: string;
}