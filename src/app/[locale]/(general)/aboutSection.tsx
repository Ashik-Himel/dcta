import aboutImg1 from "@/assets/section-images/about-img-1.jpg";
import aboutImg2 from "@/assets/section-images/about-img-2.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ReceiptText, UserRoundPen } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AboutFeatureCard from "../../../components/cards/aboutFeatureCard";

export default function AboutSection() {
  const t = useTranslations("HomePage.AboutSection");

  return (
    <section className="pb-16 md:pb-20 lg:pb-24 pt-4">
      <div className="container grid lg:grid-cols-2 gap-8 items-center">
        <div className="aspect-video relative">
          <Image
            src={aboutImg2}
            alt="About Section Image"
            className="object-cover rounded-lg w-3/5 absolute bottom-0 left-0"
          />
          <Image
            src={aboutImg1}
            alt="About Section Image"
            className="object-cover rounded-lg w-3/5 absolute top-0 right-0"
          />
        </div>
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
              <Link href="/about">
                <ReceiptText /> {t("about-us")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#contact">
                <UserRoundPen /> {t("contact-us")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
