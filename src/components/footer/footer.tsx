import dctaLogoDark from "@/assets/dcta-logo-dark.png";
import dctaLogo from "@/assets/dcta-logo.png";
import facebook from "@/assets/icons/facebook.png";
import mail from "@/assets/icons/mail.png";
import phone from "@/assets/icons/telephone.png";
import youtube from "@/assets/icons/youtube.png";
import { Link } from "@/i18n/navigation";
import { Facebook, Github, Globe, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { default as BaseLink } from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");
  const t2 = useTranslations("Header");

  return (
    <footer>
      <div className="py-8 md:py-12 lg:py-16 bg-light-primary text-black dark:text-white">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-x-8 gap-y-8">
          <div className="sm:col-span-2 md:col-span-1">
            <Image
              src={dctaLogo}
              alt="UU CPC Logo"
              className="w-[180px] dark:hidden"
            />
            <Image
              src={dctaLogoDark}
              alt="UU CPC Logo"
              className="w-[180px] hidden dark:inline"
            />
            <p className="mt-4 max-w-[460px]">{t("description")}</p>
            <div className="text-primary mt-4 md:mt-6 flex items-center gap-4">
              <BaseLink
                href="https://www.facebook.com/dctamc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={facebook} alt="Facebook Icon" className="w-6" />
              </BaseLink>
              <BaseLink
                href="https://www.youtube.com/@digitalcomputerstrainingac7975"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={youtube} alt="YouTube Icon" className="w-6" />
              </BaseLink>
              <BaseLink
                href="mailto:support@dcta.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={mail} alt="Mail Icon" className="w-6" />
              </BaseLink>
              <BaseLink
                href="tel:+8801715363919"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={phone} alt="Telephone Icon" className="w-6" />
              </BaseLink>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-gradient text-2xl font-semibold mb-2">
              {t("quick-links")}
            </h4>
            <Link href="/">{t2("home")}</Link>
            <Link href="/courses">{t2("courses")}</Link>
            <Link href="/success-story">{t2("success-story")}</Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-gradient text-2xl font-semibold mb-2">
              {t("other-pages")}
            </h4>
            <Link href="/about">{t2("about")}</Link>
            <Link href="/contact">{t2("contact")}</Link>
            <Link href="/courses">{t2("courses")}</Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gradient text-white py-6">
        <div className="container text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            Developed by{" "}
            <BaseLink
              href="https://www.facebook.com/ashikujjaman.himel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Ashikujjaman Himel
            </BaseLink>
          </p>
          <div className="flex gap-6">
            <BaseLink
              href="https://www.facebook.com/ashikujjaman.himel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </BaseLink>
            <BaseLink
              href="https://www.linkedin.com/in/ashik-himel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </BaseLink>
            <BaseLink
              href="https://www.github.com/ashik-himel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </BaseLink>
            <BaseLink
              href="https://ashik-himel.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe />
            </BaseLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
