import aboutImg1 from "@/assets/section-images/about-img-1.jpg";
import aboutImg2 from "@/assets/section-images/about-img-2.jpg";
import AboutFeatureCard from "@/components/cards/aboutFeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BookOpenText, UserRoundPen } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");

  return (
    <section className="py-10 md:h-full md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-122.66px)] md:flex md:justify-center md:items-center">
      <div className="container grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("title-1")} <span className="text-gradient">{t("title-2")}</span>{" "}
            {t("title-3")}
          </h2>
          <p className="text-gray md:text-lg mb-6">{t("subtitle")}</p>
          <p className="mb-6">{t("description")}</p>
          <div className="mb-6 flex justify-between items-center gap-4 max-w-[400px]">
            <AboutFeatureCard number={1} text={t("branches")} />
            <AboutFeatureCard number={20} text={t("instructors")} />
            <AboutFeatureCard number={8} text={t("courses")} />
          </div>
          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/courses#courses">
                <BookOpenText /> {t("courses2")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about/#contact">
                <UserRoundPen /> {t("contact-us")}
              </Link>
            </Button>
          </div>
        </div>
        <div className="aspect-video relative">
          <Image
            src={aboutImg2}
            alt="About Section Image"
            className="object-cover rounded-lg w-3/5 absolute bottom-0 left-0"
          />
          <Image
            src={aboutImg1}
            alt="About Section Image 2"
            className="object-cover rounded-lg w-3/5 absolute top-0 right-0"
          />
        </div>
      </div>
    </section>
  );
}
