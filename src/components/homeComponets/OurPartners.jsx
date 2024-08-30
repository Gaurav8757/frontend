/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const OurPartners = ({ general, health }) => {
  return (
    <>
      <main className='container-fluid'>
        <section className="container-fluid  bg-white">
          <div className="text-start p-1 text-black bg-gradient-to-r from-slate-50  to-slate-50">
            <div className="ml-2 text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium">Life Insurance
              <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                <line x1="10" y1="50" x2="25" y2="50" stroke="red" strokeWidth="4" />
              </svg>
            </div>
            {/* swiper - 1 small screen*/}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={10}
              slidesPerView={3}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid px-4 hidden md:block xl:hidden'>
              {health.map((obj, idx) => (
                <SwiperSlide className='border-1 border-red-800' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full rounded-xl' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* swiper - 2 xl screen */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={30}
              slidesPerView={4}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid hidden lg:block xl:block px-4'>
              {health.map((obj, idx) => (
                <SwiperSlide className='border-1 border-red-800' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full rounded-xl' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* swiper - 3 xs screen */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={10}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid px-4 block sm:block md:hidden lg:hidden xl:hidden'>
              {health.map((obj, idx) => (
                <SwiperSlide className='border-1 border-red-800' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full rounded-xl' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="container-fluid  bg-gradient-to-r from-slate-50  to-slate-50">
          <div className="text-start p-1 text-black bg-gradient-to-r from-slate-50  to-slate-50 xl:mt-8 lg:mt-8 md:mt-8 sm:mt-8  mt-5">
            <div className="ml-2 text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium">General Insurance
              <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                <line x1="10" y1="50" x2="26" y2="50" stroke="red" strokeWidth="4" />
              </svg>
            </div>
            {/* Swiper - 1 xl lg screen */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={30}
              slidesPerView={4}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid px-4 relative hidden lg:block xl:block'>
              {general.map((obj, idx) => (
                <SwiperSlide className=' border-4 border-red-800' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full relative' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Swiper - 2 md sm screen */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={10}
              slidesPerView={4}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid px-4 relative hidden md:block xl:hidden'>
              {general.map((obj, idx) => (
                <SwiperSlide className=' border-4 border-red-800' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full relative' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>

             {/* Swiper - 3 xs sm screen */}
             <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={10}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid px-4 relative block sm:block md:hidden xl:hidden'>
              {general.map((obj, idx) => (
                <SwiperSlide className=' border-4 border-red-800' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full relative' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurPartners;
