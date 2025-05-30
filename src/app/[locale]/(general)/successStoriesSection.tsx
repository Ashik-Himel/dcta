import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Story } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { ArrowRight, FileVideo } from "lucide-react";
import { getTranslations } from "next-intl/server";
import StoryCard from "../../../components/cards/storyCard";

export default async function SuccessStoriesSection() {
  const t = await getTranslations("HomePage.SuccessStoriesSection");

  const res = await fetch(`${serverDomain}/api/stories/featured`);
  const data = await res.json();
  const featuredStories = data?.featuredStories;

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("title-1")} <span className="text-gradient">{t("title-2")}</span>
        </h2>
        <span className="text-center max-w-[700px] mx-auto md:text-lg text-gray block mb-6 md:mb-8">
          {t("subtitle")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories?.slice(0, 3)?.map((story: Story) => (
            <StoryCard key={story?._id} story={story} />
          ))}
          <Link
            href="/success-stories#stories"
            className="hidden md:flex lg:hidden rounded-lg card-border py-16 bg-light-primary justify-center items-center"
          >
            <div className="flex items-center gap-2 text-xl font-medium text-primary">
              <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gradient text-white">
                <ArrowRight size={24} />
              </div>
              <span>{t("see-more")}</span>
            </div>
          </Link>
        </div>
        <div className="text-center mt-6 lg:mt-8 md:hidden lg:block">
          <Button size="lg" asChild>
            <Link href="/success-stories#stories">
              <FileVideo /> {t("see-more")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
