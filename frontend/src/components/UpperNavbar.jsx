import { useEffect } from 'react'
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { docStore } from '../store/DocStore';
import { IoMdMail } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const UpperNavbar = () => {
    const { clinicDetails, getClinicDetails } = docStore();
    const navigate = useNavigate();
    useEffect(() => {
        getClinicDetails();
    }, []);

    const handleContactClick = () => {
        if (location.pathname === '/' && location.hash === '#contact-us') {
            const el = document.getElementById('contact-us');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        if (location.pathname === '/') {
            window.location.hash = '#contact-us';
        } else {
            navigate('/#contact-us');
        }
    };
    return (
        <div className='bg-[#084c9d] '>
            <div className='max-w-[1300px] px-4 sm:px-8 w-full py-2 flex items-center justify-between mx-auto'>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center text-sm text-white gap-2'>
                        <IoMdMail size={24} />
                        <p className='hidden sm:block'>wingshomeopathy@gmail.com</p>
                    </div>
                    <div onClick={handleContactClick} className='flex items-center text-sm text-white gap-2'>
                        <FaPhoneAlt size={16} />
                        <p className='hidden sm:block hover:underline cursor-pointer'>Contact Us</p>
                    </div>
                </div>
                <div className='flex text-white items-center gap-3'>
                    <FaFacebook className='cursor-pointer hover:text-gray-200 transition-all duration-300' size={24} />
                    <FaXTwitter className='cursor-pointer hover:text-gray-200 transition-all duration-300' size={24} />
                </div>
            </div>
        </div>
    )
}

export default UpperNavbar