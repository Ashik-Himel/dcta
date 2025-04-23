import admissionImg2 from "@/assets/section-images/admission-img-2.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CtaSection() {
  const t = useTranslations("AdmissionPage.CtaSection");

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-primary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-gradient text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("title")}
            </h2>
            <p className="md:text-xl/relaxed mb-6">{t("description")}</p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">{t("contact-us")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">{t("explore-courses")}</Link>
              </Button>
            </div>
          </div>
          <Image
            src={admissionImg2}
            alt="Admission Page Image"
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
