import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState } from 'react'
import FloatingShape from '../components/FloatingShape';
import { Lock, User } from 'lucide-react';
import Input from '../components/Input';

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  const navigate = useNavigate();
  return (
    <div className='min-h-screen  bg-gradient-to-br from-blue-400 via-[#4a9acc] to-blue-900  relative overflow-hidden' >
      <Navbar/>
      <div >
      <FloatingShape color='bg-blue-900' size='w-64 h-64' top='-5%' left='10%' delay={0}/>

      <form onSubmit={handleSubmit} className='mx-auto relative z-10 mt-8 h-auto bg-white p-8 md:max-w-[380px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg ' >
          <h1 className='text-3xl font-semibold mb-5 text-center'>LOGIN</h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
          <div className='flex flex-col gap-5 m-auto items-start'>
           
          <Input icon={User} type='text' required placeholder='Username*' value={username} onChange={(e) => setUsername(e.target.value)} />
          {  showPassword ?
              <Input icon={Lock} type='password' required placeholder='Password*' value={pass} onChange={(e) => setPassword(e.target.value)} /> :
              <Input icon={Lock} type='text' required placeholder='Password*' value={pass} onChange={(e) => setPassword(e.target.value)} />
            }       
            <div className='flex items-center gap-2'>
              <input type="checkbox" className='ml-2' onChange={()=>setShowPassword(!showPassword)} id='check'/><label  htmlFor="check">Show Password</label>
            </div>  
           
            <button  className='mx-auto font-semibold cursor-pointer bg-blue-400 text-lg hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-5 w-52 p-2 rounded-full' type='submit'>Login</button>
            <p className='mx-auto mt-5'>Don't have an Account ? Click here to <span onClick={()=>navigate('/register')}className='cursor-pointer text-blue-500 hover:text-blue-700 hover:underline'>Register</span></p>

          </div>
      </form>
      </div>
      </div>
  )
}

export default Login