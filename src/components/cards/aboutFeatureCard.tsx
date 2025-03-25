"use client";

import { convertToBanglaNumber } from "@/lib/convertToBanglaNumber";
import { useParams } from "next/navigation";

export default function AboutFeatureCard({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  const params = useParams();

  return (
    <div className="text-center">
      <span className="block text-3xl md:text-4xl font-semibold">
        {params?.locale === "bn" ? convertToBanglaNumber(number) : number}
      </span>
      <span>{text}</span>
    </div>
  );
}
