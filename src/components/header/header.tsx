import dctaLogoDark from "@/assets/dcta-logo-dark.png";
import dctaLogo from "@/assets/dcta-logo.png";
import { Link } from "@/i18n/navigation";
import { english } from "@/lib/fonts";
import { BookOpenText, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { default as BaseLink } from "next/link";
import LangToggler from "../language/langToggler";
import { ThemeToggler } from "../theme/themeToggler";
import { Button } from "../ui/button";
import HeaderDrawer from "./headerDrawer";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header>
      <div className={`bg-gradient text-white py-[12px] ${english.className}`}>
        <div className="container flex justify-center min-[500px]:justify-between items-center">
          <div className="flex-1 lg:flex-auto flex justify-center min-[400px]:justify-between lg:justify-start items-center gap-8">
            <BaseLink
              className="flex items-center gap-2"
              href="tel:+8801715363919"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={18} />
              <span className="font-medium block">01715363919</span>
            </BaseLink>
            <BaseLink
              className="hidden min-[400px]:flex items-center gap-2 -mt-px"
              href="mailto:support@dcta.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={18} />
              <span className="font-medium block -mt-0.5">
                support@dcta.com
              </span>
            </BaseLink>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <LangToggler />
            <ThemeToggler />
          </div>
        </div>
      </div>

      <div>
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <HeaderDrawer />
            <Link href="/">
              <Image
                src={dctaLogo}
                alt="DCTA Logo"
                className="dark:hidden max-w-[120px] lg:max-w-[180px]"
              />
              <Image
                src={dctaLogoDark}
                alt="DCTA Logo"
                className="hidden dark:inline max-w-[120px] lg:max-w-[180px]"
              />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-lg font-medium [&>*]:hover:text-primary">
            <Link href="/">{t("home")}</Link>
            <Link href="/about">{t("about")}</Link>
            <Link href="/success-story">{t("success-story")}</Link>
            <Link href="/contact">{t("contact")}</Link>
            <Button size="lg" asChild>
              <Link href="/courses" className="!text-base hover:!text-white">
                <BookOpenText /> {t("courses")}
              </Link>
            </Button>
          </nav>
          <div className="flex lg:hidden items-center gap-4">
            <LangToggler />
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
}
