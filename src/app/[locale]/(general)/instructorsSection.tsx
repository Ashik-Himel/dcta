import { useTranslations } from "next-intl";
import InstructorCard from "../../../components/cards/instructorCard";
import { instructors } from "../../../data/instructors";

export default function InstructorsSection() {
  const t = useTranslations("HomePage.InstructorsSection");

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("our")} <span className="text-gradient">{t("instructors")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {instructors?.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
