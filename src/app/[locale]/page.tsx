import { Metadata } from "next";
import CategoriesSection from "./categoriesSection";
import FeaturesSection from "./featuresSection";
import HeroSection from "./heroSection";
import InstructorsSection from "./instructorsSection";
import PopularCoursesSection from "./popularCoursesSection";
import SuccessStoriesSection from "./successStoriesSection";

export const metadata: Metadata = {
  title: "Digital Computer Training Academy",
  description:
    "This is the official website of the Digital Computer Training Academy. This academy runs various technical courses for students.",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <PopularCoursesSection />
      <FeaturesSection />
      <SuccessStoriesSection />
      <InstructorsSection />
    </main>
  );
}
