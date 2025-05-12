import facebook from "@/assets/icons/facebook.png";
import messenger from "@/assets/icons/messenger.png";
import phone from "@/assets/icons/telephone.png";
import whatsapp from "@/assets/icons/whatsapp.png";
import youtube from "@/assets/icons/youtube.png";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { default as BaseLink } from "next/link";
import ContactForm from "../../../components/forms/contactForm";

export default function ContactSection() {
  const t = useTranslations("HomePage.ContactSection");

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light-primary" id="contact">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("title-1")} <span className="text-gradient">{t("title-2")}</span>{" "}
            {t("title-3")}
          </h2>
          <p className="max-w-[700px] mx-auto text-gray md:text-lg mb-6 md:mb-8">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t("contact-information")}</h3>
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
                  <p>01334766160 ({t("office")})</p>
                </BaseLink>
                <BaseLink
                  href="tel:+8801334766163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <p>01334766163 ({t("admission")})</p>
                </BaseLink>
                <BaseLink
                  href="tel:+8801715363919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <p>01715363919 ({t("director")})</p>
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
              <h3 className="text-2xl font-bold">{t("socials-contacts")}</h3>
              <div className="flex gap-4">
                <BaseLink
                  href="https://www.facebook.com/dctamc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={facebook} alt="Facebook Icon" className="w-10" />
                </BaseLink>
                <BaseLink
                  href="https://m.me/dctamc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={messenger}
                    alt="Messenger Icon"
                    className="w-10"
                  />
                </BaseLink>
                <BaseLink
                  href="https://wa.me/+8801334766160"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={whatsapp} alt="WhatsApp Icon" className="w-10" />
                </BaseLink>
                <BaseLink
                  href="tel:+8801334766160"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={phone} alt="Telephone Icon" className="w-10" />
                </BaseLink>
                <BaseLink
                  href="https://www.youtube.com/@digitalcomputerstrainingac7975"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={youtube} alt="YouTube Icon" className="w-10" />
                </BaseLink>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t("office-hours")}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>{t("everyday")}</div>
                <div>9:00 AM - 10:00 PM</div>
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
  );
}
