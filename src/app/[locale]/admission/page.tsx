import { Metadata } from "next";
import AdmissionHeroSection from "./admissionHeroSection";
import AdmissionSection from "./admissionSection";
import CtaSection from "./ctaSection";

export const metadata: Metadata = {
  title: "Get Admission - DCTA",
  description:
    "You can get admission in any courses of Digital Computer Training Academy from this page.",
};

export default function AdmissionPage() {
  return (
    <main>
      <AdmissionHeroSection />
      <AdmissionSection />
      <CtaSection />
    </main>
  );
}
