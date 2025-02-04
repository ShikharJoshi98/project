import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState } from 'react'
import FloatingShape from '../components/FloatingShape';
import { LoaderCircle, Lock, User } from 'lucide-react';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [role, setRole] = useState('PATIENT');

  const { login, isLoading, error,user } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
   let newRole = role.toLowerCase()
    await login(username, pass,newRole );
    navigate(`/dashboard-${role}`);
  };
  
  return (
    <div className='min-h-screen  bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700   relative overflow-hidden' >
      <Navbar/>
      <div >
        <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-blue-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <form onSubmit={handleSubmit} className='mx-auto relative z-10 mt-4 mb-2 h-auto bg-white p-5 md:max-w-[430px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg ' >
          <h1 className='text-3xl font-semibold mb-5 text-center'><span className=' text-blue-400'>{role }</span> LOGIN</h1>          
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-8 w-28 mx-auto ' />

          <div className='md:flex items-center text-zinc-900 md:max-w-[380px] hidden   mb-8 text-sm  md:text-base  justify-center'>
            <button type='button' onClick={() => { setRole('PATIENT'); }} className={`cursor-pointer  rounded-l-full border-l-1 border-l-zinc-500  border-1 border-r-zinc-500 py-1 px-3
              ${role==='PATIENT'? "bg-blue-500  scale-105 text-white":"hover:bg-blue-500 hover:scale-105 hover:text-white"}
              `}>PATIENT</button>
            <button type='button' onClick={()=>{setRole('DOCTOR'); }} className={`cursor-pointer  border-l-1 border-l-zinc-500  border-1 border-r-zinc-500 py-1 px-3
              ${role==='DOCTOR'? "bg-blue-500 scale-105 text-white":"hover:bg-blue-500 hover:scale-105 hover:text-white"}
              `} >DOCTOR</button>
            <button type='button' onClick={()=>{setRole('HR');}} className={`cursor-pointer  border-l-1 border-l-zinc-500  border-1 py-1 px-3
              ${role==='HR'? "bg-blue-500 scale-105 text-white":"hover:bg-blue-500 hover:scale-105 hover:text-white"}
              `} >HR</button>
            <button type='button' onClick={()=>{setRole('RECEPTIONIST'); }} className={`cursor-pointer  rounded-r-full border-l-1 border-l-zinc-500  border-1 border-r-zinc-500 py-1 px-3
              ${role==='RECEPTIONIST'? "bg-blue-500 scale-105 text-white":"hover:bg-blue-500 hover:scale-105 hover:text-white"}
              `} >RECEPTIONIST</button>
          </div>
           
          <div >
            <select onChange={(e) => {
              const selectRole = e.target.value; 
              setRole(selectRole);
              
            }} name="Select Role" id="role" className='md:hidden block mx-auto mb-6 py-1 pl-5 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
              <option  value="">SELECT ROLE</option>
              <option value="PATIENT">PATIENT</option>
              <option  value="DOCTOR">DOCTOR</option>
              <option  value="HR">HR</option>
              <option value="RECEPTIONIST">RECEPTIONIST</option>
            </select>
          </div>

          <div className='flex flex-col gap-5 m-auto items-start'>
           
          <Input icon={User} type='text' required placeholder='Username*' value={username} onChange={(e) => setUsername(e.target.value)} />
          {  showPassword ?
              <Input icon={Lock} type='password' required placeholder='Password*' value={pass} onChange={(e) => setPassword(e.target.value)} /> :
              <Input icon={Lock} type='text' required placeholder='Password*' value={pass} onChange={(e) => setPassword(e.target.value)} />
            }       
            <div className='flex text-zinc-800 items-center gap-2'>
              <input type="checkbox" className='ml-2' onChange={()=>setShowPassword(!showPassword)} id='check'/><label  htmlFor="check">Show Password</label>
            </div>  
           
            <button className='mx-auto font-semibold cursor-pointer bg-blue-400 text-lg hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white  w-52 p-2 rounded-full' type='submit'>
              {!error && isLoading ? <LoaderCircle className='animate-spin mx-auto ' size={24} /> : "Login"}
            </button>
           {error && <p className='text-red-500 mx-auto'>{ error}</p>}
            
            <p className='cursor-pointer mx-auto text-blue-500 hover:text-blue-700 hover:underline'>Forgot Password?</p>
            <p className='mx-auto text-zinc-800 '>Don't have an Account ? Click here to <span onClick={()=>navigate('/register')}className='cursor-pointer text-blue-500 hover:text-blue-700 hover:underline'>Register</span></p>

          </div>
      </form>
      </div>
      </div>
  )
}

export default Login