import { FaPhoneAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';

const Home = () => {
  const navigate = useNavigate();
  const contactCard = [{ location: "Dombivali Branch", phone: 888888888 }, { location: "Mulund Branch", phone: 8080848403 }];
  const images = ["/image-2.jpeg", "/image-3.jpeg", "/image-4.jpeg", "/image-5.jpeg", "/image-8 (1).jpeg", "/image-8 (3).jpeg"];

  return (
    <div className='bg-gradient-to-br p-10 from-blue-400 via-[#4a9acc] to-blue-900'>      
      <video autoPlay muted loop src="/wings.mp4" className=' max-w-[326px] mt-4 md:max-w-[760px] md:w-[90vw] lg:max-w-[900px] mx-auto shadow-gray-700 shadow-lg rounded-lg'></video>
      <div className='flex flex-col p-6 items-center gap-7 max-w-[326px] md:max-w-[760px] lg:max-w-[900px] mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
        <h1 className='text-xl md:text-3xl font-semibold text-slate-800'>FOR APPOINTMENTS</h1>
        <hr className='bg-[#4a9acc] h-1 border-none rounded-sm w-28'/>
        <h1 className='text-xl font-semibold mt-6 text-slate-800'>"Call Us"</h1>
        <div className='md:flex-row flex md:items-stretch flex-col gap-4 items-center'>
          {contactCard.map((detail) => (
            <div className='max-w-[210px] md:max-w-[300px] rounded-xl hover:shadow-gray-600 hover:shadow-2xs hover:scale-[102%] transition-all duration-300 flex flex-col items-center gap-4 p-10 h-auto bg-[#c0c0c0]'>
              <div className='w-auto px-5 h-auto py-3 border-white border-2 rounded-md text-center bg-[#afdbf5] '>
                <h1 className='text-lg font-bold text-zinc-900'>{detail.location}</h1>
              </div>
              <hr className='bg-[#4a9acc] h-1 border-none rounded-sm w-16 mt-2 ' />
              <div className='flex items-center gap-3 group '>
                <FaPhoneAlt style={{ width: '25px', height: '25px', color: 'white', backgroundColor: '#1e232f', padding: '5px', borderRadius: '50%', }} className='group-hover:rotate-[20deg]' />
                <h2 className='font-semibold'>{detail.phone}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className='flex mt-4 mb-4 items-center gap-6'>
          <h1 className='text-lg font-semibold'>Visit Us </h1>
          <button onClick={() => navigate('/register')} className='bg-blue-400 cursor-pointer hover:bg-blue-600 hover:scale-99 hover:text-gray-200 text-lg transition-all duration-300 text-white font-semibold w-40 h-10 rounded-full'>Register</button>
        </div>
      </div>
      <div className='flex flex-col p-5 items-center gap-5 max-w-[326px]  md:max-w-[760px]  lg:max-w-[900px] h-auto mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
        <h1 className='text-xl md:text-3xl font-semibold text-slate-800'>ABOUT DOCTOR</h1>
        <hr className='bg-[#4a9acc] h-1 border-none rounded-sm  w-28 ' />
        <h1 className='text-center text-lg font-semibold text-slate-800'>"Service to the Patient is Service to Nation "</h1>
        <div className='flex flex-col items-center gap-[6px]'>
          <img src="/Dr. Santosh Yadav.png" alt="" className='object-contain border-4 shadow-md shadow-zinc-500 border-zinc-500 rounded-md' />
          <h1 className='text-xl font-semibold'>Dr. Santosh K Yadav</h1>
          <h1 className='text-lg text-blue-600 font-bold'>M.D. (Homeopathy)</h1>
          <h1 className='text-lg text-blue-600 font-bold'>Ph.D.(Homeopathy)</h1>
          <h2 className='font-medium mt-2'>About Dr. Santosh K Yadav</h2>
          <div className='text-center flex flex-col gap-3 font-medium mb-6 text-xs md:text-sm'>
            <p >Dr. Santosh K Yadav is a consultant homeopathic doctor is flourishing homeopathic clinical practice in Dombivali and Mulund since 2000. All across India patient consulting him from various state and world wide. he is known too thousands of patients as a kind and lively homeopathy doctor. </p >
            <p>He is president of Wings medical foundation. He completed his BHMS (Bachelor of Homeopathic Medicine & Surgery) from Amravati university and done his post graduation( M.D Homoeopathy ) from aurangabad university.He also done Ph.D. in Homoeopathy field .</p>
          </div>
        </div>
      </div>
      <div className=' p-6 max-w-[326px]  md:max-w-[760px]  lg:max-w-[900px] h-auto mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
        <div className='flex flex-col items-center gap-7'>
          <h1 className='text-3xl text-center  font-semibold text-slate-800'>OUR PORTFOLIO</h1>
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
          className="mySwiper mt-13 mb-3  h-[440px] ">
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='h-[400px] w-full  border-1 hover:scale-[101%] hover:shadow-md transition-all duration-300  bg-white/50 border-zinc-200/40 shadow-zinc-500 shadow-xs py-12 px-3.5 rounded-md '>
                <img src={image} className='h-[280px] w-full   object-cover rounded-md mx-auto' alt="" />
              </div>
            </SwiperSlide>))}
        </Swiper>
      </div>      
    </div>
  )
}

export default Home