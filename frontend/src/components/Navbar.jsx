import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className='w-full relative  bg-[#084c9d]'>
            <div className=" rounded-md bg-white ">
                <div className='px-2 sm:px-10 flex items-center justify-between mx-auto py-2 max-w-[1300px]'>
                    <div
                        onClick={() => navigate('/')}
                        className="text-[#0e142a] cursor-pointer font-semibold text-sm md:text-xl flex items-center gap-3"
                    >
                        <img
                            src="/Wings_Logo-removebg-preview.png"
                            className="w-48 sm:w-92 sm:h-auto"
                            alt="Wings Classical Homeopathy Logo"
                        />
                    </div>
                    <div className="relative">
                        <ul className="hidden md:flex font-semibold items-center gap-4 text-[#0e142a] text-lg">
                            <li
                                onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
                                className='hover:bg-blue-500 hover:text-white border-2 border-blue-500 text-blue-500 text-xl py-1 px-6 rounded-4xl transition-all duration-300 cursor-pointer'
                            >
                                Login
                            </li>
                            <li
                                onClick={() => { navigate('/register'); window.scrollTo(0, 0); }}
                                className='hover:bg-blue-500 hover:text-white border-2 border-blue-500 text-blue-500 text-xl py-1 px-6 rounded-4xl transition-all duration-300 cursor-pointer'
                            >
                                Register
                            </li>
                        </ul>
                        <button
                            onClick={() => setOpen(!isOpen)}
                            className="md:hidden cursor-pointer text-[#367ece] font-semibold text-2xl"
                        >
                            ☰
                        </button>
                        {isOpen && (
                            <div
                                ref={menuRef}
                                className="absolute md:hidden right-0 mt-2 rounded-md w-32 z-10 bg-[#367ece] p-4 text-white shadow-lg backdrop-blur-md bg-opacity-90"
                            >
                                <p onClick={() => { navigate('/'); setOpen(false); }} className="text-center hover:text-gray-300 cursor-pointer">Home</p>
                                <p onClick={() => { navigate('/register'); setOpen(false); }} className="text-center pt-4 hover:text-gray-300 cursor-pointer">Register</p>
                                <p onClick={() => { navigate('/login'); setOpen(false); }} className="text-center pt-4 hover:text-gray-300 cursor-pointer">Login</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
