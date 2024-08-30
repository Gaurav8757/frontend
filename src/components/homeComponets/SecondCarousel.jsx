/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";

const SecondCarousel = ({ homesecondslider }) => {
  return (
    <section className="container-fluid bg-slate-50 ">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={16}
        slidesPerView={4} // Adjust the number of slides per view based on screen size
        // navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000, // Set the delay in milliseconds between slides
          disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
        }}
        className="p-4 px-4 w-auto h-auto md:block hidden"
      >
        {homesecondslider.map((obj, idx) => (
          <SwiperSlide className="border bg-red-800 rounded" key={idx}>
            {/* {console.log(obj.link)} */}
            <NavLink to={obj.link} target="_blank" rel="noopener noreferrer">
              <img
                src={obj.img}
                className="p-1 w-full rounded"
                alt={`slide-${idx}`}
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={8}
        slidesPerView={2} // Adjust the number of slides per view based on screen size
        // navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000, // Set the delay in milliseconds between slides
          disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
        }}
        className="p-1 mx-3 w-auto h-auto md:hidden"
      >
        {homesecondslider.map((obj, idx) => (
          <SwiperSlide className="border bg-red-800 rounded" key={idx}>
            {/* {console.log(obj.link)} */}
            <NavLink to={obj.link} target="_blank" rel="noopener noreferrer">
              <img
                src={obj.img}
                className="p-1 w-full rounded"
                alt={`slide-${idx}`}
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default SecondCarousel;
