"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { Course } from "@/lib/models";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CourseCard({ course }: { course: Course }) {
  const params = useParams();
  const { locale } = params;
  const t = useTranslations("HomePage.PopularCoursesSection");
  const {
    thumbnail,
    title,
    titleBn,
    category,
    duration,
    slug,
    discountPrice,
    regularPrice,
    badge,
  } = course;

  return (
    <div className="rounded-lg card-border bg-background relative overflow-hidden flex flex-col">
      <Image
        src={thumbnail}
        alt={title}
        width={512}
        height={288}
        className="w-full aspect-video object-cover rounded-t-lg select-none"
      />
      {badge && (
        <span className="block w-[160px] text-center bg-gradient text-white absolute top-[29px] -left-[35px] py-0.5 -rotate-45 border-2 border-white select-none">
          {locale === "bn" ? badge?.textBn : badge?.text}
        </span>
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge>{locale === "bn" ? category?.textBn : category?.text}</Badge>
            <span className="text-sm">
              {t("duration")}:{" "}
              {locale === "bn" ? convertToBanglaNumber(duration) : duration}{" "}
              {duration > 1 ? t("months") : t("month")}
            </span>
          </div>
          <h4 className="text-lg font-semibold">
            {locale === "bn" ? titleBn : title}
          </h4>
          <div className="font-semibold flex items-center gap-2 mt-2 mb-4">
            <span className="text-primary text-2xl">
              &#2547;{" "}
              {locale === "bn"
                ? convertToBanglaNumber(discountPrice)
                : discountPrice}
            </span>
            <span className="text-gray line-through text-lg">
              {locale === "bn"
                ? convertToBanglaNumber(regularPrice)
                : regularPrice}
            </span>
          </div>
        </div>
        <Button className="w-full mt-auto" asChild>
          <Link
            href={
              slug
                ? `/admission?course=${slug}#admission`
                : "/admission#admission"
            }
          >
            {t("get-admission")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
