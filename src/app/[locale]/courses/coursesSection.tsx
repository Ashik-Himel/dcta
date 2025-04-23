import basicComputerApplication from "@/assets/courses/basic-computer-application.png";
import digitalMarketing from "@/assets/courses/digital-marketing.png";
import graphicDesign from "@/assets/courses/graphic-design.png";
import webDevelopment from "@/assets/courses/web-development.png";
import CourseCard from "@/components/cards/courseCard";
import { useTranslations } from "next-intl";

export default function CoursesSection() {
  const t = useTranslations("HomePage.PopularCoursesSection");

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
          <CourseCard
            thumbnail={basicComputerApplication}
            category={t("basic-computer")}
            duration={6}
            title={t("basic-computer-application")}
            discountPrice={7999}
            regularPrice={12000}
            slug="basic-computer-application"
            badgeText={t("top-selling")}
          />
          <CourseCard
            thumbnail={webDevelopment}
            category={t("web-development")}
            duration={6}
            title={t("web-development")}
            discountPrice={12000}
            regularPrice={20000}
            slug="web-development"
          />
          <CourseCard
            thumbnail={graphicDesign}
            category={t("graphic-design")}
            duration={6}
            title={t("graphic-design")}
            discountPrice={12000}
            regularPrice={20000}
            slug="graphic-design"
          />
          <CourseCard
            thumbnail={digitalMarketing}
            category={t("digital-marketing")}
            duration={6}
            title={t("advanced-digital-marketing")}
            discountPrice={12000}
            regularPrice={20000}
            slug="advanced-digital-marketing"
            badgeText={t("best-deal")}
          />
        </div>
      </div>
    </section>
  );
}
