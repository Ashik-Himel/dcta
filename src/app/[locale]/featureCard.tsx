export default function FeatureCard({
  text,
  subtext,
}: {
  text: string;
  subtext: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-gray-300 dark:border-[#5A2A2A] bg-white dark:bg-[#472020] text-center">
      <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4">
        {text}
      </span>
      <span className="text-gray-500 dark:text-[#ffefef]">{subtext}</span>
    </div>
  );
}
