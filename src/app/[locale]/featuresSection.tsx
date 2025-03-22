"use client";

import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import FeatureCard from "./featureCard";

export default function FeaturesSection() {
  const params = useParams();
  const t = useTranslations("HomePage.FeaturesSection");

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          text={
            params?.locale === "bn"
              ? convertToBanglaNumber(new Date().getFullYear() - 2009)
              : (new Date().getFullYear() - 2009).toString()
          }
          subtext={t("feature-1-subtext")}
        />
        <FeatureCard
          text={t("feature-2-text")}
          subtext={t("feature-2-subtext")}
        />
        <FeatureCard
          text={t("feature-3-text")}
          subtext={t("feature-3-subtext")}
        />
        <FeatureCard
          text={t("feature-4-text")}
          subtext={t("feature-4-subtext")}
        />
      </div>
    </section>
  );
}
