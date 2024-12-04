import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./banner.css";
import { Navigation, Autoplay } from "swiper";

const slider = [
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.webp" },
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/samsung-s24-ultra-home-20-11.webp" },
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/home-oppo-find-x8-gia-moi-20-11.webp",},
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/Sliding-Preord.jpg"},
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tecno-camon-30s-banner-home.webp" },
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/home-huawei-watch-d2-02-12-24.webp" },
];

export default function Banner() {
  return (
    <div className="aspect-[720/220] mt-6 rounded-md overflow-hidden border-none">
      <Swiper
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {slider.map((p) => (
          <SwiperSlide key={p.image}>
            <img src={p.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
