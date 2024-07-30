import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import VITE_DATA from '../../config/config.jsx';

const FourthCarousel = () => {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios
            .get(`${VITE_DATA}/users/activeusers`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <section className="container-fluid  bg-gradient-to-r from-white to-slate-100">
            <div className="pt-10 p-2 pb-4 text-start  bg-gradient-to-r from-white to-slate-100">
                <div className="col">
                    <div className="text-3xl mx-6 font-medium">What Our Customers
                        Are Saying
                        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-10 -ml-3">
                            <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
                        </svg>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                        spaceBetween={2}
                        slidesPerView={3}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        className='flex justify-center items-center   w-11/12 mt-5   sm:w-full md:w-11/12 lg:w-11/12 xl:11/12 sm:text-lg md:text-lg xl:2xl text-md'>
                        {APIData.map((obj) => (
                            <SwiperSlide key={obj._id}>
                                <div className="w-full max-w-md border rounded-md shadow  border-teal-800">
                                    <div className=" text-center px-4 p-2">
                                        <h1 className=' text-xl font-medium text-blue-700'>
                                            {obj.feedbackuser_name}
                                        </h1>
                                        <p className='mt-1 text-justify text-gray-900'>
                                            {obj.feedbackuser_query}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default FourthCarousel;
