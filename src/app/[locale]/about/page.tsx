import { Metadata } from "next";
import ContactSection from "../contactSection";
import InstructorsSection from "../instructorsSection";
import AboutSection from "./aboutSection";
import LocationSection from "./locationSection";

export const metadata: Metadata = {
  title: "About Us - DCTA",
  description:
    "You will get all the details about Digital Computer Training Academy from this page.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
      <LocationSection />
      <InstructorsSection />
      <ContactSection />
    </main>
  );
}
