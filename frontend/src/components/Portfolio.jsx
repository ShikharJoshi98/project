import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';

const Portfolio = () => {
    const images = ["/src/public/image-2.jpeg", "/src/public/image-3.jpeg", "/src/public/image-4.jpeg", "/src/public/image-5.jpeg", "/src/public/image-8 (1).jpeg", "/src/public/image-8 (3).jpeg"];

  return (
    <div  >
        <div className=' p-6 max-w-[326px]  md:max-w-[760px]  lg:max-w-[900px] h-auto mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
          <div className='flex flex-col items-center gap-7'>
          <h1 className='text-4xl text-center  font-semibold text-slate-800'>OUR PORTFOLIO</h1>
            <hr className='bg-[#4a9acc] mx-auto h-1 border-none rounded-sm  w-28 ' />
          </div>
          
          <Swiper
         centeredSlides={true}
        slidesPerView={1}
        spaceBetween={10}          
        loop={true}    
               
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
        }}
        
                  breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }} 
        modules={[Autoplay, Pagination]}
        className="mySwiper mt-13 mb-3  h-[440px] "
          >
           { images.map((image,index)=>(
           <SwiperSlide key={index}>
           <div  className='h-[400px] w-full  border-1 hover:scale-[101%] hover:shadow-md transition-all duration-300  bg-white/50 border-zinc-200/40 shadow-zinc-500 shadow-xs py-12 px-3.5 rounded-md '>
             <img src={image} className='h-[280px] w-full   object-cover rounded-md mx-auto' alt="" /> 
            </div>
             </SwiperSlide>
           )
           )
            }
            </Swiper>
          
        </div>
      </div>

      
      
  )
}

export default Portfolio