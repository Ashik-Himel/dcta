import basicComputerApplication from "@/assets/courses/basic-computer-application.png";
import digitalMarketing from "@/assets/courses/digital-marketing.png";
import graphicDesign from "@/assets/courses/graphic-design.png";
import webDevelopment from "@/assets/courses/web-development.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpenText } from "lucide-react";
import { useTranslations } from "next-intl";
import CourseCard from "./courseCard";

export default function PopularCoursesSection() {
  const t = useTranslations("HomePage.PopularCoursesSection");

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("popular")} <span className="text-gradient">{t("courses")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <CourseCard
            thumbnail={basicComputerApplication}
            category={t("basic-computer")}
            duration={6}
            title={t("basic-computer-application")}
            discountPrice={7999}
            regularPrice={12000}
            link="/courses/basic-computer-application"
            badgeText={t("top-selling")}
          />
          <CourseCard
            thumbnail={webDevelopment}
            category={t("web-development")}
            duration={6}
            title={t("web-development")}
            discountPrice={12000}
            regularPrice={20000}
            link="/courses/web-development"
          />
          <CourseCard
            thumbnail={graphicDesign}
            category={t("graphic-design")}
            duration={6}
            title={t("graphic-design")}
            discountPrice={12000}
            regularPrice={20000}
            link="/courses/graphic-design"
          />
          <CourseCard
            thumbnail={digitalMarketing}
            category={t("digital-marketing")}
            duration={6}
            title={t("advanced-digital-marketing")}
            discountPrice={12000}
            regularPrice={20000}
            link="/courses/advanced-digital-marketing"
            badgeText={t("best-deal")}
          />
          <Link
            href="/courses"
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
            <Link href="/courses">
              <BookOpenText /> {t("view-all-courses")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
