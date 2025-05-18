"use client";

import { FAQ } from "@/lib/models";
import { useParams } from "next/navigation";

export default function FaqCard({ faq }: { faq: FAQ }) {
  const params = useParams();
  const { locale } = params;
  const { question, answer, questionBn, answerBn } = faq;

  return (
    <div className="space-y-2 bg-background p-6 rounded-lg">
      <h3 className="text-xl font-bold">
        {locale === "bn" ? questionBn : question}
      </h3>
      <p className="text-gray">{locale === "bn" ? answerBn : answer}</p>
    </div>
  );
}
