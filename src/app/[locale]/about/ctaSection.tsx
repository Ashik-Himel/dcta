"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { Award, BookOpen, CheckCircle, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function CtaSection() {
  const t = useTranslations("AboutPage.CtaSection");
  const params = useParams();

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
                <Link href="/admission">{t("get-admission")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{t("contact-us")}</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2 p-4 bg-gradient text-white rounded-lg">
                <div className="flex justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">{t("feature-1-text")}</h3>
                <p>{t("feature-1-subtext")}</p>
              </div>
              <div className="space-y-2 p-4 bg-gradient text-white rounded-lg">
                <div className="flex justify-center">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">{t("feature-2-text")}</h3>
                <p>{t("feature-2-subtext")}</p>
              </div>
              <div className="space-y-2 p-4 bg-gradient text-white rounded-lg">
                <div className="flex justify-center">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">{t("feature-3-text")}</h3>
                <p>{t("feature-3-subtext")}</p>
              </div>
              <div className="space-y-2 p-4 bg-gradient text-white rounded-lg">
                <div className="flex justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">
                  {params?.locale === "bn"
                    ? convertToBanglaNumber(
                        (new Date().getFullYear() - 2009).toString()
                      )
                    : (new Date().getFullYear() - 2009).toString()}
                </h3>
                <p>{t("feature-4-subtext")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
