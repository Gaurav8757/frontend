/* eslint-disable react/prop-types */
import  { useState, useEffect,  Suspense } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import VITE_DATA from '../../config/config.jsx';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

const Carousel = () => {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_DATA}/users/first/view`);
        setAPIData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex justify-center container min-h-96">
    <Suspense fallback={null}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="container border-0 border-black max-h-fit  "
      >
        {APIData.map((obj, idx) => (
          <SwiperSlide key={idx} className="flex justify-center min-w-screen-2xl">
            <NavLink to="#" className="container-fluid  min-h-fit min-w-screen-2xl bg-contain bg-clip-border">
              <img 
                src={obj.usercarousel_upload}
                // srcSet={`${obj.usercarousel_upload} 420w, ${obj.usercarousel_upload} 768w, ${obj.usercarousel_upload} 1200w`}
                // sizes="(max-width: 420px) 280px, (max-width: 768px) 680px, (max-width: 1200px) 500px, 100vw"
                className="brightness-100 contrast-125 bg-contain" 
                alt={`slide-${idx}`}
                loading="lazy" 
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </Suspense>
  </section>
  
  );
};

export default Carousel;
