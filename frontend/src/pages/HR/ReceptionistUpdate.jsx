import React, { useEffect, useState } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { Hospital, Mail, Phone, User } from 'lucide-react'
import Input from '../../components/Input'
import { useParams } from 'react-router-dom'
import { useStore } from '../../store/UpdateStore'

const ReceptionistUpdate = () => {
  const { id } = useParams();
    const { getReceptionistDetails, receptionistusers, updateReceptionist } = useStore();
    const receptionist = receptionistusers.find(user => user?._id === id) || {};

  const [Fullname, setfullname] = useState(receptionist?.fullname);
  const [Phonenum, setphone] = useState(receptionist?.phone);
  const [Email, setemail] = useState(receptionist?.email);
  const [Address, setaddress] = useState(receptionist?.address);
  const [Branch, setbranch] = useState(receptionist?.branch);
  useEffect(() => {
    getReceptionistDetails();
      
    }, [getReceptionistDetails]);
  useEffect(() => {
      if (receptionist) {
        setfullname(receptionist.fullname || "");
        setemail(receptionist.email || "");
        setphone(receptionist.phone || "");
        setaddress(receptionist.address || "");
        setbranch(receptionist.branch || "");
      }
  }, [receptionist]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReceptionist(id, {
        fullname: Fullname,
        phone: Phonenum,
        email: Email, 
        
        
      
        address: Address,
        branch: Branch,
        
      });
      alert("Receptionist details updated successfully!");
    } catch (error) {
      alert("Failed to update receptionist details.");
    }
  };
  return (
    <div className='min-h-screen flex flex-col   bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 '>
      <div>
      <HRnavbar />
      <form onSubmit={handleSubmit} className='  z-10 my-8 mx-auto bg-white p-8 max-w-72 md:max-w-[500px] border rounded-xl text-zinc-600 text-sm shadow-lg ' >
      <h1 className='text-3xl font-semibold mb-5 text-center'>Update Receptionist Details </h1>
        <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
        <div className='flex flex-col gap-4 m-auto '>
        <div className='flex flex-col gap-2 '>
             <h1>Full Name</h1>     
            <Input icon={User} onChange={(e)=>setfullname(e.target.value)} type='text' required value={Fullname} />
          </div>
          <div className='flex flex-col gap-2 '>
             <h1>Contact Number</h1>     
             <Input icon={Phone}  type='tel' onChange={(e)=>setphone(e.target.value)} required value={Phonenum} />
          </div>
          <div className='flex flex-col gap-2 '>
             <h1>Email Address</h1>     
            <Input  icon={Mail} onChange={(e)=>setemail(e.target.value)}  type='email' required value={Email} />
          </div>
          <div className='flex flex-col gap-2 '>
              <h1>Address</h1>             
 
             <textarea  value={Address} onChange={(e)=>setaddress(e.target.value)} className='w-full  h-10  pl-9 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
          </div>
          <div className='flex flex-col gap-2 '>
             <h1>Branch</h1>     
             <Input icon={Hospital} onChange={(e)=>setbranch(e.target.value)} type='text' required value={Branch}  />
            </div>
            <div className='w-full '>
        <button  className='ml-28 cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >
          Update
          </button>
          </div>
        </div>
        </form>
        </div>
      </div>
  )
}

export default ReceptionistUpdate