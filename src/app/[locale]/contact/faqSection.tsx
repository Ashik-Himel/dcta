"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const faqs = [
  {
    question: "How quickly will I receive a response to my inquiry?",
    answer:
      "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, we recommend calling our main phone number.",
  },
  {
    question: "Can I schedule a campus visit?",
    answer:
      "Yes, we welcome campus visits. Please contact our admissions office to schedule a tour of our facilities and meet with our instructors.",
  },
  {
    question: "Do you offer virtual consultations?",
    answer:
      "Yes, we offer virtual consultations via video call for those who cannot visit our campus in person. Please indicate your preference when contacting us.",
  },
  {
    question: "How can I get detailed information about a specific course?",
    answer:
      "You can find detailed information about our courses on our website. For specific questions, you can contact us through this form or call our admissions office.",
  },
];

const faqsBangla = [
  {
    question: "আমি কত দ্রুত আমার জিজ্ঞাসার উত্তর পাবো?",
    answer:
      "আমরা ব্যবসায়িক দিনের মধ্যে ২৪-৪৮ ঘণ্টার মধ্যে সব জিজ্ঞাসার উত্তর দেওয়ার চেষ্টা করি। জরুরি বিষয়ে আমাদের প্রধান ফোন নম্বরে কল করার পরামর্শ দেওয়া হয়।",
  },
  {
    question: "আমি কি ক্যাম্পাস ভিজিটের জন্য সময় নির্ধারণ করতে পারি?",
    answer:
      "হ্যাঁ, আমরা ক্যাম্পাস ভিজিটে স্বাগতম জানাই। আমাদের অ্যাডমিশন অফিসে যোগাযোগ করে আপনি আমাদের সুবিধাসমূহ ঘুরে দেখার এবং শিক্ষকদের সাথে সাক্ষাতের জন্য সময় নির্ধারণ করতে পারেন।",
  },
  {
    question: "আপনারা কি ভার্চুয়াল পরামর্শ প্রদান করেন?",
    answer:
      "হ্যাঁ, যারা সরাসরি ক্যাম্পাসে আসতে পারেন না তাদের জন্য আমরা ভিডিও কলের মাধ্যমে ভার্চুয়াল পরামর্শ সেবা প্রদান করি। যোগাযোগ করার সময় অনুগ্রহ করে আপনার পছন্দ উল্লেখ করুন।",
  },
  {
    question:
      "আমি কীভাবে একটি নির্দিষ্ট কোর্স সম্পর্কে বিস্তারিত তথ্য পেতে পারি?",
    answer:
      "আমাদের ওয়েবসাইটে আপনি কোর্স সম্পর্কে বিস্তারিত তথ্য পাবেন। নির্দিষ্ট প্রশ্নের জন্য আপনি এই ফর্মের মাধ্যমে বা আমাদের অ্যাডমিশন অফিসে কল করে যোগাযোগ করতে পারেন।",
  },
];

export default function FaqSection() {
  const t = useTranslations("ContactPage.FaqSection");
  const params = useParams();

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("heading-1")}{" "}
          <span className="text-gradient">{t("heading-2")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("description")}
        </span>
        <div className="grid md:grid-cols-2 gap-6">
          {(params.locale === "en" ? faqs : faqsBangla).map((faq, index) => (
            <div key={index} className="space-y-2 bg-background p-6 rounded-lg">
              <h3 className="text-xl font-bold">{faq.question}</h3>
              <p className="text-gray">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
