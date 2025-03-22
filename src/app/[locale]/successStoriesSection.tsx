import storyThumbnail from "@/assets/stories/success-story.png";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FileVideo } from "lucide-react";
import { useTranslations } from "next-intl";
import StoryCard from "./storyCard";

export default function SuccessStoriesSection() {
  const t = useTranslations("HomePage.SuccessStoriesSection");

  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("success")} <span className="text-gradient">{t("stories")}</span>
        </h2>
        <span className="text-center max-w-[600px] mx-auto text-gray block mb-6 md:mb-10">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StoryCard
            thumbnail={storyThumbnail}
            embeddedLink="https://www.youtube.com/embed/K5l_l3Dp8cA?si=pMVe7iYQvNzh9hkj"
          />
          <StoryCard
            thumbnail={storyThumbnail}
            embeddedLink="https://www.youtube.com/embed/K5l_l3Dp8cA?si=pMVe7iYQvNzh9hkj"
          />
          <StoryCard
            thumbnail={storyThumbnail}
            embeddedLink="https://www.youtube.com/embed/K5l_l3Dp8cA?si=pMVe7iYQvNzh9hkj"
          />
          <StoryCard
            thumbnail={storyThumbnail}
            embeddedLink="https://www.youtube.com/embed/K5l_l3Dp8cA?si=pMVe7iYQvNzh9hkj"
          />
        </div>
        <div className="text-center mt-6 lg:mt-10">
          <Button size="lg" asChild>
            <Link href="/success-story">
              <FileVideo /> {t("see-more")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
