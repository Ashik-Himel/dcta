"use client";

import { contactFaqs, contactFaqsBangla } from "@/data/faqs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function FaqSection() {
  const t = useTranslations("ContactPage.FaqSection");
  const params = useParams();

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("heading-1")}{" "}
          <span className="text-gradient">{t("heading-2")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("description")}
        </span>
        <div className="grid md:grid-cols-2 gap-6">
          {(params.locale === "en" ? contactFaqs : contactFaqsBangla).map(
            (faq, index) => (
              <div
                key={index}
                className="space-y-2 bg-background p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold">{faq.question}</h3>
                <p className="text-gray">{faq.answer}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
