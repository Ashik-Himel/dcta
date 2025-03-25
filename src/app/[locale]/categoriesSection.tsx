"use client";

import basicComputer from "@/assets/icons/basic-computer.png";
import digitalMarketing from "@/assets/icons/digital-marketing.png";
import graphicDesign from "@/assets/icons/graphic-design.png";
import webDevelopment from "@/assets/icons/web-development.png";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../../components/cards/categoryCard";

export default function CategoriesSection() {
  const t = useTranslations("HomePage.CategoriesSection");
  const [slidesPerView, setSlidesPerView] = useState(1);

  const setSlidesPerViewFunc = () => {
    const width = window.innerWidth;
    if (width >= 1024) setSlidesPerView(4);
    else if (width >= 768) setSlidesPerView(3);
    else if (width >= 640) setSlidesPerView(2);
    else setSlidesPerView(1);
  };

  useEffect(() => {
    setSlidesPerViewFunc();
    window.addEventListener("resize", setSlidesPerViewFunc);
    return () => window.removeEventListener("resize", setSlidesPerViewFunc);
  }, []);

  return (
    <section className="pb-12 md:pb-16 lg:pb-20 pt-2 md:pt-6 lg:pt-10">
      <div className="container">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={24}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
        >
          <SwiperSlide>
            <CategoryCard
              img={basicComputer}
              text={t("basic-computer")}
              courseCount={2}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard
              img={webDevelopment}
              text={t("web-development")}
              courseCount={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard
              img={graphicDesign}
              text={t("graphic-design")}
              courseCount={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CategoryCard
              img={digitalMarketing}
              text={t("digital-marketing")}
              courseCount={1}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
