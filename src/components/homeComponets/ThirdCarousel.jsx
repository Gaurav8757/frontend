/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';

const ThirdCarousel = ({ homethirdslider }) => {
    return (
        <section className="container-fluid bg-slate-100">
            <div className='pt-10 ml-2 mr-2 pb-8 items-center bg-slate-100'>
                {/* small screen */}
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    spaceBetween={2}
                    slidesPerView={1} // Adjust the number of slides per view based on screen size
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000, // Set the delay in milliseconds between slides
                        disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
                    }}
                    className='sm:hidden'
                    >
                    {homethirdslider.map((obj, idx) => (
                        <SwiperSlide className='  rounded ' key={idx}>
                            <NavLink to="#">
                                <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* medium screen */}
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    spaceBetween={3}
                    slidesPerView={2} // Adjust the number of slides per view based on screen size
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000, // Set the delay in milliseconds between slides
                        disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
                    }}
                    className='hidden sm:block lg:hidden'
                    >
                    {homethirdslider.map((obj, idx) => (
                        <SwiperSlide className='  rounded ' key={idx}>
                            <NavLink to="#">
                                <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* large screen */}
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    spaceBetween={4}
                    slidesPerView={3} // Adjust the number of slides per view based on screen size
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000, // Set the delay in milliseconds between slides
                        disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
                    }}
                    className='hidden  lg:block'
                    >
                    {homethirdslider.map((obj, idx) => (
                        <SwiperSlide className='  rounded ' key={idx}>
                            <NavLink to="#">
                                <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ThirdCarousel;
