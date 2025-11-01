import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) setSticky(true);
            else setSticky(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`w-full z-50 ${isSticky
                ? 'sticky top-0 bg-white/50 backdrop-blur-lg shadow-md border-b border-gray-300'
                : 'relative bg-[#ecf3fe] border-b border-gray-300'
                } transition-all duration-500 ease-in-out backdrop-saturate-150`}
        >
            <div className="px-2 sm:px-16 flex items-center justify-between mx-auto max-w-[1300px] py-2">
                <div
                    onClick={() => navigate('/')}
                    className="text-[#0e142a] cursor-pointer font-semibold text-sm md:text-xl flex items-center gap-3"
                >
                    <img
                        src="./Wings-removebg-preview.png"
                        className="w-11 h-11 mb-4 sm:w-14 sm:h-12"
                        alt="Wings Classical Homeopathy Logo"
                    />
                    <h1 className="text-lg sm:text-2xl">Wings Classical Homeopathy</h1>
                </div>

                <div className="relative">
                    <ul className="hidden md:flex font-semibold items-center gap-8 text-[#0e142a] text-lg">
                        <li
                            onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                            className={`${location.pathname === '/' ? 'text-[#367ece] underline underline-offset-4' : 'hover:text-[#367ece]'} cursor-pointer`}
                        >
                            Home
                        </li>
                        <li
                            onClick={() => { navigate('/register'); window.scrollTo(0, 0); }}
                            className={`${location.pathname === '/register' ? 'text-[#367ece] underline underline-offset-4' : 'hover:text-[#367ece]'} cursor-pointer`}
                        >
                            Register
                        </li>
                        <li
                            onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
                            className={`${location.pathname === '/login' ? 'text-[#367ece] underline underline-offset-4' : 'hover:text-[#367ece]'} cursor-pointer`}
                        >
                            Login
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!isOpen)}
                        className="md:hidden cursor-pointer text-[#367ece] font-semibold text-2xl"
                    >
                        ☰
                    </button>

                    {/* Mobile Dropdown */}
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
    );
};

export default Navbar;
