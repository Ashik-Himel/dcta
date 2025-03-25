import messenger from "@/assets/icons/messenger.png";
import phone from "@/assets/icons/telephone.png";
import whatsapp from "@/assets/icons/whatsapp.png";
import { useTranslations } from "next-intl";
import SocialIcon from "./socialIcon";

export default function FloatingSocialIcons() {
  const t = useTranslations("Socials");

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-4">
      <SocialIcon text={t("call-now")} icon={phone} link="tel:+8801334766160" />
      <SocialIcon
        text={t("whatsapp")}
        icon={whatsapp}
        link="https://wa.me/+8801334766160"
      />
      <SocialIcon
        text={t("messenger")}
        icon={messenger}
        link="https://m.me/dctamc"
      />
    </div>
  );
}
