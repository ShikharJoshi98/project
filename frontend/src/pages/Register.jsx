import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import React, { useState } from 'react'
import FloatingShape from '../components/FloatingShape';

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [confirmpass, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);

  const handleSubmit = (e) => { console.log(email, pass) };
  const navigate = useNavigate();
  return (
    <div className='h-full pb-8   bg-gradient-to-br from-blue-300 via-[#4a9acc]  to-blue-600 ' >
      <Navbar/>
      <div  >
      <FloatingShape color='bg-blue-900' size='w-64 h-64' top='-5%' left='10%' delay={0}/>

      <form className='mx-auto relative z-10 mt-8  h-auto bg-white p-8 md:max-w-[500px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg ' >
          <h1 className='text-3xl font-semibold mb-5 text-center'>Registration Form
          </h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
          <div className='flex flex-col gap-3 m-auto items-start'>
          <input type="text" className='mb-2 w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setEmail(e.target.value )} value={email} placeholder='Full Name*' required />
            <input type="tel" className='mb-2 w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Phone Number*' required />
            <input type="tel" className='mb-2 w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setEmail(e.target.value )} value={email} placeholder='Alternative Phone Number (Optional)'  />


            <input type="email" className='mb-2 w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email*' required />
            <input type="text" className='mb-2 w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setEmail(e.target.value )} value={email} placeholder='Username' required />

            {showPassword ? <input type="password" className=' w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setPassword(e.target.value)} value={pass} placeholder='Password*' required /> : <input type="text" className=' w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' placeholder='Password*' onChange={(e) => setPassword(e.target.value)} value={pass} required />}
            <div className='flex items-center gap-1 mb-2'>
              <input type='checkbox' id='check' onChange={()=>setShowPassword(!showPassword)} /><label for='check'>Show Password</label>
              </div>
            {showConfirmPassword ? <input type="password" className=' w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpass} placeholder='Confirm Password*' required />:<input type="text" className=' w-full focus:ring-2 focus:outline-none focus:ring-[#4a9acc] text-zinc-800 transition duration-500 p-2 border-zinc-400 border-1 rounded-lg' placeholder='Password*' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpass}  required />}
            <div className='flex items-center gap-1'>
              <input type='checkbox' id='check' onChange={() => setConfirmShowPassword(!showPassword)} /><label for='check'>Show Password</label>
            </div>
            <div className='border-1 border-zinc-400 mt-3 rounded-lg p-2 w-full'>
                <select className='w-full focus:outline-none ' name="Branch" id="">
                <option value="select">Select Branch</option>
                   <option value="dombivali">Dombivali</option>
                   <option value="mulund">Mulund</option>
                </select>
              </div>
            <button onClick={handleSubmit} className='mx-auto bg-[#4a9acc] text-lg hover:text-gray-200 hover:bg-[#4a89cc] hover:scale-101 text-white mt-9 w-52 p-2 rounded-full' type='submit'>Register</button>
            <p className='mx-auto mt-5'>Already have an Account ? 

<span onClick={()=>navigate('/login')}className='cursor-pointer text-blue-500 hover:text-blue-700 hover:underline'>Click here to login</span></p>
          </div>
      </form>
      </div>
      </div>
  )
}

export default Register