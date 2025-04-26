import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';
import { capabilities } from "../data/capabilities";
import GetInTouchForm from './GetintouchForm';

const CapabilityCarousel = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);

    const swiperRef = useRef(null);

    return (
        <div className="carousel-container">
            <h2 className="main-title">70+ Offerings that allow you to Focus on your core tasks</h2>


            <h2 className='carousel-title'>
                {capabilities[activeIndex]?.title}
            </h2>

            <Swiper
                modules={[Navigation, Pagination]}
                loop={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={0}
                pagination={{ clickable: true, el: '.custom-pagination' }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                className="custom-swiper"
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {capabilities.map((cap, index) => (
                    <SwiperSlide key={cap.id} virtualIndex={index}>
                        <div
                            className={`carousel-slide ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => {
                                if (swiperRef.current) {
                                    swiperRef.current.slideToLoop(index, 500);
                                }
                            }}
                        >
                            <h3 className="slide-title">{cap.title}</h3>
                            <div className="icons-grid">
                                {cap.icons.map((icon, i) => (
                                    <div key={i} className="icon-item">
                                        <div className="icon-placeholder" />
                                        <p className="icon-label">{icon}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-pagination" />

            <h2 className='pt-5 text-2xl'>Send us your requirements, and get a response within 10 minutes</h2>
            <p>That's how we keep ourselves Faster than the Fastest</p>

            <button onClick={() => setShowForm(true)} className='p-2 mt-4 bg-[#EA7B2C] rounded-md'>GET IN TOUCH</button>

            {showForm && <GetInTouchForm onClose={() => setShowForm(false)} />}

        </div>
    );
};

export default CapabilityCarousel;
