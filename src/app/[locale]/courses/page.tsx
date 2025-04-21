import { Metadata } from "next";
import CoursesHeroSection from "./coursesHeroSection";
import CoursesSection from "./coursesSection";
import CtaSection from "./ctaSection";

export const metadata: Metadata = {
  title: "Courses - DCTA",
  description:
    "You can get admission and complete the following courses in Digital Computer Training Academy.",
};

export default function CoursesPage() {
  return (
    <main>
      <CoursesHeroSection />
      <CoursesSection />
      <CtaSection />
    </main>
  );
}
