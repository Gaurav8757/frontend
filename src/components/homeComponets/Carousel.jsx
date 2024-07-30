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
    <section className="container-fluid max-w-md">
      <Suspense fallback={null}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={3}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="container-fluid mb-3 w-full mt-3 xs:w-2/3 sm:w-3/4 md:w-3/4 lg:w-full xl:w-full"
        >
          {APIData.map((obj, idx) => (
            <SwiperSlide key={idx}>
              <NavLink to="#">
                <img src={obj.usercarousel_upload} className="w-full" alt={`slide-${idx}`} loading="lazy" />
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </Suspense>
    </section>
  );
};

export default Carousel;
