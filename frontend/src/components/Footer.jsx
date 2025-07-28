import { FaFacebookF } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <div className='bg-[#343a40]'>
            <div className='flex flex-col px-20 py-10 sm:grid lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-14 text-sm '>
                <div className='scroll-smooth'>
                    <h1 onClick={scrollToTop} className='text-white font-semibold cursor-pointer mb-4'>Wings Classical Homeopathy</h1>
                    <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                    <p className='w-full text-[#c2c4c2]'>" Service To Patient is Service To Nation "</p>
                    <div className=' flex text-[#c2c4c2]  items-center gap-5 mt-10'>
                        <a href='#' className='p-3   hover:bg-[#343a40] rounded-full bg-[#3e4144]'><IoLogoWhatsapp /></a>
                        <a href='#' className='p-3 hover:bg-[#343a40] rounded-full bg-[#3e4144]'>  <FaSquareXTwitter /></a>
                        <a href='#' className='p-3 hover:bg-[#343a40] rounded-full bg-[#3e4144]'><AiFillInstagram /></a>
                        <a href='#' className='p-3 hover:bg-[#343a40] rounded-full bg-[#3e4144]'><FaFacebookF /> </a>
                    </div>
                </div>
                <div>
                    <h2 className='text-white font-semibold  mb-4'>SERVICES</h2>
                    <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                    <p className='w-full text-[#c2c4c2]'>All Types Of Chronic Diseases.</p>

                </div>
                <div>
                    <h2 className='text-white font-semibold  mb-4'>DOMBIVALI Branch-1</h2>
                    <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                    <p className='w-full text-[13px] font-medium text-[#c2c4c2] text-left leading-relaxed'>Address : 102, "Sanvi Appartment", 1st Floor, Near Shiv Sena Office, Gupte Road, Dombivali (W). <br />
                        Time : <br />
                        9.30 am to 2 pm <br />
                        5.30 pm to 10 pm. <br />
                        Tel : <br />
                        0251 - 2492081 / 2484950
                        Mobile : <br />
                        +91-8080899990, +91 9892064974
                        Email : <br />
                        wingshomeopathy@gmail.com <br />
                        Visit Us : www.wingshomeopathy.com</p>
                </div>
                <div>
                    <h2 className='text-white font-semibold  mb-4'>MULUND Branch-2</h2>
                    <hr className='bg-[#4a9acc] mb-5 h-1 border-none rounded-sm w-7' />
                    <p className='w-full text-[13px] font-medium text-[#c2c4c2] text-left leading-relaxed'>
                        Address : Kapeesh Mall, Shop No. 17 ,18, 19, & 20, 1st Floor, M.G. Road, Near Mulund Railway Station, Mulund (W). <br />
                        Time : <br />
                        2.30 pm to 5 pm. <br />
                        Sunday- 10.30 am to 4.30 pm. <br />
                        <p className='text-yellow-500'>Thursday -Closed</p>
                        Tel : <br />
                        022 - 25628989 <br />
                        Mobile : <br />
                        +91-8080848403, +91 9892064974
                        Email : <br />
                        wingshomeopathy@gmail.com
                    </p>
                </div>
            </div>
            <hr className='w-full opacity-20 mt-4 bg-[#c2c4c2] h-[0.5px] border-none ' />
            <div className=' md:flex-row flex flex-col  items-center justify-around text-[13px] text-[#c2c4c2] py-8'>
                <p className=''>© Copyright Wings Classical Homeopathy. All Rights Reserved.</p>
                <p>Designed with 💜 By <a href="https://www.snteducation.com/" target='blank' className='hover:underline hover:text-blue-500 transition-all duration-400'> Snt Super Net Technology Munirka Delhi(New)</a></p>
            </div>
        </div>
    )
}

export default Footer