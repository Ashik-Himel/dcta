import facebook from "@/assets/icons/facebook.png";
import phone from "@/assets/icons/telephone.png";
import omorFarokh from "@/assets/instructors/omor-farokh.jpg";
import { useTranslations } from "next-intl";
import InstructorCard from "./instructorCard";

export default function InstructorsSection() {
  const t = useTranslations("HomePage.InstructorsSection");

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-2">
          {t("our")} <span className="text-gradient">{t("instructors")}</span>
        </h2>
        <span className="text-center max-w-[600px] mx-auto text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          <InstructorCard
            image={omorFarokh}
            name={t("instructor-1-name")}
            title={t("instructor-1-title")}
            socials={[
              { icon: facebook, link: "https://www.facebook.com/omorfarokh.1" },
              { icon: phone, link: "tel:+8801715363919" },
            ]}
          />
          <InstructorCard
            image={omorFarokh}
            name={t("instructor-2-name")}
            title={t("instructor-2-title")}
            socials={[
              { icon: facebook, link: "https://www.facebook.com/omorfarokh.1" },
              { icon: phone, link: "tel:+8801715363919" },
            ]}
          />
          <InstructorCard
            image={omorFarokh}
            name={t("instructor-3-name")}
            title={t("instructor-3-title")}
            socials={[
              { icon: facebook, link: "https://www.facebook.com/omorfarokh.1" },
              { icon: phone, link: "tel:+8801715363919" },
            ]}
          />
          <InstructorCard
            image={omorFarokh}
            name={t("instructor-4-name")}
            title={t("instructor-4-title")}
            socials={[
              { icon: facebook, link: "https://www.facebook.com/omorfarokh.1" },
              { icon: phone, link: "tel:+8801715363919" },
            ]}
          />
          <InstructorCard
            image={omorFarokh}
            name={t("instructor-5-name")}
            title={t("instructor-5-title")}
            socials={[
              { icon: facebook, link: "https://www.facebook.com/omorfarokh.1" },
              { icon: phone, link: "tel:+8801715363919" },
            ]}
          />
          <InstructorCard
            image={omorFarokh}
            name={t("instructor-6-name")}
            title={t("instructor-6-title")}
            socials={[
              { icon: facebook, link: "https://www.facebook.com/omorfarokh.1" },
              { icon: phone, link: "tel:+8801715363919" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
