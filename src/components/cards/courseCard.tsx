"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";

interface CourseCardProps {
  thumbnail: StaticImageData;
  category: string;
  duration: number;
  title: string;
  discountPrice: number;
  regularPrice: number;
  link: string;
  badgeText?: string;
}

export default function CourseCard({
  thumbnail,
  category,
  duration,
  title,
  discountPrice,
  regularPrice,
  link,
  badgeText = "",
}: CourseCardProps) {
  const params = useParams();
  const t = useTranslations("HomePage.PopularCoursesSection");

  return (
    <div className="rounded-lg card-border bg-background relative overflow-hidden flex flex-col">
      <Image
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover rounded-t-lg select-none"
      />
      {badgeText && (
        <span className="block w-[160px] text-center bg-gradient text-white absolute top-[29px] -left-[35px] py-0.5 -rotate-45 border-2 border-white select-none">
          {badgeText}
        </span>
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge>{category}</Badge>
            <span className="text-sm">
              {t("duration")}:{" "}
              {params?.locale === "bn"
                ? convertToBanglaNumber(duration.toString())
                : duration}{" "}
              {duration > 1 ? t("months") : t("month")}
            </span>
          </div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <div className="font-semibold flex items-center gap-2 mt-2 mb-4">
            <span className="text-primary text-2xl">
              &#2547;{" "}
              {params?.locale === "bn"
                ? convertToBanglaNumber(discountPrice.toString())
                : discountPrice}
            </span>
            <span className="text-gray line-through text-lg">
              {params?.locale === "bn"
                ? convertToBanglaNumber(regularPrice.toString())
                : regularPrice}
            </span>
          </div>
        </div>
        <Button className="w-full mt-auto" asChild>
          <Link href={link}>
            <Info /> {t("view-details")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
