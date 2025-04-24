import { courses } from "@/app/data/courses";
import CourseCard from "@/components/cards/courseCard";
import { useTranslations } from "next-intl";

export default function CoursesSection() {
  const t = useTranslations("HomePage.PopularCoursesSection");
  const t2 = useTranslations("Information.Courses");

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
          {courses?.map((course, index) => (
            <CourseCard
              key={index}
              thumbnail={course.thumbnail}
              category={t2(course.category)}
              duration={course.duration}
              title={t2(course.title)}
              discountPrice={course.discountPrice}
              regularPrice={course.regularPrice}
              slug={course.slug}
              badgeText={course?.badgeText ? t2(course.badgeText) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
