import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./banner.css";
import { Navigation, Autoplay } from "swiper";

const slider = [
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-16-pro-max-thu-cu-moi-home.jpg" },
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/poco-x7-moi-home.jpg" },
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-16-pro-max-thu-cu-moi-home.jpg",},
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s25-home-moi.png"},
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/m4-len-doi-tang-airpods-4.jpg" },
  {image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/asus.jpg" },
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
