import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../index.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slidar = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/course1.jpg" loading="lazy" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/course2.jpg" loading="lazy" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/course18.jpg" loading="lazy" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slidar;
