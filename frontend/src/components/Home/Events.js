"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import Cloud from '../Cloud';

const Events = ({ data }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (
            swiperRef.current &&
            swiperRef.current.params &&
            prevRef.current &&
            nextRef.current
        ) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [data.events.length]);

    return (
        <>
            <section id="kompetisi" className="events-section relative">
                <Cloud />
                <div className="container relative z-10">
                    <div className="flex flex-col gap-6 max-w-[1060px] mb-[20px]">
                        <h2 className="text-white">{data.title}</h2>
                        <p className="text-[20px]/[normal] text-white" dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                    <div className="events-swiper">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={false}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            centeredSlides={true}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 350,
                                modifier: 1,
                                slideShadows: true
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3, 
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                480: {
                                    slidesPerView: 1,
                                    autoHeight: false,
                                    spaceBetween: 28,
                                    coverflowEffect: {
                                        rotate: 0,
                                        stretch: 0,
                                        depth: 0,
                                    }
                                }
                            }}
                            mousewheel={{
                                thresholdDelta: 70,
                            }}
                            loopAdditionalSlides={2}
                            loop={true}
                            modules={[EffectCoverflow, Navigation]}
                            className="mySwiper"
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >   
                            {data.events.map((event) => (
                                <SwiperSlide key={event.id}>
                                    <div className="event-item">
                                        <div className="event-img">
                                            <Image src={event.img} alt={event.name} fill />
                                        </div>
                                        <div className="event-info">
                                            <div className="flex flex-row gap-2">
                                                <h3>{event.name}</h3>
                                                { event.link && <Link href={event.link} className='w-[33px] flex-shrink-0'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} viewBox="0 0 33 33" fill="none">
                                                        <path d="M16.5414 2.68481C13.8367 2.68481 11.1927 3.48686 8.94382 4.98953C6.69493 6.49219 4.94212 8.62799 3.90707 11.1268C2.87201 13.6257 2.6012 16.3753 3.12886 19.0281C3.65653 21.6808 4.95898 24.1176 6.87151 26.0301C8.78404 27.9426 11.2208 29.2451 13.8735 29.7727C16.5263 30.3004 19.2759 30.0296 21.7748 28.9945C24.2736 27.9595 26.4094 26.2067 27.9121 23.9578C29.4147 21.7089 30.2168 19.0649 30.2168 16.3602C30.2132 12.7343 28.7713 9.25799 26.2075 6.69413C23.6436 4.13027 20.1673 2.68835 16.5414 2.68481ZM23.3191 20.883C23.3191 21.2369 23.1785 21.5762 22.9283 21.8264C22.6781 22.0766 22.3387 22.2172 21.9849 22.2172C21.631 22.2172 21.2917 22.0766 21.0415 21.8264C20.7913 21.5762 20.6507 21.2369 20.6507 20.883V14.2121L12.0586 22.7909C11.9365 22.9214 11.7894 23.026 11.6261 23.0986C11.4628 23.1712 11.2866 23.2103 11.108 23.2136C10.9293 23.2169 10.7518 23.1843 10.5859 23.1177C10.4201 23.0511 10.2693 22.9519 10.1425 22.826C10.0157 22.7001 9.91544 22.55 9.84769 22.3846C9.77994 22.2193 9.74606 22.042 9.74807 21.8633C9.75008 21.6846 9.78794 21.5081 9.85939 21.3443C9.93085 21.1805 10.0344 21.0327 10.1641 20.9097L18.6895 12.3976H12.0186C11.6647 12.3976 11.3254 12.2571 11.0752 12.0069C10.825 11.7567 10.6844 11.4173 10.6844 11.0635C10.6844 10.7096 10.825 10.3703 11.0752 10.1201C11.3254 9.86985 11.6647 9.72928 12.0186 9.72928H20.5573C21.1606 9.72216 21.7485 9.91969 22.225 10.2896C22.3264 10.3501 22.4198 10.4213 22.5052 10.5031C22.5564 10.5417 22.5976 10.592 22.6253 10.6499C22.6631 10.6893 22.6946 10.7343 22.7187 10.7833C23.1011 11.2599 23.3083 11.8533 23.3057 12.4644L23.3191 20.883Z" fill="black" />
                                                    </svg>
                                                </Link>
                                                }
                                            </div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <svg className='flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width={29} height={29} viewBox="0 0 29 29" fill="none">
                                                    <path d="M11.1781 13.3954H8.80625V15.7672H11.1781V13.3954ZM15.9219 13.3954H13.55V15.7672H15.9219V13.3954ZM20.6656 13.3954H18.2937V15.7672H20.6656V13.3954ZM23.0375 5.0938H21.8516V2.72192H19.4797V5.0938H9.99219V2.72192H7.62031V5.0938H6.43437C5.11798 5.0938 4.07436 6.16114 4.07436 7.46567L4.0625 24.0688C4.0625 24.6979 4.31239 25.3012 4.75721 25.746C5.20202 26.1908 5.80531 26.4407 6.43437 26.4407H23.0375C24.342 26.4407 25.4094 25.3733 25.4094 24.0688V7.46567C25.4094 6.16114 24.342 5.0938 23.0375 5.0938ZM23.0375 24.0688H6.43437V11.0235H23.0375V24.0688Z" fill="black" />
                                                </svg>

                                                <p>{event.date}</p>
                                            </div>
                                        </div>
                                        <div className="bg-image">
                                            <Image src={event.img} alt={event.name} fill />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            {data.events.map((event) => (
                                <SwiperSlide key={event.id}>
                                    <div className="event-item">
                                        <div className="event-img">
                                            <Image src={event.img} alt={event.name} fill />
                                        </div>
                                        <div className="event-info">
                                            <div className="flex flex-row gap-2">
                                                <h3>{event.name}</h3>
                                                { event.link && <Link href={event.link} className='w-[33px] flex-shrink-0'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} viewBox="0 0 33 33" fill="none">
                                                        <path d="M16.5414 2.68481C13.8367 2.68481 11.1927 3.48686 8.94382 4.98953C6.69493 6.49219 4.94212 8.62799 3.90707 11.1268C2.87201 13.6257 2.6012 16.3753 3.12886 19.0281C3.65653 21.6808 4.95898 24.1176 6.87151 26.0301C8.78404 27.9426 11.2208 29.2451 13.8735 29.7727C16.5263 30.3004 19.2759 30.0296 21.7748 28.9945C24.2736 27.9595 26.4094 26.2067 27.9121 23.9578C29.4147 21.7089 30.2168 19.0649 30.2168 16.3602C30.2132 12.7343 28.7713 9.25799 26.2075 6.69413C23.6436 4.13027 20.1673 2.68835 16.5414 2.68481ZM23.3191 20.883C23.3191 21.2369 23.1785 21.5762 22.9283 21.8264C22.6781 22.0766 22.3387 22.2172 21.9849 22.2172C21.631 22.2172 21.2917 22.0766 21.0415 21.8264C20.7913 21.5762 20.6507 21.2369 20.6507 20.883V14.2121L12.0586 22.7909C11.9365 22.9214 11.7894 23.026 11.6261 23.0986C11.4628 23.1712 11.2866 23.2103 11.108 23.2136C10.9293 23.2169 10.7518 23.1843 10.5859 23.1177C10.4201 23.0511 10.2693 22.9519 10.1425 22.826C10.0157 22.7001 9.91544 22.55 9.84769 22.3846C9.77994 22.2193 9.74606 22.042 9.74807 21.8633C9.75008 21.6846 9.78794 21.5081 9.85939 21.3443C9.93085 21.1805 10.0344 21.0327 10.1641 20.9097L18.6895 12.3976H12.0186C11.6647 12.3976 11.3254 12.2571 11.0752 12.0069C10.825 11.7567 10.6844 11.4173 10.6844 11.0635C10.6844 10.7096 10.825 10.3703 11.0752 10.1201C11.3254 9.86985 11.6647 9.72928 12.0186 9.72928H20.5573C21.1606 9.72216 21.7485 9.91969 22.225 10.2896C22.3264 10.3501 22.4198 10.4213 22.5052 10.5031C22.5564 10.5417 22.5976 10.592 22.6253 10.6499C22.6631 10.6893 22.6946 10.7343 22.7187 10.7833C23.1011 11.2599 23.3083 11.8533 23.3057 12.4644L23.3191 20.883Z" fill="black" />
                                                    </svg>
                                                </Link> }
                                            </div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <svg className='flex-shrink-0' xmlns="http://www.w3.org/2000/svg" width={29} height={29} viewBox="0 0 29 29" fill="none">
                                                    <path d="M11.1781 13.3954H8.80625V15.7672H11.1781V13.3954ZM15.9219 13.3954H13.55V15.7672H15.9219V13.3954ZM20.6656 13.3954H18.2937V15.7672H20.6656V13.3954ZM23.0375 5.0938H21.8516V2.72192H19.4797V5.0938H9.99219V2.72192H7.62031V5.0938H6.43437C5.11798 5.0938 4.07436 6.16114 4.07436 7.46567L4.0625 24.0688C4.0625 24.6979 4.31239 25.3012 4.75721 25.746C5.20202 26.1908 5.80531 26.4407 6.43437 26.4407H23.0375C24.342 26.4407 25.4094 25.3733 25.4094 24.0688V7.46567C25.4094 6.16114 24.342 5.0938 23.0375 5.0938ZM23.0375 24.0688H6.43437V11.0235H23.0375V24.0688Z" fill="black" />
                                                </svg>

                                                <p>{event.date}</p>
                                            </div>
                                        </div>
                                        <div className="bg-image">
                                            <Image src={event.img} alt={event.name} fill />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-prev" ref={prevRef}></div>
                        <div className="swiper-button-next" ref={nextRef}></div>
                    </div>
                </div>
            </section>
            {/* <section id="daftar" className="mixology-section md:py-[55px]">
                <div className="container relative">
                    <div className="content">
                        <h2 className="text-white">{data.mixology.title}</h2>
                        <p className="text-[20px]/[normal] text-white" dangerouslySetInnerHTML={{ __html: data.mixology.description }} />
                        <Link href={data.mixology.link} className="btn">
                            Daftar Sekarang
                        </Link>
                    </div>
                    <div className="period">
                        <div className="title">Periode Pendaftaran {data.mixology.period}</div>
                    </div>
                    <div className="image">
                        <Image src={data.mixology.image} alt={data.mixology.title} fill />
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Events;