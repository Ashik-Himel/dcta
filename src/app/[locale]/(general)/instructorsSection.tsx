import { Instructor } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { getTranslations } from "next-intl/server";
import InstructorCard from "../../../components/cards/instructorCard";

export default async function InstructorsSection() {
  const t = await getTranslations("HomePage.InstructorsSection");

  const res = await fetch(`${serverDomain}/api/instructors`);
  const data = await res.json();
  const instructors = data?.instructors;

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("title-1")} <span className="text-gradient">{t("title-2")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {instructors?.map((instructor: Instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
