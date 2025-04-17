import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className='sticky h-screen top-18 z-50  bg-[#404858]'>            
            <div className={`${expanded ? "w-32 md:w-56" : "w-18"} min-h-screen text-white transition-all duration-300 `}>
                <div onClick={() => setExpanded(!expanded)} className={`p-4 text-xl pb-2 cursor-pointer`}>
                    ☰
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className='px-3'>{children}</ul>
                </SidebarContext.Provider>
            </div>
        </div>
    );
};

export function SidebarItem({ icon, text, onClick, active }) {
    
    const { expanded } = useContext(SidebarContext);
    
    return (
        <li onClick={onClick}
            className={`h-10 flex items-center py-2 px-1 my-1 transition-colors text-white font-medium rounded-md cursor-pointer ${active ? 'bg-gray-500/70 text-white' : 'hover:bg-gray-400/30 hover:text-white'}`}
        >
            <div className='flex-shrink-0'>{icon}</div>
            {expanded && <div
                className={`ml-2 transition-all duration-200 ease-in-out text-[8px] md:text-base md:whitespace-nowrap ${expanded ? 'opacity-100 w-5 md:w-56' : 'w-0 opacity-0'}`}
            >
                {text}
            </div>}
        </li>
    );
}

export default Sidebar;