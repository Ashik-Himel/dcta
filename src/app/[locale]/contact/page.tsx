import ContactForm from "@/components/forms/contactForm";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { default as BaseLink } from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - DCTA",
  description:
    "You can contact with Digital Computer Training Academy with the following contact information.",
};

export default function ContactPage() {
  const t = useTranslations("HomePage.ContactSection");

  return (
    <main>
      <section className="pb-12 md:pb-16 lg:pb-20 pt-10">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {t("title-1")}{" "}
              <span className="text-gradient">{t("title-2")}</span>{" "}
              {t("title-3")}
            </h2>
            <p className="max-w-[700px] mx-auto text-gray md:text-lg mb-6 md:mb-8">
              {t("subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  {t("contact-information")}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p>{t("address")}</p>
                  </div>
                  <BaseLink
                    href="tel:+8801334766160"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <p>01334766160</p>
                  </BaseLink>
                  <BaseLink
                    href="mailto:help@dctabd.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <p>help@dctabd.net</p>
                  </BaseLink>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{t("follow-us")}</h3>
                <div className="flex gap-2">
                  <BaseLink
                    href="https://www.facebook.com/dctamc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary text-white w-10 h-10 flex items-center justify-center"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </BaseLink>
                  <BaseLink
                    href="https://www.youtube.com/@digitalcomputerstrainingac7975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary text-white w-10 h-10 flex items-center justify-center"
                  >
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </BaseLink>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{t("office-hours")}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>{t("sat-thurs")}</div>
                  <div>9:00 AM - 6:00 PM</div>
                  <div>{t("friday")}</div>
                  <div>10:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t("send-us-a-message")}</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
