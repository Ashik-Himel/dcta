import { Award, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MissionVisionSection() {
  const t = useTranslations("AboutPage.MissionVisionSection");

  return (
    <section className="pb-12 md:pb-16 lg:pb-20 pt-2 md:pt-6 lg:pt-10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 bg-background p-6 rounded-md">
            <div className="inline-flex items-center justify-center rounded-full bg-light-primary dark:bg-[#2f1010] p-2 text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">{t("mission")}</h2>
            <p className="text-gray">{t("mission-text")}</p>
          </div>
          <div className="space-y-4 bg-background p-6 rounded-md">
            <div className="inline-flex items-center justify-center rounded-full bg-light-primary dark:bg-[#2f1010] p-2 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">{t("vision")}</h2>
            <p className="text-gray">{t("vision-text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
