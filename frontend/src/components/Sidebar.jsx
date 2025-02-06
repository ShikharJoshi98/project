import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className='sticky h-full top-18 z-60  bg-[#404858]'>
            
            <div className={`${expanded ? "w-32 md:w-56" : "w-18"} min-h-screen text-white transition-all duration-300 `}>
                <div
                    onClick={() => setExpanded(!expanded)}
                    className={`p-4 text-xl pb-2 cursor-pointer`}
                >
                    ☰
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className='px-3'>{children}</ul>
                </SidebarContext.Provider>
            </div>
        </div>
    );
};

export function SidebarItem({ icon, text, active }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li
            className={`h-10 flex items-center py-2 px-2 my-1 transition-colors font-medium rounded-md cursor-pointer ${active ? 'bg-blue-400' : 'hover:bg-blue-400'}`}
        >
            <div className='flex-shrink-0'>{icon}</div>
            <div
                className={`ml-3 transition-all duration-300 ease-in-out text-[10px] md:text-base md:whitespace-nowrap ${expanded ? 'opacity-100 w-5 md:w-56' : 'w-0 opacity-0'}`}
            >
                {text}
            </div>
        </li>
    );
}

export default Sidebar;
