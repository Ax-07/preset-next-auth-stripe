import React, { Suspense } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { ListItem } from "./ListItem";
import Link from "next/link";
import { navigationConfig } from "@/configs/navigation.config";
import { globalconfig } from "@/configs/global.config";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { AuthButtons } from "@/lib/auth/components/buttons/auth-buttons";
import { User } from "better-auth";
import Image from "next/image";

interface DeskTopHeaderProps {
  className?: string;
  user: User
}

export const DesktopHeader: React.FC<DeskTopHeaderProps>  = ({className, user}) => {
  return (
    <header
      className={cn("hidden lg:flex items-center justify-between px-4 py-2", className)}
      aria-label="Main Navigation"
    >
      <div className="flex items-center gap-6">
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
        <nav className="flex items-center" aria-label="Main Navigation">
          <NavigationMenu>
            <NavigationMenuList>
          {/* Affichage des groupes de navigation */}
              {navigationConfig.navGroups.map((item, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuTrigger className="text-muted-foreground">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-80 p-3">
                      {item.subMenuItems.map((subItem, idx) => (
                        <ListItem
                          key={idx}
                          title={subItem.title}
                          href={subItem.link}
                          icon={subItem.icon}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
          {navigationConfig.navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className={cn(
                "text-muted-foreground",
                navigationMenuTriggerStyle,
                buttonVariants({ variant: "ghost" })
              )}
            >
              {item.title}
            </Link>
          ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
            <div className="flex items-center gap-3">
        <Suspense fallback={<Skeleton className="h-9 w-32" />}>
          <AuthButtons user={user} />
        </Suspense>
      </div>
    </header>
  );
};
