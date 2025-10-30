import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClikcOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }

        }
        document.addEventListener("mousedown", handleClikcOutside);
        return () => {
            document.removeEventListener("mousedown", handleClikcOutside);
        };
    }, []);

    return (
        <div className='bg-[#ecf3fe] py-2 min-w-full border border-b-[1px] border-gray-300 '>
            <div className='px-2 sm:px-16 flex items-center justify-between mx-auto max-w-[1300px]'>
                <div onClick={() => navigate('/')} className='text-[#0e142a] cursor-pointer font-semibold text-sm md:text-xl flex items-center gap-3'>
                    <img src="./Wings-removebg-preview.png" className='w-11 h-11 mb-4 sm:w-14 sm:h-12' alt="Wngs Classical Homeopathy Logo" />
                    <h1 className='text-lg sm:text-2xl'>Wings Classical Homeopathy</h1>
                </div>
                <div className='relative'>
                    <ul className=' hidden md:flex font-semibold items-center gap-8 text-[#0e142a] text-lg'>
                        <li onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className={`${location.pathname === '/' ? 'text-[#367ece] decoration-[#367ece] underline underline-offset-4' : 'hover:text-[#367ece]'} cursor-pointer`}>Home</li>
                        <li onClick={() => { navigate('/register'); window.scrollTo(0, 0) }} className={`${location.pathname === '/register' ? 'text-[#367ece] decoration-[#367ece] underline underline-offset-4' : 'hover:text-[#367ece]'} cursor-pointer`}>Register</li>
                        <li onClick={() => { navigate('/login'); window.scrollTo(0, 0) }} className={`${location.pathname === '/login' ? 'text-[#367ece] decoration-[#367ece] underline underline-offset-4' : 'hover:text-[#367ece]'} cursor-pointer`}>Login</li>
                    </ul>
                    <button onClick={() => setOpen(!isOpen)} className="md:hidden cursor-pointer hover:text-gray-200 text-[#367ece] font-semibold text-xl">☰</button>
                    {isOpen && <div ref={menuRef} className='absolute md:hidden border-white border-1 rounded-md w-28 z-10 bg-[#367ece] p-4 text-white  right-5 overflow-hidden"'>
                        <p onClick={() => { navigate('/'); setOpen(false) }} className='text-center  hover:text-gray-300 cursor-pointer'>Home</p>
                        <p onClick={() => { navigate('/register'); setOpen(false) }} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Register</p>
                        <p onClick={() => { navigate('/login'); setOpen(false) }} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar