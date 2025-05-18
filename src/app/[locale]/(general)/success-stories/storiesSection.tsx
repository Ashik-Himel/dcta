import StoryCard from "@/components/cards/storyCard";
import { Story } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { getTranslations } from "next-intl/server";

export default async function Stories() {
  const t = await getTranslations("HomePage.SuccessStoriesSection");

  const res = await fetch(`${serverDomain}/api/stories`);
  const data = await res.json();
  const stories = data?.stories;

  return (
    <section
      className="pb-12 md:pb-16 lg:pb-20 pt-2 md:pt-6 lg:pt-10"
      id="stories"
    >
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("title-1")} <span className="text-gradient">{t("title-2")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories?.map((story: Story) => (
            <StoryCard key={story?._id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
