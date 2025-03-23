export default function FeatureCard({
  text,
  subtext,
}: {
  text: string;
  subtext: string;
}) {
  return (
    <div className="p-6 rounded-lg card-border bg-background text-center">
      <span className="block text-4xl font-bold text-gradient mb-2">
        {text}
      </span>
      <span className="text-gray">{subtext}</span>
    </div>
  );
}
