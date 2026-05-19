import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProductImageSlider = ({ images = [] }) => (
  <Swiper modules={[Navigation, Thumbs]} navigation className="rounded-xl">
    {images.map((image, i) => (
      <SwiperSlide key={i}>
        <img src={image} alt={`product-${i}`} className="h-[380px] w-full rounded-xl object-cover" />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default ProductImageSlider;
