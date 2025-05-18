import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Course } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { ArrowRight, BookOpenText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import CourseCard from "../../../components/cards/courseCard";

export default async function PopularCoursesSection() {
  const t = await getTranslations("HomePage.PopularCoursesSection");

  const res = await fetch(`${serverDomain}/api/courses/popular`);
  const data = await res.json();
  const popularCourses = data?.popularCourses;

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("title-1")} <span className="text-gradient">{t("title-2")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {popularCourses?.slice(0, 4)?.map((course: Course) => (
            <CourseCard key={course?._id} course={course} />
          ))}
          <Link
            href="/courses#courses"
            className="hidden lg:flex xl:hidden rounded-lg card-border lg:py-16 bg-light-primary justify-center items-center"
          >
            <div className="flex items-center gap-2 text-xl font-medium text-primary">
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gradient text-white">
                <ArrowRight size={24} />
              </div>
              <span>{t("view-all")}</span>
            </div>
          </Link>
        </div>
        <div className="lg:hidden xl:block text-center mt-6 lg:mt-8">
          <Button size="lg" asChild>
            <Link href="/courses#courses">
              <BookOpenText /> {t("view-all-courses")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
