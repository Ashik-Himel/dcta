import dctaLogoDark from "@/assets/dcta-logo-dark.png";
import dctaLogo from "@/assets/dcta-logo.png";
import {
  BookOpenText,
  Contact,
  Home,
  Menu,
  ReceiptText,
  ScrollText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import DrawerNavLink from "./drawerNavLink";

export default function HeaderDrawer() {
  const t = useTranslations("Header");

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden cursor-pointer select-none" asChild>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[18rem] p-2 gap-0">
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
          <DrawerNavLink text={t("home")} href="/" icon={<Home size={16} />} />
          <DrawerNavLink
            text={t("about")}
            href="/about"
            icon={<ReceiptText size={16} />}
          />
          <DrawerNavLink
            text={t("success-story")}
            href="/success-story"
            icon={<ScrollText size={16} />}
          />
          <DrawerNavLink
            text={t("contact")}
            href="/contact"
            icon={<Contact size={16} />}
          />
          <DrawerNavLink
            text={t("courses")}
            href="/courses"
            icon={<BookOpenText size={16} />}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
