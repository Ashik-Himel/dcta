import FeatureCard from "./featureCard";

export default function FeaturesSection() {
  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureCard
          text={(new Date().getFullYear() - 2009).toString()}
          subtext="Years Training Experience"
        />
        <FeatureCard text="120K" subtext="Students Trained" />
        <FeatureCard text="95%" subtext="Student Satisfied" />
        <FeatureCard text="24/7" subtext="Support" />
      </div>
    </section>
  );
}
