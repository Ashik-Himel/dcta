import { useTranslations } from "next-intl";

export default function InstructorsSection() {
  const t = useTranslations("HomePage.InstructorsSection");
  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("our")} <span className="text-gradient">{t("instructors")}</span>
        </h2>
        <span className="text-center max-w-[600px] mx-auto text-gray-600 dark:text-[#ffefef] block mb-6 md:mb-10">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      </div>
    </section>
  );
}
