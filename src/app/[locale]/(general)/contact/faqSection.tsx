import FaqCard from "@/components/cards/faqCard";
import { FAQ } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { getTranslations } from "next-intl/server";

export default async function FaqSection() {
  const t = await getTranslations("ContactPage.FaqSection");

  const res = await fetch(`${serverDomain}/api/faqs`);
  const data = await res.json();
  const faqs = data?.faqs;

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
          {faqs.map((faq: FAQ) => (
            <FaqCard key={faq?._id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
