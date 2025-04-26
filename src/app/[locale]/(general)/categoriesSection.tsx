"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../../../components/cards/categoryCard";
import { categories } from "../../../data/categories";

export default function CategoriesSection() {
  const t = useTranslations("Information.Courses");
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
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <CategoryCard
                img={category.img}
                text={t(category.text)}
                courseCount={category.courseCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
