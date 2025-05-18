import CourseCard from "@/components/cards/courseCard";
import { Course } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { getTranslations } from "next-intl/server";

export default async function CoursesSection() {
  const t = await getTranslations("HomePage.PopularCoursesSection");

  const res = await fetch(`${serverDomain}/api/courses`);
  const data = await res.json();
  const courses = data?.courses;

  return (
    <section
      className="pb-12 md:pb-16 lg:pb-20 pt-2 md:pt-6 lg:pt-10"
      id="courses"
    >
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("our")} <span className="text-gradient">{t("courses")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle-2")}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {courses?.map((course: Course) => (
            <CourseCard key={course?._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
