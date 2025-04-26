import { Metadata } from "next";
import InstructorsSection from "../instructorsSection";
import AboutSection from "./aboutSection";
import CtaSection from "./ctaSection";
import LocationSection from "./locationSection";
import MissionVisionSection from "./missionVisionSection";

export const metadata: Metadata = {
  title: "About Us - DCTA",
  description:
    "You will get all the details about Digital Computer Training Academy from this page.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
      <MissionVisionSection />
      <LocationSection />
      <InstructorsSection />
      <CtaSection />
    </main>
  );
}
