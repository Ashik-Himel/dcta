import dctaLogoDark from "@/assets/dcta-logo-dark.png";
import dctaLogo from "@/assets/dcta-logo.png";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import DrawerNavLink from "./drawerNavLink";
import { navLinks } from "./navLinks";

export default function HeaderDrawer() {
  const t = useTranslations("Header");

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden cursor-pointer select-none" asChild>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light-primary w-[18rem] p-2 gap-0"
      >
        <Image
          src={dctaLogo}
          alt="UU CPC Logo"
          className="dark:hidden max-w-[180px] p-2 mb-5"
        />
        <Image
          src={dctaLogoDark}
          alt="UU CPC Logo"
          className="hidden dark:inline max-w-[180px] p-2 mb-5"
        />
        <SheetTitle className="text-sidebar-foreground/70 text-base font-semibold uppercase my-2 px-2">
          {t("menu")}
        </SheetTitle>
        <nav className="space-y-1.5">
          {navLinks?.map((link) => (
            <DrawerNavLink
              key={link.href}
              text={t(link.text)}
              href={link.href}
              icon={<link.icon size={16} />}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
