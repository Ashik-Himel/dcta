import { stories } from "@/app/data/stories";
import StoryCard from "@/components/cards/storyCard";
import { useTranslations } from "next-intl";

export default function Stories() {
  const t = useTranslations("HomePage.SuccessStoriesSection");

  return (
    <section
      className="pb-12 md:pb-16 lg:pb-20 pt-2 md:pt-6 lg:pt-10"
      id="stories"
    >
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("success")} <span className="text-gradient">{t("stories")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories?.map((story, index) => (
            <StoryCard
              key={index}
              avatar={story.avatar}
              name={story.name}
              role={story.role}
              thumbnailLink={story.thumbnailLink}
              videoUrl={story.videoUrl}
              course={story.course}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
