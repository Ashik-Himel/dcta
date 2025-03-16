import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <div className="container">
        <h1 className="mt-4">{t("HeroSection.test")}</h1>
      </div>
    </main>
  );
}
