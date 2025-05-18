"use client";

import { Category } from "@/lib/models";
import { serverDomain } from "@/lib/variables";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../../../components/cards/categoryCard";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const setSlidesPerViewFunc = () => {
    const width = window.innerWidth;
    if (width >= 1024) setSlidesPerView(4);
    else if (width >= 768) setSlidesPerView(3);
    else if (width >= 640) setSlidesPerView(2);
    else setSlidesPerView(1);
  };

  useEffect(() => {
    fetch(`${serverDomain}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data?.categories));
  }, []);

  useEffect(() => {
    setSlidesPerViewFunc();
    window.addEventListener("resize", setSlidesPerViewFunc);
    return () => window.removeEventListener("resize", setSlidesPerViewFunc);
  }, []);

  if (categories?.length === 0) return null;

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
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
