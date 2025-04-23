import dctaLogoDark from "@/assets/dcta-logo-dark.png";
import dctaLogo from "@/assets/dcta-logo.png";
import { Link } from "@/i18n/navigation";
import { english } from "@/lib/fonts";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { default as BaseLink } from "next/link";
import LangToggler from "../language/langToggler";
import { ThemeToggler } from "../theme/themeToggler";
import { Button } from "../ui/button";
import HeaderDrawer from "./headerDrawer";
import NavLink from "./navLink";
import { navLinks } from "./navLinks";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <>
      <div className={`bg-gradient text-white py-3 ${english.className}`}>
        <div className="container flex justify-center min-[500px]:justify-between items-center">
          <div className="flex-1 lg:flex-auto flex justify-center min-[400px]:justify-between lg:justify-start items-center gap-8">
            <BaseLink
              className="flex items-center gap-2"
              href="tel:+8801334766160"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={18} />
              <span className="font-medium block">01334766160</span>
            </BaseLink>
            <BaseLink
              className="hidden min-[400px]:flex items-center gap-2 -mt-px"
              href="mailto:help@dctabd.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={18} />
              <span className="font-medium block -mt-0.5">help@dctabd.net</span>
            </BaseLink>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <LangToggler />
            <ThemeToggler />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#faf0f0]/60 dark:supports-[backdrop-filter]:bg-[#2f1010]/60">
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <HeaderDrawer />
            <Link href="/">
              <Image
                src={dctaLogo}
                alt="DCTA Logo"
                className="dark:hidden max-w-[120px] lg:max-w-[160px]"
              />
              <Image
                src={dctaLogoDark}
                alt="DCTA Logo"
                className="hidden dark:inline max-w-[120px] lg:max-w-[160px]"
              />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-lg font-medium [&>*]:hover:text-primary">
            {navLinks?.map((link, index) =>
              navLinks.length - 1 === index ? (
                <Button key={link.href} size="lg" asChild>
                  <Link
                    href={link.href}
                    className="!text-base hover:!text-white"
                  >
                    <link.icon /> {t(link.text)}
                  </Link>
                </Button>
              ) : (
                <NavLink key={link.href} text={t(link.text)} href={link.href} />
              )
            )}
          </nav>
          <div className="flex lg:hidden items-center gap-4">
            <LangToggler />
            <ThemeToggler />
          </div>
        </div>
      </header>
    </>
  );
}
