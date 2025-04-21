import contactImg from "@/assets/section-images/contact-img.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Contact } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ContactHeroSection() {
  const t = useTranslations("ContactPage.HeroSection");

  return (
    <section className="py-10 md:h-full md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-122.66px)] md:flex md:justify-center md:items-center">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-full bg-light-primary px-3 py-1 text-sm font-semibold text-primary">
              {t("pre-heading")}
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("heading-1")}{" "}
              <span className="text-gradient">{t("heading-2")}</span>{" "}
              {t("heading-3")}
            </h1>
            <p className="text-gray-600 md:text-xl/relaxed">
              {t("description")}
            </p>
            <Button size="lg" asChild>
              <Link href="/contact/#contact">
                <Contact /> {t("get-in-touch")}
              </Link>
            </Button>
          </div>
          <Image
            src={contactImg}
            alt="Courses Section Image"
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
