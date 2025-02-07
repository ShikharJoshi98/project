import React, { useState } from 'react'
import HRnavbar from '../components/HR/HRnavbar'
import { Calendar, Hospital, Lock, Mail, MapPinHouse, Phone, User } from 'lucide-react';
import Input from '../components/Input';
import { MdOutlineBloodtype } from "react-icons/md";
import { useStore } from '../store/UpdateStore';


const DoctorUpdate_HR = () => {
  
  const { data, setData } = useStore();
    const [number, setnumber] = useState("");
    const [email, setemail] = useState("");
    const [gender, setgender] = useState("");
    const [age, setage] = useState("");
    const [active, setactive] = useState("");
    const [dept, setdept] = useState("");
  return (
      <div className='relative overflow-hidden bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 '>
      <HRnavbar />
      <button type='button' onClick={()=>setData("hello")}>Click here</button>
          <form  className='mx-auto relative z-10 my-8  h-auto bg-white p-8 md:max-w-[500px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg ' >
          <h1 className='text-3xl font-semibold mb-5 text-center'>Update Doctor Details
          </h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
              <div className='flex flex-col gap-4 m-auto '>
                  <div className='flex flex-col gap-2 '>
             <h1>Full Name</h1>     
            <Input icon={User} type='text' required value={"Dr. Santosh K. Yadav"} />
                  </div>
                  <div className='flex flex-col gap-2 '>
             <h1>Email Address</h1>     
                      <Input  icon={Mail} type='email' required value={"giyab22845@wlmycn.com"} />
                  </div>
            <div className='flex flex-col gap-2 '>
             <h1>Contact Number</h1>     
             <Input icon={Phone} type='tel' required value={'9876546372	'}  />
                  </div>

                  <div className='flex flex-col gap-2 '>
             <h1>Age</h1>     
             <Input icon={User} type='number' required value={44}  />
                  </div>
                  <div className='flex flex-col gap-2 '>
                  <h1>Gender</h1>     

                  <div className='relative   w-full '>                      
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <User className="size-4 text-blue-500"/>
          </div>
              <select
               
                name="select gender" required id="Gender" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
              </select>
                      </div>
                      </div>
                      <div className='flex flex-col gap-2 '>
                  <h1>Blood Group</h1>     

                  <div className='relative   w-full '>                      
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <MdOutlineBloodtype className='size-4 text-blue-500' />
          </div>
              <select
               
                name="select blood type" required id="Blood Type" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="o+ve" selected>O+ve</option>
              <option value="a+">A+</option>
                <option value="b+">B+</option>
                <option value="ab+">AB+</option>
              <option value="o+">O+</option>
                <option value="a-">A-</option>
                <option value="b-">B-</option>
              <option value="ab-">AB-</option>
              <option value="o-">O-</option>
              </select>
            </div>
            </div>
            <div className='flex flex-col gap-2 '>
              <h1>Address</h1>             
 
             <textarea value={"snt 1st floor"} className='w-full  h-10  pl-9 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
            </div>
            <div className='flex flex-col gap-2 '>
             <h1>Branch</h1>     
             <Input icon={Hospital} type='text' required value={"Homeopathic"}  />
            </div>
            <div className='flex flex-col gap-2 '>
             <h1>Salary</h1>     
             <Input icon={User} type='number' required value={10000}  />
            </div>
            <div className='flex flex-col gap-2 '>
             <h1>Attendance</h1>     
             <Input icon={Calendar} type='number' required value={0}  />
            </div>
            <div className='flex flex-col gap-2 '>
                  <h1>Status</h1>     

                  <div className='relative   w-full '>                      
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <User className="size-4 text-blue-500"/>
          </div>
              <select
               
                name="select status" required id="Status" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="active" selected>Active</option>
              <option value="inactive" >Inactive</option>
              </select>
                      </div>
                      </div>          
                 


            
            

                 
            
            
           

            

        </div >
        <button  className='ml-28 cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >
          Update
          </button>
          
      </form>
    </div>
  )
}

export default DoctorUpdate_HR