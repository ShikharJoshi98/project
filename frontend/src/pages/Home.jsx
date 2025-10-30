import { FaAngleRight, FaClinicMedical, FaGlobe, FaPhoneAlt, FaHandHoldingHeart } from 'react-icons/fa'
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { docStore } from '../store/DocStore';
import { useEffect } from 'react';
import Underline from '../components/Underline';
import { GiThreeLeaves } from "react-icons/gi";
import { Mail } from 'lucide-react';
import { CgSandClock } from "react-icons/cg";
import { GiStairsGoal } from "react-icons/gi";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiMedicinePills } from "react-icons/gi";


const Home = () => {
  const { clinicDetails, getClinicDetails } = docStore();
  const navigate = useNavigate();
  const iconMap = {
    FaUserDoctor: <FaUserDoctor size={25} />,
    GiThreeLeaves: <GiThreeLeaves size={25} />,
    GiMedicinePills: <GiMedicinePills size={25} />,
    FaHandHoldingHeart: <FaHandHoldingHeart size={25} />,
  };
  const aboutCards = [
    {
      title: "Our Philosophy",
      desc: "At our clinic, we believe in healing the whole person — mind, body, and spirit. Our approach focuses on natural remedies that restore balance and long-term wellness.",
      color: "bg-green-500",
      icon: "GiThreeLeaves",
      bg: "bg-[#E4FEEF]",
    },
    {
      title: "Gentle Healing",
      desc: "Every patient receives personalized attention and thoughtful care. We take the time to understand your needs and design treatments that work gently yet effectively.",
      color: "bg-yellow-400",
      icon: "FaUserDoctor",
      bg: "bg-[#fffae5]",
    },
    {
      title: "Expert Care",
      desc: "Our qualified homeopathic doctors bring years of experience and dedication. Their expertise ensures that every prescription and consultation supports lasting health.",
      color: "bg-pink-400",
      icon: "GiMedicinePills",
      bg: "bg-[#f6edec]",
    },
    {
      title: "Patient Wellbeing",
      desc: "We’re committed to your ongoing wellness. From the first consultation to follow-ups, our goal is to support your health journey with comfort, trust, and genuine care.",
      color: "bg-purple-400",
      icon: "FaHandHoldingHeart",
      bg: "bg-[#F3F0FF]",
    },
  ];
  const email = clinicDetails[0]?.email;

  useEffect(() => {
    getClinicDetails();
  }, []);

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
              <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all text-white text-lg font-medium py-2 px-6 rounded-full shadow-md">Register</button>
              <button className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 font-semibold">Contact Us <FaAngleRight /></button>
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
      <section className="py-10 px-10 mt-10 max-w-6xl mx-auto">
        <div className='w-fit mx-auto'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide' >BOOK <span className='text-blue-500'>APPOINTMENT</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <p className="text-gray-500 text-lg text-center mt-8 mb-16 max-w-2xl mx-auto leading-relaxed">
          Reach out to our nearest branch to schedule your visit. Our friendly staff will assist you with all your queries.
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-blue-400 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-2 border-blue-500 hover:scale-[1.01] hover:bg-blue-500 transition-all duration-300">
            <h3 className="text-2xl font-semibold bg-white border-2 border-gray-500 text-gray-600 shadow-lg py-2 rounded-lg mb-6 text-center">
              Dombivili Branch
            </h3>
            <div className="space-y-3 text-white/90 text-base leading-relaxed">
              <span className='flex gap-3 items-start'><FaLocationDot size={18} /> <p className='-mt-1'>102, Sanvi Apartment, 1st Floor, Near Shiv Sena Office, Gupte Road, Dombivli</p></span>
              <span className='flex gap-3 items-start'><FaPhoneAlt size={18} /> <p className='-mt-[2px]'>8808828132, 8808828132</p></span>
              <span className='flex gap-3 items-start'><Mail size={18} /> <p className='-mt-1'>wingshomeopathy@gmail.com</p></span>
            </div>
          </div>
          <div className="bg-blue-400 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-2 border-blue-500 hover:scale-[1.01] hover:bg-blue-500 transition-all duration-300">
            <h3 className="text-2xl font-semibold bg-white border-2 border-gray-500 text-gray-600 shadow-lg py-2 rounded-lg mb-6 text-center">
              Mulund Branch
            </h3>
            <div className="space-y-3 text-white/90 text-base leading-relaxed">
              <span className='flex gap-3 items-start'><FaLocationDot size={18} /> <p className='-mt-1'>Kapeesh Mall, Shop No. 17-20, 1st Floor, M.G. Road, Near Mulund Railway Station, Mulund</p></span>
              <span className='flex gap-3 items-start'><FaPhoneAlt size={18} /> <p className='-mt-[2px]'>+91 91234 56789, +91 98271 34567</p></span>
              <span className='flex gap-3 items-start'><Mail size={18} /> <p className='-mt-1'>wingshomeopathy@gmail.com</p></span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 px-10 mt-10 max-w-6xl mx-auto">
        <div className='w-fit mx-auto'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide'>ABOUT <span className='text-blue-500'>US</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <div className='py-10 mt-5 flex flex-col lg:flex-row items-center lg:justify-center lg:gap-10 xl:gap-15 gap-5'>
          <img src='./ChatGPT Image Oct 30, 2025, 09_35_44 PM.png' alt='Homeopathic Image' height={340} width={290} className='mx-auto lg:mx-0 rounded-t-full lg:h-[595px] lg:w-[363px] xl:h-[555px] xl:w-[463px] object-cover' />
          <div className='px-4'>
            <div>
              <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-y-3 lg:w-fit items-center gap-5 text-zinc-600 mt-8 lg:mt-0'>
                {aboutCards?.map((card, i) => (
                  <div key={i} className={`p-3 rounded-xl lg:h-44 lg:max-w-[260px] shadow-sm ${card?.bg}`}>
                    <span className='flex items-center gap-3'>
                      <span className={`p-1 rounded-md ${card.color} text-white`}>{iconMap[card?.icon]}</span>
                      <h5 className='font-semibold text-xl text-black'>{card?.title}</h5>
                    </span>
                    <p className='mt-5 text-sm'>{card?.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <ul className='list-none mt-10 flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-38 sm:gap-y-5 lg:gap-x-8 gap-5 font-semibold mb-10'>
              {(['Personalized Healing Plans', 'Care from Skilled Experts', 'Calm Environment', 'Restore Your Natural Balance']).map((detail, index) => (
                <li key={index} className="relative pl-10 before:content-['✔'] before:absolute before:left-0 before:top-1 before:bg-blue-500 before:text-white before:rounded-full before:w-5 before:h-5 before:flex before:items-center before:justify-center before:text-xs">{detail}</li>))}
            </ul>
            <button className="bg-blue-500 hover:bg-blue-600 w-fit cursor-pointer transition-all text-white text-lg font-medium py-2 px-6 rounded-full shadow-md">Contact Us</button>
          </div>
        </div>
      </section>
      <section className='py-10 mt-10'>
        <div className='w-fit mx-auto mb-14'>
          <h1 className='text-4xl md:text-[38px] text-center text-gray-800 font-semibold tracking-wide' >ABOUT <span className='text-blue-500'>DOCTOR</span></h1>
          <Underline color={'oklch(62.3% 0.214 259.815)'} />
        </div>
        <div className='flex flex-col md:flex-row justify-between max-w-[1240px] mx-auto px-6 md:px-20 lg:px-24 gap-10'>
          <img src="./image-3(1).jpeg" alt="Doctor Image" className="md:h-84 md:w-76 lg:h-96 lg:w-[420px] object-cover rounded-xl" />
          <div className='flex flex-col items-center md:items-start'>
            <h1 className='text-3xl text-gray-700 font-semibold'>Dr. Santosh K Yadav</h1>
            <p className="text-gray-600 mt-5 max-w-[507px] mx-auto md:mx-0 leading-relaxed">Dr. Santosh K Yadav is a consultant homeopathic doctor is flourishing homeopathic clinical practice in Dombivali and Mulund since 2000. All across India patient consulting him from various state and world wide. He is known too thousands of patients as a kind and lively homeopathy doctor.</p>
            <p className="text-gray-600 mt-5 max-w-[507px] mx-auto md:mx-0 leading-relaxed">He is president of Wings medical foundation. He completed his BHMS (Bachelor of Homeopathic Medicine & Surgery) from Amravati university and done his post graduation( M.D Homoeopathy ) from aurangabad university. He also done PhD in Homoeopathy field.</p>
            <button className="bg-blue-500 hover:bg-blue-600 w-fit mt-8 cursor-pointer transition-all text-white text-lg font-medium py-2 px-6 rounded-full shadow-md">Contact Us</button>
          </div>
        </div>
      </section>






      {/* <video autoPlay muted loop src="/wings.mp4" className=' max-w-[90vw] mt-4 md:max-w-[760px] md:w-[90vw] lg:max-w-[900px] mx-auto shadow-gray-700 shadow-lg rounded-lg'></video> */}
      {/* <div className='flex flex-col p-6 items-center gap-7 max-w-[326px] md:max-w-[760px] lg:max-w-[900px] mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
        <h1 className='text-xl md:text-3xl font-semibold text-slate-800'>FOR APPOINTMENTS</h1>
        <hr className='bg-[#4a9acc] h-1 border-none rounded-sm w-28' />
        <h1 className='text-xl font-semibold mt-6 text-slate-800'>"Call Us"</h1>
        <div className='md:flex-row flex md:items-stretch flex-col gap-4 items-center'>
          {clinicDetails.map((detail, index) => (
            <div key={index} className='max-w-[210px] md:max-w-[300px] rounded-xl hover:shadow-gray-600 hover:shadow-2xs hover:scale-[102%] transition-all duration-300 flex flex-col items-center gap-4 p-10 h-auto bg-[#c0c0c0]'>
              <div className='w-auto px-5 h-auto py-3 border-white border-2 rounded-md text-center bg-[#afdbf5] '>
                <h1 className='text-lg font-bold text-zinc-900'>{detail?.branch} Branch</h1>
              </div>
              <hr className='bg-[#4a9acc] h-1 border-none rounded-sm w-16 mt-2 ' />
              {
                detail?.phone.map((phone, phoneIndex) => (
                  <div key={phoneIndex} className='flex items-center gap-3 group '>
                    <FaPhoneAlt style={{ width: '25px', height: '25px', color: 'white', backgroundColor: '#1e232f', padding: '5px', borderRadius: '50%', }} className='group-hover:rotate-[20deg]' />
                    <h2 className='font-semibold'>{phone}</h2>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
        <div className='flex mt-4 mb-4 items-center gap-6'>
          <h1 className='text-lg font-semibold'>Visit Us </h1>
          <button onClick={() => { navigate('/register'); window.scrollTo(0, 0) }} className='bg-blue-400 cursor-pointer hover:bg-blue-600 hover:scale-99 hover:text-gray-200 text-lg transition-all duration-300 text-white font-semibold w-40 h-10 rounded-full'>Register</button>
        </div>
        <div className='flex mb-4 items-center gap-2'>
          <h1 className='text-lg font-semibold'>Contact Us: </h1>
          <p>{email}</p>
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
      </div> */}
    </div>
  )
}

export default Home