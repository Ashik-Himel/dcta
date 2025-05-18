import heroImg from "@/assets/section-images/hero-img.jpeg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { BadgeCheck, BookOpenText, FileSliders, Play, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("HomePage.HeroSection");

  return (
    <section className="py-10 md:h-full md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-122.66px)] md:flex md:justify-center md:items-center">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 bg-gradient text-white rounded-full px-4 py-1.5 font-semibold mb-4">
            <BadgeCheck /> {t("pre-heading")}
          </span>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-[1.3]">
            {t("heading-1")}
            <br />
            <span className="text-gradient">{t("heading-2")}</span>
            {t("heading-3")}
          </h1>
          <p className="md:text-lg text-gray mb-8">{t("description")}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Button size="lg" asChild>
              <Link href="/admission#admission">
                <FileSliders /> {t("get-admission")}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses#courses">
                <BookOpenText /> {t("courses")}
              </Link>
            </Button>
          </div>
        </div>
        <Dialog>
          <DialogTrigger>
            <div className="relative aspect-video cursor-pointer select-none">
              <Image
                src={heroImg}
                alt="Hero Section Image"
                className="w-full aspect-video rounded-lg"
              />
              <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-primary text-white w-20 h-20 rounded-full flex justify-center items-center animate-pulse">
                <Play size={40} />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 !w-[90vw] !max-w-[800px]">
            <DialogClose className="absolute -top-12 -right-0 text-white cursor-pointer select-none">
              <X size={40} />
            </DialogClose>
            <DialogTitle className="sr-only">
              Digital Computer Training Academy
            </DialogTitle>
            <iframe
              src="https://www.youtube.com/embed/jASUTidpRpo?si=B8vuwC1BXQAxVSLz"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video rounded-lg"
            ></iframe>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
