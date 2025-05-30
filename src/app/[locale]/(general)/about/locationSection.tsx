import facebook from "@/assets/icons/facebook.png";
import messenger from "@/assets/icons/messenger.png";
import phone from "@/assets/icons/telephone.png";
import whatsapp from "@/assets/icons/whatsapp.png";
import youtube from "@/assets/icons/youtube.png";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { default as BaseLink } from "next/link";

export default function LocationSection() {
  const t = useTranslations("HomePage.ContactSection");

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("our")} <span className="text-gradient">{t("location")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("location-subtitle")}
        </span>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="aspect-video relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3638.6199969147297!2d90.41040687495233!3d24.22008497835274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375677189bda4c4f%3A0x1936586aeaf4ef58!2sDigital%20Computer!5e0!3m2!1sen!2sbd!4v1743764237706!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-2 border-primary w-full h-full rounded-lg"
            />
          </div>
          <div>
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
                    className="flex w-fit items-center gap-3"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <p>01334766160 ({t("office")})</p>
                  </BaseLink>
                  <BaseLink
                    href="tel:+8801334766163"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-3"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <p>01334766163 ({t("admission")})</p>
                  </BaseLink>
                  <BaseLink
                    href="tel:+8801715363919"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-3"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <p>01715363919 ({t("director")})</p>
                  </BaseLink>
                  <BaseLink
                    href="mailto:help@dctabd.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-3"
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
                    <Image
                      src={facebook}
                      alt="Facebook Icon"
                      className="w-10"
                    />
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
                    <Image
                      src={whatsapp}
                      alt="WhatsApp Icon"
                      className="w-10"
                    />
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
                  <div>{t("9to10")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
