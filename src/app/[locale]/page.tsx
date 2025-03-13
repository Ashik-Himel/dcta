import LangToggler from "@/components/language/langToggler";
import { ThemeToggler } from "@/components/theme/themeToggler";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <div className="container flex justify-between items-center gap-4 pt-6">
        <span>{t("HeroSection.test")} </span>
        <div className="flex gap-4">
          <LangToggler />
          <ThemeToggler />
        </div>
      </div>
    </main>
  );
}
