import { Metadata } from "next";
import HeroSection from "./heroSection";

export const metadata: Metadata = {
  title: "Digital Computer Training Academy",
  description:
    "This is the official website of the Digital Computer Training Academy. This academy runs various technical courses for students.",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
