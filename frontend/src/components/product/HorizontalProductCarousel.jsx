import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";

const HorizontalProductCarousel = ({ title, products = [] }) => (
  <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
    <h2 className="mb-3 text-lg font-bold">{title}</h2>
    <Swiper modules={[Navigation]} navigation spaceBetween={16} breakpoints={{ 320: { slidesPerView: 1.2 }, 768: { slidesPerView: 2.5 }, 1024: { slidesPerView: 4 } }}>
      {products.map((p) => (
        <SwiperSlide key={p.id}><ProductCard product={p} /></SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default HorizontalProductCarousel;
