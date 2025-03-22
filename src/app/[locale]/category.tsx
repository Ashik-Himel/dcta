import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";

export default function Category({
  img,
  text,
  courseCount,
}: {
  img: StaticImageData;
  text: string;
  courseCount: number;
}) {
  const params = useParams();
  const t = useTranslations("HomePage.CategoriesSection");

  return (
    <div className="px-4 py-6 rounded-lg card-border bg-background text-center">
      <Image src={img} alt={text} className="w-[60px] inline-block mb-4" />
      <h4 className="text-xl font-semibold mb-2">{text}</h4>
      <span className="text-gray">
        {params?.locale === "bn"
          ? convertToBanglaNumber(courseCount)
          : courseCount}{" "}
        {courseCount > 1 ? t("courses") : t("course")}
      </span>
    </div>
  );
}
