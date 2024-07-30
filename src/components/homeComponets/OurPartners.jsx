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
          <div className="text-start text-black bg-gradient-to-r from-slate-100  to-slate-200">
            <div className="text-3xl mx-12 py-5 font-medium">Life Insurance
              <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
              </svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={0}
              slidesPerView={4}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid '>
              {health.map((obj, idx) => (
                <SwiperSlide className='rounded-2xl pl-1 sm:pl-5 lg:pl-10 xl:pl-10 pr-1 sm:pr-5 lg:pr-10 xl:pr-20 pb-10' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full rounded-xl' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="container-fluid  bg-gradient-to-r from-slate-100  to-slate-200">
          <div className="text-start text-black bg-gradient-to-r from-slate-200  to-slate-100">
            <div className="text-3xl mx-10 py-5 font-medium">General Insurance
              <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
              </svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={0}
              slidesPerView={4}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid'>
              {general.map((obj, idx) => (
                <SwiperSlide className=' pl-1 sm:pl-5  xl:pl-10  pr-1 sm:pr-5 lg:pl-10  xl:pr-20 lg:pr-10 pb-10' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full rounded-xl' alt={`slide-${idx}`} />
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
