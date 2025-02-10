import React, { useEffect, useState } from 'react'
import HRnavbar from '../components/HR/HRnavbar'
import { Calendar, Hospital, Lock, Mail, MapPinHouse, Phone, User } from 'lucide-react';
import Input from '../components/Input';
import { MdOutlineBloodtype } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useStore } from '../store/UpdateStore';

const DoctorUpdate_HR = () => {
  const { id } = useParams();
  const { getDoctorDetails, docusers, updateDoctor } = useStore();
  
    
  console.log(id);
  const doctor = docusers.find(user => user?._id === id) || {};

  console.log(doctor);
  const [fullname, setfullname] = useState(doctor?.name);
  console.log(fullname);
  const [Number, setnumber] = useState(doctor?.phone);
  const [bgroup,setbloodgroup] = useState(doctor?.bloodGroup)
  const [Email, setemail] = useState(doctor?.email);
  const [income, setIncome] = useState(doctor?.Salary)
  const [Gender, setgender] = useState(doctor?.gender);
  const [Address, setaddress] = useState(doctor?.address);
  const [Age, setage] = useState(doctor?.age);
  const [Attendance, setattendance] = useState(doctor?.attendance);
  console.log(Attendance);
    const [Active, setactive] = useState(doctor?.status);
  const [Dept, setdept] = useState(doctor?.department);
  useEffect(() => {
    getDoctorDetails();
    
  }, [getDoctorDetails]);
  useEffect(() => {
    if (doctor) {
      setfullname(doctor.name || "");
      setemail(doctor.email || "");
      setIncome(doctor.Salary || "");
      setnumber(doctor.phone || "");
      setage(doctor.age || "");
      setgender(doctor.gender || "");
      setbloodgroup(doctor.bloodGroup || "");
      setaddress(doctor.address || "");
      setdept(doctor.department || "");
      setattendance(doctor.attendance ?? "");
      setactive(doctor.status || "");
    }
  }, [doctor]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoctor(id, {
        name: fullname,
        email: Email,
        phone: Number,
        age: Age,
        gender: Gender,
        bloodGroup: bgroup,
        address: Address,
        department: Dept,
        Salary: income,
        attendance: Attendance,
        status: Active,
      });
      alert("Doctor details updated successfully!");
    } catch (error) {
      alert("Failed to update doctor details.");
    }
  };
  return (
    <div className='min-h-screen flex flex-col  bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 '>
      <div>
      <HRnavbar />
          <form onSubmit={handleSubmit} className=' relative z-10 my-8 mx-auto bg-white p-8 max-w-72 md:max-w-[500px] border rounded-xl text-zinc-600 text-sm shadow-lg ' >
          <h1 className='text-3xl font-semibold mb-5 text-center'>Update Doctor Details
          </h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
              <div className='flex flex-col gap-4 m-auto '>
                  <div className='flex flex-col gap-2 '>
             <h1>Full Name</h1>     
            <Input icon={User} onChange={(e)=>setfullname(e.target.value)} type='text' required value={fullname} />
                  </div>
                  <div className='flex flex-col gap-2 '>
             <h1>Email Address</h1>     
            <Input  icon={Mail} onChange={(e)=>setemail(e.target.value)} type='email' required value={Email} />
                  </div>
            <div className='flex flex-col gap-2 '>
             <h1>Contact Number</h1>     
             <Input icon={Phone} onChange={(e)=>setnumber(e.target.value)} type='tel' required value={Number}  />
                  </div>

                  <div className='flex flex-col gap-2 '>
             <h1>Age</h1>     
             <Input icon={User} onChange={(e)=>setage(e.target.value)} type='number' required value={Age}  />
                  </div>
                  <div className='flex flex-col gap-2 '>
                  <h1>Gender</h1>     

                  <div className='relative   w-full '>                      
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <User className="size-4 text-blue-500"/>
          </div>
              <select
                 onChange={(e) => {
                  const selectGender = e.target.value; 
                  setgender(selectGender);                  
                }}
                name="select gender" value={Gender} required id="Gender" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="male" >Male</option>
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
                 onChange={(e) => {
                  const selectbloodgroup = e.target.value; 
                  setbloodgroup(selectbloodgroup);                  
                }}
                value={bgroup}
                name="select blood type" required id="Blood Type" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="o+ve" >O+ve</option>
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
 
             <textarea onChange={(e)=>setaddress(e.target.value)} value={Address} className='w-full  h-10  pl-9 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
            </div>
            <div className='flex flex-col gap-2 '>
             <h1>Department</h1>     
             <Input icon={Hospital} onChange={(e)=>setdept(e.target.value)} type='text' required value={Dept}  />
            </div>
            <div className='flex flex-col gap-2 '>
             <h1>Salary</h1>     
             <Input icon={User} onChange={(e)=>setIncome(e.target.value)} type='number' required value={income}  />
            </div>
            <div className='flex flex-col gap-2 '>
             <h1>Attendance</h1>     
             <Input icon={Calendar} onChange={(e)=>setattendance(e.target.value)} type='number' required value={Attendance}  />
            </div>
            <div className='flex flex-col gap-2 '>
                  <h1>Status</h1>     

                  <div className='relative   w-full '>                      
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <User className="size-4 text-blue-500"/>
          </div>
              <select
                onChange={(e) => {
                  const selectstatus = e.target.value; 
                  setactive(selectstatus);                  
                }}
                 value={Active}
                name="select status" required id="Status" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option value="active" selected>Active</option>
              <option value="inactive" >Inactive</option>
              </select>
                      </div>
                      </div>          
                 


            
            

                 
            
            
           

            

          </div >
          <div className='w-full '>
        <button  className='ml-28 cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >
          Update
          </button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default DoctorUpdate_HR