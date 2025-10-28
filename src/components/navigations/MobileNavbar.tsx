import React, { Suspense } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { navigationConfig } from "@/configs/navigation.config";
import { Separator } from "@/components/ui/separator";
import { globalconfig } from "@/configs/global.config";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { AuthButtons } from "@/lib/auth/components/buttons/auth-buttons";
import { User } from "better-auth";

interface MobileHeaderProps {
  className?: string; // Prop validation for className
  user: User;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ className, user }) => {
  return (
    <header className={cn("lg:hidden", className)} aria-label="Main Navigation">
      {/* Logo and Menu Button */}
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <img src={navigationConfig.logo.src} className="w-8 bg-white" alt={navigationConfig.logo.alt} />
          <span className="text-lg font-semibold">{globalconfig.siteName}</span>
        </Link>
        <Sheet aria-describedby="mobile-menu">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open Menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto" aria-describedby="mobile-menu">
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-2" aria-label="Home">
                    <img src={navigationConfig.logo.src} className="w-8 bg-white" alt={navigationConfig.logo.alt} />
                    <span className="text-lg font-semibold">{navigationConfig.siteName}</span>
                  </Link>
                </SheetClose>
              </SheetTitle>
              <SheetDescription aria-describedby="mobile-menu"></SheetDescription>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                {navigationConfig.navGroups.map((item, idx) => (
                  <AccordionItem key={idx} value={item.title} className="border-b-0">
                    <AccordionTrigger className="mb-0 py-0 text-base font-semibold hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="mt-2">
                      {item.subMenuItems.map((subItem, idx) => (
                        <SheetClose asChild key={idx}>
                          <a
                            className={cn(
                              "flex items-start select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                            href={subItem.link}
                          >
                            <span className="shrink-0">{subItem.icon}</span>
                            <div>
                              <div className="text-sm font-semibold">{subItem.title}</div>
                              <p className="text-sm leading-snug text-muted-foreground">{subItem.description}</p>
                            </div>
                          </a>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {navigationConfig.navLinks.map((item, idx) => (
                <SheetClose asChild key={idx}>
                  <Link href={item.link} className={cn("")}>
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <Link href="/press" className="text-muted-foreground">
                Press
              </Link>
              <Link href="/contact" className="text-muted-foreground">
                Contact
              </Link>
              <Link href="/imprint" className="text-muted-foreground">
                Imprint
              </Link>
              <Link href="/sitemap" className="text-muted-foreground">
                Sitemap
              </Link>
            </div>
            <div className="mt-6 flex flex-col items-center gap-3">
              <SheetClose asChild>
                <Suspense fallback={<Skeleton className="h-9 w-32" />}>
                  <AuthButtons user={user}/>
                </Suspense>
              </SheetClose>
            </div>
            <SheetFooter className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <div className="flex shrink-0 justify-center">
                <span className="text-muted-foreground">© No rights reserved.</span>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

MobileHeader.displayName = "MobileNavbar";
