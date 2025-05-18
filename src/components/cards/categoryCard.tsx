"use client";

import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { Category } from "@/lib/models";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CategoryCard({ category }: { category: Category }) {
  const params = useParams();
  const { locale } = params;
  const t = useTranslations("HomePage.CategoriesSection");
  const { img, text, textBn, courseCount } = category;

  return (
    <div className="px-4 py-6 rounded-lg card-border bg-background text-center">
      <Image
        src={img}
        alt={text}
        width={60}
        height={60}
        className="w-[60px] inline-block mb-4"
      />
      <h4 className="text-xl font-semibold mb-2">
        {locale === "bn" ? textBn : text}
      </h4>
      <span className="text-gray">
        {locale === "bn"
          ? convertToBanglaNumber(courseCount || 0)
          : courseCount}{" "}
        {(courseCount || 0) > 1 ? t("courses") : t("course")}
      </span>
    </div>
  );
}
