import AdmissionFrom from "@/components/forms/admissionForm";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Get Admission - DCTA",
  description:
    "You can get admission in any courses of Digital Computer Training Academy from this page.",
};

export default function AdmissionPage() {
  const t = useTranslations("AdmissionPage.MainSection");

  return (
    <main>
      <section className="pb-12 md:pb-16 lg:pb-20 pt-10">
        <div className="container">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("title-1")} <span className="text-gradient">{t("title-2")}</span>{" "}
            {t("title-3")}
          </h2>
          <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
            {t("subtitle")}
          </span>

          <AdmissionFrom />
        </div>
      </section>
    </main>
  );
}
