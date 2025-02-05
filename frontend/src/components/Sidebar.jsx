import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(); 

const Sidebar = ({ children }) => {
    const [expanded, setExpanded] = useState(false);
  return (
      
          <aside className={`min-h-screen text-white  transition-all duration-300 ${expanded?"w-32 md:w-56":"w-18"} `}>
              <nav className='h-full flex bg-[#404858] flex-col  border-r border-black'>
                  <div onClick={()=>setExpanded(!expanded)} className='p-4 text-xl pb-2 cursor-pointer '>
                      ☰
              </div>
              <SidebarContext.Provider value={{expanded}}>
                  <ul className='px-3'>{children}</ul>
                  </SidebarContext.Provider>
              </nav>
              
          </aside>
    
  )
}

export function SidebarItem({ icon, text, active }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li className={`relative h-10  flex items-center py-2 px-2 my-1 transition-colors font-medium rounded-md  cursor-pointer  ${active?"bg-blue-400":"hover:bg-blue-400"}` }>
            <div className='flex-shrink-0'>
                {icon}
                </div>
            <div className={`ml-3 transition-all duration-300 ease-in-out text-sm md:text-base overflow-hidden whitespace-nowrap   ${expanded?"opacity-100  w-auto ":"w-0 opacity-0"}`}>{text}</div>
        </li>
    )
}

export default Sidebar