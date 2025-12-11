import { useNavigate } from "react-router-dom";

const LowerNavbar = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[#084c9d] sticky top-0 z-[9999] hidden md:block h-12 py-2 px-8 w-full'>
            <div className="max-w-[1300px] mx-auto">
                <ul className="flex items-center justify-end gap-3 text-white">
                    <li
                        onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
                        className={`${location.pathname === '/' && 'bg-white shadow-md py-1 px-3 rounded-xl text-blue-600'} py-1 px-3 cursor-pointer`}
                    >
                        Home
                    </li>
                    <li
                        onClick={() => { navigate('/AboutUs'); window.scrollTo(0, 0); }}
                        className={`${location.pathname === '/AboutUs' && 'bg-white shadow-md py-1 px-3 rounded-xl text-blue-600'} py-1 px-3 cursor-pointer`}
                    >
                        About Us
                    </li>
                    <li
                        onClick={() => { navigate('/About-Homeopathy'); window.scrollTo(0, 0); }}
                        className={`${location.pathname === '/About-Homeopathy' && 'bg-white shadow-md py-1 px-3 rounded-xl text-blue-600'} py-1 px-3 cursor-pointer`}
                    >
                        About Homepathy
                    </li>
                    <li
                        onClick={() => { navigate('/Diseases-And-Treatment'); window.scrollTo(0, 0); }}
                        className={`${location.pathname === '/Diseases-And-Treatment' && 'bg-white shadow-md py-1 px-3 rounded-xl text-blue-600'}  py-1 px-3 cursor-pointer`}
                    >
                        Diseases and Treatment
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LowerNavbar