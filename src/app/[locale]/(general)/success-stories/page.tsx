import { Metadata } from "next";
import CtaSection from "./ctaSection";
import StoriesHeroSection from "./storiesHeroSection";
import Stories from "./storiesSection";

export const metadata: Metadata = {
  title: "Success Story - DCTA",
  description:
    "Take a look at the feedbacks of the people who succeed in the various fields after completing the course from Digital Computer Training Academy.",
};

export default function SuccessStoryPage() {
  return (
    <main>
      <StoriesHeroSection />
      <Stories />
      <CtaSection />
    </main>
  );
}
