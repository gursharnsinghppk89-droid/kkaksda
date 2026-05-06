import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const SliderImages = [
  'https://d2gwgwt9a7yxle.cloudfront.net/App811_Desktop_Slider_Image_2_de60ce52dc.png',
  'https://cdn.prod.website-files.com/6646d773658d32b01a2fcae3/66d84cf7a7b1a80e324f5398_Revolut%20-%20Blog%20(700%20x%20420%20px)%20(1).png',
  'https://telecomtalk.info/wp-content/uploads/2026/03/kotak-mahindra-bank-acquire-deutsche-banks-india.jpg',
  'https://assets.vccircle.com/uploads/2022/01/Kotaksj.jpg'
]

export default function HeroSlider() {
  return (
    <div className="swiper">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {SliderImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-[300px] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
