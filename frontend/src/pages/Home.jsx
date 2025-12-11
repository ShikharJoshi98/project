import { FaAngleRight, FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot, } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { docStore } from '../store/DocStore';
import { useEffect, useRef } from 'react';
import Underline from '../components/Underline';
import { Mail } from 'lucide-react';
import { aboutCards, clinicImages, iconMap } from '../store/data';


const Home = () => {
  const { clinicDetails, getClinicDetails } = docStore();
  const navigate = useNavigate();
  const contactUsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    getClinicDetails();
  }, []);

  useEffect(() => {
    if (location.hash === '#contact-us' && contactUsRef.current) {
      setTimeout(() => {
        contactUsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  const goToContactUs = () => {
    if (!contactUsRef.current) return;
    setTimeout(() => { contactUsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  };

  return (
    <div className='overflow-hidden'>
      <section className="bg-gradient-to-b from-[#ecf3fe] to-white pt-20 pb-14">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-[1240px] mx-auto px-6 md:px-20 lg:px-24 gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-blue-600 bg-blue-100 py-2 px-4 rounded-full border border-blue-500 w-fit mx-auto md:mx-0 text-sm font-semibold tracking-wide shadow-sm">HOMEOPATHIC CARE</h3>
            <h1 className="text-5xl md:text-[58px] lg:text-[64px] font-bold mt-5 leading-tight text-gray-800">Reviving Life</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 text-blue-500">Mind, Body & Spirit</h2>
            <p className="text-gray-600 mt-5 max-w-[507px] mx-auto md:mx-0 text-lg leading-relaxed">Experience the healing power of homeopathy — gentle, natural, and deeply restorative.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8">
              <button onClick={() => { navigate('/register'); window.scrollTo(0, 0); }} className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all text-white text-lg font-medium py-2 px-6 rounded-full shadow-md">Register</button>
              <button onClick={goToContactUs} className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 font-semibold">Contact Us <FaAngleRight /></button>
            </div>
          </div>
          <div className="bg-[#d9eaff] hidden md:block relative rounded-[2rem] transition-all">
            <div className="absolute -top-10 -right-18 px-5 py-4 rounded-[1.75rem] 
                    bg-white/80 border border-white/30 
                    shadow-xl hover:shadow-2xl transition-all duration-500 
                    flex flex-col items-center text-center">
              <p className="font-semibold text-3xl text-gray-800 drop-shadow-sm">
                15k+
              </p>
              <p className='text-gray-500 text-sm font-semibold text-center'>Satisfied Patients</p>
            </div>
            <div className="absolute -bottom-4 -left-24 px-5 py-4 rounded-[1.75rem] 
                    bg-white/90 border border-white/30 
                    shadow-xl hover:shadow-2xl transition-all duration-500 
                    flex flex-col items-center text-center">
              <p className="font-semibold text-lg text-gray-800 drop-shadow-sm">
                Dr. Santosh K Yadav
              </p>
              <p className='text-gray-500 text-sm font-semibold text-center'>M.D (Homeopathy)</p>
              <p className='text-gray-500 text-sm font-semibold text-center'>PhD (Homeopathy)</p>
            </div>
            <img
              src="./ChatGPT Image Oct 29, 2025, 12_41_43 PM.png"
              alt="Doctor Portrait"
              className="md:h-84 md:w-76 lg:h-96 lg:w-84 object-cover"
            />
          </div>
        </div>
      </section>
      <section id='contact-us' ref={contactUsRef} className="py-10 mt-10 max-w-6xl mx-auto">
        <div className='w-fit mx-auto'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide' >BOOK <span className='text-blue-500'>APPOINTMENT</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <p className="text-gray-500 text-lg text-center mt-8 mb-16 max-w-2xl mx-auto leading-relaxed">
          Reach out to our nearest branch to schedule your visit. Our friendly staff will assist you with all your queries.
        </p>
        <div className="grid md:grid-cols-2 px-2 sm:px-6 gap-10">
          {
            clinicDetails?.map((detail, index) => (
              <div key={index} className="bg-blue-500 sm:w-auto rounded-3xl p-6 sm:p-10 shadow-xl hover:scale-[1.01] hover:bg-blue-600 transition-all duration-300">
                <h3 className="text-lg sm:text-2xl text-wrap font-semibold bg-white border-2 border-gray-500 text-gray-600 shadow-lg py-2 rounded-lg mb-6 text-center">
                  {detail?.branch} Branch
                </h3>
                <div className="space-y-3 text-white text-base leading-relaxed">
                  <span className='flex gap-3 items-start'><FaLocationDot size={18} /> <p className='-mt-1'>102, Sanvi Apartment, 1st Floor, Near Shiv Sena Office, Gupte Road, Dombivli</p></span>
                  <span className='flex gap-3 items-start'><FaPhoneAlt size={18} />
                    {
                      <p className='-mt-[2px]'>{detail?.phone.join(', ')}</p>}
                  </span>
                  <span className='flex gap-3 items-start'><Mail size={18} /> <p className='-mt-1'>{detail?.email}</p></span>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <section className="py-10 px-10 mt-10 max-w-6xl mx-auto">
        <div className='w-fit mx-auto'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide'>ABOUT <span className='text-blue-500'>US</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <div className='py-10 mt-5 flex flex-col lg:flex-row items-start lg:justify-center lg:gap-10 xl:gap-24 gap-5'>
          <img src='./ChatGPT Image Oct 30, 2025, 09_35_44 PM.png' alt='Homeopathic Image' height={340} width={290} className='mx-auto lg:mx-0 rounded-t-full shadow-xl border-2 border-blue-500 lg:h-[595px] lg:w-[363px] xl:h-[555px] xl:w-[463px] object-cover' />
          <div className='px-4 mx-auto'>
            <div>
              <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-y-3 lg:w-fit items-center gap-5 text-zinc-600 mt-8 lg:mt-0'>
                {aboutCards?.map((card, i) => {
                  const Icon = iconMap[card?.icon];
                  return (
                    <div key={i} className={`p-3 rounded-xl lg:h-44 w-[99%] lg:max-w-[260px] shadow-sm ${card?.bg}`}>
                      <span className='flex items-center gap-3'>
                        <span className={`p-1 rounded-md ${card.color} text-white`}><Icon size={25} /></span>
                        <h5 className='font-semibold text-xl text-black'>{card?.title}</h5>
                      </span>
                      <p className='mt-5 text-sm'>{card?.desc}</p>
                    </div>)
                })}
              </div>
            </div>
            <ul className='list-none mt-10 flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-38 sm:gap-y-5 lg:gap-x-8 gap-5 font-semibold mb-10'>
              {(['Personalized Healing Plans', 'Care from Skilled Experts', 'Calm Environment', 'Restore Your Natural Balance']).map((detail, index) => (
                <li key={index} className="relative pl-10 before:content-['✔'] before:absolute before:left-0 before:top-1 before:bg-blue-500 before:text-white before:rounded-full before:w-5 before:h-5 before:flex before:items-center before:justify-center before:text-xs">{detail}</li>))}
            </ul>
            <button onClick={goToContactUs} className="bg-blue-500 hover:bg-blue-600 w-fit cursor-pointer transition-all text-white text-lg font-medium py-2 px-6 rounded-full shadow-md">Contact Us</button>
          </div>
        </div>
      </section>
      <section className='py-10'>
        <div className='w-fit mx-auto mb-14'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide' >ABOUT <span className='text-blue-500'>DOCTOR</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <div className='flex flex-col-reverse md:flex-row justify-between max-w-[1240px] mx-auto px-6 md:px-20 lg:px-24 gap-10'>
          <img src="./image-3(1).jpeg" alt="Doctor Image" className="md:h-84 md:w-76 lg:h-96 lg:w-[420px] object-cover rounded-xl" />
          <div className='flex flex-col items-center md:items-start'>
            <h1 className='text-3xl text-gray-700 font-semibold'>Dr. Santosh K Yadav</h1>
            <p className="text-gray-600 mt-5 max-w-[507px] mx-auto md:mx-0 leading-relaxed">Dr. Santosh K Yadav is a consultant homeopathic doctor is flourishing homeopathic clinical practice in Dombivali and Mulund since 2000. All across India patient consulting him from various state and world wide. He is known too thousands of patients as a kind and lively homeopathy doctor.</p>
            <p className="text-gray-600 mt-5 max-w-[507px] mx-auto md:mx-0 leading-relaxed">He is president of Wings medical foundation. He completed his BHMS (Bachelor of Homeopathic Medicine & Surgery) from Amravati university and done his post graduation( M.D Homoeopathy ) from aurangabad university. He also done PhD in Homoeopathy field.</p>
            <button onClick={goToContactUs} className="bg-blue-500 hover:bg-blue-600 w-fit mt-8 cursor-pointer transition-all text-white text-lg font-medium py-2 px-6 rounded-full shadow-md">Contact Us</button>
          </div>
        </div>
      </section>
      <section className='py-10 max-w-6xl mx-auto'>
        <div className='w-fit mx-auto mb-8'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide' >OUR <span className='text-blue-500'>CLINIC</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <h2 className='text-gray-700 tracking-wide text-xl sm:text-2xl text-center'>"Service To Patient is Service To Nation"</h2>
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
          {clinicImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='h-[400px] w-full  border-1 hover:scale-[101%] hover:shadow-md transition-all duration-300  bg-white/50 border-zinc-200/40 shadow-zinc-500 shadow-xs py-12 px-3.5 rounded-md '>
                <img src={image} className='h-[280px] w-full   object-cover rounded-md mx-auto' alt="" />
              </div>
            </SwiperSlide>))}
        </Swiper>
      </section>
    </div>
  )
}

export default Home