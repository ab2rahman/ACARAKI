"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import './styles.css';

const RunningText = () => {
  return (
    <div className="running-text-container bg-[#0394BF]">
      {/* Commented out slider - replaced with static divider */}
      {/* <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        freeMode={true}
        centeredSlides={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={10000}
        className="running-text-swiper"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index} className="running-text-slide">
            <Image 
              src={`/batik-1.svg`} 
              alt={`batik-${index}`} 
              width={675} 
              height={72} 
              className={`hidden lg:block ${index % 2 === 1 ? 'scale-x-[-1]' : ''}`}
            />
            <Image 
              src={`/batik-1.svg`} 
              alt={`batik-${index}`} 
              width={675} 
              height={50} 
              className={`lg:hidden ${index % 2 === 1 ? 'scale-x-[-1]' : ''}`}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      
      {/* Static horizontal repeating divider */}
      <div className="flex overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex-shrink-0">
            <Image 
              src={`/batik-1.svg`} 
              alt={`batik-divider-${index}`} 
              width={675} 
              height={72} 
              className={`hidden lg:block ${index % 2 === 1 ? 'scale-x-[-1]' : ''}`}
            />
            <Image 
              src={`/batik-1.svg`} 
              alt={`batik-divider-${index}`} 
              width={675} 
              height={50} 
              className={`lg:hidden ${index % 2 === 1 ? 'scale-x-[-1]' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningText;
