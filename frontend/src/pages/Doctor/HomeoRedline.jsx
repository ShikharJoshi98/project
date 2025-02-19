import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import Sidebar, { SidebarItem } from '../../components/Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, LayoutList, MapPin, Search, SquarePen, Trash, Users } from 'lucide-react'
import { FaRegFilePdf, FaUserDoctor } from 'react-icons/fa6'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { AiFillMedicineBox } from 'react-icons/ai'
import Input from '../../components/Input'
import { docStore } from '../../store/DocStore'

const HomeoRedline = () => {
    const { user, logout } = useAuthStore();
    const { homeobhagwat,section,setsection,gethomeobhagwat,Homeo } = docStore();
    const navigate = useNavigate();
    let [formValues, setFormValues] = useState({
        name: "",
        description: "",
              
    });
    const HomeoRedline = Homeo.filter((item) =>  item.section === 'redline' );

    const [currentDate, setCurrentDate] = useState("");
        useEffect(() => {
          const updateDate = () => {
            const date = new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            });
            setCurrentDate(date);
          };
      
          updateDate();
        }, []);
        useEffect(() => {
          gethomeobhagwat();
          
            }, [gethomeobhagwat]);
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormValues((prevValues) => ({
              ...prevValues,
              [name]: value,
            }));
    };
    console.log(section);
    async function handleSubmit(e){
        e.preventDefault();
        formValues = { ...formValues, "section": section };
        await homeobhagwat(formValues);
    }
  return (
      <div>
          <Docnavbar />
          <div className='flex '>
          <Sidebar>
        <SidebarItem onClick={()=>navigate('/appointment-doctor')}   icon={<ClipboardPlus />} text={"APPOINTMENTS "} />
          <SidebarItem onClick={()=>setTaskModalIsOpen(true)}  icon={<LayoutList />} text={"ASSIGN TASK"} />
          <SidebarItem onClick={()=>setLeaveModalIsOpen(true)} icon={<CalendarDays />} text={"LEAVE REPORTS "} />          
          <SidebarItem  icon={<Users /> } text={"STAFF"} />
          <SidebarItem icon={<FileText />} text={"CERTIFICATES"} />
          <SidebarItem icon={<FaUserDoctor size={20}/>} text={"DOCTOR FEES"} />
          <SidebarItem icon={<Briefcase />} text={"TODAYS COLLECTIONS"} />

              </Sidebar>
              <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
              <div className='flex md:flex-row h-fit flex-col items-center justify-between '>
            <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome {user?.fullname }</h1>
            <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10   bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span>    <MapPin />
            </span>{ user?.branch}</h1>
                  </div>
                  <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                  <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Homeo Bhagwat Gita
                  </h1>
            <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{currentDate}</h1>
                      <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
                      <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                      <button onClick={() => { setsection('medicine'); navigate('/homeo-book-medicine');  }}  className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${section==='medicine'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>MEDICINE NAME</button>
                          <button onClick={() => { setsection('disease'); navigate('/homeo-book-disease');}}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${section==='disease'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>DISEASE NAME</button>
                          <button onClick={() => { setsection('redline'); navigate('/homeo-book-redline'); }}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${section==='redline'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>RED LINE SYMPTOMS</button>
                      </div>
                      <div>
                          <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-8 bg-white/80 h-auto p-8 min-w-full border rounded-xl text-zinc-600 text-sm shadow-lg">
                              <div className="flex flex-col gap-4 m-auto">
                              <div className="flex flex-col gap-2">
                  <h1 className='text-black '>Redline symptoms:</h1>
                  <Input icon={AiFillMedicineBox} type="text"  name="name" value={formValues.name} onChange={handleInputChange} placeholder='Enter Symptoms'    required />
                </div>
                              </div>
                              <div className='mt-3 '>
              <h1 className="text-black mb-2  ">Description:</h1>             
 
             <textarea placeholder='Enter Description' name="description" value={formValues.description} onChange={handleInputChange}  className='w-full  h-56  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
                              </div> 
                              <div className='flex item justify-center '>
                              <button
                type="submit"
                className="bg-blue-500 text-lg w-40   transition-all duration-300 cursor-pointer hover:bg-blue-600 p-2 rounded-lg mt-3 text-white"
              >
                Save
                                  </button>
                                  </div>
                      </form>
            </div>
            <div>
              <h1 className='text-3xl mb-3 text-blue-600 font-semibold'>Search</h1>
              <Input icon={Search} type="text"  name="name"  placeholder='Enter medicine name or description'    required />
            </div>
            <div className="overflow-x-auto p-4 mt-3">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className=''>
          <tr className=" bg-blue-500 text-white text-lg">
            <th className="py-2 px-4 border">Serial No.</th>
            <th className="py-2 px-4 border">Medicine</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Update</th>
            <th className="py-2 px-4 border">Delete</th>
            <th className="py-2 px-4 border">PDF</th>
          </tr>
                </thead>
                <tbody>
                  {
                    HomeoRedline.map((redline, idx) => (
                      <tr key={idx} className=" bg-blue-100  ">
                        <td className="py-3 px-4 border text-center">{ idx+1}</td>
                        <td className="py-3 px-4 border text-center">{ redline?.name}</td>
                         <td className="py-3 px-4 border text-center">{ redline?.description}</td>
                        <td className="py-3 px-4 border text-center cursor-pointer">{ <SquarePen />}</td>
                         <td className="py-3 px-4 border text-center cursor-pointer border-black text-red-500">{ <Trash />}</td>
                        <td className="py-3 px-4 border text-center cursor-pointer">{ <FaRegFilePdf size={25} />}</td>
                      </tr>
                    ))
                 }
                </tbody>
              </table>
              </div>
                  </div>
            </div>
          </div>
    </div>
  )
}

export default HomeoRedline