import { Metadata } from "next";
import ContactSection from "../contactSection";
import ContactHeroSection from "./contactHeroSection";
import CtaSection from "./ctaSection";
import FaqSection from "./faqSection";

export const metadata: Metadata = {
  title: "Contact Us - DCTA",
  description:
    "You can contact with Digital Computer Training Academy with the following contact information.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHeroSection />
      <ContactSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
