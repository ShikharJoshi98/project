import { useEffect, useState } from 'react'
import { CiHospital1 } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);

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
        <div className='bg-[#404858] min-w-full px-14 md:px-28 py-5 sticky top-0 z-20 flex items-center justify-between'>
            <div onClick={() => navigate('/')} className='text-white cursor-pointer font-semibold text-sm md:text-xl flex items-center gap-2'>
                <CiHospital1 size={28} />
                <h1 >Wings Classical Homeopathy</h1>
            </div>
            <div className='relative'>
                <ul className=' hidden md:flex  items-center gap-8 text-white text-lg'>
                    <li onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className='hover:text-gray-300 cursor-pointer'>Home</li>
                    <li onClick={() => { navigate('/register'); window.scrollTo(0, 0) }} className='hover:text-gray-300 cursor-pointer'>Register</li>
                    <li onClick={() => { navigate('/login'); window.scrollTo(0, 0) }} className='hover:text-gray-300 cursor-pointer'>Login</li>
                </ul>
                <button onClick={() => setOpen(!isOpen)} className="md:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                {isOpen && <div ref={menuRef} className='absolute md:hidden border-white border-1 rounded-md w-28 z-10 bg-[#404858] p-4 text-white  right-5 overflow-hidden"'>
                    <p onClick={() => { navigate('/'); setOpen(false) }} className='text-center  hover:text-gray-300 cursor-pointer'>Home</p>
                    <p onClick={() => { navigate('/register'); setOpen(false) }} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Register</p>
                    <p onClick={() => { navigate('/login'); setOpen(false) }} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>
                </div>}
            </div>
        </div>
    )
}

export default Navbar